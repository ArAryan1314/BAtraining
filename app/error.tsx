"use client";

import { StatusScreen } from "@/components/common/StatusScreen";
import { Button } from "@/components/ui/Button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <StatusScreen eyebrow="Something went wrong" title="We couldn't load this page" description="This is on our side. Please try again in a moment.">
      <Button onClick={reset}>Try again</Button>
    </StatusScreen>
  );
}
