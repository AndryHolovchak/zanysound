import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { changeDeezerToken } from "../../slices/deezerSlice";

export const CallbackScreen = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const paramsString = "?" + window.location.hash.slice(1);
    const params = new URLSearchParams(paramsString);
    const token = params.get("token|access_token");

    dispatch(changeDeezerToken(token || ""));
    history.push("/");
  }, []);

  return <></>;
};
