import { useState } from "react";
import { trees } from "./data";
import Tree from "./components/Tree";
// import "./components/tree.scss";
function App() {
  return (
    <>
      {/* <input type="radio" className="box" /> */}
      <div className="trees">
        {trees.map((tree) => (
          <Tree key={tree.name} tree={tree} />
        ))}
      </div>
      <form
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
          <input name="search" type="text" autoFocus placeholder="Search..." />
        </center>
      </form>
    </>
  );
}

export default App;
