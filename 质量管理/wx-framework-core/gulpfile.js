const gulp = require('gulp')
const px2rpx = require('gulp-px2rpx')

gulp.task('wxss', () =>
  gulp
    .src(['miniprogram_npm/@vant/weapp/**/*.wxss'])
    .pipe(px2rpx({ screenWidth: 375 }))
    .pipe(gulp.dest('miniprogram_npm/@vant/weapp/'))
)
