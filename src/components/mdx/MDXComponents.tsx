/* eslint-disable import/prefer-default-export */

import type { MDXComponents } from "mdx/types";
import Image from "../Image";
import CustomLink from "./Link";
import TableWrapper from "./TableWrapper";
import Pre from "./ui/Pre";
import TOCInline from "./ui/TOCInline";
import BlogNewsletterForm from "./ui/BlogNewsletterForm";
import { Dashed } from "../landing-page/Dashed";
import { TLDR } from "../TLDR";
import { Video } from "../landing-page/Video";
import { ContentStack } from "../ContentStack";
import { H2, H3, H4 } from "../common/Headings";

export const components: MDXComponents = {
  H2,
  H3,
  H4,
  ContentStack,
  Video,
  TLDR,
  Dashed,
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
};
