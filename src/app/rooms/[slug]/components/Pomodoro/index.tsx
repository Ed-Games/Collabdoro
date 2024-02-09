import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { Mode } from "@/enums";
import { Progressbar } from "./components/ProgressBar";
import { TimerOptions } from "./components/TimerOptions";
import { useTimer } from "@/hooks/useTimer";
import { TimerDisplay } from "./TimerDisplay";
import { ModeTabs } from "./components/ModeTabs";
import ControlButtons from "./components/ControlButtons";

export const AdminPomodoro = () => {
  const [openConfigModal, setOpenConfigModal] = useState<boolean>(false);
  const notificationAudioRef = useRef<HTMLAudioElement>();
  const startAudioRef = useRef<HTMLAudioElement>();

  const {
    minutes,
    seconds,
    mode,
    startTimer,
    resetTimer,
    togglePauseTimer,
    cyclesCount,
    isActive,
    isPaused,
    timerOptions,
    setTimerOptions,
  } = useTimer();

  const handleStartTimer = () => {
    startTimer();
    startAudioRef.current?.play();
  };

  useEffect(() => {
    switch (mode) {
      case Mode.LONGBREAK:
        toast.success(
          "Parabens! Você completou um ciclo. Que tal uma pausa para o café?",
          { pauseOnFocusLoss: false }
        );
        break;
      case Mode.SHORTBREAK:
        toast.success("Hora de fazer uma pequena pausa", {
          pauseOnFocusLoss: false,
        });
        break;
      case Mode.POMODORO:
        if (isActive) {
          toast.success("Hora de focar!!", { pauseOnFocusLoss: false });
        }
        break;
      default:
        break;
    }
  }, [mode, isActive]);

  useEffect(() => {
    if (cyclesCount < 1 && mode === Mode.POMODORO) {
      return;
    } else {
      notificationAudioRef.current?.play();
    }
  }, [cyclesCount, mode]);

  return (
    <div className={styles.pomodoro}>
      <ModeTabs currentMode={mode} onModeChange={() => {}} />

      <div className={styles.line}></div>

      <TimerDisplay minutes={minutes} seconds={seconds} />

      <Progressbar isActive={isActive} value={(cyclesCount / 4) * 100} />

      <ControlButtons
        isActive={isActive}
        isAdmin
        isPaused={isPaused}
        onCancel={resetTimer}
        onConfigure={() => setOpenConfigModal(true)}
        onPause={togglePauseTimer}
        onStart={handleStartTimer}
      />

      <TimerOptions
        isVisible={openConfigModal}
        setIsVisible={setOpenConfigModal}
        timerOptions={timerOptions}
        setTimerOptions={setTimerOptions}
      />
      <audio ref={notificationAudioRef as any} src="/notification-sound.mp3" />
      <audio ref={startAudioRef as any} src="/start-sound.mp3" />
    </div>
  );
};
