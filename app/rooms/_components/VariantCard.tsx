'use client'


import OptimizedImage from "@/app/shared/ui/media/OptimizedImage";
import OptimizedVideo from "@/app/shared/ui/media/OptimizedVideo";
import { useEffect, useRef, useState } from "react"
import { DisplayProperty, Variant } from "../schema/rooms.types";
import { Bed, Bubbles, CheckCircle, Dumbbell, ForkKnife, Hotel, LocateIcon, LucideEdit, Menu, MenuSquare, ParkingSquare, ReceiptText, SquarePercent, User, WavesLadder, Wifi } from "lucide-react";


const iconMap: { [key: string]: React.ReactNode } = {
    room: <Hotel fontSize="small" />,
    bed: <Bed fontSize="small" />,
    person: <User fontSize="small" />,
    restaurant: <ForkKnife fontSize="small" />,
    wifi: <Wifi fontSize="small" />,
    parking: <ParkingSquare fontSize="small" />,
    pool: <WavesLadder fontSize="small" />,
    gym: <Dumbbell fontSize="small" />,
    spa: <Bubbles fontSize="small" />
}

interface VariantCardProps {
    variant: Variant
    onSelect: (variantId: string) => void
    isSelected?: boolean
    loading?: boolean
    media: any
    mediaType: 'video' | 'image' | null
}

function VariantCardSkeleton() {
    return (
        <div className="bg-white rounded-lg overflow-hidden h-full shadow-sm">
            {/* Media skeleton */}
            <div className="h-50 bg-gray-200 animate-pulse"></div>

            {/* Content skeleton */}
            <div className="p-4">
                <div className="h-8 bg-gray-200 rounded w-4/5 mb-4 animate-pulse"></div>

                {/* Properties skeleton */}
                <div className="mb-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <div className="w-5 h-5 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/5 animate-pulse"></div>
                        </div>
                    ))}
                </div>

                {/* Price skeleton */}
                <div className="h-15 bg-gray-200 rounded mb-4 animate-pulse"></div>

                {/* Button skeleton */}
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    )
}

export default function VariantCard({
    variant,
    onSelect,
    isSelected = false,
    loading = false,
    media,
    mediaType = "image"
}: VariantCardProps) {
    const [isMuted, setMuted] = useState(false)
    const videoPlayerRef = useRef(null);

    const hasDiscount = variant.total_price.offer_present && variant.total_price.promo?.discount
    const originalPrice = variant.total_price.total_price
    const discountedPrice = variant.total_price.discounted_price
    const discountPercentage = variant.total_price.promo?.discount

    if (loading) {
        return <VariantCardSkeleton />
    }

    console.log("MEDIA TAKEN : ", media)

    return (
        <div
            className={`
                bg-white rounded-lg overflow-hidden h-full flex flex-col
                transition-all duration-200 ease-in-out
                ${isSelected
                    ? 'shadow-xl border-2 border-brand-500'
                    : 'shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-500'
                }
            `}
        >
            {/* Media Container */}
            <div
                className="h-50 bg-gray-200 relative overflow-hidden flex items-center justify-center"
                style={{
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                }}
            >
                {mediaType === "video" ? (
                    <OptimizedVideo
                        src={media}
                        videoPlayerRef={videoPlayerRef}
                        muted={isMuted}
                        loop
                        className="w-auto h-[150%] min-w-full object-cover -translate-y-1/4"
                        height="100%"
                        width="100%"
                    />
                ) : media?.length > 0 ? (
                    <OptimizedImage
                        fill
                        src={media}
                        alt="Placeholder"
                        className="object-cover"
                    />
                ) : (
                    <p className="text-sm text-gray-600 text-center px-2 relative z-10">
                        Variant Image Placeholder
                    </p>
                )}

                {/* Gradient Overlay */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-1/2"
                    style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)'
                    }}
                />

                {/* Discount Badge */}
                {hasDiscount && (
                    <span className="absolute top-3 right-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white z-20">
                        <SquarePercent className="w-4 h-4 mr-1" />
                        {discountPercentage}% off
                    </span>
                )}

                {/* Selected Badge */}
                {isSelected && (
                    <span className="absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-600 text-white z-20">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Selected
                    </span>
                )}
            </div>

            {/* Content Container */}
            <div className="p-4 flex-grow flex flex-col">
                {/* Title */}
                <h3 className="text-lg font-semibold leading-tight mb-4">
                    {variant.name}
                </h3>

                {/* Properties List */}
                <div className="py-0 mb-4">
                    {variant.display_properties.slice(0, 4).map((prop: DisplayProperty, index: number) => (
                        <div key={index} className="flex items-center py-1">
                            <div className="min-w-8 text-gray-600">
                                {iconMap[prop.icon_name] || <MenuSquare fontSize="small" />}
                            </div>
                            <span className="text-sm text-gray-600 ml-1">
                                {prop.display_name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Price Section */}
                <div className="mb-4">
                    <p className="text-xs text-gray-600 block">
                        Price for 1 night
                    </p>
                    <p className="text-xs text-gray-600 block mb-2">
                        {variant.additional_info.short_tariff_notes}
                    </p>

                    <div className="flex items-end gap-2 flex-wrap">
                        {hasDiscount && (
                            <span className="text-sm line-through text-gray-400">
                                {variant.total_price.currency}{originalPrice.toLocaleString()}
                            </span>
                        )}
                        <span className="text-lg font-bold text-green-600">
                            {variant.total_price.currency}{discountedPrice.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Cancellation Policy Link */}
                <a
                    href="#"
                    className="flex items-center text-brand-600 mb-4 text-sm no-underline hover:underline"
                >
                    <ReceiptText className="w-4 h-4 mr-1" />
                    Cancellation policy
                </a>

                {/* Special Requests */}
                {variant.properties.allows_special_requests && (
                    <div className="mb-4">
                        <p className="text-xs text-gray-600 flex items-center">
                            <LucideEdit className="w-4 h-4 mr-1" />
                            Select rooms to add special request
                        </p>
                    </div>
                )}

                {/* Action Button */}
                <div className="mt-auto">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(variant.variant_id);
                        }}
                        disabled={!variant.is_bookable}
                        className={`
                            w-full py-3 px-4 font-semibold rounded-lg transition-all duration-200
                            ${!variant.is_bookable
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : isSelected
                                    ? 'bg-brand-600 text-white hover:bg-brand-700'
                                    : 'border-2 border-gray-300 text--600 hover:bg-gray-400 hover:text-white'
                            }
                        `}
                    >
                        {!variant.is_bookable
                            ? 'Not Available'
                            : isSelected
                                ? 'Selected'
                                : 'Select'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}