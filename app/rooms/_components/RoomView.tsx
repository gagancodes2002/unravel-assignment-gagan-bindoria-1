'use client'

import Link from 'next/link'
import { lazy, Usable, use, useMemo, useState } from 'react'
import { useGetRoomById } from '../hooks/useGetRoomById'
import RoomMediaSection from '../_components/RoomMediaSection'
import {
    AirVent,
    ArrowLeft,
    Bath,
    Bed,
    BellRing,
    CheckCircle,
    User,
    UserRound,
    Wifi,
} from 'lucide-react'
import React from 'react'
import { Variant } from '../schema/rooms.types'
import clsx from 'clsx'

const VariantCard = lazy(() => import('../_components/VariantCard'))

function RoomPageSkeleton() {
    return (
        <div className="max-w-4xl mx-auto px-4">
            {/* Header skeleton */}
            <div className="bg-white rounded-none sm:rounded-md shadow-sm mb-2">
                <div className="py-4 px-6">
                    <div className="flex items-center justify-between">
                        <div className="h-10 bg-gray-200 rounded w-35 animate-pulse"></div>
                        <div className="h-8 bg-gray-200 rounded w-25 animate-pulse"></div>
                    </div>
                </div>
            </div>

            <div className="py-4 sm:py-8">
                {/* Media skeleton */}
                <div className="mb-8">
                    <div className="h-96 bg-gray-200 rounded-md animate-pulse"></div>
                </div>

                {/* Room info skeleton */}
                <div className="bg-white shadow-sm rounded-md p-4 sm:p-6 mb-8">
                    <div className="mb-6">
                        <div className="h-12 bg-gray-200 rounded w-3/5 mb-4 animate-pulse"></div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            <div className="h-6 bg-gray-200 rounded w-30 animate-pulse"></div>
                            <div className="h-6 bg-gray-200 rounded w-38 animate-pulse"></div>
                            <div className="h-6 bg-gray-200 rounded w-45 animate-pulse"></div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
                            <div className="h-8 bg-gray-200 rounded w-38 mb-4 animate-pulse"></div>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <div className="w-5 h-5 bg-gray-200 rounded-full mr-4 animate-pulse"></div>
                                    <div className="h-5 bg-gray-200 rounded w-30 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Variants skeleton */}
                <div className="bg-white shadow-sm rounded-md p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="h-10 bg-gray-200 rounded w-2/5 animate-pulse"></div>
                        <div className="h-8 bg-gray-200 rounded w-30 animate-pulse"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="h-88 bg-gray-200 rounded-md animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

type Params = {
    Id: string
}

export default function ({ params }: { params: Promise<Params> }) {
    const { Id } = use(params)
    const {
        data,
        isLoading,
        error
    } = useGetRoomById(Id);

    console.log("DATA : ROOM VIEW : ", data)

    const [selectedVariant, setSelectedVariant] = useState<string | null>(null)



    const room = useMemo(() => {
        return data
    }, [data, isLoading])

    const { media, mediaType } = useMemo(() => {
        if (!room) return { media: [], mediaType: null };

        const images = room.properties.room_images?.[0]?.image_urls || [];
        const videoUrl = room.properties.video_url?.med;

        if (videoUrl) {
            return { media: [videoUrl], mediaType: 'video' as const };
        } else if (images.length > 0) {
            return { media: images, mediaType: 'image' as const };
        } else {
            return { media: [], mediaType: null };
        }
    }, [room]);

    const handleVariantSelect = (variantId: string) => {
        setSelectedVariant(selectedVariant === variantId ? null : variantId)
    }

    const handleImageClick = (index: number) => {
        console.log('Open image at index:', index);
    }

    if (isLoading) {
        return <RoomPageSkeleton />
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md mx-auto">
                    <div className="bg-white shadow-lg rounded-md p-8 text-center">
                        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                            <h2 className="text-lg font-semibold text-red-800 mb-2">
                                Error Loading Room
                            </h2>
                            <p className="text-sm text-red-600">
                                {error.message}
                            </p>
                        </div>
                        <Link
                            href="/rooms"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Rooms
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md mx-auto">
                    <div className="bg-white shadow-lg rounded-md p-8 text-center">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                            <h2 className="text-lg font-semibold text-yellow-800 mb-2">
                                Room Not Found
                            </h2>
                            <p className="text-sm text-yellow-600">
                                The room you're looking for doesn't exist.
                            </p>
                        </div>
                        <Link
                            href="/rooms"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Rooms
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto sm:max-w-4xl px-6">
            {/* Header */}
            <div className="bg-white rounded-md shadow-sm mb-2">
                <div className="py-4 px-6">
                    <div className="flex items-center justify-between">
                        <nav aria-label="breadcrumb">
                            <Link
                                href="/rooms"
                                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Rooms
                            </Link>
                        </nav>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                            Room ID: {Id}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto py-4 sm:py-8">
                {/* Media Section */}
                <div className="mb-8">
                    <RoomMediaSection
                        room={room}
                        media={media}
                        mediaType={mediaType}
                        onImageClick={handleImageClick}
                    />
                </div>

                {/* Room Details */}
                <div className="bg-white shadow-sm rounded-md p-4 sm:p-6 mb-8">
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-4xl font-medium text-gray-900 mb-6">
                            {room.name}
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            <div className="flex items-center text-gray-600">
                                <Bed className="w-5 h-5 mr-3" />
                                <span className="text-base">
                                    {room.properties.bed_type} bed
                                </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <User className="w-5 h-5 mr-3" />
                                <span className="text-base">
                                    Up to {room.properties.room_capacity.max_occupancy} guests
                                </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <UserRound className="w-5 h-5 mr-3" />
                                <span className="text-base">
                                    {room.properties.room_capacity.max_adult} adults, {room.properties.room_capacity.max_children} children
                                </span>
                            </div>
                        </div>

                        {/* Room Features */}
                        <div className="bg-blue-50 border border-blue-100 rounded-md p-6">
                            <div className="flex items-center mb-4">
                                <CheckCircle className="w-5 h-5 mr-3 text-blue-600" />
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Room Features
                                </h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <Wifi className="w-4 h-4 mr-3 text-gray-500" />
                                    <span className="text-sm text-gray-700">Free WiFi</span>
                                </div>
                                <div className="flex items-center">
                                    <AirVent className="w-4 h-4 mr-3 text-gray-500" />
                                    <span className="text-sm text-gray-700">Air conditioning</span>
                                </div>
                                <div className="flex items-center">
                                    <Bath className="w-4 h-4 mr-3 text-gray-500" />
                                    <span className="text-sm text-gray-700">Private bathroom</span>
                                </div>
                                <div className="flex items-center">
                                    <BellRing className="w-4 h-4 mr-3 text-gray-500" />
                                    <span className="text-sm text-gray-700">Room service available</span>
                                </div>
                                {room.properties.room_capacity.max_extra_bed > 0 && (
                                    <div className="flex items-center">
                                        <Bed className="w-4 h-4 mr-3 text-gray-500" />
                                        <span className="text-sm text-gray-700">
                                            Extra bed available (max {room.properties.room_capacity.max_extra_bed})
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Room Variants */}
                <div className="bg-white shadow-sm rounded-md p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Choose Your Rate
                        </h2>
                        <span className={clsx(`
                            inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                            bg-blue-100 text-blue-800 border border-blue-200
                            xs:text-xs xs:px-2 sm:text-sm sm:px-3'
                        `)}>
                            {room.variants_count} options available
                        </span>
                    </div>

                    {room.variants && room.variants.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {room.variants.map((variant: Variant, index: number) => (
                                <div key={variant.variant_id}>
                                    <VariantCard
                                        media={media[index]}
                                        mediaType={mediaType}
                                        variant={variant}
                                        onSelect={handleVariantSelect}
                                        isSelected={selectedVariant === variant.variant_id}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="bg-blue-50 border border-blue-200 rounded-md p-6 max-w-md mx-auto">
                                <p className="text-base text-blue-800">
                                    No variants available for this room.
                                </p>
                            </div>
                        </div>
                    )}

                    {selectedVariant && (
                        <div className="mt-8 flex justify-center">
                            <button className={`
                                bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md
                                px-8 py-3 text-lg transition-colors xs:w-full sm:min-w-auto`}>
                                Continue with Selected Room
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}