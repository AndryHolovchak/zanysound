import React, { useCallback, useEffect } from "react";
import "./App.sass";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { changeIsMobileEnv, selectIsMobileEnv } from "./appSlice";

function App() {
  const isMobile = useAppSelector(selectIsMobileEnv);
  const dispatch = useAppDispatch();

  const handleWindowResize = useCallback(() => {
    const windowWidth = window.innerWidth;

    if (+(windowWidth < 1024) ^ +isMobile) {
      dispatch(changeIsMobileEnv(!isMobile));
    }
  }, [isMobile, dispatch]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  useEffect(() => {
    dispatch(changeIsMobileEnv(window.innerWidth < 1024));
  }, [dispatch]);
  return (
    <div className="App">
      <h4>Hello World!</h4>
    </div>
  );
}

export default App;
