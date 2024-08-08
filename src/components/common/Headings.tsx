"use client";

/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { sluggifyTitle, getNodeText } from "src/lib/utils/sluggify";

export const H2: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(getNodeText(children));
  return (
    <h2
      id={slug}
      onClick={() => (window.location.hash = `#${slug}`)}
      className="group cursor-pointer"
    >
      <span className="absolute left-8 hidden text-slate-400 lg:group-hover:inline dark:text-slate-600">
        #
      </span>
      {children}
    </h2>
  );
};

export const H3: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(getNodeText(children));
  return (
    <h3
      id={slug}
      onClick={() => (window.location.hash = `#${slug}`)}
      className="group cursor-pointer"
    >
      <span className="absolute left-8 hidden text-slate-400 lg:group-hover:inline dark:text-slate-600">
        #
      </span>
      {children}
    </h3>
  );
};

export const H4: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(getNodeText(children));
  return (
    <h4
      id={slug}
      onClick={() => (window.location.hash = `#${slug}`)}
      className="group cursor-pointer"
    >
      <span className="absolute left-8 hidden text-slate-400 lg:group-hover:inline dark:text-slate-600">
        #
      </span>
      {children}
    </h4>
  );
};
