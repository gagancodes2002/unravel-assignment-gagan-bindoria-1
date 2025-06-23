import { useState, useRef, useCallback, useMemo } from "react";
import { Room, RoomImage } from "../schema/rooms.types";
import VideoView from "./VideoVIew";
import ImageView from "./ImageView";
import React from "react";
import Link from "next/link";
import { Heart, Users, Bed, Wifi, Coffee, Car, Star } from "lucide-react";

interface RoomMediaSectionProps {
    roomIndex: number;
    room: Room;
    onImageClick?: (index: number) => void;
}

export default function RoomMediaSection({
    roomIndex,
    room,
    onImageClick
}: RoomMediaSectionProps) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const videoPlayerRef = useRef<HTMLVideoElement>(null);

    const mediaObj: {
        type: 'video' | 'image' | null
        media: any[]
    } = useMemo(() => {
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

    // Mock data - replace with actual room properties
    const roomDetails = {
        guests: 2,
        beds: 1,
        bathrooms: 1,
        size: "25 m²",
        currency: room?.variants[0].total_price?.currency,
        price: `${room?.variants[0].total_price?.discounted_price} ` || 2500,
        rating: 4.8,
        reviewCount: 127,
        amenities: ['Wifi', 'AC', 'TV', 'Mini Bar'] // Mock amenities
    };

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
             z-0 max-w-full grid justify-center items-center
             grid-cols-1 md:grid-cols-[auto_1fr]
             grid-rows-[auto_auto] md:grid-rows-1
             h-auto md:h-[32vh] md:max-h-70 sm:min-h-[58vh] md:min-h-65
             gap-0 md:gap-3
             p-1 sm:p-1.5 md:p-2
             bg-white border border-gray-200 rounded-lg shadow-lg
             transition-all duration-300 ease-in-out
             hover:scale-[1.01] hover:shadow-xl hover:border-gray-300
        `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Media Container */}
            <div className={`
                rounded-lg bg-white aspect-square relative
                w-full md:w-auto h-auto md:h-full md:max-w-none
                justify-center overflow-hidden p-2
            `}>

                {mediaType === "video" ? (
                    <VideoView
                        media={media[0]}
                        videoPlayerRef={videoPlayerRef}
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                    />
                ) : mediaType === "image" ? (
                    <ImageView key={roomIndex} roomIndex={roomIndex} media={media} onImageClick={onImageClick} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-600">
                        <p className="text-base">Unsupported media type</p>
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className={`
                flex flex-col justify-between
                p-3 md:p-4 gap-3 
                min-h-30 md:min-h-auto bg-transparent md:bg-white
            `}>
                {/* Header Section */}
                <div className="flex-1">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                            <span className="text-sm "><Star className="fill-amber-400 stroke-amber-400" /></span>
                            <span className="text-sm font-medium">{roomDetails.rating}</span>
                            <span className="text-sm text-gray-500">({roomDetails.reviewCount})</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        {/* Just writing the room_type_code as its the only thing that looks like a id but its not unique throught so not using this as a key */}
                        <span className="text-sm text-gray-600">{room.room_type_code}</span>
                    </div>

                    <h2 className="text-lg font-semibold mb-3 line-clamp-2">
                        {room.name}
                    </h2>

                    {/*  Details */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{roomDetails.guests} guests</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Bed size={14} />
                            <span>{roomDetails.beds} bed</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-xs">🛁</span>
                            <span>{roomDetails.bathrooms} bath</span>
                        </div>
                    </div>

                    {/* Facilities*/}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {roomDetails.amenities.slice(0, 3).map((amenity, index) => (
                            <span
                                key={index}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                                {amenity}
                            </span>
                        ))}
                        {roomDetails.amenities.length > 3 && (
                            <span className="text-xs text-gray-500">
                                +{roomDetails.amenities.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Price setion */}
                <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                        <div className="flex flex-col sm:flex-row items-baseline gap-1">
                            <span className="text-xl font-bold text-gray-900">
                                <span
                                    className="text-green-600 flex flex-row"
                                >
                                    {roomDetails.currency}  {roomDetails.price.toLocaleString()}
                                </span>
                            </span>
                            <span className="text-sm text-gray-500">/ night</span>
                        </div>
                        <span className="text-xs text-gray-500">Including taxes</span>
                    </div>

                    <Link
                        href={`/rooms/${roomIndex}`}
                        className="bg-brand-600 inline flex-nowrap text-nowrap text-white rounded-lg py-2.5 px-4 text-sm font-medium hover:bg-brand-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
}