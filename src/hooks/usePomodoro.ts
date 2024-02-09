import { IPomodoro } from "@/interfaces/Pomodoro";
import { database } from "@/services/firebase";
import { onValue, ref, update } from "firebase/database";
import { useState } from "react";

export const useSyncTimer = () => {
  const [pomdoro, setPomodoro] = useState<IPomodoro>();

  const syncPomodoro = async (key: string, data: Partial<IPomodoro>) => {
    const pomodororRef = ref(database, `pomodoros/${key}`);
    await update(pomodororRef, data);
  };

  const listenToSyncPomodoroChanges = (key: string) => {
    const pomodoroRef = ref(database, `pomodoros/${key}`);
    onValue(pomodoroRef, async (snapshot) => {
      setPomodoro(snapshot.val());
    });
  };

  return { pomdoro, syncPomodoro, listenToSyncPomodoroChanges };
};
