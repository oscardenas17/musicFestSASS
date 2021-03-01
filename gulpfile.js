const {series, src, dest, watch} = require('gulp');
const sass = require('gulp-dart-sass');

//Funcion que compila SASS - series: ejecutar varias funciones - src, ruta archivo sass / dest, donde guardar css compilado / watch complia cambios

function css(){
    return src('src/scss/app.scss')
        .pipe( sass( {
            outputStyle: 'expanded'
        }) )
        .pipe( dest('./build/css') )
   
}

function minificarcss(){
    return src('src/scss/app.scss')
        .pipe( sass({
            outputStyle: 'compressed'
        }    ))
        .pipe( dest('./build/css') )
}

function watchArchivos(){
   watch( 'src/scss/app.scss' , css)
}

// minificar css
// outputStyle: 'compressed'

//Compilar con:  gulp css
exports.css = css;
exports.minificarcss = minificarcss;
exports.watchArchivos = watchArchivos