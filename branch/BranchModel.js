const IS_ACTIVE_BRANCH_SYMBOL = '*';
const NAME_ISSUE_SEPARATOR = '/';
const NAME_INDEX = 0;
const ISSUE_NUMBER_INDEX = 1;

function BranchModel(branchProps) {
    return this._init(branchProps);
};

BranchModel.prototype._init = function _init(branchProps) {
    this.name = '';
    this.issueNumber = -1;
    this.isActive = false;

    return this._fromStr(branchProps);
};

BranchModel.prototype._fromStr = function _fromStr(str) {
    const { name, issueNumber } = this._extractBranchChunks(str);

    this.isActive = this._hasActiveBranchSymbol(str);
    this.name = name;
    this.issueNumber = issueNumber;
};

BranchModel.prototype._extractBranchChunks = function _extractBranchChunks(branchStr) {
    let trimmedName = branchStr;
    let issueNumber = -1;

    if (this._hasActiveBranchSymbol(branchStr)) {
        trimmedName = branchStr.replace(IS_ACTIVE_BRANCH_SYMBOL, '');
    }

    if (this._hasIssueNumber(trimmedName)) {
        const nameIssueChunks = trimmedName.split(NAME_ISSUE_SEPARATOR);
        issueNumber = nameIssueChunks[ISSUE_NUMBER_INDEX];
    }

    return {
        issueNumber,
        name: trimmedName
    };
};

BranchModel.prototype._hasIssueNumber = function _hasIssueNumber(branchStr) {
    return branchStr.indexOf(NAME_ISSUE_SEPARATOR) !== -1;
};

BranchModel.prototype._hasActiveBranchSymbol = function _hasActiveBranchSymbol(branchStr) {
    return branchStr.indexOf(IS_ACTIVE_BRANCH_SYMBOL) !== -1;
};

module.exports = BranchModel;
