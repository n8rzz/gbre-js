const { exec  } = require('child_process');
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;
const GitModel = require('./gitModel/GitModel');
const BranchCollection = require('./branch/BranchCollection');

Spinner.setDefaultSpinnerDelay(125);

const spinner = new Spinner();
spinner.setSpinnerString(27);
spinner.start();

console.log(`${chalk.green('[1/3]')} Extracting local git branches`);

const branchCollection = new BranchCollection();
const gitModel = new GitModel();

/**
 * @function getBranchStatusAndTitle
 */
function getBranchStatusAndTitle() {
    console.log(`${chalk.green('[2/3]')} Requesting branch data from GitHub: ${chalk.cyan(gitModel.apiUrl())}`);

    branchCollection.getBranchStatusAndTitlesForCollection(gitModel);
    branchCollection.displayBranchTable();

    spinner.stop();
}

exec('git remote get-url origin', (err, stdout, stderr) => {
    if (err) {
        throw err;
    }

    gitModel.init(stdout);
});

exec('git branch', (err, stdout, stderr) => {
    if (err) {
        throw err;
    }

    branchCollection.initBranchModels(stdout);

    getBranchStatusAndTitle();
});

