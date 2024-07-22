import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";
import { components } from "../MDXComponents";

export interface MDXLayoutRenderer {
  code: string;
  components?: MDXComponents;
  [key: string]: unknown;
}

export function MDXLayoutRenderer({
  code,
  components,
  ...rest
}: MDXLayoutRenderer) {
  const Mdx = useMDXComponent(code);

  return <Mdx components={components} {...rest} />;
}
