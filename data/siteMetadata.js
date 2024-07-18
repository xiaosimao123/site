/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: "Quasilinear Musings",
  author: "Timothy Lin",
  headerTitle: "Quasilinear Musings",
  description: "Thoughts from a wandering mind",
  language: "en-us",
  siteUrl: "https://www.timlrx.com",
  siteRepo: "https://github.com/xiaosimao123/site",
  image: "/static/images/avatar.png",
  socialBanner: "/static/images/twitter-card.png",
  email: "timothy.lin@alumni.ubc.ca",
  github: "https://github.com/timlrx",
  twitter: "https://twitter.com/timlrxx",
  linkedin: "https://www.linkedin.com/in/timlrx",
  locale: "en-US",
  analytics: {
    googleAnalytics: {
      googleAnalyticsId: "UA-100201704-1", // e.g. G-XXXXXXX
    },
  },
  newsletter: {
    // Please add your .env file and modify it according to your selection
    provider: "emailoctopus",
  },
  comment: {
    provider: "giscus", // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, enter your repo in the configuration section and copy the script data parameters
      // Before that you should create a new Github discussions category with the Announcements type so that new discussions can only be created by maintainers and giscus
      // https://giscus.app/

      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: "title", // supported options: pathname, url, title
      reactions: "1", // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: "0",
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: "light",
      // theme when dark mode
      darkTheme: "transparent_dark",
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: "",
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: "en",
    },
    utterancesConfig: {
      repo: "", // username/repoName
      issueTerm: "", // supported options: pathname, url, title
      label: "", // label (optional): Comment 💬
      // theme example: github-light, github-dark, preferred-color-scheme
      // github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light
      theme: "",
      // theme when dark mode
      darkTheme: "",
    },
    disqus: {
      // https://help.disqus.com/en/articles/1717111-what-s-a-shortname
      shortname: "",
    },
  },
  search: {
    provider: "kbar", // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: "search.json", // path to load documents to search
    },
  },
};

module.exports = siteMetadata;
