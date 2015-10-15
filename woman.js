#! /usr/bin/env node

var exec = require('child_process').exec;
var chalk = require('chalk');
var fs = require('fs');
var open = require('open');

var fileLocation = '/tmp/woman.html';

var command = 'man';

// executes `man `
args = process.argv.slice(2);

args.forEach( function(arg) {
  command += ' ' + arg;
});

command += ' | groff -mandoc -Thtml';

function writeToTmp(myText) {
  fs.writeFile(fileLocation, myText, function(err) {
      if(err) {
          console.log(chalk.red('Error: could not write to /tmp\n' + err));
          return console.log(err);
      }
  });
}

exec(command, function (error, stdout, stderr) {
  if (stdout !== null && stdout !== '') {
    console.log(stdout);
    writeToTmp(stdout);
    open(fileLocation);
  }
  if (stderr !== null && stderr !== '') {
    console.log(chalk.yellow(stderr));
  }
  if (error !== null && error !== '') {
    console.log(chalk.red(error));
  }
});

