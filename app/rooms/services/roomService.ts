import { Room } from "@/app/rooms/schema/rooms.types"
import { fetcher } from "@/shared/lib/utils/fetcher"

export const roomService = {
    fetchRooms: async (page: number): Promise<Room[]> => {
        return fetcher<Room[]>(`/api/rooms?page=${page}`)
    },
    fetchRoomById: async (roomId: string): Promise<Room> => {
        return fetcher<Room>(`/api/rooms/${roomId}`)
    }
};