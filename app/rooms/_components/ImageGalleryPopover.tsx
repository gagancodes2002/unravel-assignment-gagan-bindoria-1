import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import OptimizedImage from "@/app/shared/ui/media/OptimizedImage";

interface ImageGalleryPopoverProps {
    mediaList: string[];
    currentIndex: number | null;
    isViewAll?: boolean;
    children: React.ReactNode;
}

export default function ImageGalleryPopover({
    mediaList,
    currentIndex,
    isViewAll = false,
    children
}: ImageGalleryPopoverProps) {
    return (
        <Popover>
            <PopoverButton as="div" className="cursor-pointer">
                {children}
            </PopoverButton>

            <PopoverPanel
                transition
                anchor="bottom"
                className="z-50 [--anchor-gap:8px] transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            >
                <div className={`${isViewAll
                    ? 'bg-white rounded-lg shadow-xl p-4'
                    : 'bg-white rounded-lg shadow-lg p-2'
                    } ring-1 ring-black/5 backdrop-blur-sm`}>
                    {isViewAll ? (
                        <div className="w-[40vw] max-w-2xl grid grid-cols-3 gap-2">
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
            </PopoverPanel>
        </Popover>
    );
}