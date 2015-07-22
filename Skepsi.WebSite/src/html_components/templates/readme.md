#Código para Templates.
Templates são a base para suas páginas. Com a ajuda dos módulos será possível montar diferentes páginas em segundos. Exemplo:

```html
<html>
    <head>
    <title>Archaeopteryx</title>

    <!-- bower:css -->
    <!-- endbower -->
    <!-- inject:css -->
    <!-- endinject -->
    </head>

    <section>
        @@include('m-cabecalho.html')

        @@include('m-content.html')

        @@include('m-link-pesquisar.html')
    </section>

    <!-- bower:js -->
    <!-- endbower -->
    <!-- inject:js -->
    <!-- endinject -->
</html>
```

O resultado após a compilação é:

```html
<html>
    <head>
    <title>Archaeopteryx</title>

    <!-- bower:css -->
    <link rel="stylesheet" href="bower_components/bootstrap/css/bootstrap.min.css">
    <!-- endbower -->
    <!-- inject:css -->
    <link rel="stylesheet" href="styles/css/main.css">
    <!-- endinject -->
    </head>
    <section>
        <div class="cabecalho">
            <h1 class="title">Titulo do site</h1>
        </div>
        <div class="content">
            <h1>Lorem Ipsum</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit blanditiis voluptatem mollitia, modi saepe est inventore impedit praesentium, commodi quod tenetur nesciunt officia animi maiores laudantium magnam beatae veniam eaque.</p>
            <h2>Cartega milona fiora</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta a libero accusamus alias eaque. Fugiat, modi unde quae expedita optio nesciunt rerum officia cum numquam a magnam iure nulla animi.</p>
        </div>
        <div class="link-pesquisar">
            <a href="http://google.com" class="link">Link para o google</a>
        </div>
    </section>
    <!-- bower:js -->
    <script src="../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../bower_components/normalize/normalize.js"></script>
    <!-- endbower -->
    <!-- inject:js -->
    <script src="scripts/test.js"></script>
    <!-- endinject -->
</html>
```

As tags `bower:css`, `bower:js` e `inject:js` são populadas automaticamente de acordo com a criação dos respectivos arquivos.

A vantagem desse processo é que se você quiser alterar todos os cabeçalhos das páginas para `<h2>` ou adicionar uma classe `vermelho`, basta alterar o include e todas as páginas serão atualizadas automaticamente.
Veja a seção de condicionais na página do gulp-file-include para uma experiência ainda mais rica.

#HELP
Visite [gulp-file-include](https://www.npmjs.com/package/gulp-file-include)
Visite [gulp-inject](https://www.npmjs.com/package/gulp-inject)
Visite [Wiredep](https://www.npmjs.com/package/gulp-inject)
