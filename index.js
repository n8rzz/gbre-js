const { exec  } = require('child_process');
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;
const BranchCollection = require('./branch/BranchCollection');

Spinner.setDefaultSpinnerDelay(125);

const spinner = new Spinner();
spinner.setSpinnerString(27);
spinner.start();

console.log(`${chalk.green('[1/3]')} Extracting local git branches`);

const branchCollection = new BranchCollection();

exec('git remote get-url origin', (err, stdout, stderr) => {
    if (err) {
        throw err;
    }

    branchCollection.initGitModel(stdout);
});

exec('git branch', (err, stdout, stderr) => {
    if (err) {
        throw err;
    }

    console.log(`${chalk.green('[2/3]')} Requesting branch data from GitHub: ${chalk.cyan(branchCollection.gitModel.buildApiUrl())}`);

    branchCollection.initBranchModels(stdout);
    branchCollection.displayBranchTable();
    spinner.stop();
});
