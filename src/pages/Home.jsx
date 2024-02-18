// "use server";

import { useState, useRef, useReducer, useEffect } from "react";
import Tree from "../components/Tree";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
// import "./components/tree.scss";
function Home() {
  const prvFinalBranchRef = useRef(null);
  let [editMode, setEditMode] = useState(false);
  const { treesState, dispatch } = useContext(DataContext);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const [color, setColor] = useState("#000000");
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "i") {
        //
        document.getElementById("overlay").style.display = "block";
        setShowSearch(true);
      }
      if (e.key === "Escape") {
        setShowSearch(false);
        document.getElementById("overlay").style.display = "none";
      }
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        navigate("/theme");
      }
    });
  }, []);

  return (
    <>
      {showSearch &&
        createPortal(
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // open(
              //   `https://www.google.com/search?q=${encodeURIComponent(
              //     e.target.search.value
              //   )}`,

              // );
              window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
                e.target.search.value
              )}`;
              document.getElementById("overlay").style.display = "none";
              setShowSearch(false);
            }}
          >
            <center className="input-box">
              <input
                autoFocus
                name="search"
                className="search"
                type="text"
                // autoFocus
                placeholder="Search..."
              />
            </center>
          </form>,
          document.getElementById("overlay")
        )}

      <div className="row1">
        <p>Edit Mode</p>
        <input
          type="checkbox"
          className="box"
          checked={editMode}
          onChange={() => setEditMode((prv) => !prv)}
        />
      </div>
      {/* <input type="text" /> */}
      <div className="trees">
        {treesState.map((tree, t_index) => (
          <Tree
            key={tree.name}
            t_index={t_index}
            prvFinalBranchRef={prvFinalBranchRef}
            tree={tree}
            editMode={editMode}
            setEditMode={setEditMode}
            dispatch={dispatch}
          />
        ))}
      </div>
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          open(
            `https://www.google.com/search?q=${encodeURIComponent(
              e.target.search.value
            )}`
          );
        }}
      >
        <center className="input-box">
          <input
            name="search"
            className="search"
            type="text"
            autoFocus
            placeholder="Search..."
          />
        </center>
      </form> */}
    </>
  );
}

export default Home;
