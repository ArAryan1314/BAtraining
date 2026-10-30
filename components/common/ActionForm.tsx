"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";
import { Button, type ButtonProps } from "@/components/ui/Button";
import type { ActionResult } from "@/lib/actions/result";
import { cn } from "@/lib/cn";

interface ActionFormProps {
  action: (previous: ActionResult | null, data: FormData) => Promise<ActionResult>;
  submitLabel: string;
  hidden?: Record<string, string>;
  children?: React.ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  confirmMessage?: string;
  resetOnSuccess?: boolean;
}

/** A form bound to a server action that shows its pending state and result. Input is kept if the action fails. */
export function ActionForm({ action, submitLabel, hidden, children, variant, size, className, confirmMessage, resetOnSuccess }: ActionFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok && resetOnSuccess) formRef.current?.reset();
  }, [state, resetOnSuccess]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (confirmMessage && !window.confirm(confirmMessage)) return;
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      {Object.entries(hidden ?? {}).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
      {children}
      <Button type="submit" variant={variant} size={size} disabled={pending}>{pending ? "Saving..." : submitLabel}</Button>
      {state?.message && <p role={state.ok ? "status" : "alert"} className={cn("text-sm", state.ok ? "text-success" : "text-danger")}>{state.message}</p>}
    </form>
  );
}
