"use client";
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b border-ligne", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";
export const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger ref={ref} className={cn("flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)} {...props}>
      {children}
      <ChevronDown className="h-5 w-5 shrink-0 transition-transform data-[state=open]:rotate-180" aria-hidden />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";
export const AccordionContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className={cn("overflow-hidden text-p2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp", className)} {...props}>
    <div className="pb-4">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
