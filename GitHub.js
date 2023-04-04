import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getContents({ owner, repo, path }) {
  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path,
  });
  const content = data.content;
  const decodedContent = Buffer.from(content, "base64").toString("utf-8");
  return decodedContent;
}
