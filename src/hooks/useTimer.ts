import { Mode, Time } from "@/enums";
import { ITimerOptions } from "@/interfaces/timerOptions";
import { useCallback, useEffect, useState } from "react";

let TimeOut: NodeJS.Timeout;

export const useTimer = () => {
  const [time, setTime] = useState<number>(Time.POMODORO);

  const [timerOptions, setTimerOptions] = useState<ITimerOptions>({
    longBreak: Time.LONGBREAK,
    pomodoro: Time.POMODORO,
    shortBreak: Time.SHORTBREAK,
  });

  const [isActive, setIsActive] = useState<boolean>(false);
  const [mode, setMode] = useState<string>(Mode.POMODORO);
  const [cyclesCount, setCyclesCount] = useState<number>(0);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startTimer = () => {
    setPomodoroState(Mode.POMODORO, Time.POMODORO, true);
  };

  const resetTimer = useCallback(() => {
    clearTimeout(TimeOut);
    setCyclesCount(0);
    setIsActive(false);
    setPomodoroState(Mode.POMODORO, timerOptions.pomodoro, false);
  }, [timerOptions.pomodoro]);

  const setPomodoroState = (mode: Mode, time: Time, isActive = true) => {
    setMode(mode);
    setTime(time);
    setIsActive(isActive);
  };

  const handleNextStep = useCallback(() => {
    switch (mode) {
      case Mode.POMODORO:
        if (cyclesCount < 3) {
          setPomodoroState(Mode.SHORTBREAK, timerOptions.shortBreak);
        } else {
          setPomodoroState(Mode.LONGBREAK, timerOptions.longBreak);
        }
        break;

      case Mode.SHORTBREAK:
        setPomodoroState(Mode.POMODORO, timerOptions.pomodoro);
        break;

      case Mode.LONGBREAK:
        resetTimer();
        break;

      default:
        break;
    }
  }, [cyclesCount, mode, resetTimer, timerOptions]);

  useEffect(() => {
    if (isActive && time > 0) {
      TimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time == 0) {
      handleNextStep();
    }
  }, [isActive, time, handleNextStep]);

  return {
    mode,
    time,
    setTime,
    timerOptions,
    setTimerOptions,
    cyclesCount,
    minutes,
    seconds,
    isActive,
    startTimer,
    resetTimer
  };
};
