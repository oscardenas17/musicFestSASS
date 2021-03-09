const {series, src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-dart-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');

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

function imagenes(){
    return src('src/img/**/*')
    .pipe( imagemin() )
    .pipe( dest('./build/img'))
    .pipe( notify({ message: 'Imagen minificada' }));
}

function watchArchivos(){
   watch( 'src/scss/**/*.scss' , css);  // * = la carpeta actual | ** = todos las carpetas con todos los archivos con esa extension
}

// minificar css
// outputStyle: 'compressed'

//Compilar con:  gulp css
exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos

exports.default = series ( css, imagenes, watchArchivos)