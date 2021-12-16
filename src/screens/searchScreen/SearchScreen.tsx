import React, { KeyboardEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Icon from "../../components/Icon/Icon";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import Tracklist from "../../components/Tracklist/Tracklist";
import { searchTrack } from "../../sagas/searchSaga";
import { selectSearchResult } from "../../slices/searchSlice";
import style from "./searchScreen.module.sass";

const SearchScreen: React.FC = () => {
  const searchResult = useAppSelector(selectSearchResult);

  return (
    <ScreenContainer>
      <div className={style.search_screen}>
        <SearchScreenInput />
        <Tracklist tracks={searchResult} className={style.search_screen__tracklist} />
      </div>
    </ScreenContainer>
  );
};

const SearchScreenInput = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  const handleSearch = () => {
    dispatch(searchTrack({ query: value }));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={style.search_screen_input} onKeyDown={handleKeyDown}>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search"></input>
    </div>
  );
};

export default SearchScreen;
