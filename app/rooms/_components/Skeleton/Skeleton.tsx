import { ReactNode } from "react";

export default function Skeleton({
    className = '',
    isAbsolute = false,
    children
}: {
    className?: string;
    isAbsolute?: boolean;
    children?: ReactNode
}) {


    return (
        <div
            className={`animate-pulse bg-gray-200 rounded ${isAbsolute ? 'absolute top-0 left-0 z-10' : ''} ${className}`}
            {...(children && { children: children })}
        />
    );
}