"use client"

import { useCallback, useMemo } from "react";
import TopInput from "./TopInput";
import { useInView } from "react-intersection-observer";
import { useInfiniteRooms } from "../hooks/useInfinityRooms";
import { useRouter } from "next/navigation";
import Skeleton from "./Skeleton/Skeleton";
import RoomCard from "./RoomCard";
import LazyComponentWrapper from "@/app/shared/ui/lazy-loading/LazyComponentWrapper";
import { Room } from "../schema/rooms.types";

function RoomCardSkeletonComponent() {

    return (

        <Skeleton
            className={`
             z-0 max-w-full grid justify-center items-center
             grid-cols-1 md:grid-cols-[auto_1fr]
             grid-rows-[auto_auto] md:grid-rows-1
             h-auto md:h-[32vh] md:max-h-70 sm:min-h-[58vh] md:min-h-65
             gap-0 md:gap-3
             p-1 sm:p-1.5 md:p-2
             bg-white border border-gray-200 rounded-lg shadow-lg
             transition-all duration-300 ease-in-out
             hover:scale-[1.01]  hover:border-gray-300 gap-2
        `}
        >
            {/* Media Container */}
            <Skeleton className={`
                rounded-lg  aspect-square relative
                w-full md:w-auto h-auto md:h-full md:max-w-none
                justify-center overflow-hidden p-2 md:
            `
            } />

            <div
                className="  flex flex-col gap-2 justify-between h-full md:space"
            >
                {/* Skeleton Lines */}
                {Array.from({ length: 4 }).map((_, index) =>
                    <Skeleton
                        key={index}
                        className={`h-6 md:min-h-auto `} />
                )}
            </div>

        </Skeleton >
    )
}

function RoomListSkeletonComponent() {
    return (
        <div
            className="px-6 text-neutral-600 md:max-w-7xl mx-auto gap-2  flex flex-col justify-center items-center space-y-12"

        >
            <div
                className="flex flex-row bg-white w-full gap-2 p-2 rounded-md"
            >
                {Array.from({ length: 3 }).map((_, index: number) => (

                    <Skeleton
                        key={index}
                        className="w-full h-6 md:h-12"
                    />
                ))}

            </div>



            <div className="md:col-span-3 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 sm:gap-6">
                    {Array.from({ length: 3 }).map((_, roomIndex: number) => (
                        <div
                            key={roomIndex}
                            onClick={(e) => {
                                e.stopPropagation();
                                // handleRoomSelection(roomIndex);
                            }}
                            className="cursor-pointer"
                        >
                            <RoomCardSkeletonComponent key={roomIndex} />

                        </div>
                    ))}
                </div>

            </div>


        </div>
    )
}


export default function (props: any) {

    const router = useRouter();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteRooms();



    const { ref } = useInView({
        threshold: 0.1,
        onChange: (InView) => {
            if (InView && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }
    })

    // Memoized Values
    const loadedRooms = useMemo(() => {
        if (!data?.pages?.length) return [];
        return data.pages.flat();


    }, [data?.pages])

    const handleRoomNavigation = useCallback((roomIndex: number) => {
        router.push(`/rooms/${roomIndex}`)
    }, [])




    if (isLoading) {
        return <RoomListSkeletonComponent />
    }



    return (
        <div
            className="px-6 text-neutral-600 md:max-w-7xl mx-auto  flex flex-col justify-center items-center space-y-12"
        >

            <div
                className="w-full"
            >
                <TopInput />
            </div>

            {/* Rooms Grid */}
            <div className="md:col-span-3 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 sm:gap-6">
                    {loadedRooms.map((room: Room, roomIndex: number) => (
                        <div
                            key={roomIndex}
                            onClick={(e) => {
                                e.stopPropagation();
                                // handleRoomSelection(roomIndex);
                            }}
                            className="cursor-pointer"
                        >
                            <LazyComponentWrapper
                                key={roomIndex}
                                threshold={0.1}
                            >
                                <RoomCard roomIndex={roomIndex} room={room} />
                            </LazyComponentWrapper>
                        </div>
                    ))}
                </div>

                {/* Loading Indicator */}
                <div
                    ref={ref}
                    className="flex justify-center items-center py-8 min-h-20"
                >
                    {isFetchingNextPage && (
                        <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {!hasNextPage && loadedRooms.length > 0 && (
                        <p className="text-sm text-gray-500 italic">
                            No more results to load
                        </p>
                    )}
                </div>
            </div>

        </div >
    )

}

