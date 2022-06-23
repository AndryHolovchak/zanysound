import { generateId } from "./../utils/common";
import React, { useState } from "react";

export const useForceUpdate = () => {
  const [value, setValue] = useState("");

  return () => setValue(generateId());
};
