"use client";
import { NextPage } from "next";
import styles from "./styles.module.scss";
import logo from "../../../../public/logo.svg";
import Image from "next/image";
import { Formik } from "formik";
import Link from "next/link";
import { Presentation } from "@/app/login/presentation";
import { CreateRoomSchema } from "@/validators/createRoomSchema";
import { useRoom } from "@/hooks/useRoom";
import { useAuth } from "@/hooks/useAuth";

const NewRoom: NextPage = () => {
  const { user } = useAuth();
  const { create } = useRoom();
  return (
    <div className={styles.container}>
      <Presentation />
      <main className={styles.createRoom}>
        <div className={styles.logo}>
          <Image src={logo} alt="Anydoro logo" />
        </div>
        <h2>Criar uma nova sala</h2>
        <Formik
          initialValues={{ name: "" }}
          validationSchema={CreateRoomSchema}
          onSubmit={(values) => create(values.name, user!.id)}
        >
          {({ handleChange, handleSubmit, errors }) => (
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                onChange={handleChange}
                placeholder="Nome da sala"
                aria-label="nome da sala"
              />
              {errors.name && <span className="error">{errors.name}</span>}
              <button type="submit">Criar sala</button>
              <span>
                Quer entrar numa sala existente?
                <Link href="/">Clique aqui</Link>
              </span>
            </form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default NewRoom;
