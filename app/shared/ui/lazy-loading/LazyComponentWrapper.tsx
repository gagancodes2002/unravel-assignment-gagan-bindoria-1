import Skeleton from "@/app/rooms/_components/Skeleton/Skeleton"
import useLazyLoading from "@/app/shared/lib/hooks/useLazyLoading"
import { ReactNode } from "react"

interface LazyComponentWrapperProps {
    children: ReactNode
    fallback?: ReactNode
    threshold?: number
    rootMargin?: string
    className?: string
}

export default function ({
    children,
    fallback,
    threshold = 0,
    rootMargin = '100px',
    className = ''
}: LazyComponentWrapperProps) {

    const { isIntersected, observingElemRef } = useLazyLoading({
        threshold,
        rootMargin,
    })

    const defaultFallback = (
        <div
            className={'flex items-center justify-center'}
        >
            <Skeleton
                className={'w-full h-full'}
            />

        </div>
    )

    return (
        <div
            ref={observingElemRef}
            className={className}
        >
            {isIntersected ? children : (fallback || defaultFallback)}
        </div>
    )
}