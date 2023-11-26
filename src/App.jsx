import { useState, useRef, useReducer, useEffect } from "react";
import Tree from "./components/Tree";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";
// import "./components/tree.scss";
function App() {
  const prvFinalBranchRef = useRef(null);
  let [editMode, setEditMode] = useState(false);
  const { treesState, dispatch, trees } = useContext(DataContext);

  useEffect(() => {
    console.log(treesState);
  }, []);

  useEffect(() => {
    console.log(treesState[0].branches[1].data);
    localStorage.setItem("trees", JSON.stringify(treesState));
  }, [treesState]);

  return (
    <>
      <div className="row1">
        <p>Edit Mode</p>
        <input
          type="radio"
          className="box"
          checked={editMode}
          onClick={(e) => setEditMode((prv) => !prv)}
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

export default App;
