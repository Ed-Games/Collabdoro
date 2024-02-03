import { Formik } from "formik";
import styles from "./styles.module.scss";
import { TimeInput } from "../TimeInput";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "../../../Modal";
import { timerOptionsSchema } from "@/validators/timerOptionsSchema";
import { textToSenconds } from "@/utils/textToSeconds";
import { ITimerOptions } from "@/interfaces/timerOptions";

interface ITimerOptionsProps {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
  timerOptions: ITimerOptions;
  setTimerOptions: Dispatch<SetStateAction<ITimerOptions>>;
}

export const TimerOptions = ({
  isVisible,
  setIsVisible,
  timerOptions,
  setTimerOptions,
}: ITimerOptionsProps) => {
  const [initialValues, setInitialValues] = useState<ITimerOptions>();

  const handleSavePomodoroOptions = async (options: ITimerOptions) => {
    const pomodoro = textToSenconds(String(options.pomodoro));
    const shortBreak = textToSenconds(String(options.shortBreak));
    const longBreak = textToSenconds(String(options.longBreak));

    const timerOptions = {
      pomodoro,
      shortBreak,
      longBreak,
    };
    //await handleSetRoomTimerOptions(timerOptions);
    setTimerOptions(timerOptions);

    setIsVisible(false);
  };

  useEffect(() => {
    if (timerOptions) {
      setInitialValues({
        pomodoro: textToSenconds(String(timerOptions.pomodoro)),
        shortBreak: textToSenconds(String(timerOptions.shortBreak)),
        longBreak: textToSenconds(String(timerOptions.longBreak)),
      });
    }
  }, [timerOptions]);

  return (
    <Modal isVisible={isVisible} setIsModalVisible={setIsVisible}>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={timerOptionsSchema}
          onSubmit={(values) => handleSavePomodoroOptions(values)}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form onSubmit={handleSubmit} className={styles.content}>
              <h3>Configurar Timer</h3>
              <div className={`row-wrapper ${styles.InputContainer}`}>
                <TimeInput
                  title="Pomodoro"
                  name="pomodoro"
                  value={String(values.pomodoro)}
                  error={errors.pomodoro}
                  showError={touched.pomodoro}
                  onChange={handleChange}
                />
                <TimeInput
                  title="Short Break"
                  name="shortBreak"
                  value={String(values.shortBreak)}
                  error={errors.shortBreak}
                  showError={touched.shortBreak}
                  onChange={handleChange}
                />
                <TimeInput
                  title="Long Break"
                  name="longBreak"
                  value={String(values.longBreak)}
                  error={errors.longBreak}
                  showError={touched.longBreak}
                  onChange={handleChange}
                />
              </div>

              <div className={`row-wrapper ${styles.btnContainer}`}>
                <button type="button" onClick={() => setIsVisible(false)}>
                  Cancelar
                </button>
                <button type="submit">Salvar</button>
              </div>
            </form>
          )}
        </Formik>
      )}
    </Modal>
  );
};
