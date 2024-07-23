import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";

export interface MDXLayoutRenderer {
  code: string;
  components?: MDXComponents;
  [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-shadow
export function MDXRenderer({ code, components, ...rest }: MDXLayoutRenderer) {
  const Mdx = useMDXComponent(code);
  return <Mdx components={components} {...rest} />;
}
