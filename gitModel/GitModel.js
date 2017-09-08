const LINE_BREAK_REGEX = /(\r\n|\n|\r)/gm;
const OWNER_INDEX = 1;
const REPO_INDEX = 2;

function GitModel(rawUrlStr) {
    return this._init(rawUrlStr);
}

GitModel.prototype._init = function _init(rawUrlStr) {
    const urlSegments = this.fromRemoteUrl(rawUrlStr);

    this.owner = urlSegments[OWNER_INDEX];
    this.repo = urlSegments[REPO_INDEX];

    return this;
}

GitModel.prototype.fromRemoteUrl = function fromRemoteUrl(url) {
    const urlSansProtocol = url.split('https://')[1];
    const urlWithoutLineBreaks = urlSansProtocol.replace(LINE_BREAK_REGEX, '');
    const urlChunks = urlWithoutLineBreaks.split('/');

    return urlChunks;
}

GitModel.prototype.buildApiUrl = function buildApiUrl() {
    return `https://api.github.com/repos/${this.owner}/${this.repo}`;
}

module.exports = GitModel;
