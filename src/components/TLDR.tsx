/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import { Card } from "./common/Card";

export const TLDR: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <Card className="custom-tldr mb-12 p-6">
    <div className="text-md leading-normal text-slate-700 dark:text-slate-300">
      {children}
    </div>
  </Card>
);
