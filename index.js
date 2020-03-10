const core = require("@actions/core");
const github = require("@actions/github");

try {
  const { context } = github;
  const githubToken = core.getInput("GITHUB_TOKEN");
  const body = core.getInput("body");

  if (context.payload.pull_request == null) {
    core.setFailed("No pull request found");
    return;
  }
  if (!githubToken) {
    core.setFailed("GITHUB_TOKEN input is required");
    return;
  }
  if (!body) {
    core.setFailed("body input is required");
    return;
  }

  const { number: prNumber } = context.payload.pull_request;
  const octokit = new github.GitHub(githubToken);
  octokit.pulls.update({
    ...context.repo,
    pull_number: prNumber,
    body
  });
} catch (error) {
  core.setFailed(error.message);
}