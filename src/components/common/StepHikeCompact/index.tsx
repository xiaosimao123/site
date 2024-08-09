// import { Step } from 'next-seo/lib/types'
import React, { FC } from "react";

interface IStep {
  title: string;
  step: number | string;
}

interface IStepHikeCompactSubcomponents {
  Step: FC<IStep>;
  Details: FC<IDetails>;
  Code: FC<ICode>;
}
interface IDetails {
  title?: string;
}
interface ICode {}

interface IStepHikeCompact {
  title: string;
}

const StepHikeCompact: FC<IStepHikeCompact> & IStepHikeCompactSubcomponents = ({
  children,
  title,
}) => <div className="py-8">{children}</div>;

const Step: FC<IStep> = ({ children, title, step }) => (
  <div className="relative pb-8 [&_div]:[&_div]:last:bg-transparent">
    <div
      className="
          absolute
          left-[11px]
          h-full
          w-px
          pt-1
        "
    >
      <div
        className="
          bg-primary-400
          absolute
          h-full
          w-full
          py-1
        "
      />
    </div>
    <div
      className="
          not-prose
          absolute
          left-0 flex items-center
          gap-3
              "
    >
      <div className="flex items-center gap-6">
        <div
          className="dark:bg-scale-400 border-scale-600 text-scale-1200
          dropshadow-sm flex h-6 w-6 items-center
          justify-center rounded-full border bg-white font-mono text-xs
          font-normal
          "
        >
          {step}
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:ml-12 lg:grid-cols-12 lg:gap-10">
      {children}
    </div>
  </div>
);

const Details: FC<IDetails> = ({ children, title }) => (
  <div className="col-span-5 ml-12 lg:ml-0">
    <h3 className="text-scale-1200 mt-0 text-base">{title}</h3>
    {children}
  </div>
);

const Code: FC<ICode> = ({ children }) => (
  <div className="not-prose col-span-7">{children}</div>
);

StepHikeCompact.Step = Step;
StepHikeCompact.Details = Details;
StepHikeCompact.Code = Code;
export default StepHikeCompact;
