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
        <Skeleton
            className={`30vh w-full`}
        />
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



            {/* <Card>
                <CardHeader>
                    <CardTitle>View By Day</CardTitle>
                </CardHeader>
                <CardContent>
                    Checking
                </CardContent>
            </Card> */}

        </div >
    )

}

