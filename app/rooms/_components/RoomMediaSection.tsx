'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import OptimizedImage from '@/shared/ui/media/OptimizedImage'
import OptimizedVideo from '@/shared/ui/media/OptimizedVideo'
import React from 'react'
import { Room } from '../schema/rooms.types'
import { Pause, Play, Volume, VolumeOff } from 'lucide-react'

// Video component for single room page
function RoomVideoView({
    media,
    videoPlayerRef,
    isPlaying,
    onPlayPause
}: {
    media: string;
    videoPlayerRef: React.RefObject<HTMLVideoElement | null>;
    isPlaying: boolean;
    onPlayPause: () => void;
}) {
    const [isMuted, setIsMuted] = useState(true);

    const handleMuteToggle = useCallback(() => {
        if (videoPlayerRef.current) {
            videoPlayerRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    }, [isMuted, videoPlayerRef]);

    return (
        <div
            className="relative h-full w-full overflow-hidden rounded-lg bg-gray-900 cursor-pointer group"
            onClick={(e) => {
                e.stopPropagation();
                onPlayPause();
            }}
        >
            <OptimizedVideo
                src={media}
                ref={videoPlayerRef}
                muted={isMuted}
                loop
                className="w-full h-full object-cover object-center"
                height="100%"
                width="100%"
            />

            {/* Video Controls Overlay */}
            <div
                className={`
                    absolute inset-0 flex items-center justify-center 
                    bg-black/30 transition-opacity duration-300
                    ${isPlaying ? 'opacity-0 pointer-events-none group-hover:opacity-100' : 'opacity-100'}
                `}
            >
                <div className="bg-white/90 rounded-full w-16 h-16 flex items-center justify-center text-gray-800">
                    {isPlaying ? (
                        <Pause className="text-3xl" />
                    ) : (
                        <Play className="text-3xl" />
                    )}
                </div>
            </div>

            {/* Sound Toggle */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleMuteToggle();
                }}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
                {isMuted ? <VolumeOff /> : <Volume />}
            </button>
        </div>
    );
}

// Image gallery component for single room page
function RoomImageView({
    media,
    onImageClick
}: {
    media: string[];
    onImageClick?: (index: number) => void;
}) {

    // Process up to 7 images for display
    const mediaList = media.slice(0, 7);
    const hasMoreImages = media.length > 5;
    const remainingCount = media.length - 4;

    return (
        <div className="h-full w-full flex flex-col gap-1">
            {/* Main large image */}
            <div
                className={`
                    flex-[1_1_65%] relative rounded-lg overflow-hidden bg-gray-300 
                    transition-transform duration-200
                    ${onImageClick ? 'cursor-pointer hover:scale-[1.01]' : 'cursor-default'}
                `}
                onClick={(e) => {
                    e.stopPropagation();
                    onImageClick?.(0);
                }}
            >
                {mediaList[0] && (
                    <OptimizedImage
                        src={mediaList[0]}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                        alt="Main room image"
                        priority
                    />
                )}
            </div>

            {/* Bottom row - 4 thumbnail images */}
            {mediaList.length > 1 && (
                <div className="flex-[1_1_35%] grid grid-cols-4 gap-1 min-h-0 items-stretch">
                    {Array.from({ length: 4 }).map((_, index) => {
                        const imageIndex = index + 1;
                        const imageUrl = mediaList[imageIndex];
                        const isLastThumbnail = index === 3;
                        const showViewAll = isLastThumbnail && hasMoreImages;

                        return (
                            <div
                                key={index}
                                className={`
                                    relative aspect-square rounded overflow-hidden bg-gray-300 
                                    transition-transform duration-200
                                    ${onImageClick ? 'cursor-pointer hover:scale-[1.03]' : 'cursor-default'}
                                `}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onImageClick?.(imageIndex);
                                }}
                            >
                                {imageUrl && (
                                    <OptimizedImage
                                        src={imageUrl}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 25vw, 15vw"
                                        alt={`Room image ${imageIndex + 1}`}
                                    />
                                )}

                                {/* Empty state */}
                                {!imageUrl && !showViewAll && (
                                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                        <span className="text-xs text-gray-400">
                                            No Image
                                        </span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// Main room media section component
export default function RoomMediaSection({
    room,
    media,
    mediaType,
    onImageClick
}: {
    room: Room;
    media: string[];
    mediaType: 'video' | 'image' | null;
    onImageClick?: (index: number) => void;
}) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

    const { isMobile } = { isMobile: false }

    const handlePlayPause = useCallback(() => {
        if (videoPlayerRef.current) {
            if (isPlaying) {
                videoPlayerRef.current.pause();
                setIsPlaying(false);
            } else {
                videoPlayerRef.current.play();
                setIsPlaying(true);
            }
        }
    }, [isPlaying]);

    // Auto-play on hover for desktop
    const handleMouseEnter = useCallback(() => {
        if (!isMobile && mediaType === 'video' && videoPlayerRef.current) {
            videoPlayerRef.current.play();
            setIsPlaying(true);
        }
    }, [isMobile, mediaType]);

    const handleMouseLeave = useCallback(() => {
        if (!isMobile && mediaType === 'video' && videoPlayerRef.current) {
            videoPlayerRef.current.pause();
            videoPlayerRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }, [isMobile, mediaType]);

    if (!media || media.length === 0) {
        return (
            <div className="w-full bg-gray-100 flex items-center justify-center h-75 sm:h-96 md:h-125 rounded-lg shadow-lg">
                <p className="text-base text-gray-600">
                    No media available for {room.name}
                </p>
            </div>
        );
    }

    return (
        <div
            className={`
                w-full bg-white rounded-lg overflow-hidden shadow-lg
                transition-all duration-300 ease-in-out
                hover:scale-[1.01] hover:shadow-xl
                h-[60vh] sm:h-[70vh] md:h-[60vh] lg:h-[65vh]
                max-h-[500px] sm:max-h-[600px] md:max-h-[700px] lg:max-h-[800px]
                min-h-[400px] sm:min-h-[500px] md:min-h-[600px]
            `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Media Container */}
            <div className="w-full h-full relative overflow-hidden">
                {mediaType === "video" ? (
                    <RoomVideoView
                        videoPlayerRef={videoPlayerRef}
                        media={media[0]}
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                    />
                ) : mediaType === "image" ? (
                    <RoomImageView
                        media={media}
                        onImageClick={onImageClick}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-600 bg-gray-100">
                        <h3 className="text-xl font-medium">
                            Unsupported media type
                        </h3>
                    </div>
                )}

                {/* Room name overlay */}
                <div
                    className="absolute bottom-0 left-0 right-0 p-6 pt-12"
                    style={{
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))'
                    }}
                >
                    <h1
                        className="text-white font-bold text-2xl sm:text-3xl md:text-4xl"
                        style={{
                            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                        }}
                    >
                        {room.name}
                    </h1>
                    <p
                        className="text-white/90 mt-2 text-base"
                        style={{
                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                        }}
                    >
                        {room.properties.bed_type} • Up to {room.properties.room_capacity.max_occupancy} guests
                    </p>
                </div>
            </div>
        </div>
    );
}