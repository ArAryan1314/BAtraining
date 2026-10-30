import { Input } from "@/components/ui/Input";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

export function FormField({ type = "input", ...props }: { type?: "input" | "textarea" | "select"; label?: string; hint?: string; error?: string; id?: string; options?: SelectOption[]; name?: string; placeholder?: string }) {
  if (type === "textarea") return <Textarea {...props} />;
  if (type === "select") return <Select {...props} options={props.options} />;
  return <Input {...props} />;
}
