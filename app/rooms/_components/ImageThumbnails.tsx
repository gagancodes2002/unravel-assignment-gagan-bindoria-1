import OptimizedImage from "@/app/shared/ui/media/OptimizedImage";
import { PopoverButton } from "@headlessui/react";
import React from "react";
import { Tooltip } from "react-tooltip";

interface ImageThumbnailsProps {
    mediaList: string[];
    hasMoreImages: boolean;
    remainingCount: number;
    onMouseEnter: (index: number) => void;
    onMouseLeave: () => void;
    className?: string;
    roomIndex: number
}

export default function ImageThumbnails({
    roomIndex,
    mediaList,
    hasMoreImages,
    remainingCount,
    onMouseEnter,
    onMouseLeave,
    className = ''
}: ImageThumbnailsProps) {
    return (
        <div

            className={`flex-1 grid grid-cols-4 gap-2 min-h-0 ${className}`}>
            {Array.from({ length: 4 }).map((_, index) => {
                const imageIndex = index;
                const imageUrl = mediaList[imageIndex];
                const isLastThumbnail = index === 3;
                const showViewAll = isLastThumbnail && hasMoreImages;

                return (
                    <div
                        key={index}
                        data-tooltip-id={`minor-image-${roomIndex}-${index + 1}`}
                        data-tooltip-place="top"
                        className="!aspect-square relative w-full rounded overflow-hidden cursor-pointer bg-gray-300 transition-transform duration-200 hover:scale-[1.03] hover:cursor-zoom-in"
                        onMouseEnter={(e) => {
                            e.stopPropagation();
                            onMouseEnter(index);
                        }}
                        onMouseLeave={(e) => {
                            e.stopPropagation();
                            onMouseLeave();
                        }}
                    >

                        {imageUrl && (
                            <OptimizedImage
                                src={imageUrl}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 25vw, 15vw"
                                alt={`Property image ${roomIndex}-${imageIndex}`}
                            />
                        )}

                        {showViewAll && (
                            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white transition-colors duration-200 hover:bg-black/80">
                                <h3 className="text-base sm:text-lg font-bold">
                                    +{remainingCount}
                                </h3>
                                <p className="text-xs sm:text-sm mt-1 text-center">
                                    View All
                                </p>
                            </div>
                        )}

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
    );
}
