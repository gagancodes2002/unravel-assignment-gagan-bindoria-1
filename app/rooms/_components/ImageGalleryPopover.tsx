import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import OptimizedImage from "@/app/shared/ui/media/OptimizedImage";

interface ImageGalleryPopoverProps {
    mediaList: string[];
    currentIndex: number | null;
    isViewAll?: boolean;
}

export default function ImageGalleryPopover({
    mediaList,
    currentIndex,
    isViewAll = true,
}: ImageGalleryPopoverProps) {
    return (

        <div

            className={`${isViewAll
                ? 'bg-white  shadow-xl p-4 h-fit w-fit'
                : 'bg-white  shadow-lg p-2'
                } ring-1 ring-black/5 backdrop-blur-sm z-[300] rounded-md`}>
            {isViewAll ? (
                <div className="w-[40vh] sm:w-[40vw] max-w-2xl grid grid-cols-3 gap-2">
                    {mediaList.map((med, i) => (
                        <div key={i} className="relative aspect-square rounded overflow-hidden">
                            <OptimizedImage
                                src={med}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-200"
                                alt={`Property image ${i + 1}`}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-[40vw] max-w-xl aspect-[20/18] relative">
                    {currentIndex !== null && mediaList[currentIndex] && (
                        <OptimizedImage
                            src={mediaList[currentIndex]}
                            fill
                            className="object-cover rounded"
                            alt="Property preview"
                            priority
                        />
                    )}
                </div>
            )}
        </div>

    );
}