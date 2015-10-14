#! /usr/bin/env node

var exec = require('child_process').exec;
var chalk = require('chalk');
var fs = require('fs');
var open = require('open');

var fileLocation = '/tmp/woman.txt';

var command = 'man';
//
// executes `man `
process.argv = process.argv.slice(2);

process.argv.forEach( function(arg) {
  command += ' ' + arg;
});

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

function writeToTmp(txt) {
  fs.writeFile(fileLocation, txt, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log('The file was saved!');
  });
  // exec(command, function (error, stdout, stderr) {
  //   if (stdout !== null && stdout !== '') {
  //     console.log(stdout);
  //   }
  //   if (stderr !== null && stderr !== '') {
  //     console.log(chalk.yellow(stderr));
  //   }
  //   if (error !== null && error !== '') {
  //     console.log(chalk.red(error));
  //   }
  // });

}
