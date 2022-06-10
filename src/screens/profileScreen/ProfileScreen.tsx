import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Button from "../../components/Button/Button";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import { signOutAction } from "../../sagas/deezerSaga";
import { selectUserEmail, selectUserName, selectUserPicture } from "../../slices/userSlice";
import styles from "./ProfileScreen.module.sass";

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();

  const name = useAppSelector(selectUserName);
  const email = useAppSelector(selectUserEmail);
  const picture = useAppSelector(selectUserPicture);

  const handleSignOutClick = () => dispatch(signOutAction());

  return (
    <ScreenContainer>
      <div className={styles.profile_screen}>
        <img src={picture} className={styles.profile_screen__picture} />
        <span className={styles.profile_screen__name}>{name}</span>
        <span className={styles.profile_screen__email}>{email}</span>
        <Button className={styles.profile_screen__sign_out_button} title="Sign out" onCLick={handleSignOutClick} />
      </div>
    </ScreenContainer>
  );
};
