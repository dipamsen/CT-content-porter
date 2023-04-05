import dotenv from "dotenv";
dotenv.config();
import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({
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

export async function getFiles({ owner, repo, glob, auth }) {
  const octokit = new Octokit({ auth });
  const {
    repository: {
      defaultBranchRef: {
        target: {
          history: {
            nodes: [{ tree }],
          },
        },
      },
    },
  } = await octokit.graphql(`{
    repository(owner: "${owner}", name: "${repo}") {
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 1 until: "${new Date().toISOString()}") {
              nodes {
                tree {
                  entries {
                    name
                    object {
                      ... on Tree {
                        entries {
                          name
                          object{
                            ...on Tree{
                              entries{
                                name
                                object{
                                  ...on Tree{
                                    entries{
                                      name
                                      object{
                                        ...on Tree{
                                          entries{
                                            name
                                          }                                  
                                        }
                                      }
                                    }                                  
                                  }
                                }
                              }   
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`);
  return tree.entries;
}
