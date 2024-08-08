"use client";

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import { Post } from "contentlayer/generated";
import { FC } from "react";
import Link from "next/link";
import { Icon } from "src/components/common/Icon";
import { format } from "date-fns";

export const BlogDetails: FC<{ post: Post; className?: string }> = ({
  post,
  className,
}) => {
  return (
    <div className={`flex space-x-6 text-sm ${className}`}>
      <p className="mb-2 flex">
        <span className="mr-2 mt-1 block w-3 shrink-0 text-violet-600 dark:text-violet-400">
          <Icon name="calendar" />
        </span>
        <span>{format(new Date(post.date), "MMMM dd, yyyy")}</span>
      </p>
      <p className="flex">
        <span className="mr-2 mt-1 block w-3 shrink-0 text-violet-600 dark:text-violet-400">
          <Icon name="users" />
        </span>
      </p>
    </div>
  );
};
