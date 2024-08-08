/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { makeSource } from "contentlayer/source-files";
import { writeFileSync } from "fs";
import path from "path";
// Remark packages
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFootnotes from "remark-footnotes";
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from "pliny/mdx-plugins/index.js";
// Rehype packages
import rehypeSlug from "rehype-slug"; // h1-h6 标签添加 id
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";
import {
  allCoreContent,
  MDXDocumentDate,
  sortPosts,
} from "pliny/utils/contentlayer.js";
import rehypePrettyCode from "rehype-pretty-code";

import { Authors, Doc, Post } from "./src/contentlayer";

import siteMetadata from "./data/siteMetadata";

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allPosts: any[]) {
  const tagCount: Record<string, number> = {};
  allPosts.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag: any) => {
        const formattedTag = tag;
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });
  writeFileSync("./data/tag-data.json", JSON.stringify(tagCount));
}

function createSearchIndex(allPosts: MDXDocumentDate[]) {
  if (
    siteMetadata?.search?.provider === "kbar" &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allPosts)))
    );
    console.log("Local search index generated...");
  }
}

const root = process.cwd();

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Authors, Doc],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext";
      return options;
    },
    cwd: process.cwd(),
    remarkPlugins: [
      // remarkExtractFrontmatter,
      remarkGfm,
      // remarkCodeTitles,
      [remarkFootnotes, { inlineNotes: true }],
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      // @ts-ignore
      [rehypeCitation, { path: path.join(root, "data"), linkCitations: true }],
      // highlight,
      // [rehypePrettyCode, rehypePrettyCodeOptions],
      // [rehypePrettyCodeClasses],
      [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
      // @ts-ignore
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allPosts } = await importData();
    createTagCount(allPosts);
    createSearchIndex(allPosts);
  },
});
