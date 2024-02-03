import { Mode, Time } from "@/enums";
import { ITimerOptions } from "@/interfaces/timerOptions";
import { useState } from "react";

export const useTimer = () => {
  const [time, setTime] = useState<number>(Time.POMODORO);
  const [timerOptions, setTimerOptions] = useState<ITimerOptions>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mode, setMode] = useState<string>(Mode.POMODORO);
  const [cyclesCount, setCyclesCount] = useState<number>(0);
  const [hasFinished, setHasFinished] = useState<boolean>(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startTimer = () => {
    setHasFinished(false);
    setIsActive(true);
  };

  return {
    time,
    setTime,
    timerOptions,
    setTimerOptions,
    minutes,
    seconds,
    isActive,
    startTimer,
  };
};
