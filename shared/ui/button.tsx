import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef } from "react";

// const sizes: { [key: string]: string } = {
//     "default": "h-9 px-4 py-2",
//     "sm": "h-8 rounded-md px-3 text-xs",
//     "lg": "h-10 rounded-md px-8",
// }

// const variants: { [key: string]: string } = {
//     default: "rounded-md bg-brand-500 text-neutral-0 hover:" as Classe,
//     outline: "rounded-md border-2 bg-transparent text-neutral-600 border-neutral-400",
// }

const buttonVariants = cva("cursor-pointer transition-colors duration-300 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            accent: "rounded-md bg-brand-500 text-neutral-0 hover:bg-brand-600 active:bg-brand-700",
            default: "rounded-md bg-brand-500 text-neutral-0 hover:bg-brand-600 active:bg-brand-700",
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
})

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>
    , VariantProps<typeof buttonVariants> {

}



const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, size, variant, ...props }, ref) => {
        return (
            <button
                className={clsx(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)

export default Button;