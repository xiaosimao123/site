/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable consistent-return */
// import "@/css/prism.css";

import { allPosts, allAuthors } from "contentlayer/generated";
import type { Authors, Post } from "contentlayer/generated";
import PostSimple from "@/layouts/PostSimple";
import PostLayout from "@/layouts/PostLayout";
import PostBanner from "@/layouts/PostBanner";
import { Metadata } from "next";
import siteMetadata from "@/data/siteMetadata";
import { MDXRenderer } from "@/components/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import {
  coreContent,
  sortPosts,
  allCoreContent,
} from "@/components/mdx/utils/contentlayer";
import { useEffect, useMemo, useState } from "react";

import { promiseAllProperties } from "@/lib/utils/object";
import {
  CodeSnippets,
  codeSnippets,
} from "@/lib/utils/blog/beta-post-snippets";
// import { htmlForCodeSnippets, PreprocessedCodeSnippets } from "@/app/page";
import { CodeWindow } from "@/components/landing-page/CodeWindow";
import { useColorScheme } from "@/components/ColorSchemeContext";
import { notFound } from "next/navigation";
import Code from "@/components/mdx/ui/Code";
import {
  ColorScheme,
  snippetToHtml,
} from "@/components/mdx/ui/syntax-highlighting";
import { useLiveReload } from "next-contentlayer/hooks";
import SectionContainer from "@/components/SectionContainer";

const defaultLayout = "PostSimple";
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join("/"));
  const post = allPosts.find((p) => p.slug === slug);
  const authorList = post?.authors || ["default"];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    return coreContent(authorResults as Authors);
  });
  if (!post) {
    return;
  }

  const publishedAt = new Date(post.date).toISOString();
  const modifiedAt = new Date(post.lastmod || post.date).toISOString();
  const authors = authorDetails.map((author) => author.name);
  let imageList = [siteMetadata.socialBanner];
  if (post.images) {
    imageList = typeof post.images === "string" ? [post.images] : post.images;
  }
  const ogImages = imageList.map((img) => ({
    url: img.includes("http") ? img : siteMetadata.siteUrl + img,
  }));

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: "./",
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  };
}

export const generateStaticParams = async () => {
  const paths = allPosts.map((p) => ({ slug: p.slug.split("/") }));

  return paths;
};

export type PreprocessedCodeSnippetsRemark = Record<ColorScheme, CodeSnippets>;

type BetaSnippets = {
  remark: PreprocessedCodeSnippetsRemark;
  contentlayer: PreprocessedCodeSnippets;
};

// const devcache_betaSnippets: BetaSnippets | null = null

export default async function Page({ params }: { params: { slug: string[] } }) {
  // useLiveReload()
  const slug = decodeURI(params.slug.join("/"));
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allPosts));
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug);
  if (postIndex === -1) {
    return notFound();
  }

  const prev = sortedCoreContents[postIndex + 1];
  const next = sortedCoreContents[postIndex - 1];
  const post = allPosts.find((p) => p.slug === slug) as Post;
  const authorList = post?.authors || ["default"];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    return coreContent(authorResults as Authors);
  });
  const mainContent = coreContent(post);
  const jsonLd = post.structuredData;
  jsonLd.author = authorDetails.map((author) => ({
    "@type": "Person",
    name: author.name,
  }));
  // const Layout = layouts["PostBanner"];
  const Layout = layouts[post.layout || defaultLayout];

  // const preferredColorScheme = useColorScheme()
  // const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light')

  // useEffect(() => {
  //   if (preferredColorScheme === 'system') {
  //     setColorScheme(
  //       window.matchMedia &&
  //         window.matchMedia('(prefers-color-scheme: dark)').matches
  //         ? 'dark'
  //         : 'light'
  //     )
  //   } else {
  //     setColorScheme(preferredColorScheme)
  //   }
  // }, [preferredColorScheme])
  // const devcache_betaSnippets: BetaSnippets | null = null
  // const betaSnippets: BetaSnippets | null = devcache_betaSnippets

  const betaSnippets = await promiseAllProperties({
    remark: promiseAllProperties<PreprocessedCodeSnippetsRemark>({
      light: htmlForCodeSnippetsRemark("light"),
      dark: htmlForCodeSnippetsRemark("dark"),
    }),
  });

  // devcache_betaSnippets = betaSnippets
  // }
  const BetaCodeWindow = {
    Remark: () => <CodeWindow snippets={betaSnippets.remark.dark} />,
  };

  // const BetaCodeWindow = useMemo(
  //   () => {
  //     ;() => {
  //       betaSnippets
  //     }
  //   },
  //   // betaSnippets
  //   //   ? {
  //   //       Remark: () => <CodeWindow snippets={betaSnippets.remark.light} />,
  //   //       ContentlayerConfig: () => (
  //   //         <CodeWindow
  //   //           snippets={betaSnippets.contentlayer.light.howItWorksStep1}
  //   //         />
  //   //       ),
  //   //       ContentlayerNext: () => (
  //   //         <CodeWindow
  //   //           snippets={betaSnippets.contentlayer.light.howItWorksStep3}
  //   //         />
  //   //       ),
  //   //     }
  //   //   : ({} as any),
  //   [betaSnippets, 'light']
  // )

  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}
      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        next={next}
        prev={prev}
      >
        <MDXRenderer
          components={{ ...mdxComponents, BetaCodeWindow }}
          code={post.body.code}
          toc={post.toc}
        />

        {/* <MDXLayoutRenderer
          code={post.body.code}
          components={components}
          toc={post.toc}
        /> */}
      </Layout>
    </>
  );
}

const htmlForCodeSnippetsRemark = (
  colorScheme: ColorScheme
): Promise<CodeSnippets> =>
  Promise.all(
    codeSnippets.map(({ content, file, lines }) =>
      snippetToHtml(content, colorScheme).then((_) => ({
        file,
        lines,
        content: _,
      }))
    )
  ) as any; // TODO: fix type
