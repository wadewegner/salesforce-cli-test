const exec = require('child-process-promise').exec;
const async = require('async');
const sleep = require('sleep');

function runCommand(commandScript) {

  console.log('--------------------------');
  console.log('exec', commandScript);

  return exec(commandScript)
    .then(function (result) {
      var stdout = result.stdout;
      var stderr = result.stderr;
      console.log('stdout: ', stdout);
      if (stderr) console.log('stderr: ', stderr);
    })
    .catch(function (err) {
      console.error('ERROR: ', err);
    })
    .then(() => {
      return sleep.msleep(1000);
    });
}

async.whilst(
  () => {
    return true;
  },
  (callback) => {

    runCommand(`sfdx --help`)
      .then(() => {
        return runCommand(`sfdx force`);
      }).then(() => {
        return runCommand(`sfdx plugins`);
      });

    setTimeout(() => {
      callback(null, true);
    }, 100000000);
  },
  (err, n) => {
    console.log('err: ' + err);
  }
);
