/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import {
  defineDocumentType,
  ComputedFields,
  makeSource,
} from "contentlayer/source-files";
import { writeFileSync } from "fs";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
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
// import rehypeShikiji from "rehype-shikiji";

import highlight from "rehype-highlight";
import {
  rehypePrettyCodeClasses,
  rehypePrettyCodeOptions,
} from "./src/lib/rehyePrettyCode";
import siteMetadata from "./data/siteMetadata";

const rehypeoptions = {
  // themes: ['one-dark-pro', 'one-light-pro'],
  // theme: 'one-dark-pro', // 'github-dark-dimmed' is default
  defaultLang: "tsx",
  // theme: {
  //   dark: 'one-light-pro',
  //   light: 'github-light',
  // },
  theme: "one-dark-pro",
  // themes: {
  //   light: 'one-light-pro',
  //   dark: 'one-dark-pro',

  //   // any number of themes
  // },
  // onVisitLine(node) {
  //   if (node.children.length === 0) {
  //     // if code block has a empty line, add a space instead of keeping it blank
  //     node.children = [{ type: 'text', value: ' ' }]
  //   }
  // },
  // onVisitHighlightedLine(node) {
  //   const nodeClass = node.properties.className
  //   console.log('Highlighted Line', { node })
  //   if (nodeClass && nodeClass.length > 0) {
  //     node.properties.className.push('line--highlighted')
  //   } else {
  //     node.properties.className = ['line--highlighted']
  //   }
  // },
  // onVisitHighlightedWord(node) {
  //   node.properties.className = ['word--highlighted']
};

const root = process.cwd();

/**
 * Remove yyyy-mm-dd and extension in file path to generate slug
 */
function formatSlug(slug: string) {
  const regex = /(\d{4})-(\d{2})-(\d{2})-/g;
  return slug.replace(regex, "");
}

const computedFields: ComputedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: "string",
    resolve: (doc) =>
      formatSlug(doc._raw.flattenedPath.replace(/^.+?(\/)/, "")),
  },
  path: {
    type: "string",
    resolve: (doc) => formatSlug(doc._raw.flattenedPath),
  },
  filePath: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: "string", resolve: (doc) => extractTocHeadings(doc.body.raw) },
};

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allBlogs: any[]) {
  const tagCount: Record<string, number> = {};
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag: any) => {
        const formattedTag = GithubSlugger.slug(tag);
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

function createSearchIndex(allBlogs: MDXDocumentDate[]) {
  if (
    siteMetadata?.search?.provider === "kbar" &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs))),
    );
    console.log("Local search index generated...");
  }
}

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    lastmod: { type: "date" },
    draft: { type: "boolean" },
    summary: { type: "string" },
    images: { type: "json" },
    authors: { type: "list", of: { type: "string" } },
    layout: { type: "string" },
    bibliography: { type: "json" },
    canonicalUrl: { type: "string" },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${formatSlug(
          doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
        )}`,
      }),
    },
  },
}));

export const Authors = defineDocumentType(() => ({
  name: "Authors",
  filePathPattern: "authors/**/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string" },
    occupation: { type: "string" },
    company: { type: "string" },
    email: { type: "string" },
    twitter: { type: "string" },
    linkedin: { type: "string" },
    github: { type: "string" },
    layout: { type: "string" },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Blog, Authors],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext";
      return options;
    },
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
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
    const { allBlogs } = await importData();
    createTagCount(allBlogs);
    createSearchIndex(allBlogs);
  },
});
