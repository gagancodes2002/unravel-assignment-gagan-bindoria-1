import { useInfiniteQuery } from "@tanstack/react-query"
import { roomService } from "../services/roomService"

export const useInfiniteRooms = () => {
    return useInfiniteQuery({
        queryKey: ['rooms'],
        queryFn: ({ pageParam = 0 }) => roomService.fetchRooms(pageParam as number),
        initialPageParam: 0,
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.length === 0) return undefined;

            return allPages?.length
        }
    })
}