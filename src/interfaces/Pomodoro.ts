import { Mode } from "@/enums";

export interface IPomodoro {
  isActive: boolean;
  isPaused: boolean;
  mode: Mode;
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  created_at: Date;
  updated_at: Date;
}
