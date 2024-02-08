import styles from "./styles.module.scss";

interface IControlButtonsProps {
  isActive: boolean;
  isPaused: boolean;
  isAdmin: boolean;
  onStart: () => void;
  onPause: () => void;
  onCancel: () => void;
  onConfigure: () => void;
}

const ControlButtons = ({
  isActive,
  isPaused,
  isAdmin,
  onStart,
  onPause,
  onCancel,
  onConfigure,
}: IControlButtonsProps) => {
  return (
    <div className={styles.controlButtonsContainer}>
      {!isActive && isAdmin && (
        <>
          <button
            disabled={isPaused}
            onClick={onConfigure}
            className={styles.btnConfig}
          >
            Configurar ciclo
          </button>
          <button
            onClick={isPaused ? onPause : onStart}
            className={styles.btnStart}
          >
            {isPaused ? "Continuar" : "Iniciar"}
          </button>
        </>
      )}

      {isActive && (
        <>
          <button className={styles.btnConfig} onClick={onPause}>
            Pausar
          </button>
          <button className={styles.btnStop} onClick={onCancel}>
            Cancelar
          </button>
        </>
      )}
    </div>
  );
};

export default ControlButtons;
