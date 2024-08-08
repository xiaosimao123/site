import { ReactNode } from "react";
import { formatDate } from "pliny/utils/formatDate";
import { CoreContent } from "pliny/utils/contentlayer";
import type { Post } from "contentlayer/generated";
import Comments from "@/components/Comments";
import Link from "@/components/mdx/Link";
import PageTitle from "@/components/PageTitle";
import SectionContainer from "@/components/SectionContainer";
import siteMetadata from "@/data/siteMetadata";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import { BlogHeader } from "@/components/blog/BlogHeader";

interface LayoutProps {
  content: CoreContent<Blog>;
  children: ReactNode;
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
}

export default function PostLayout({
  content,
  next,
  prev,
  children,
}: LayoutProps) {
  const { slug, date, title } = content;

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 md:px-8 md:py-16 lg:px-0">
      <ScrollTopAndComment />
      <BlogHeader post={content} />
      <article>
        {/* <header className="pt-6 xl:pb-6">
          <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
            <dl>
              <div>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time dateTime={date}>
                    {formatDate(date, siteMetadata.locale)}
                  </time>
                </dd>
              </div>
            </dl>
            <div>
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
        </header> */}
        <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0 dark:divide-gray-700">
          <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
            <div
              className="prose  blog 
            prose-lg dark:prose-invert mx-auto  mb-4 w-full   max-w-none shrink p-4 pb-8 pt-10
            md:mb-8 md:px-8 lg:mx-0 lg:max-w-full lg:px-16"
            >
              {children}
            </div>
          </div>
          {siteMetadata.comments && (
            <div
              className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
              id="comment"
            >
              <Comments />
            </div>
          )}
          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && prev.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${prev.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && next.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${next.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
}
