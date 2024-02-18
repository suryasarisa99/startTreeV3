import { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { GoTriangleDown, GoTriangleUp, GoTrash } from "react-icons/go";
import { GiCheckMark } from "react-icons/gi";

export default function Input({
  add,
  setAddMode,

  b_index,
  t_index,

  edit,
  setEdit,
}) {
  const { dispatch } = useContext(DataContext);

  const [key, setKey] = useState(edit?.key || "");
  const [url, setUrl] = useState(edit?.value || "");

  return (
    <form
      className="edit-inputs"
      onSubmit={(e) => {
        e.preventDefault();
        if (edit) {
          dispatch({
            type: "update",
            t_index,
            b_index,
            oldKey: edit.key,
            newKey: key,
            url: url,
          });
          setEdit(null);
        } else {
          dispatch({
            type: "final-branch",
            b_index: b_index,
            t_index: t_index,
            key: e.target.key.value,
            url: e.target.url.value,
          });
          setAddMode(false);
        }
      }}
    >
      <div className="top-row">
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="edit-key"
          name="key"
        />
        <div className="edit-buttons">
          <button
            type="button"
            onClick={() => {
              if (edit) {
                dispatch({
                  type: "delete",
                  t_index,
                  b_index,
                  key: edit.key,
                });
                setEdit(null);
              } else {
                setAddMode(false);
              }
            }}
          >
            <GoTrash />
          </button>
          <button type="submit">
            <GiCheckMark />
          </button>
        </div>
      </div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="edit-value"
        name="url"
      />
    </form>
  );
}
