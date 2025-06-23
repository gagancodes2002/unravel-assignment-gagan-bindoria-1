'use client'

import Skeleton from '@/app/rooms/_components/Skeleton/Skeleton';
import React, { forwardRef, useRef, useImperativeHandle, MediaHTMLAttributes, useState, useEffect, RefObject } from 'react';

type Props = {
    height: number | string;
    width: number | string;
    src: string;
    muted?: boolean;
    loop?: boolean;
    className?: string;
    videoPlayerRef: RefObject<HTMLVideoElement | null>
} & MediaHTMLAttributes<HTMLVideoElement>;


export default function ({ src,
    width,
    videoPlayerRef,
    height,
    className = '',
    muted,
    loop,
    ...params }: Props) {
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
    return (
        <div
            ref={containerRef}
            className={` rounded bg-red-100 ${className}`}
        >
            {!isInView ? (
                <Skeleton
                />
            ) : (
                <>
                    {!isLoaded && (
                        <Skeleton
                        />
                    )}
                    <video
                        ref={videoPlayerRef}
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
}

