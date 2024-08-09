/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import {
  ComputedFields,
  defineDocumentType,
  defineNestedType,
} from "contentlayer/source-files";
import readingTime from "reading-time";
import { extractTocHeadings } from "pliny/mdx-plugins/index.js";
import siteMetadata from "../../../data/siteMetadata";

const RelatedPost = defineNestedType(() => ({
  name: "RelatedPost",
  fields: {
    slug: { type: "string", required: true },
  },
}));
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

export const Post = defineDocumentType(() => ({
  name: "Post",
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
    url: { type: "string" },
    related_posts: {
      type: "list",
      of: RelatedPost,
      required: false,
    },
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
          doc._raw.flattenedPath.replace(/^.+?(\/)/, "")
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
