import { Icon } from "../../Icons";
import { useState } from "react";
import "./SearchRes.css";
import { useSelector, useDispatch } from "react-redux";
import { selectPodcasts } from "../../stores/podcastSlice";
import { setCurrent } from "../../stores/player";

function Search() {
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();
  const { current, playing, controls } = useSelector((state) => state.player);

  const inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const { podcasts } = useSelector(selectPodcasts);

  const updateCurrent = (item) => {
	setInputText('')
    if (current.id === item.id) {
      if (playing) {
        controls.pause();
      } else {
        controls.play();
      }
    } else {
      dispatch(setCurrent(item));
    }
  };

  function addThreeDots(str) {
    if (str.length > 35) {
      return str.substring(0, 35) + "...";
    }
    return str;
  }

  const filteredpodcasts = podcasts.filter((el) => {
    //if no input then return the original
    if (inputText === "") {
      return null;
    }
    //return the item which contains the user input
    else {
      return el.title.toLowerCase().includes(inputText);
    }
  });

  return (
    <>
      <div className="mr-auto ml-4 relative">
        <label
          htmlFor="search-input"
          className="text-black w-12 h-10 flex items-center justify-center absolute top-0 left-0"
        >
          <Icon size={24} name="search" />
        </label>
        <input
          autoFocus={true}
          onChange={inputHandler}
		  value={inputText}
          type="text"
          id="search-input"
          className="h-10 pl-12 outline-none text-black font-medium bg-white rounded-3xl text-sm placeholder-black/50 max-w-full w-[22.75rem]"
          placeholder="Search for your fav podcast here"
        />

        <div className="searchres">
          <div className="searchres__wrapper">
            <ul className="searchres__list">
              {filteredpodcasts.map((item) => (
					  <li
					  onClick={() => updateCurrent(item)}
					  className="seacrchres__item"
					  key={item.id}
					  >
                  <img className="search__img" src={item.image} alt="" />
                  <span>{addThreeDots(item.title)}</span>
                </li>
			  ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
