import { video as videoTemplate } from "./template.js";
import inquirer from "inquirer";
import dotenv from "dotenv";
import util from "util";
import * as GitHub from "./GitHub.js";
import { parseYaml } from "./yaml-parse.js";
import { createResolver, snakeCase } from "./utils.js";

dotenv.config();

const { type } = await inquirer.prompt([
  {
    type: "list",
    name: "type",
    message:
      "Does this video have a page on the old site (https://codingtrain.github.io/website-archive/)?",
    choices: [
      { name: "The video exists on the old site", value: "old" },
      { name: "The video does not exist on the old site", value: "new" },
    ],
  },
]);
if (type === "old") {
  const { url: video } = await inquirer.prompt([
    {
      type: "input",
      name: "url",
      message: "Enter the url of the page on old site",
      validate(value) {
        try {
          const url = new URL(value);
          if (url.hostname === "codingtrain.github.io") {
            return true;
          } else {
            throw new Error("Please provide a url from the old site");
          }
        } catch (e) {
          return e.message;
        }
      },
    },
  ]);
  const url = new URL(video);
  const path = url.pathname
    .split("/")
    .slice(2)
    .join("/")
    .replace(".html", ".md");
  const yaml = await GitHub.getContents({
    owner: "CodingTrain",
    repo: "website-archive",
    path: "_" + path,
  });
  /** @type {{attributes: import("./types.js").OldVideo; body: string}} */
  const { attributes, body } = parseYaml(yaml);
  attributes.description = body;

  const resolverByName = createResolver({
    date: (value) => value.toISOString().split("T")[0],
    canContribute: () => true,
    description: (value) => value.trim(),
    languages: () => "JavaScript,p5.js",
    topics: () => "",
    videoNumber: (value) => value.toString(),
  });

  /** @type {import("./types").NewVideo} */
  const info = Object.fromEntries(
    Object.entries(videoTemplate.init.properties).map(([key, value]) => [
      key,
      resolverByName[key](attributes[snakeCase(key)], attributes),
    ])
  );

  // const info = await inquirer.prompt(
  //   Object.entries(videoTemplate.init.properties)
  //     .map(([key, value]) => {
  //       if (value.type === "array" && value.content.type === "object") {
  //         return;
  //       }

  //       return {
  //         type: "input",
  //         name: key,
  //         message: value.description,
  //         default: resolverByName[key](attributes[snakeCase(key)], attributes),
  //       };
  //     })
  //     .filter((x) => x)
  // );

  info.languages = info.languages.split(",").map((x) => x.trim());
  info.topics = info.topics.split(",").map((x) => x.trim());
  Object.keys(info).forEach((key) => {
    if (Array.isArray(info[key])) {
      info[key] = info[key].filter((x) => x);
    }
    if (info[key] === "") {
      delete info[key];
    }
  });
  info.timestamps = [];
  info.codeExamples = [];
  if (attributes.web_editor) {
    info.codeExamples.push({
      title: "Demonstration",
      description: info.title,
      image: "",
      urls: {
        p5:
          "https://editor.p5js.org/codingtrain/sketches/" +
          attributes.web_editor,
      },
    });
  }
  info.groupLinks = [
    {
      title: "Reference",
      links: [],
    },
    {
      title: "Videos",
      links: [],
    },
  ];
  if (attributes.links) {
    info.groupLinks.find((d) => d.title === "Reference").links =
      attributes.links.map((link) => {
        return {
          icon: "🔗",
          title: link.title,
          url: link.url,
          description: link.title,
        };
      });
  }
  info.credits = [
    { title: "Editing", name: "Mathieu Blanchette" },
    { title: "Animations", name: "Jason Heglund" },
  ];
  console.log();
  console.log(">>> index.json");
  console.log(JSON.stringify(info, null, 2));

  const contributions = attributes.contributions;
  contributions?.forEach((c, i) => {
    console.log();
    console.log(">>> contribution" + (i + 1) + ".json");
    console.log(JSON.stringify(c, null, 2));
  });

  // console.log(videoTemplate.init.properties);
} else if (type === "new") {
  const res = await inquirer.prompt([
    {
      type: "input",
      name: "url",
      message: "Enter the url of the video on youtube",
    },
  ]);
  console.log(res);
}
