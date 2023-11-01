import React, { useState, useRef } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useInputsTagStore } from "../stores/input";
import styles from "./Home.module.scss";
import Tag from "../components/TagInput";
import { renderToString } from "react-dom/server";

function Home() {
  const [matchedTags, setMatchedTags] = useState([]);
  const [inputText, setInputText] = useState("");
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const inputContainer = useRef(null);

  const { isLoading, error, data } = useQuery("repoData", () =>
    axios.get("https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete")
  );
  const setNewTagInputs = useInputsTagStore((state) => state.setNewTagInputs);
  const tagInputs = useInputsTagStore((state) => state.tagInputs);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  setNewTagInputs(data.data);

  const findMatchNames = (e) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setPosition({ top: rect.bottom, left: rect.left });
    }

    const newWord = e.target.innerHTML
      .split("</span>")
      .pop()
      .replace(/&nbsp;|[+\-*()^/()…..]/g, " ")
      .trim();
    setInputText(newWord);

    if (!newWord) {
      setMatchedTags([]);
      return;
    }
    console.log(inputContainer.current.innerHTML);
    const filteredTags = tagInputs.filter((item) =>
      item.name.includes(newWord)
    );
    setMatchedTags(filteredTags);
  };

  const chooseTag = (tagInfo, index) => {
    inputContainer.current.innerHTML = inputContainer.current.innerHTML.slice(
      0,
      -inputText.length
    );
    setInputText("");
    setMatchedTags([]);

    const tagText = tagInfo.name.trim();

    if (tagText !== "") {
      const textTag = renderToString(
        <Tag tagInfo={tagInfo} tagIndex={index} />
      );
      const parser = new DOMParser();
      const htmlTag = parser.parseFromString(textTag, "text/html");
      inputContainer.current.append(htmlTag.body.firstChild);
    }
  };
  return (
    <>
      <div
        contentEditable
        id="inputField"
        ref={inputContainer}
        className={styles["input-container"]}
        onInput={(e) => findMatchNames(e)}
      ></div>
      {matchedTags.length ? (
        <ul
          className={styles["matched-tags"]}
          style={{ top: position.top, left: position.left }}
        >
          {matchedTags.map((item, index) => (
            <li
              key={index}
              onClick={() => chooseTag(item, index)}
              className={styles["matched-tag"]}
            >
              <span>{item.name}</span>
              <span>{item.category}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default Home;
