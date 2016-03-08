var assert = require('assert');
var express = require('express');
var wagner = require('wagner-core');
var superagent = require('superagent');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var _ = require('underscore');
var app = express();
var sitewatch = require('./sitewatch')
app.set('port', (process.env.PORT || 5000));


gulp.task('watch',function() {
   gulp.watch('./*.js',['test']);
});