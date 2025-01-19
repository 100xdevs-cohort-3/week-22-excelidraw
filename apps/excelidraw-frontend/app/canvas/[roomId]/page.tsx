import { RoomCanvas } from "@/components/RoomCanvas";
import { getVerifiedToken } from "@/lib/cookie";

export default async function CanvasPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const roomId = (await params).roomId;
  const token = await getVerifiedToken();

  return <RoomCanvas roomId={roomId} token={token} />;
}
