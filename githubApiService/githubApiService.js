// githubApiService

function githubApiService() {
    getIssue: function getIssue(issueNumber) {
        console.log(`githubApiService.getIssue( ${issueNumber} )`)
    }
};

module.exports = githubApiService;
