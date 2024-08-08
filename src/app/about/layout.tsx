import SectionContainer from "@/components/SectionContainer";

export default function BlogLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <SectionContainer>{children}</SectionContainer>;
}
