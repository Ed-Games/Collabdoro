"use client";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { useRoom } from "../../../hooks/useRoom";
import { toast } from "react-toastify";

import styles from "./styles.module.scss";
import { BottomTabNavigator } from "./components/BottomTabNavigator";
import { Loader } from "./components/Loader";
import Header from "./components/Header";
import { useSearchParams } from "next/navigation";
import { Board } from "./Board";
import { useUserRoom } from "@/hooks/useUserRoom";
import Pomodoro from "./components/Pomodoro";

const Room: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { room, load, end } = useRoom();
  const { users, removeUserFromRoom } = useUserRoom();

  const closeRoom = () => {
    toast.warning("A sala foi encerrada");
    end(searchParams.get("slug")!);
  };

  useEffect(() => {
    if (user === undefined) return;

    if (!user || user.removed) {
      router.push("/");
      return;
    } else {
      load(searchParams.get("slug")!);
    }
  }, [load, router, searchParams, user]);

  return (
    <div id="room" className={`container ${styles.roomContainer}`}>
      <Head>
        <title>Anydoro | Timer </title>
      </Head>

      <Header isAdmin={user?.id === room.adminId} onClose={closeRoom} />

      <Pomodoro isAdmin={user?.id === room.adminId} />

      {user && users && (
        <Board
          currentUser={user}
          users={users}
          onRemoveUser={removeUserFromRoom}
        />
      )}

      <BottomTabNavigator />
      {!room && <Loader />}
    </div>
  );
};

export default Room;
