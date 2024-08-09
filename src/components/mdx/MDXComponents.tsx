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
import { Support } from "../landing-page/Support";
import { Playground } from "../landing-page/Playground";
import { Callout } from "../common/Callout";
import { DocsCard as Card } from "../docs/DocsCard";
import { ChevronLink } from "../common/ChevronLink";
import {
  OptionDescription,
  OptionsTable,
  OptionTitle,
} from "../docs/OptionsTable";
import { Button } from "../common/Button";
import { BulletList, BulletListItem } from "./ui/BulletList";
import { DataTransformation } from "../landing-page/DataTransformation";
import { localStep2DataTransformation } from "../landing-page/HowItWorks";
import RefSubLayout from "../common/layouts/ref/RefSubLayout";
import StepHikeCompact from "../common/StepHikeCompact";

interface CodeHeaderProps {
  text: string;
}
export function CodeHeader({ text }: CodeHeaderProps) {
  return (
    <div className="rounded-t-md bg-zinc-200 px-4 py-2 font-mono text-sm text-neutral-700 dark:bg-zinc-700 dark:text-neutral-300">
      {text}
    </div>
  );
}
const Transform: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`mx-auto ${className}`}>
    <DataTransformation
      from={localStep2DataTransformation.from}
      to={localStep2DataTransformation.to}
    />
  </div>
);
export const mdxComponents: MDXComponents = {
  h2: H2,
  h3: H3,
  h4: H4,
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
  Support,
  Playground,
  Callout,
  ChevronLink,
  Card,
  OptionsTable,
  OptionTitle,
  OptionDescription,
  Button,
  BulletList,
  BulletListItem,
  Transform,
  CodeHeader,

  RefSubLayout,

  StepHikeCompact,
};
