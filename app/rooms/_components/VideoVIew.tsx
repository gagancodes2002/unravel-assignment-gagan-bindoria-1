import { useState, useCallback } from "react";
import { Pause, PlayIcon, VolumeOff, Volume } from "lucide-react";
import OptimizedVideo from "@/app/shared/ui/media/OptimizedVideo";

interface VideoViewProps {
    media: string;
    videoPlayerRef: React.RefObject<HTMLVideoElement | null>;
    isPlaying: boolean;
    onPlayPause: () => void;
    className?: string;
}

export default function VideoView({
    media,
    videoPlayerRef,
    isPlaying,
    onPlayPause,
    className = ''
}: VideoViewProps) {
    const [isMuted, setIsMuted] = useState(true);

    const handleMuteToggle = useCallback(() => {
        if (videoPlayerRef.current) {
            videoPlayerRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    }, [isMuted, videoPlayerRef]);

    return (
        <div
            className={`
                h-full w-full relative overflow-hidden rounded bg-gray-900 cursor-pointer group
                ${className}
            `}
            onClick={(e) => {
                e.stopPropagation();
                onPlayPause();
            }}
        >
            {/* Video Player */}
            <OptimizedVideo
                src={media}
                videoPlayerRef={videoPlayerRef}
                muted={isMuted}
                loop
                className="w-auto min-w-full object-cover"
                height="100%"
                width="100%"
            />

            {/* Video Controls Overlay - Only shown when not playing */}
            {!isPlaying && (
                <div className="video-controls absolute inset-0 flex items-center justify-center bg-black/30 opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    <button className="w-14 h-14 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-800 transition-colors duration-200">
                        {isPlaying ? (
                            <Pause className="text-2xl" />
                        ) : (
                            <PlayIcon className="text-2xl" />
                        )}
                    </button>
                </div>
            )}

            {/* Mute/Unmute Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleMuteToggle();
                }}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
            >
                {isMuted ? (
                    <VolumeOff className="text-sm" />
                ) : (
                    <Volume className="text-sm" />
                )}
            </button>
        </div>
    );
}