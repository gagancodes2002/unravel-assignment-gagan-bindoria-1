import { PageErrorBoundary } from "@/shared/ui/error/PageErrorBoundary";
import RoomList from "./_components/RoomList";

export default function () {



    return (
        <PageErrorBoundary
            pageName="Room Listing"
        >
            <RoomList />
        </PageErrorBoundary>
    )
}