var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var markdownDocs = require('gulp-markdown-docs');
var dir = {
  watchScss : "*.scss",
  watchReadme : "./README.md",
  exportCss : "./",
  exportReadme : "./README.html"
};

// Sassコンパイルタスク
gulp.task('scss', function(event) {
  return gulp.src(dir.watchScss)
    // エラーが気た時に処理が落ちるのでplumberでカバー
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dir.exportCss))
});

// markdown コンパイルタスク
gulp.task('readme', function () {
  return gulp.src(dir.watchReadme)
    .pipe(markdown({encodings: "UTF-8"}))
    .pipe(gulp.dest(dir.exportReadme));
});

// readme task set
gulp.task('readme', function () {
  return gulp.src('*.md')
	.pipe(markdownDocs('README.html', {
        layoutStylesheetUrl: 'markdown.css'
  }))
	.pipe(gulp.dest('./'));
});

// gulp.watch(dir, [task set name]);
gulp.task('watch',function(event){
	gulp.watch(dir.watchScss,['scss']);
	gulp.watch(dir.watchReadme,['readme']);
});

gulp.task('default',['watch']);
