import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { components } from "../MDXComponents";
import type { MDXComponents } from "mdx/types";

export interface MDXLayoutRenderer {
  code: string;
  components?: MDXComponents;
  [key: string]: unknown;
}

export const MDXLayoutRenderer = ({
  code,
  components,
  ...rest
}: MDXLayoutRenderer) => {
  const Mdx = useMDXComponent(code);

  return <Mdx components={components} {...rest} />;
};
