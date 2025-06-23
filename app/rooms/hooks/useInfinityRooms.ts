import { useInfiniteQuery } from "@tanstack/react-query"
import { roomService } from "../services/roomService"

export const useInfiniteRooms = () => {
    return useInfiniteQuery({
        queryKey: ['rooms'],
        queryFn: ({ pageParam = 0 }) => roomService.fetchRooms(pageParam as number),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.length === 0) return undefined;

            return allPages?.length
        },
        staleTime: 10 * 60 * 1000, // 10 minutes - won't refetch for 10 mins
        refetchOnWindowFocus: false, // Prevent refetch on tab focus
        refetchOnMount: false,       // Don't refetch when component mounts
    })
}