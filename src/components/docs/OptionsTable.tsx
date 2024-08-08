import { FC, ReactNode } from "react";

export const OptionsTable: FC<{ children: ReactNode }> = ({ children }) => (
    <div className="options-table grid grid-cols-1 overflow-hidden rounded-lg border border-gray-200 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4 dark:border-gray-800">
      {children}
    </div>
  );

export const OptionTitle: FC<{ children: ReactNode }> = ({ children }) => (
    <div className="option-title hyphens not-prose -mt-px border-t border-gray-200 bg-gray-50 p-4 pt-5 md:border-r lg:border-r-0 xl:border-r dark:border-gray-800 dark:bg-gray-900/75">
      {children}
    </div>
  );

export const OptionDescription: FC<{ children: ReactNode }> = ({
  children,
}) => (
    <div className="-mt-px border-t border-gray-200 px-4 pb-2 md:col-span-3 lg:col-span-1 xl:col-span-3 dark:border-gray-800">
      {children}
    </div>
  );
