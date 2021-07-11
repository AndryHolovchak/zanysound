import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import Tracklist from "../../components/Tracklist/Tracklist";
import { selectSearchResult } from "../../slices/searchSlice";
import style from "./searchScreen.module.sass";

const SearchScreen: React.FC = () => {
  const searchResult = useAppSelector(selectSearchResult);

  return (
    <ScreenContainer>
      <div className={style.search_screen}>
        <SearchScreenInput />
        <Tracklist
          tracks={searchResult}
          className={style.search_screen__tracklist}
        />
      </div>
    </ScreenContainer>
  );
};

const SearchScreenInput = () => {
  const [value, setValue] = useState("");

  return (
    <div className={style.search_screen_input}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
      ></input>
    </div>
  );
};

export default SearchScreen;
