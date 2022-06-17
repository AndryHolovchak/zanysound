import React, { KeyboardEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Icon from "../../components/Icon/Icon";
import { IconType } from "../../components/Icon/iconCommonDefinition";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import Tracklist from "../../components/Tracklist/Tracklist";
import { searchTrack } from "../../sagas/searchSaga";
import { changeSearchResult, selectSearchResult, selectSearchResultId } from "../../slices/searchSlice";
import style from "./searchScreen.module.sass";

const SearchScreen: React.FC = () => {
  const searchResult = useAppSelector(selectSearchResult);
  const searchResultId = useAppSelector(selectSearchResultId);

  return (
    <ScreenContainer>
      <div className={style.search_screen}>
        <SearchScreenInput />
        {searchResult ? (
          <Tracklist id={searchResultId} tracks={searchResult} className={style.search_screen__tracklist} />
        ) : (
          <span className={style.search_screen__no_results}>No results</span>
        )}
      </div>
    </ScreenContainer>
  );
};

const SearchScreenInput = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  const handleSearch = () => {
    dispatch(changeSearchResult([]));
    dispatch(searchTrack({ query: value, startIndex: 0 }));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={style.search_screen_input} onKeyDown={handleKeyDown}>
      <div className={style.search_screen_input__icon_container} onClick={handleSearch}>
        <Icon
          stopClickPropagation={false}
          name="search"
          type={IconType.Solid}
          className={style.search_screen_input__icon}
        />
      </div>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search"></input>
    </div>
  );
};

export default SearchScreen;
