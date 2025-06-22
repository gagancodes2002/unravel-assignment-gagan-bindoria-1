import Image from 'next/image'
import { useState } from 'react'
import clsx from 'clsx'

interface OptimizedImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    fill?: boolean
    priority?: boolean
    sizes?: string
    className?: string
    style?: React.CSSProperties
    onLoad?: () => void
    onError?: () => void
}

// Custom Skeleton component for loading state
function ImageSkeleton({
    width,
    height,
    fill,
    className = ''
}: {
    width?: number
    height?: number
    fill?: boolean
    className?: string
}) {
    const skeletonClasses = clsx(
        'animate-pulse bg-gray-200 rounded',
        {
            'absolute inset-0': fill,
            'block': !fill,
        },
        className
    )

    const skeletonStyle = !fill ? {
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
    } : {}

    return <div className={skeletonClasses} style={skeletonStyle} />
}

// Error fallback component
function ImageError({
    width,
    height,
    fill,
    className = ''
}: {
    width?: number
    height?: number
    fill?: boolean
    className?: string
}) {
    const errorClasses = clsx(
        'bg-gray-100 flex items-center justify-center rounded text-gray-500 text-sm',
        {
            'absolute inset-0': fill,
            'block': !fill,
        },
        className
    )

    const errorStyle = !fill ? {
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
    } : {}

    return (
        <div className={errorClasses} style={errorStyle}>
            <span>Failed to load image</span>
        </div>
    )
}

export default function OptimizedImage({
    src,
    alt,
    width,
    height,
    fill = false,
    priority = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    className,
    style,
    onLoad,
    onError
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const handleLoad = () => {
        setIsLoading(false)
        onLoad?.()
    }

    const handleError = () => {
        setIsLoading(false)
        setHasError(true)
        onError?.()
    }

    // If there's an error, show error component
    if (hasError) {
        return (
            <ImageError
                width={width}
                height={height}
                fill={fill}
                className={className}
            />
        )
    }

    // Container classes
    const containerClasses = clsx(
        'relative',
        {
            'w-full h-full': fill,
        },
        !fill && 'inline-block'
    )

    // Container style for non-fill images
    const containerStyle = !fill ? {
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
    } : {}

    // Image classes
    const imageClasses = clsx(
        'transition-opacity duration-300 ease-in-out',
        className
    )

    // Image style with opacity transition
    const imageStyle = {
        ...style,
        opacity: isLoading ? 0 : 1,
    }

    return (
        <div className={containerClasses} style={containerStyle}>
            {/* Loading skeleton */}
            {isLoading && (
                <ImageSkeleton
                    width={width}
                    height={height}
                    fill={fill}
                />
            )}

            {/* Next.js Image component */}
            <Image
                src={src}
                alt={alt}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                fill={fill}
                priority={priority}
                sizes={sizes}
                className={imageClasses}
                style={imageStyle}
                onLoad={handleLoad}
                onError={handleError}
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
        </div>
    )
}
