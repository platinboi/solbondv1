import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-black dark:bg-opacity-70 dark:hover:bg-black/80 dark:text-white",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-red-700 dark:text-white",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-gray-600 dark:bg-black dark:bg-opacity-70 dark:hover:bg-black/80 dark:hover:text-white",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-black dark:bg-opacity-70 dark:text-white",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-800 dark:text-white",
        link: "text-primary underline-offset-4 hover:underline dark:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

