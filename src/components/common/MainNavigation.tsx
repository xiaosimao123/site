/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/function-component-definition */

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isExternalUrl } from "@/lib/utils/helpers";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Icon, IconName } from "./Icon";
import { Label } from "./Label";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { HoverMenu } from "./HoverMenu";
import { ColorSchemeSwitcher } from "./ColorSchemeSwitcher";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      {/* TODO: Figure out how to type this */}
      {/* @ts-expect-error */}
      <Link
        ref={ref}
        className={cn(
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";

interface NavItem {
  label: string;
  url?: string;
  description?: string;
  content?: ContentNavItem[];
}

interface ContentNavItem extends NavItem {
  url: string;
}

const content: ContentNavItem[] = [
  {
    label: "Blog",
    url: "/posts",
    description: "Blogposts. Mostly about web development. Or chicken fingers",
  },
  {
    label: "Speaking",
    url: "/speaking",
    description:
      "My previous (and current) talks, workshops, and other speaking engagements.",
  },
  // {
  //   label: "Videos",
  //   url: defaultAuthor.socialProfiles.find((platform) => platform.name === "youtube")?.link as string,
  //   description: "My YouTube channel where I talk about web development.",
  // },
  // {
  //   label: "Newsletter",
  //   url: siteMetadata.newsletterUrl as string,
  //   description: "My newsletter about software development",
  // },
  {
    label: "Teaching",
    url: "/teaching",
    description: "I teach others. Sometimes for free, sometimes for money.",
  },
];

const navLinks: Array<NavItem> = [
  // { label: 'Documentation', url: '/docs' },
  //
  // Removing this temporarily, until it is more active.
  { label: "Doc", url: "/docs" },
  { label: "Blog", url: "/blog" },
  { label: "projects", url: "/projects" },
  { label: "about", url: "/about" },
  // {
  //   label: 'Content',
  //   content,
  // },
  //
  // NOTE until we have a proper example overview page and multiple examples, link directly to Next.js example
  // { label: 'Examples', url: '/examples/nextjs' },
];

const iconLinks: Array<{ label: string; icon: IconName; url: string }> = [
  {
    label: "Github",
    icon: "github",
    url: "https://github.com/xiaosimao123/site",
  },
  // { label: 'Discord', icon: 'discord', url: 'https://discord.gg/rytFErsARm' },
];

export const NavLink: React.FC<{
  label?: string;
  hideLabel?: boolean;
  icon?: IconName;
  url: string | undefined;
}> = ({ label, hideLabel = false, icon, url }) => {
  const pathname = usePathname();
  const active = pathname.split("/")[1] === url!.replace("/", "");

  return (
    <Link legacyBehavior href={url as string}>
      <a
        className={`group flex h-8 items-center rounded-md bg-transparent px-3 text-sm font-medium leading-none ${
          active
            ? "bg-violet-50 text-violet-900 dark:bg-violet-500/20 dark:text-violet-50"
            : "text-slate-600 hover:bg-gray-50 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-gray-900 dark:hover:text-slate-200"
        }`}
        target={isExternalUrl(url as string) ? "_blank" : undefined}
        rel={isExternalUrl(url as string) ? "noreferrer" : undefined}
      >
        {icon && (
          <span className="block w-5 text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400">
            <Icon name={icon} />
          </span>
        )}
        {label && <span className={hideLabel ? "sr-only" : ""}>{label}</span>}
      </a>
    </Link>
  );
};

export function MainNavigation() {
  return (
    <header className="fixed z-50 w-full border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur backdrop-filter dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-4 md:px-8 lg:px-16">
        <div className="flex items-center space-x-2.5">
          <Link legacyBehavior href="/">
            <a className="flex items-center space-x-2.5 font-bold text-slate-800 no-underline dark:text-white">
              <Logo />
              <span className="-mt-0.5">simao site</span>
              <Label text="Beta" />
            </a>
          </Link>
        </div>
        <nav className="hidden items-center divide-x divide-gray-200 lg:flex dark:divide-gray-800">
          <div className="flex items-center pr-2 lg:space-x-4 lg:pr-8">
            {navLinks.map(({ label, url }, index) => (
              <NavLink
                key={index}
                label={label}
                url={url}
                icon={
                  isExternalUrl(url as string) ? "external-link" : undefined
                }
              />
            ))}
            <HoverMenu />
            <div className="px-3">{/* <SearchButton /> */}</div>
          </div>
          <div className="flex items-center pl-2 lg:space-x-2 lg:pl-8">
            <ColorSchemeSwitcher />
            {iconLinks.map(({ label, icon, url }, index) => (
              <NavLink
                key={index}
                label={label}
                hideLabel
                url={url}
                icon={icon}
              />
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
