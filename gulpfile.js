var gulp=require('gulp');
var concat=require('gulp-concat');
var webserver=require('gulp-webserver');
var uglify=require('gulp-uglify');
var cleanCss=require('gulp-clean-css');
var path=require('path');
var rename=require('gulp-rename');
var fs=require('fs');

fs.writeFileSync('./file/ab',fs.readFileSync('./Content/css/style.css'));

gulp.task('server',function(){
    gulp.src('.')
        .pipe(webserver({
            host:'localhost',
            port:8080,
            fallback:'index.html',
            middleware:function(req,res,next){
                fs.readFile('./Content/css/style.css',function(err,data){
                    if(err){
                        throw err;
                    }
                    fs.writeFileSync('./file/ab',data)
                })
                res.writeHead(200,{
                    'content-type':'text/html;charset=utf-8',
                    'Access-Control-Allow-Origin':'*'
                })
                var filename=req.url.split('/')[1];
                var filepath=path.join(__dirname,filename);
                if(filepath==='/index'){
                    res.end('2018-1-5')
                }
            }
        }))
})

gulp.task('clean',function(){
    gulp.src('./Content/css/*.css')
        .pipe(concat('styles.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('./Content/css'))
})
gulp.task('default',['server','clean'])