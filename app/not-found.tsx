import { StatusScreen } from "@/components/common/StatusScreen";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <StatusScreen eyebrow="404" title="Page not found" description="The page you're looking for doesn't exist or has moved.">
      <ButtonLink href="/">Back to home</ButtonLink>
    </StatusScreen>
  );
}
