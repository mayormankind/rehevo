import { AppShell } from "@/components/rehevo/app-shell";

export default function RehearsalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell hideNav>{children}</AppShell>;
}
