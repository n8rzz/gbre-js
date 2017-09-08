const GitModel = require('../gitModel/GitModel');

function BranchCollection() {
    return this._init();
}

BranchCollection.prototype._init = function _init() {
    return this;
}

BranchCollection.prototype.initGitModel = function initGitModel(rawUrlStr) {
    this.gitModel = new GitModel(rawUrlStr);
}

module.exports = BranchCollection;
