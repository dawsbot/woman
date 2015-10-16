#! /usr/bin/env node

var exec = require('child_process').exec;
var chalk = require('chalk');
var fs = require('fs');
var open = require('open');
var temp = require('temp');
var path = require('path');
//Auto cleanup
// temp.track();

var dir = 'temp';

var manCommand = 'man';

// executes `man `
args = process.argv.slice(2);

args.forEach( function(arg) {
  manCommand += ' ' + arg;
});

manCommand += ' | groff -mandoc -Thtml';

function writeToTmp(myText) {

  myText = '\
   <style>\
   body {\
     padding: 50px;\
   }\
   p {\
     font-size: 20px;   \
     text-align: center; \
   } \
   </style>\
  ' + myText;
  // myText = 'helo wolld';
  // console.log(chalk.green('in writeToTmp. dir: ' + dir));

  var dirPath = temp.mkdirSync(dir);

  console.log('dirPath: ' + dirPath);
  var htmlPath = path.join(dirPath, 'woman.html');

  //Write html file to temp directory
  fs.writeFileSync(htmlPath, myText);

  //Write css file to temp directory

  //Open html file in browser
  console.log('Opening htmlPath: ' + htmlPath);
  open(htmlPath);


}

exec(manCommand, function (error, stdout, stderr) {
  if (stdout !== null && stdout !== '') {
    console.log(chalk.green('man command executed successfully'));
    // console.log(stdout);
    writeToTmp(stdout);
    // open(dir + 'woman.html');
  }
  if (stderr !== null && stderr !== '') {
    console.log(chalk.yellow(stderr));
  }
  if (error !== null && error !== '') {
    console.log(chalk.red(error));
  }
});

