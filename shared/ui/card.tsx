import clsx from "clsx";
import { forwardRef, HTMLAttributes } from "react";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (

    <div
        ref={ref}
        className={clsx(
            "rounded-xl border bg-white text-subtext-color shadow",
            className
        )}
        {...props}
    />
))

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={clsx("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))

const CardTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={clsx("font-semibold leading-none tracking-tight", className)}
        {...props}
    />
))

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={clsx("text-sm text-subtext-color", className)}
        {...props}
    />
))

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={clsx(" p-6 pt-0", className)}
        {...props}
    />
))

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={clsx("flex items-center p-6 pt-0", className)}
        {...props}
    />
))

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }