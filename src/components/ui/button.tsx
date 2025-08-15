"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60 active:translate-y-[1px]",
  { variants: {
      variant: {
        default: "bg-azur text-white shadow-elev1 hover:shadow-elev2",
        secondary: "bg-mer text-white shadow-elev1 hover:shadow-elev2",
        outline: "border border-ligne bg-white hover:bg-jasmin/40 text-mer",
        ghost: "hover:bg-jasmin/40",
        link: "text-azur underline-offset-4 hover:underline",
      },
      size: { default: "h-11 px-5", sm: "h-9 px-4", lg: "h-12 px-6 text-base", icon: "h-10 w-10" },
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean; }
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />);
});
Button.displayName = "Button";
export { Button, buttonVariants };
