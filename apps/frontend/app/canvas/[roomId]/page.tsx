import { RoomCanvas } from "@/components/RoomCanvas";

export default async function CanvasPage({ params }: {
    params: {
        roomId: string
    }
}) {
    const roomId = (await params).roomId;

    return <RoomCanvas roomId={roomId} />
   
}