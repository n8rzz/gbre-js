const { exec  } = require('child_process');
const BranchCollection = require('./branch/BranchCollection');

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

    branchCollection.initBranchModels(stdout);

    console.log(branchCollection);
});
