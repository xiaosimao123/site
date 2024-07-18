import Link from "@/components/Link";
import Tag from "@/components/Tag";
import type { Blog } from "contentlayer/generated";
import siteMetadata from "@/data/siteMetadata";
import { formatDate } from "pliny/utils/formatDate";

type PostPreviewProps = {
  post: Blog;
};

const PostPreview = ({ post }: PostPreviewProps) => {
  const { path, date, title, summary, tags, readingTime } = post;
  return (
    <li key={path} className="py-4">
      <article className="w-full  space-y-2   xl:space-y-0">
        {/* <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
          </dd>
        </dl> */}
        <div className="space-y-3 xl:col-span-3">
          <div>
            <h3 className="text-2xl font-bold leading-8 tracking-tight">
              <Link
                href={`/${path}`}
                className="text-gray-900 dark:text-gray-100"
              >
                {title}
              </Link>
            </h3>
            {/* <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>  
          </dd>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
           {Math.ceil(readingTime.minutes)+ "分钟"}
          </dd>
        
        </dl> */}

            <div className="flex my-1 gap-2 text-sm leading-snug text-muted-foreground">
              <div className="flex items-center gap-1">
                {/* <CalendarDays size={16} /> */}
                <time dateTime={date}>
                  {formatDate(date, siteMetadata.locale)}
                </time>
              </div>
              <span className="opacity-50">|</span>
              <div className="flex items-center gap-1">
                {/* <Timer size={16} /> */}
                <span>{`${Math.ceil(readingTime.minutes)} mins read`}</span>
              </div>
            </div>
            <div className="flex flex-wrap">
              {tags?.map((tag) => <Tag key={tag} text={tag} />)}
            </div>
          </div>
          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
            {summary}
          </div>
        </div>
      </article>
    </li>
  );
};

export default PostPreview;
