import React from "react";
import { useAppDispatch } from "../../app/hooks";
import Button from "../../components/Button/Button";
import { signInByRedirect } from "../../sagas/deezerSaga";
import mobileStyles from "./welcomeScreenMobile.module.sass";

export const WelcomeScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={mobileStyles.welcome_screen}>
      <Button
        title="Sign in by Deezer"
        className={mobileStyles.welcome_screen_sign_in_button}
        onCLick={() => dispatch(signInByRedirect({ dispatch }))}
      />
    </div>
  );
};
