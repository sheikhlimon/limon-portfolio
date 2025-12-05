"use client";

import SmoothScrollWrapper from "./SmoothScrollWrapper";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div suppressHydrationWarning>
      <SmoothScrollWrapper>{children}</SmoothScrollWrapper>
    </div>
  );
}