const GitModel = require('../gitModel/GitModel');
const BranchModel = require('./BranchModel');

const WHITESPACE_REGEX = / /g;
const NEWLINE_CHARACTER = '\n';

function BranchCollection() {
    return this._init();
}

BranchCollection.prototype._init = function _init() {
    this.gitModel = null;
    this.items = [];

    return this;
};

BranchCollection.prototype.initGitModel = function initGitModel(rawUrlStr) {
    this.gitModel = new GitModel(rawUrlStr);
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

module.exports = BranchCollection;
