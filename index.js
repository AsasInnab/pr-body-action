const core = require("@actions/core");
const github = require("@actions/github");

try {
  const { context } = github;
  const githubToken = core.getInput("GITHUB_TOKEN");
  const body = core.getInput("body");
  const providedPrNumber = core.getInput("pr_number");

  if (context.payload.pull_request == null) {
    core.setFailed("No pull request found");
  }
  if (!githubToken) {
    core.setFailed("GITHUB_TOKEN input is required");
  }
  if (!body) {
    core.setFailed("body input is required");
  }

  const { number: currentPrNumber } = context.payload.pull_request;
  const prNumber = providedPrNumber || currentPrNumber;

  const octokit = new github.GitHub(githubToken);
  octokit.pulls.update({
    ...context.repo,
    pull_number: prNumber,
    body,
  });
} catch (error) {
  core.setFailed(error.message);
}
