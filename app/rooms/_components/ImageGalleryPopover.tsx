import OptimizedImage from "@/app/shared/ui/media/OptimizedImage";
import { autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/react";

interface ImageGalleryPopoverProps {
    open: boolean;
    onClose: () => void;
    mediaList: string[];
    currentIndex: number | null;
    isViewAll?: boolean;
}


export default function ImageGalleryModal({
    open,
    onClose,
    mediaList,
    currentIndex,
    isViewAll = false,
    anchorEl // You'll need to pass the trigger element
}: ImageGalleryPopoverProps & { anchorEl: HTMLDivElement | null }) {
    const { refs, floatingStyles } = useFloating({
        elements: {
            reference: anchorEl,
        },
        open,
        onOpenChange: onClose,
        middleware: [
            offset(10),
            flip(),
            shift({ padding: 8 }),
        ],
        whileElementsMounted: autoUpdate,
    });

    if (!open) return null;

    return (
        <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={`z-50 ${isViewAll ? 'bg-white rounded-lg shadow-xl p-4' : 'bg-white rounded-lg shadow-lg p-2'}`}
        >
            {isViewAll ? (
                <div className="w-[40vw] grid grid-cols-3 gap-2">
                    {mediaList.map((med, i) => (
                        <div key={i} className="relative aspect-square rounded overflow-hidden">
                            <OptimizedImage
                                src={med}
                                fill
                                className="object-cover"
                                alt="Property image"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-[40vw] aspect-[20/18] relative">
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