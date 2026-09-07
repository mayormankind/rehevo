import { redirect } from "next/navigation";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add auth check. If not authenticated, redirect to /onboarding.
  return <>{children}</>;
}
