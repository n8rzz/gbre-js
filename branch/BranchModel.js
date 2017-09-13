const IS_LOCAL_CHECKOUT_SYMBOL = '*';
const NAME_ISSUE_SEPARATOR = '/';
const NAME_INDEX = 0;
const ISSUE_NUMBER_INDEX = 1;
const NON_ISSUE_BRANCH_NAME_LIST = [
    'master',
    'develop',
    'release',
    'staging'
];
const ISSUE_STATUS = {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED'
};

function BranchModel(branchProps) {
    return this._init(branchProps);
};

BranchModel.prototype._init = function _init(branchProps) {
    this.isLocalCheckout = false;
    this.name = '';
    this.issueNumber = -1;
    this.issueTitle = '';
    this.issueStatus = '';

    return this._fromStr(branchProps);
};

BranchModel.prototype._fromStr = function _fromStr(str) {
    const { name, issueNumber } = this._extractBranchChunks(str);

    this.isLocalCheckout = this._hasLocalCheckoutSymbol(str);
    this.name = name;
    this.issueNumber = issueNumber;
};

BranchModel.prototype._extractBranchChunks = function _extractBranchChunks(branchStr) {
    const branchName = branchStr.replace(IS_LOCAL_CHECKOUT_SYMBOL, '');
    const nameIssueChunks = branchName.split(NAME_ISSUE_SEPARATOR);
    let issueNumber = -1;

    if (this._hasIssueNumber(branchName) && !this._isNamedBranch(nameIssueChunks[0])) {
        issueNumber = nameIssueChunks[ISSUE_NUMBER_INDEX];
    }

    return {
        issueNumber,
        name: branchName
    };
};

BranchModel.prototype.isIssueBranch = function isIssueBranch() {
    return this.issueNumber !== -1;
};

BranchModel.prototype._hasIssueNumber = function _hasIssueNumber(branchStr) {
    return branchStr.indexOf(NAME_ISSUE_SEPARATOR) !== -1;
};

BranchModel.prototype._hasLocalCheckoutSymbol = function _hasLocalCheckoutSymbol(branchStr) {
    return branchStr.indexOf(IS_LOCAL_CHECKOUT_SYMBOL) !== -1;
};

BranchModel.prototype._isNamedBranch = function _isNamedBranch(branchName) {
    return NON_ISSUE_BRANCH_NAME_LIST.indexOf(branchName) !== -1;
}

module.exports = BranchModel;
