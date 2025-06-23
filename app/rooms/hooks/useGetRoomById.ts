import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query"
import { roomService } from "../services/roomService"
import { Room } from "../schema/rooms.types"

export const useGetRoomById = (id: string) => {

    const queryCient = useQueryClient();

    return useQuery<Room, Error>({
        queryKey: ['room', id],
        queryFn: () => roomService.fetchRoomById(id),
        initialData: () => {
            const cachedRoom = queryCient.getQueryData<Room>(['room', id]);
            if (cachedRoom) return cachedRoom;

            // If not found then, try to extract from rooms
            // If not found, try to extract from rooms list
            const roomsData = queryCient.getQueryData<{ pages: Room[] }>(['rooms'])?.pages.flat();

            debugger;
            if (roomsData?.length) {
                return roomsData[parseInt(id)];
            }
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}