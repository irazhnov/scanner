"use strict";

module.exports = function(config, gulp, concat) {
    var sources = [
       'bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-base.css',
        config.STYLES_PATH + 'css\\*.css'
    ];
    return gulp.src(sources)
        .pipe(concat('main.css'))
        .pipe(gulp.dest(config.WWW_PATH + '\\css\\'));
};