import { IUser } from "@/interfaces/User";
import { database } from "@/services/firebase";
import { get, onValue, ref, remove, set } from "firebase/database";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const useUserRoom = () => {
  const [users, setUsers] = useState<IUser[]>();
  const searchParams = useSearchParams();
  const addUserToRoom = async (user: IUser) => {
    const userRef = ref(
      database,
      `users/${searchParams.get("slug")}/${user.id}`
    );
    await set(userRef, user);
  };

  const loadUsersFromRoom = () => {
    const userRef = ref(database, `users/${searchParams.get("slug")}`);
    onValue(userRef, async (snapshot) => {
      const rawUsers = snapshot.val();
      const parsedUsers: IUser[] = Object.keys(rawUsers).map(
        (key) => rawUsers[key as any]
      );

      setUsers(parsedUsers);
    });
  };

  const removeUserFromRoom = async (userId: string) => {
    const userRef = ref(
      database,
      `users/${searchParams.get("slug")}/${userId}`
    );
    await remove(userRef);
  };

  const isUserInRoom = async (userId: string) => {
    const userRef = ref(
      database,
      `users/${searchParams.get("slug")}/${userId}`
    );
    const result = await get(userRef);

    return Boolean(result);
  };

  return { users, addUserToRoom, loadUsersFromRoom, removeUserFromRoom, isUserInRoom };
};
