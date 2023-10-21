import { useState, useRef } from "react";
import { trees } from "./data";
import Tree from "./components/Tree";
// import "./components/tree.scss";
function App() {
  const prvFinalBranchRef = useRef(null)
  let [editMode, setEditMode] = useState(false);

  return (
    <>
      <div className="row1">
        <p>Edit Mode</p>
        <input type="radio" className="box" checked={editMode} onClick={(e) => setEditMode(prv => !prv)} />
      </div>
      {/* <input type="text" /> */}
      <div className="trees">
        {trees.map((tree) => (

          <Tree
            key={tree.name}
            prvFinalBranchRef={prvFinalBranchRef}
            tree={tree} editMode={editMode}
            setEditMode={setEditMode}
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
