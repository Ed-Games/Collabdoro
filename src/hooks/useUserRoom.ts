import { IUser } from "@/interfaces/User"
import { database } from "@/services/firebase"
import { get, ref, remove } from "firebase/database"
import { useSearchParams } from "next/navigation"

export const useUserRoom = () => {
  const searchParams = useSearchParams();
  const addUserToRoom = (user: IUser) => {

  }

  const removeUserFromRoom = async(userId: string) => {
    const userRef = ref(database, `users/${searchParams.get('slug')}/${userId}`);
    await remove(userRef);
  }

  const isUserInRoom = async(userId: string) => {
    const userRef = ref(database, `users/${searchParams.get('slug')}/${userId}`);
    const result = await get(userRef);

    return Boolean(result);
  }


  return {addUserToRoom, removeUserFromRoom, isUserInRoom}
}