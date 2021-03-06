const {series, src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-dart-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Funcion que compila SASS - series: ejecutar varias funciones - src, ruta archivo sass / dest, donde guardar css compilado / watch complia cambios

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}


function css(){
    // return src('src/scss/app.scss')
        return src(paths.scss)
        .pipe( sass( {
            outputStyle: 'expanded'
        }) )
        .pipe( dest('./build/css') )
   
}

function minificarcss(){
    // return src('src/scss/app.scss')
    return src(paths.scss)
        .pipe( sass({
            outputStyle: 'compressed'
        }    ))
        .pipe( dest('./build/css') )
}

function javascript(){
    return src(paths.js)
        .pipe( concat('bundle.js')  )
        .pipe( dest('./build/js') )
}


function imagenes(){
    return src(paths.imagenes)
    .pipe( imagemin() )
    .pipe( dest('./build/img'))
    .pipe( notify({ message: 'Imagen minificada' }));
}

function versionWebp(){
    // return src('src/img/**/*')
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe( dest('./build/img'))
        .pipe( notify({ message: 'Version Webp Lista' }));
}

function watchArchivos(){
//    watch( 'src/scss/**/*.scss' , css);  // * = la carpeta actual | ** = todos las carpetas con todos los archivos con esa extension
    watch( paths.scss , css); 
    watch( paths.js, javascript); 
}

// minificar css
// outputStyle: 'compressed'

//Compilar con:  gulp css
exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos

exports.default = series ( css, imagenes, javascript,versionWebp, watchArchivos)