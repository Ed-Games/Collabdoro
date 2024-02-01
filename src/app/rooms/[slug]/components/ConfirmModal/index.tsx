import { Modal } from "../Modal";
import styles from "./styles.module.scss";

interface IConfirmModalProps {
  isVisible: boolean;
  title: string;
  description?: string;
  labelConfirm?: string;
  labelCancel?: string;
  setIsVisible: (arg: boolean) => void;
  onConfirm: () => void;
}

export const ConfirmModal = ({
  isVisible,
  title,
  description,
  labelCancel,
  labelConfirm,
  setIsVisible,
  onConfirm,
}: IConfirmModalProps) => {
  return (
    <Modal isVisible={isVisible} setIsModalVisible={setIsVisible}>
      <h2>{title}</h2>
      <span>{description}</span>
      <div className={styles.btnContainer}>
        <button onClick={() => setIsVisible(false)}>
          {labelCancel ? labelCancel : "Cancelar"}
        </button>
        <button onClick={onConfirm}>
          Sim, {labelConfirm ? labelConfirm : "Confirmar"}
        </button>
      </div>
    </Modal>
  );
};
