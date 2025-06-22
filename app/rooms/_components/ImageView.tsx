import { useState, useMemo, useEffect } from "react";
import ImageGalleryPopover from "./ImageGalleryPopover";
import ImageThumbnails from "./ImageThumbnails";
import OptimizedImage from "@/shared/ui/media/OptimizedImage";


interface ImageViewProps {
    media: string[];
    onImageClick?: (index: number) => void;
    className?: string;
}

export default function ImageView({
    media,
    onImageClick,
    className = ''
}: ImageViewProps) {
    const [currentIndex, setCurrentIndex] = useState<null | number>(null);

    const mediaList = useMemo(() => media.slice(0, 7), [media]);
    const hasMoreImages = media.length > 5;
    const remainingCount = media.length - 4;

    const handlePopover = (index: number) => setCurrentIndex(index);
    const handlePopoff = () => setCurrentIndex(null);

    return (
        <div className={`h-full w-full flex flex-col gap-1 ${className}`}>
            {/* Gallery Popover - View All Mode */}
            <ImageGalleryPopover
                open={currentIndex === 4}
                onClose={handlePopoff}
                mediaList={mediaList}
                currentIndex={currentIndex}
                isViewAll={true} anchorEl={null}
            />

            {/* Gallery Popover - Single Image Mode */}
            <ImageGalleryPopover
                open={currentIndex !== null && currentIndex < 4}
                onClose={handlePopoff}
                mediaList={mediaList}
                currentIndex={currentIndex} anchorEl={null} />

            {/* Main Large Image */}
            <div
                className={`
                    flex-[1_1_65%] relative rounded overflow-hidden bg-gray-300
                    transition-transform duration-200 ease-in-out
                    ${onImageClick ? 'cursor-pointer hover:scale-[1.01]' : 'cursor-default'}
                `}
                onMouseEnter={() => handlePopover(0)}
                onMouseLeave={handlePopoff}
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
                        sizes={false ? "(max-width: 768px) 100vw" : "(max-width: 1200px) 50vw, 33vw"}
                        alt="Main property image"
                        priority
                    />
                )}
            </div>

            {/* Thumbnail Grid */}
            {mediaList.length > 1 && (
                <ImageThumbnails
                    mediaList={mediaList}
                    hasMoreImages={hasMoreImages}
                    remainingCount={remainingCount}
                    onMouseEnter={handlePopover}
                    onMouseLeave={handlePopoff}
                />
            )}
        </div>
    );
}