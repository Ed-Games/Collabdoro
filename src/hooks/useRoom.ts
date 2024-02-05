import { IRoom } from "@/interfaces/Room";
import { database } from "@/services/firebase";
import { onValue, ref, set, update } from "firebase/database";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { uuidv4 } from "@firebase/util";

export const useRoom = () => {
  const [room, setRoom] = useState<IRoom>({} as IRoom);
  const router = useRouter();

  const create = async (name: string, userId: string) => {
    try {
      const roomRef = ref(database, "rooms/" + uuidv4());
      await set(roomRef, {
        name,
        adminId: userId,
        createdAt: Date.now()
      });
      router.push(`/rooms/${roomRef.key}`);
    } catch (error) {
      toast.error("Houve um erro ao tentar criar a sala.");
    }
  };

  const end = async (roomId: string) => {
    const roomRef = ref(database, `rooms/${roomId}`);
    await update(roomRef, { endedAt: Date.now() });
  };

  const load = useCallback((roomId: string) => {
    const roomRef = ref(database, `rooms/${roomId}`);
    onValue(roomRef, async (snapshot) => {
      const localRoom: IRoom = snapshot.val();
      if (localRoom.endedAt) {
        router.push("/");
      }

      setRoom(localRoom);
    });
  }, [router]);

  return { room, create, end, load };
};
