export type NewVideo = {
  title: string;
  description: string;
  videoNumber: string;
  videoId: string;
  nebulaSlug: string;
  canonicalTrack: string;
  date: string;
  languages: string[];
  topics: string[];
  canContribute: boolean;
  relatedChallenges: string[];
  timestamps: {
    time: string;
    title: string;
  }[];
  parts: {
    title: string;
    videoId: string;
    nebulaSlug: string;
    timestamps: {
      time: string;
      title: string;
    }[];
  }[];
  codeExamples: {
    title: string;
    description: string;
    image: string;
    urls: {
      p5: string;
      processing: string;
      node: string;
      other: string;
    };
  }[];
  groupLinks: {
    title: string;
    links: {
      title: string;
      url: string;
      icon: string;
      description: string;
    }[];
  }[];
  credits: {
    title: string;
    name: string;
    url: string;
  }[];
};

export type OldVideo = {
  title: string;
  video_number: number;
  date: Date;
  video_id: string;
  web_editor: string;
  can_contribute: boolean;
  topics: string[];
  links: {
    title: string;
    url: string;
  }[];
  videos: {
    title: string;
    video_id: string;
  }[];
  contributions: {
    title: string;
    author: {
      name: string;
      url: string;
    };
    url: string;
  }[];
};
