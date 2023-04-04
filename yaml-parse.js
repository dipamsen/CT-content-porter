import yaml from "front-matter";

export function parseYaml(yamlString) {
  const { attributes, body } = yaml(yamlString);
  return { attributes, body };
}
