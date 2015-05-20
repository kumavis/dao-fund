var browserify = require('browserify')
var ghpages = require('gh-pages')
var fs = require('fs')
var mkdirp = require('mkdirp')
var pathJoin = require('path').join
var async = require('async')
var ncp = require('ncp').ncp
var rimraf = require('rimraf')


async.waterfall([
  prepare,
  build,
  copyHtml,
  publish,
  clean,
], function(err){
  if (err) throw err
  console.log('complete!')
})

function prepare(cb){
  console.log('prepare...')
  mkdirp(path('dist'), cb)
}

function build(_, cb){
  console.log('build...')
  var b = browserify()
  b.add(path('index.js'))
  b.bundle()
  .pipe(fs.createWriteStream(path('dist/index.js')))
  .on('finish', cb)
  .on('error', cb)
}

function copyHtml(cb){
  console.log('copyHtml...')
  var read = fs.createReadStream(path('index.html'))
  var write = fs.createWriteStream(path('dist/index.html'))
  read.pipe(write)
  .on('finish', cb)
  .on('error', cb)
}

function copyAssets(cb){
  console.log('copyHtml...')
  ncp(path('assets/'), path('dist/assets/'), cb)
}

function publish(cb){
  console.log('publish...')
  ghpages.publish(path('dist'), cb)
}

function clean(cb){
  console.log('clean...')
  rimraf(path('dist'), cb)
}

// util

function path(path){
  return pathJoin(__dirname, path)
}