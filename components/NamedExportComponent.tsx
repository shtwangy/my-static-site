import type { FC } from "react";

export function NamedExportComponent() {
  return <p>Named Export Component (imported dynamically) </p>;
}

export type NamedExportComponentProps = {
  title: string;
};

export const NamedExportComponentWithProps: FC<NamedExportComponentProps> = ({
  title,
}) => {
  return (
    <p>Named Export Component With Props {title} (imported dynamically) </p>
  );
};
