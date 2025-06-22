import OptimizedImage from "@/app/shared/ui/media/OptimizedImage";
import mapImage from '@/public/images/rooms/map.png'

export default function ExploreOnMap() {
    return (
        <div className="w-full max-w-full sm:max-w-60 md:max-w-full aspect-square max-h-48 sm:max-h-60 md:max-h-55 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg bg-white shadow-sm">
            <div className="h-3/4 relative overflow-hidden">
                <OptimizedImage
                    fill
                    src={mapImage.src}
                    alt="Explore on map"
                    className="object-cover"
                />
            </div>
            <div className="h-1/4 flex justify-center items-center px-2">
                <p className="text-sm font-semibold text-blue-600 text-center hover:underline">
                    View on map
                </p>
            </div>
        </div>
    );
}