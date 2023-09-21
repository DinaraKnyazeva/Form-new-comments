import React, { useState } from "react";
import "./form.css";

export default function Form() {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const spamFilter = (str) => {
    const spamWords = ["viagra", "xxx"];
    return str.replace(
      new RegExp(`\\b(${spamWords.join("|")})\\b`, "gi"),
      "***"
    );
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = () => {
    if (text.trim() !== "") {
      const filteredText = spamFilter(text);
      setComments([
        { text: filteredText, isNew: true },
        ...comments.map((c) => ({ ...c, isNew: false })),
      ]);
      setText("");
    }
  };

  return (
    <div className="form">
      <h1>ЧАТ</h1>
      <div className="result">
        {comments.map((comment, index) => (
          <div
            key={index}
            className={comment.isNew ? "comment new-comment" : "comment"}
          >
            {comment.text}
          </div>
        ))}
      </div>
      <textarea
        className="textarea"
        onChange={onChange}
        value={text}
      ></textarea>
      <button className="button" onClick={onSubmit}>
        Оставить комментарий
      </button>
    </div>
  );
}
