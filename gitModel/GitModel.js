const LINE_BREAK_REGEX = /(\r\n|\n|\r)/gm;
const OWNER_INDEX = 1;
const REPO_INDEX = 2;

function GitModel() {
    return this._init();
}

GitModel.prototype._init = function _init() {
    this.owner = '';
    this.repo = '';

    return this;
};

GitModel.prototype.init = function init(rawUrlStr) {
    const urlSegments = this.fromRemoteUrl(rawUrlStr);
    const repoNameWithoutExtension = urlSegments[REPO_INDEX].split('.git')[0];

    this.owner = urlSegments[OWNER_INDEX];
    this.repo = repoNameWithoutExtension;

    return this;
}

GitModel.prototype.fromRemoteUrl = function fromRemoteUrl(url) {
    const urlSansProtocol = url.split('https://')[1];
    const urlWithoutLineBreaks = urlSansProtocol.replace(LINE_BREAK_REGEX, '');
    const urlChunks = urlWithoutLineBreaks.split('/');

    return urlChunks;
}

GitModel.prototype.apiUrl = function apiUrl() {
    return `https://api.github.com/repos/${this.owner}/${this.repo}`;
}

module.exports = GitModel;
