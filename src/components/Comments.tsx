// "use client";

// import { Comments as CommentsComponent } from "pliny/comments";
// import { useState } from "react";
// import siteMetadata from "@/data/siteMetadata";

// export default function Comments({ slug }: { slug: string }) {
//   const [loadComments, setLoadComments] = useState(false);
//   return (
//     <>
//       {!loadComments && (
//         <button onClick={() => setLoadComments(true)}>Load Comments</button>
//       )}
//       {siteMetadata.comments && loadComments && (
//         <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
//       )}
//     </>
//   );
// }

"use client";
import siteMetadata from "@/data/siteMetadata";
import Giscus from "@giscus/react";

const Comments = () => {
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
};

export default Comments;
