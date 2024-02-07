import styles from './styles.module.scss';

interface ITimerDisplayProps {
  minutes: number;
  seconds: number;
}

export const TimerDisplay = ({ minutes, seconds }: ITimerDisplayProps) => {
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div className={styles.timer}>
      <span>
        {minuteLeft}
        {minuteRight}:{secondLeft}
        {secondRight}
      </span>
    </div>
  );
};
