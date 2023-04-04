// does not support multipart

export const video = {
  name: "video",
  init: {
    type: "object",
    properties: {
      title: { isRequired: true, type: "string" },
      description: { isRequired: true, type: "string" },
      videoNumber: { type: "string" },
      videoId: { isRequired: true, type: "string" },
      nebulaSlug: { isRequired: false, type: "string" },
      canonicalTrack: { type: "string" },
      date: {
        isRequired: true,
        type: "string",
      },
      languages: { type: "array", content: { type: "string" } },
      topics: { type: "array", content: { type: "string" } },
      canContribute: { type: "boolean" },
      relatedChallenges: { type: "array", content: { type: "string" } },
      timestamps: {
        type: "array",
        content: {
          type: "object",
          properties: {
            time: { isRequired: true, type: "string" },
            title: { isRequired: true, type: "string" },
          },
        },
      },
      codeExamples: {
        type: "array",
        content: {
          type: "object",
          properties: {
            title: { isRequired: true, type: "string" },
            description: { type: "string" },
            image: { type: "string" },
            urls: {
              isRequired: true,
              type: "object",
              properties: {
                p5: { type: "string" },
                processing: { type: "string" },
                node: { type: "string" },
                other: { type: "string" },
              },
            },
          },
        },
      },
      groupLinks: {
        type: "array",
        content: {
          type: "object",
          properties: {
            title: { isRequired: true, type: "string" },
            links: {
              isRequired: true,
              type: "array",
              content: {
                type: "object",
                properties: {
                  title: { isRequired: true, type: "string" },
                  url: { isRequired: true, type: "string" },
                  icon: { type: "string" },
                  description: { type: "string" },
                },
              },
            },
          },
        },
      },
      credits: {
        type: "array",
        content: {
          type: "object",
          properties: {
            title: { isRequired: true, type: "string" },
            name: { isRequired: true, type: "string" },
            url: { type: "string" },
          },
        },
      },
    },
  },
};

export const oldVideo = {
  title: {
    type: "string",
  },
  video_number: {
    type: "number",
  },
  date: {
    type: "date",
  },
  video_id: {
    type: "string",
  },
  web_editor: {
    type: "string",
  },
  can_contribute: {
    type: "boolean",
  },
  topics: {
    type: "array",
    content: {
      type: "string",
    },
  },
  links: {
    type: "array",
    content: {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
        url: {
          type: "string",
        },
      },
    },
  },
  videos: {
    type: "array",
    content: {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
        video_id: {
          type: "string",
        },
      },
    },
  },
  contributions: {
    type: "array",
    content: {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
        author: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            url: {
              type: "string",
            },
          },
        },
        url: {
          type: "string",
        },
      },
    },
  },
};
