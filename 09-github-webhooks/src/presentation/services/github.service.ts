import { GithubIssuePayload, GithubStarPayload } from "../../interfaces";

export class GitHubService {
  constructor() {}

  onStart(payload: GithubStarPayload) {
    const { starred_at, action, sender, repository } = payload;

    return `${sender.login} ${action} start on ${repository.full_name} at ${starred_at}`;
  }

  onIssues(payload: GithubIssuePayload) {
    const { action, issue, repository, sender } = payload;

    if (action === "opened") {
      return `${sender.login} ${action} issue: "${issue.title}" on ${repository.full_name}`;
    }

    if (action === "closed") {
      return `${sender.login} ${action} issue: "${issue.title}" on ${repository.full_name}`;
    }

    if (action === "reopened") {
      return `${sender.login} ${action} issue: "${issue.title}" on ${repository.full_name}`;
    }

    return `Action ${action} is not supported`;
  }
}
