'use strict';

var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require ('del');
var wiredep = require('wiredep');
var serveStatic = require('serve-static');
var runSequence = require('run-sequence');
var markdown = require('markdown');
var series = require('stream-series');
var secure = !!(args.s);//Flag if FTP connection should be secure --s for true;
var mainBowerFiles = require('main-bower-files');

//Load Plugins just when needed
var $ = require('gulp-load-plugins')({lazy: true});


/////////////////////
/// DEV TASKS
/////////////////////

//Compiling LESS files
gulp.task('compile_less', function() {
    log('Compiling Less');

    return gulp
        .src([config.all_less])//path to less files
        .pipe($.print())//verbose
        .pipe($.sourcemaps.init())//start sourcemaps
        .pipe($.less())//compile less
        .pipe($.plumber())//check for errors
        .pipe($.autoprefixer({browsers:['last 2 version', '> 5%', 'ie 7', 'ie 8']}))//add vendor prefixes
        .pipe($.concat(config.concat_css_file))//concat to file
        .pipe($.sourcemaps.write(config.maps_folder))//write sourcemaps files
        .pipe(gulp.dest(config.css_folder));//save all
});


//Vetting JS
gulp.task('check_js', function() {
    log('Checking JS files');

    return gulp
        .src([config.all_js, '!' + config.all_vendor_js])//path to js files [do not check vendor js]
        .pipe($.print())//verbose
        .pipe($.jscs())//check code style
        .pipe($.jshint())//check potential errors
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))//gimme some colors
        .pipe($.jshint.reporter('fail'));//report fails
});

//Inject new JS files
gulp.task('inject_js',['check_js'], function(){
    log('Injecting Custom JS');
    var vendorStream = gulp.src(config.all_vendor_js, {read: false});
    var sources = gulp.src(config.source_js, {read: false});

    return gulp
        .src(config.all_html)//target
        .pipe($.print())
        .pipe($.inject(series(vendorStream, sources),{
            ignorePath: config.root,
            addRootSlash:false
        }))
        .pipe(gulp.dest(config.root));
});

//Inject vendor CSS files
gulp.task('inject_vendor_css', function(){
    log('Injecting vendor CSS files');
    var sources = gulp.src(config.all_vendor_css, {read: false});

    return gulp
        .src(config.all_html)//target
        .pipe($.print())
        .pipe($.inject(sources,{
            ignorePath: config.root,
            addRootSlash:false
        }))
        .pipe(gulp.dest(config.root));
});

//Include in HTML modules
gulp.task('add_includes', ['add_modules'], function(){
    log('Adding includes into modules');

    return gulp
        .src(config.tmp_folder + '/modules/*.html')
        .pipe($.print())
        .pipe($.fileInclude({
            prefix: '_ii_',
            basepath: config.includes_basepath,
            filters: {
                markdown: markdown.parse
            }
        }))
        .pipe(gulp.dest(config.root));
});

//Include modules to Templates
gulp.task('add_modules', function(){
    log('Now Adding modules into Templates');

    return gulp
        .src(config.all_html_templates)
        .pipe($.print())
        .pipe($.fileInclude({
            prefix: '_mm_',
            basepath: config.modules_basepath
            //basepath: config.tmp_folder + '/includes'
        }))
        .pipe(gulp.dest(config.tmp_folder + '/modules/'));
});

//Inject Bower Components
gulp.task('wiredep', function(){
    log('Injecting Bower Components');

    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.all_html)
        .pipe(wiredep())
        .pipe($.plumber())
        .pipe(gulp.dest(config.root));
});

gulp.task('add_parts', function(callback){
    log('Mounting the Puzzle')
    runSequence('add_includes','inject_js','inject_vendor_css','wiredep', callback);
});


/////////////////////
/// BUILD TASKS
/////////////////////

//compress images
gulp.task('compress_images', function(){
    log('Compressing Images to ' + config.build['img']);

    return gulp
        .src(config.all_img)
        .pipe($.print())
        .pipe($.imagemin({
                optimizationLevel: 3,
                progressive: true,
                interlaced: true
            }))
        .pipe(gulp.dest(config.build['img']));
});

//copy font files
gulp.task('copy_fonts', ['copy_vendor_fonts'], function(){
    log('Copying fonts to ' + config.build['fonts']);

    return gulp
        .src(config.all_fonts)
        .pipe(gulp.dest(config.build['fonts']));

});

gulp.task('copy_vendor_fonts', function(){
    log('Copying vendor fonts');

    return gulp
        .src(mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe(gulp.dest(config.build['fonts']));
});

//Concatenate CSS & JS in HTML files
gulp.task('concat_html', function () {
    log('Concatenating Scripts and CSS files in BUILD tags');

    var assets = $.useref.assets();

    return gulp
        .src(config.all_html)
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(config.build['html']));
});

//Deploy through FTP
gulp.task('deploy', function(){
    log('Saving the project into remote server');

    return gulp
        .src(config.build['html'] + '/**')
        .pipe($.if(secure, $.sftp(config.ftp_credentials), $.ftp(config.ftp_credentials)))
        .pipe($.print())
        .pipe($.plumber())
        .pipe($.util.noop());
});

//Clean .tmp folder
gulp.task('clean_temp', function(done){
    clean(config.tmp_folder, done);
});

//Clean dist folder
gulp.task('clean_dist', function(done){
    clean(config.build['html'], done);
});

//BUILD
gulp.task('build', ['clean_temp', 'clean_dist'], function(callback){
    log('Starting BUILD sequence')
    runSequence('compile_less','add_parts','wiredep', 'concat_html', 'copy_fonts', 'compress_images', callback);
});

/////////////////
/// SERVER
/////////////////

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(serveStatic('src'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Web server is running on http://localhost:9000');
        });
});

gulp.task('serve', ['connect'], function () {
    require('opn')('http://localhost:9000');
});

/////////////////
/// WATCH FILES
/////////////////

gulp.task('watch', ['connect', 'serve'], function(){
    log('Files are now under surveillance!');

    var server = $.livereload.listen();

    //watch for changes and reload
    gulp.watch([
        config.all_html,
        config.all_compiled_css,
        config.all_js],
        {
            interval:2000 //reloads after 2s
        }
    )
    .on('change', $.livereload.changed);

    //if something changes, [do this]
    gulp.watch(config.all_html_components,['add_parts']);
    gulp.watch(config.all_less,['compile_less']);
    gulp.watch(config.all_vendor_css,['inject_vendor_css']);
    gulp.watch(config.all_js,['inject_js']);
    gulp.watch('bower.json',['wiredep']);
});

//START CHAIN
gulp.task('start', ['clean_temp'], function(callback){
    runSequence('compile_less','add_parts','watch', callback);
});

/////////////////////
/// OTHER FUNCTIONS
/////////////////////

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.yellow(path));
    del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.white(msg[item]));
            }
        }
    }
    else {
        $.util.log($.util.colors.white(msg));
    }
}
