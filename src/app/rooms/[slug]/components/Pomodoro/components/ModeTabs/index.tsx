import { Mode } from "@/enums";
import styles from './styles.module.scss'

interface IModeTabsProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

export const ModeTabs = ({ currentMode, onModeChange }: IModeTabsProps) => {
  return (
    <div className={styles.tabs}>
      {Object.values(Mode).map((mode) => (
        <button
          key={mode}
          className={currentMode === mode ? styles.active : ""}
          onClick={() => onModeChange(mode)}
        >
          {mode}
        </button>
      ))}
    </div>
  );
};
