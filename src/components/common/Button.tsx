/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import classnames from "classnames";
// import { Icon, IconName } from './Icon'
import Link from "next/link";
import { isExternalUrl } from "@/lib/utils/helpers";
import { Icon, IconName } from "./Icon";

const themeClasses = {
  primary:
    "bg-violet-600 text-violet-50 border-violet-800 hover:bg-violet-500 dark:bg-violet-600 dark:border-violet-700 dark:hover:bg-violet-500 dark:hover:border-violet-600",
  secondary:
    "bg-violet-100 text-violet-800 border-violet-200 hover:bg-violet-50 dark:text-violet-300 dark:border-violet-500/30 dark:hover:bg-violet-500/30 dark:bg-violet-500/20",
};

export const Button: FC<{
  label: string;
  action?: () => void;
  theme?: "primary" | "secondary";
  href?: string;
  icon?: IconName;
}> = ({ label, action, href, theme = "primary", icon }) => {
  const sharedClasses =
    "px-6 py-2 flex justify-center items-center space-x-3 rounded-md border font-medium focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-900";

  if (href) {
    return (
      <Link legacyBehavior href={href}>
        <a
          className={classnames(sharedClasses, themeClasses[theme])}
          onClick={action}
          aria-label={label}
          target={isExternalUrl(href) ? "_blank" : undefined}
          rel={isExternalUrl(href) ? "noreferrer" : undefined}
        >
          <span>{label}</span>
          {icon && (
            <span className="w-5">
              <Icon name={icon} />
            </span>
          )}
        </a>
      </Link>
    );
  }
  return (
    <button
      className={classnames(sharedClasses, themeClasses[theme])}
      onClick={action}
      aria-label={label}
    >
      <span>{label}</span>
      {icon && (
        <span className="w-5">
          <Icon name={icon} />
        </span>
      )}
    </button>
  );
};
