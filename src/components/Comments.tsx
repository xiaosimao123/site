/* eslint-disable import/no-extraneous-dependencies */

"use client";

import siteMetadata from "@/data/siteMetadata";
import Giscus from "@giscus/react";

function Comments() {
  return (
    <Giscus
      repo={siteMetadata.comment.giscusConfig.repo}
      repoId={siteMetadata.comment.giscusConfig.repoId}
      category={siteMetadata.comment.giscusConfig.category}
      categoryId={siteMetadata.comment.giscusConfig.categoryId}
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
}

export default Comments;
