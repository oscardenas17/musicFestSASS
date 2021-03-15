const {series, src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-dart-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Funcion que compila SASS - series: ejecutar varias funciones - src, ruta archivo sass / dest, donde guardar css compilado / watch complia cambios



//UTILIDADES CSS
const autoprefixer = require('autoprefixer'); //prefijos en css
const postcss = require('gulp-postcss'); // procesamiento css
const cssnano = require('cssnano'); // minificar css
const sourcemaps = require('gulp-sourcemaps');


//UTILIDADES JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');


const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}


function css(){
    // return src('src/scss/app.scss')

        return src(paths.scss)
        .pipe ( sourcemaps.init() ) //identifica ref del archivo original
        .pipe ( sass() ) // compilar sass
        // .pipe( sass( {
        //     outputStyle: 'expanded'
        // }) ) SIN USO DE CSSNANO
        .pipe( postcss(  [autoprefixer(), cssnano()]   ))
        .pipe( sourcemaps.write('.') ) //crea el app.css.map
        .pipe( dest('./build/css') )
   
}

// function minificarcss(){
//     // return src('src/scss/app.scss')
//     return src(paths.scss)
//         .pipe( sass({
//             outputStyle: 'compressed'
//         }    ))
//         .pipe( dest('./build/css') )
// }

function javascript(){
    return src(paths.js)
        .pipe (sourcemaps.init())
        .pipe( concat('bundle.js')  )
        .pipe( terser())
        .pipe( sourcemaps.write('.'))
        .pipe(rename({suffix: '.min'}))
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
// exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos

exports.default = series ( css, imagenes, javascript,versionWebp, watchArchivos)