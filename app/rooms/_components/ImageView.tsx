import { useState, useMemo, useEffect } from "react";
import ImageGalleryPopover from "./ImageGalleryPopover";
import ImageThumbnails from "./ImageThumbnails";
import OptimizedImage from "@/app/shared/ui/media/OptimizedImage";
import { Tooltip } from "react-tooltip";
import clsx from "clsx";


interface ImageViewProps {
    media: string[];
    onImageClick?: (index: number) => void;
    className?: string;
    roomIndex: number
}

export default function ImageView({
    media,
    onImageClick,
    className = '',
    roomIndex = 0
}: ImageViewProps) {
    const [currentIndex, setCurrentIndex] = useState<null | number>(null);

    const mediaList = useMemo(() => media.slice(0, 7), [media]);
    const hasMoreImages = media.length > 5;
    const remainingCount = media.length - 4;

    const handlePopover = (index: number) => setCurrentIndex(index);
    const handlePopoff = () => setCurrentIndex(null);

    return (
        <div className={`h-full w-full flex flex-col justify-evenly gap-2 p-2 ${className}`}>
            {
                mediaList?.map((media, i) =>
                (
                    <Tooltip
                        id={`minor-image-${roomIndex}-${i}`}
                        key={`minor-image-${roomIndex}-${i}`}
                        positionStrategy="fixed"
                        style={{
                            position: 'fixed',
                            top: '20px',
                            right: '20px',
                            backgroundColor: 'white',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            zIndex: 9999
                        }}
                        className="!z-[9999]  !w-fit !h-fit"
                        wrapper="div"
                        delayHide={0}
                        delayShow={100}
                        place="top-end"
                    >


                        <ImageGalleryPopover
                            isViewAll={i === 4}
                            mediaList={mediaList}
                            currentIndex={currentIndex} />




                    </Tooltip>
                )
                )
            }


            {/* Main Large Image */}
            <div
                data-tooltip-id={`minor-image-${roomIndex}-0`}
                className={`
                    flex-[1_1_45%] relative rounded overflow-hidden bg-gray-300
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
            {
                mediaList.length > 0 && (
                    <ImageThumbnails
                        roomIndex={roomIndex}
                        mediaList={mediaList.slice(1, mediaList?.length)}
                        hasMoreImages={hasMoreImages}
                        remainingCount={remainingCount}
                        onMouseEnter={handlePopover}
                        onMouseLeave={handlePopoff}
                    />
                )
            }
        </div >
    );
}