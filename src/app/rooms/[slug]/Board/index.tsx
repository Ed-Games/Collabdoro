import Image from "next/image";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";
import { IUser } from "@/interfaces/User";

interface IBoardProps {
  users: IUser[];
  currentUser: IUser;
  onRemoveUser: (userId: string) => void;
}

export const Board = ({currentUser, users, onRemoveUser}: IBoardProps) => {
  return (
    <aside className={styles.boardContainer}>
      <div className={styles.tabs}>
        <button className={styles.selected} type="button">
          Tarefas
        </button>
        <button type="button">Equipe</button>
        <button type="button">chat</button>
      </div>
      <div className={styles.line} />
      <ul className={styles.usersList}>
        {users?.map((user) => (
          <li key={user.id}>
            {user.avatar ? (
              <div className={styles.avatar}>
                <Image
                  layout="fill"
                  src={user.avatar}
                  alt={`imagem avatar do usuário ${user.name}`}
                />
              </div>
            ) : (
              <div className={styles.avatarPlaceholder}>{user.name[0]}</div>
            )}

            <div className={styles.userInfo}>
              <span>{user.name}</span>
              <p>{user.isAdmin ? "Admin" : "Membro"}</p>
            </div>

            <FiX
              onClick={() => onRemoveUser(user.id)}
              className={
                currentUser.isAdmin && currentUser.id !== user.id ? styles.showIcon : ""
              }
              size={24}
              color="var(--dark-red)"
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};
