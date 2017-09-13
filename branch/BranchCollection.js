const chalk = require('chalk');
const BranchModel = require('./BranchModel');

const WHITESPACE_REGEX = / /g;
const NEWLINE_CHARACTER = '\n';

function BranchCollection() {
    return this._init();
}

BranchCollection.prototype._init = function _init() {
    this.items = [];

    return this;
};

BranchCollection.prototype.initBranchModels = function initBranchModels(branchStr) {
    const branchList = this._extractBranchListFromStr(branchStr);

    this.addItems(branchList);
};

BranchCollection.prototype.addItems = function addItems(itemList) {
    for (let i = 0; i < itemList.length; i++) {
        const branch = itemList[i];
        const branchModel = new BranchModel(branch);

        this.addItem(branchModel);
    }
};

BranchCollection.prototype.addItem = function addItem(branchModel) {
    this.items.push(branchModel);
};

BranchCollection.prototype.getBranchStatusAndTitlesForCollection = function getBranchStatusAndTitlesForCollection(gitModel) {
    const apiRoot = gitModel.apiUrl();
    const issueBranchList = this._findIssueBranchList();

    for (let i = 0; i < issueBranchList.length; i++) {
        const item = issueBranchList[i];

        console.log('+++', `${apiRoot}/issues/${item.issueNumber}`);
    }
};

BranchCollection.prototype.displayBranchTable = function displayBranchTable() {
    console.log(chalk.green('[3/3] Operation complete!'));
};

BranchCollection.prototype._extractBranchListFromStr = function _extractBranchListFromStr(str) {
    const branchList = str.split(NEWLINE_CHARACTER);
    const trimmedBranchList = branchList.reduce((sum, branch) => {
        if (branch !== '') {
            sum.push(branch.replace(WHITESPACE_REGEX, ''));
        }

        return sum;
    }, []);

    return trimmedBranchList;
};

BranchCollection.prototype._findIssueBranchList = function _findIssueBranchList() {
    const issueBranchList = this.items.filter(branchModel => branchModel.isIssueBranch());

    return issueBranchList;
};

module.exports = BranchCollection;
