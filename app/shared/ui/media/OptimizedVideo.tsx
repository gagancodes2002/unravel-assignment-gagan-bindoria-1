'use client'

import React, { forwardRef, useRef, useImperativeHandle, MediaHTMLAttributes, useState, useEffect } from 'react';

type Props = {
    height: number | string;
    width: number | string;
    src: string;
    muted?: boolean;
    loop?: boolean;
    className?: string;
} & MediaHTMLAttributes<HTMLVideoElement>;

// Simple Skeleton component
function Skeleton({
    width,
    height,
    className = '',
    isAbsolute = false
}: {
    width: number | string;
    height: number | string;
    className?: string;
    isAbsolute?: boolean;
}) {
    const style = {
        width: typeof width === 'string' ? width : `${width}px`,
        height: height === 'auto' ? '200px' : typeof height === 'string' ? height : `${height}px`,
    };

    return (
        <div
            className={`animate-pulse bg-gray-200 rounded ${isAbsolute ? 'absolute top-0 left-0 z-10' : ''} ${className}`}
            style={style}
        />
    );
}

const OptimizedVideo = forwardRef<HTMLVideoElement, Props>(({
    src,
    width,
    height,
    className = '',
    muted,
    loop,
    ...params
}, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useImperativeHandle(ref, () => videoRef.current!, []);
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleLoadedData = () => {
        setIsLoaded(true);
    };

    const containerStyle = {
        width: typeof width === 'string' ? width : `${width}px`,
        height: height === 'auto' ? undefined : typeof height === 'string' ? height : `${height}px`,
    };

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden rounded bg-red-100 ${className}`}
            style={containerStyle}
        >
            {!isInView ? (
                <Skeleton
                    width="100%"
                    height={height}
                />
            ) : (
                <>
                    {!isLoaded && (
                        <Skeleton
                            width="100%"
                            height={height}
                            isAbsolute={true}
                        />
                    )}

                    <video
                        ref={videoRef}
                        src={src}
                        preload="metadata"
                        muted={muted}
                        loop={loop}
                        onLoadedData={handleLoadedData}
                        className="w-full h-full object-cover block transition-opacity duration-300 ease-in-out"
                        style={{
                            opacity: isLoaded ? 1 : 0,
                        }}
                        {...params}
                    />
                </>
            )}
        </div>
    );
});


export default OptimizedVideo;