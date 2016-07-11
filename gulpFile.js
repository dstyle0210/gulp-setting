/**
 * Gulp Setting v0.0.1
 * @ahther 디스타일(마봉아빠 , dstyle0210@gmail.com)
 * @url : http://dstyleitsme.tistory.com/entry/GulpSetting
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var less = require('gulp-less');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var csscomb = require('gulp-csscomb');
var insert = require('gulp-insert');
var runSequence = require('run-sequence');
var folders = require('gulp-folders');

// 현재 안씀
var replace = require('gulp-replace');



// 환경설정
var srcPath = {
		root:"./src",
		css:"./src/css",
		scss:"./src/scss",
		less:"./src/less",
	};
var distPath = {
		root:"./dist",
		css:"./dist/css"
}


// 메소드 만들기
function getFolder(file){
	return path.parse( path.parse(file.path).dir ).base;
};
function getTimeStamp() {
    var now = new Date();
    return "["+(now.getHours() + ':' +((now.getMinutes() < 10)? ("0" + now.getMinutes()): (now.getMinutes())) + ':' +((now.getSeconds() < 10)? ("0" + now.getSeconds()): (now.getSeconds())))+"]";
}


/*! Default */
gulp.task("default",function(callback){
	runSequence("build","watch",callback);
});
gulp.task("dist",function(callback){
	runSequence("css:dist",callback);
});



/*! 중복 pipe */
function pipeLineScss(gulpFiles){
	return gulpFiles.pipe(sass({indentType:"tab",indentWidth:1}).on('error', sass.logError))
	.pipe(csscomb())
	.pipe(gulp.dest(srcPath.css));
};
function pipeLineLess(gulpFiles){
	return gulpFiles.pipe(less())
	.pipe(csscomb())
	.pipe(gulp.dest(srcPath.css));
};
function pipeLineConcatCSS(gulpFiles,folderName){
	return gulpFiles.pipe(concat(folderName))
    .pipe(insert.prepend('@charset "UTF-8";\n'))
    .pipe(gulp.dest(srcPath.css));
};


gulp.task("build",function(callback){
	runSequence("scss:build","less:build","css:concat",callback);
});
gulp.task("watch",function(callback){
	runSequence("scss:watch","less:watch","css:watch",callback);
});
gulp.task("scss",function(callback){
	runSequence("scss:build","scss:watch",callback);
});
gulp.task("less",function(callback){
	runSequence("less:build","less:watch",callback);
});
gulp.task("css",function(callback){
	runSequence("css:concat","css:watch",callback);
});


gulp.task("scss:build",function(){
	return pipeLineScss( gulp.src(srcPath.scss+"/**/*.scss",{"base":srcPath.scss}) );
});
gulp.task("less:build",function(){
	return pipeLineLess( gulp.src(srcPath.less+"/**/*.less",{"base":srcPath.less}) );
	
});
gulp.task("css:concat", folders(srcPath.css, function(folder){
    return pipeLineConcatCSS( gulp.src(path.join(srcPath.css, folder, '*.css')) , folder + '.css' );
}));
gulp.task("scss:watch",function(){
	return gulp.watch(srcPath.scss+"/**/*.scss").on("change",function(file){
		var name = path.parse(file.path).base;
		pipeLineScss( gulp.src(file.path,{"base":srcPath.scss}) );
		console.log(getTimeStamp() + " [sass:watch] "+name+" changed");
	});
});
/*! LESS watch */
gulp.task("less:watch",function(){
	return gulp.watch(srcPath.less+"/**/*.less").on("change",function(file){
		var name = path.parse(file.path).base;
		pipeLineLess( gulp.src(file.path,{"base":srcPath.less}) );
		console.log(getTimeStamp() + " [less:watch] "+name+" changed");
	});
});
/*! CSS Watch */
gulp.task("css:watch",function(){
	return gulp.watch([srcPath.css+"/**/*.css","!"+srcPath.css+"/*.css"]).on("change",function(file){
		var folder = getFolder(file);
		pipeLineConcatCSS( gulp.src(srcPath.css+"/"+folder+"/*.css") , folder+'.css' );
		console.log(getTimeStamp() + " [css:watch] "+folder+".css concated");
	});
});
/*! dist : CSS */
gulp.task("css:dist",function(){
	gulp.src(srcPath.css+"/*.css")
	.pipe(csso())
	.pipe(gulp.dest(distPath.css));
});