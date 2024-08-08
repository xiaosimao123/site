"use client";

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-loop-func */
import notFound from "@/app/not-found";
import { Label } from "@/components/common/Label";
import { DocsFooter } from "@/components/docs/DocsFooter";
import { DocsHeader } from "@/components/docs/DocsHeader";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { buildDocsTree } from "@/lib/utils/build-docs-tree";
import { allDocs } from "contentlayer/generated";
import { useLiveReload, useMDXComponent } from "next-contentlayer/hooks";
import { Card as ChildCard } from "@/components/common/Card";
import { usePathname } from "next/navigation";
import { PageNavigation } from "@/components/common/PageNavigation";
import { DocsNavigation } from "@/components/docs/DocsNavigation";
import { useColorScheme } from "@/components/ColorSchemeContext";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string[] } }) {
  const router = usePathname();

  const pagePath = params.slug?.join("/") ?? "";
  let doc;
  if (pagePath === "") {
    doc = allDocs.find((_) => _.url_path === "/docs");
  } else {
    doc = allDocs.find(
      (p) => p.url_path_without_id === `/docs/${params.slug?.join("/")}`
    );
  }
  // const doc = allDocs.find((p) => p.url_path_without_id === `/docs/${params.slug?.join('/')}`)
  // 404 if the post does not exist.
  if (!doc) return notFound();

  const slugs = params.slug ? ["docs", ...params.slug] : [];
  let path = "";
  const breadcrumbs: any = [];
  for (const slug of slugs) {
    path += `/${slug}`;
    const breadcrumbDoc = allDocs.find(
      (_) => _.url_path === path || _.url_path_without_id === path
    );
    if (!breadcrumbDoc) continue;
    breadcrumbs.push({
      path: breadcrumbDoc.url_path,
      title: breadcrumbDoc?.nav_title || breadcrumbDoc?.title,
    });
  }
  const tree = buildDocsTree(allDocs);
  const childrenTree = buildDocsTree(
    allDocs,
    doc.pathSegments.map((_: PathSegment) => _.pathName)
  );
  const MDXContent = useMDXComponent(doc.body.code || "");
  return (
    <div className="relative mx-auto w-full max-w-screen-2xl lg:flex lg:items-start">
      <div
        style={{ height: "calc(100vh - 64px)" }}
        className="sticky top-16 hidden shrink-0 border-r border-gray-200 lg:block dark:border-gray-800"
      >
        <div className="-ml-3 h-full overflow-y-scroll p-8 pl-16">
          <DocsNavigation tree={tree} />
        </div>
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
      </div>
      <div className="relative w-full grow">
        <DocsHeader tree={tree} breadcrumbs={breadcrumbs} title={doc.title} />
        <div className="prose docs prose-slate prose-violet prose-headings:font-semibold prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-gray-200 dark:prose-invert dark:prose-a:text-violet-400 dark:prose-hr:border-gray-800 mx-auto mb-4 w-full max-w-3xl shrink p-4 pb-8 md:mb-8 md:px-8 lg:mx-0 lg:max-w-full lg:px-16">
          {MDXContent && <MDXContent components={mdxComponents as any} />}
          {doc.show_child_cards && (
            <>
              <hr />
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                {childrenTree.map((card: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => router.push(card.urlPath)}
                    className="cursor-pointer"
                  >
                    <ChildCard className="h-full p-6 py-4 hover:border-violet-100 hover:bg-violet-50 dark:hover:border-violet-900/50 dark:hover:bg-violet-900/20">
                      <h3 className="mt-0 no-underline">{card.title}</h3>
                      {card.label && <Label text={card.label} />}
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        <p>{card.excerpt}</p>
                      </div>
                    </ChildCard>
                  </div>
                ))}
              </div>
            </>
          )}
          <DocsFooter doc={doc} />
        </div>
      </div>
      <div
        style={{ maxHeight: "calc(100vh - 128px)" }}
        className="1.5xl:block sticky top-32 hidden w-80 shrink-0 overflow-y-scroll p-8 pr-16"
      >
        <PageNavigation headings={doc.headings} />
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
      </div>
    </div>
  );
}
