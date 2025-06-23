import { useState, useRef, useCallback, useMemo } from "react";
import { Room, RoomImage } from "../schema/rooms.types";
import VideoView from "./VideoVIew";
import ImageView from "./ImageView";
import React from "react";
import Link from "next/link";
import OptimizedVideo from "@/app/shared/ui/media/OptimizedVideo";



interface RoomMediaSectionProps {
    roomIndex: number;
    room: Room;
    // media: string[];
    // mediaType: 'video' | 'image' | null;
    onImageClick?: (index: number) => void;
}

export default function ({
    roomIndex,
    room,
    onImageClick
}: RoomMediaSectionProps) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const videoPlayerRef = useRef<HTMLVideoElement>(null);

    const mediaObj: {
        type: 'video' | 'image' | null
        media: any[]
    } = useMemo(() => {
        // Order Video if present > Image if present > Nothing if both absent
        let payload: {
            type: 'video' | 'image' | null
            media: any[]
        } = {
            type: null,
            media: [],
        }

        if (room.properties?.video_url?.med) {
            payload.type = "video";
            payload.media.push(room.properties?.video_url?.med)
        }

        if (room.properties.room_images && room.properties?.room_images?.length > 0) {
            payload.type = "image";
            room.properties?.room_images?.forEach((roomImg: RoomImage) => {
                roomImg.image_urls?.forEach((elm) => payload.media.push(elm))
            })
        }


        return payload


    }, [room.properties])

    const media = useMemo(() => {
        return mediaObj.media
    }, [mediaObj])

    const mediaType = useMemo(() => {
        return mediaObj.type
    }, [mediaObj])

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
    }, [isPlaying, videoPlayerRef]);

    const handleMouseEnter = useCallback(() => {
        debugger;
        if (mediaObj?.type === 'video' && videoPlayerRef.current) {
            videoPlayerRef.current.play();
            setIsPlaying(true);
        }
    }, [mediaType]);

    const handleMouseLeave = useCallback(() => {
        if (mediaType === 'video' && videoPlayerRef.current) {
            videoPlayerRef.current.pause();
            videoPlayerRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }, [mediaType]);

    if (!media || media.length === 0) {
        return (
            <div className="w-full bg-gray-100 flex items-center justify-center min-h-75 sm:min-h-100 md:min-h-88 rounded-lg shadow-lg">
                <p className="text-base text-gray-600">
                    No media available
                </p>
            </div>
        );
    }

    return (
        <div
            className={`
                w-full max-w-full sm:max-w-[60vw] bg-white shadow-lg rounded-lg overflow-hidden
                grid grid-cols-1 md:grid-cols-[auto_1fr] grid-rows-[auto_auto] md:grid-rows-1
                h-auto md:h-[32vh] max-h-none md:max-h-70 min-h-auto sm:min-h-[58vh] md:min-h-65
                gap-0 md:gap-2 p-1 sm:p-1.5 md:p-2
                transition-all duration-300 ease-in-out
                hover:scale-[1.02] hover:shadow-sm hover:border hover:border-gray-400
            `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Media Container */}
            <div className={`
                overflow-hidden rounded bg-gray-200 aspect-square
                w-full md:w-auto h-auto md:h-full max-w-[90vw] md:max-w-none
                justify-self-center md:justify-self-start
            `}>
                {mediaType === "video" ? (
                    <VideoView
                        media={media[0]}
                        videoPlayerRef={videoPlayerRef}
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                    />
                ) : mediaType === "image" ? (
                    <ImageView media={media} onImageClick={onImageClick} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-600">
                        <p className="text-base">Unsupported media type</p>
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className={`
                grid grid-cols-6
                p-1.5 sm:p-2 md:p-3.5  gap-2 
                min-h-30 md:min-h-auto bg-transparent md:bg-white overflow-auto
            `}>
                {/* Text Content */}
                <div className="col-span-4 flex flex-col">
                    <h2 className={`
                        text-lg font-semibold mb-2
                        overflow-hidden md:overflow-visible xs:line-clamp-2 sm:block `}>
                        {room.name}
                    </h2>
                    <div className="max-h-[30%] overflow-y-auto">
                        <p className="text-base text-gray-700">
                            {"TEST"}
                        </p>
                    </div>
                </div>

                <div
                    className="col-span-2 flex h-full items-end justify-end"
                >

                    {/* Button Container */}
                    <Link
                        href={`/rooms/${roomIndex}`}
                        className="bg-brand-600 flex h-fit text-neutral-0 rounded-md py-1.5 px-2 text-sm hover:bg-brand-700 ring-1 transition-colors duration-300"

                    >
                        <span
                            className="tracking-tight leading-none"
                        >
                            View Details
                        </span>
                    </Link>
                </div>
                {/* <div className="flex-1">
                    <a
                        href={`/rooms/${roomIndex}`}
                        className={`
                            inline-block px-4 py-2 bg-blue-600 text-white rounded
                            hover:bg-blue-700 transition-colors duration-200
                            text-sm font-medium no-underline
                            self-start
                        `}
                    >
                        View Details
                    </a>
                </div> */}
            </div>
        </div>
    );
}