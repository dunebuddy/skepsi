#Código para Módulos.

São as peças que formam um componente. Recomenda-se usar o prefixo 'm-' antes do nome do arquivo. Abaixo temos o exemplo de 3 módulos:
```html
<!-- Arquivo m-cabecalho.html-->
<div class="cabecalho">
    @@include(titulo.html)
</div>

<!--Arquivo m-content.html-->
<div class="content">
    @@include(markdown(content.md))
</div>

<!--arquivo m-link-pesquisar.html-->
<div class="link-pesquisar">
    @@include(link-pesquisar.html)
</div>
```

Os includes serão inseridos nas tags corretas resultando em:

```html
<!-- Arquivo m-cabecalho.html-->
<div class="cabecalho">
    <h1 class="title">Titulo do site</h1>
</div>

<!--Arquivo m-content.html-->
<div class="content">
    <h1>Lorem Ipsum</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit blanditiis voluptatem mollitia, modi saepe est inventore impedit praesentium, commodi quod tenetur nesciunt officia animi maiores laudantium magnam beatae veniam eaque.</p>
    <h2>Cartega milona fiora</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta a libero accusamus alias eaque. Fugiat, modi unde quae expedita optio nesciunt rerum officia cum numquam a magnam iure nulla animi.</p>
</div>

<!--arquivo m-link-pesquisar.html-->
<div class="link-pesquisar">
    <a href="http://google.com" class="link">Link para o google</a>
</div>
```

#HELP
Visite [gulp-file-include](https://www.npmjs.com/package/gulp-file-include)