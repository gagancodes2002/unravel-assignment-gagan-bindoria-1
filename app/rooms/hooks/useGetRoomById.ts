import { useQuery } from "@tanstack/react-query"
import { roomService } from "../services/roomService"
import { Room } from "../schema/rooms.types"

export const useGetRoomById = (id: string) => {
    return useQuery<Room, Error>({
        queryKey: ['room', id],
        queryFn: () => roomService.fetchRoomById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}