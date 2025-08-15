import { cn } from "@/lib/utils";
export default function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("container py-10 md:py-14", className)} {...props} />;
}
