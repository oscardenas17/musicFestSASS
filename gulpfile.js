const {series, src, dest} = require('gulp');
const sass = require('gulp-dart-sass');

//Funcion que compila SASS - series: ejecutar varias funciones - src, ruta archivo sass / dest, donde guardar css compilado

function css(){
    return src('src/scss/app.scss')
        .pipe( sass( {
            outputStyle: 'expanded'
        }) )
        .pipe( dest('./build/css') )
   
}

// minificar css
// outputStyle: 'expanded'

//Compilar con:  gulp css
exports.css = css;