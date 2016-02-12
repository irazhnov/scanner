'use strict';

module.exports = function(gulp, concat, ngAnnotate) {
    var scripts = [

        'node_modules/fastclick/lib/fastclick.js',
        'node_modules/angular/angular.min.js',
        //'node_modules/angular-route/angular-route.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'node_modules/angular-touch/angular-touch.min.js',
        'bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.min.js',
        //'node_modules/angular-animate/angular-animate.min.js',
        'app/js/configuration/*.js',
        //'app/js/configuration/Configuration.js',
        //'app/js/configuration/Routes.js',
        //'app/js/application.js',
        'app/js/application.js',
        'app/js/controller/StartController.js',
        'app/js/model/*.js',
        'app/js/directives/*.js',
        'app/js/*.js'
        ];

    return gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('www/js/'));
};