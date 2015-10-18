#! /usr/bin/env node

var exec = require('child_process').exec;
var chalk = require('chalk');
var fs = require('fs');
var open = require('open');
var temp = require('temp');
var path = require('path');

var dir = 'temp';

var manCommand = 'man';

arg = process.argv.slice(2);

if (arg.length !== 1) {
  console.log(chalk.red('woops, woman only supports one argument for now!\nTry again'));
  process.exit(1);
}
// manCommand += ' ' + arg;
manCommand += ' ' + arg + ' | groff -mandoc -Thtml';

function writeToTmp(myText) {

  //TODO: replace with a css file
  myText = '\
   <link rel="stylesheet" href="//cdn.jsdelivr.net/font-hack/2.015/css/hack-extended.min.css">\
   <style>\
   body {\
     padding: 50px;\
     font-family: Hack, monospace;\
   }\
   p {\
     font-size: 20px;   \
     text-align: center; \
   } \
   </style>\
  ' + myText;

  var dirPath = temp.mkdirSync(dir);

  // console.log('dirPath: ' + dirPath);
  var htmlPath = path.join(dirPath, arg + '.html');

  //Write html file to temp directory
  fs.writeFileSync(htmlPath, myText);

  //Write css file to temp directory

  //Open html file in browser
  // console.log('Opening htmlPath: ' + htmlPath);
  open(htmlPath);

  //clearup temp files
  // temp.track();
  temp.cleanupSync();
  // temp.cleanup(function(err, stats) {
  //   console.log(stats);
  // });
}

exec(manCommand, function (error, stdout, stderr) {
  if (stdout !== null && stdout !== '') {
    console.log(chalk.green('man command executed successfully'));
    writeToTmp(stdout);
  }
  if (stderr !== null && stderr !== '') {
    console.log(chalk.yellow(stderr));
  }
  if (error !== null && error !== '') {
    console.log(chalk.red(error));
  }
});

