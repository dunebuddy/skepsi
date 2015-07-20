'use strict';

module.exports = function () {

    //paths for application
    var app_root = 'src';
    var build_path = 'dist';
    var html_components_folder = app_root + '/html_components';

    var config = {

        //define
        root: app_root,
        concat_css_file: 'main.css',
        modules_basepath: html_components_folder + '/modules/',
        includes_basepath: html_components_folder + '/includes/',
        templates_basepath: html_components_folder + '/templates/',

        //sources
        all_js: app_root + '/scripts/**/*.js',
        source_js: app_root + '/scripts/*.js', 
        all_less: app_root + '/styles/less/*.less',
        all_compiled_css: app_root + '/styles/*.css',
        all_vendor_js: app_root + '/scripts/vendor/**/*.js',
        all_vendor_css: app_root + '/styles/vendor/**/*.css',
        all_img: app_root + '/images/**/*.{jpg,png,gif}',
        all_fonts: app_root + '/fonts/**/*.{eot,svg,ttf,woff}',
        all_html: app_root + '/*.html',
        all_html_components: html_components_folder + '/**/*.html',
        all_html_modules: html_components_folder + '/modules/**/*.html',
        all_html_templates: html_components_folder + '/templates/*.html',
        theme_file: app_root + '/styles/less/theme.less',

        //destinations
        tmp_folder: './.tmp',
        css_folder: app_root + '/styles',
        maps_folder: '../.maps',

        //Build
        build: {

            html: build_path,
            img: build_path + '/images',
            fonts: build_path + '/fonts',

        },

        //Deploy
        ftp_credentials: {

            host: '',
            user: '',
            pass: '',
            remotePath: ''
        }
    };

    return config;
}
