import { createContext, useState, useReducer, useRef, useEffect } from "react";
import { trees } from "../data";
const DataContext = createContext();

export default function DataProvider({ children }) {
  const [drag, setDrag] = useState({ from: {}, to: {}, type: "" });
  function reducer(treesState, action) {
    treesState;
    if (action.type == "final-branch") {
      treesState[action.t_index].branches[action.b_index].data[action.key] =
        action.url;
      return [...treesState];
    }
    if (action.type == "update") {
      let branch = treesState[action.t_index].branches[action.b_index];
      branch.data[action.newKey] = action.url;
      if (action.oldKey != action.newKey) delete branch.data[action.oldKey];
      return [...treesState];
    }
    if (action.type == "delete") {
      delete treesState[action.t_index].branches[action.b_index].data[
        action.key
      ];
      return [...treesState];
    }
    if (action.type == "new-final-branch") {
      let branch = treesState[action.t_index].branches.push(action.branch);
      return [...treesState];
    }
    if (action.type == "MOVE")
      if (drag.type === "LINK") {
        console.log("MOVE LINK");
        let from = drag.from;
        let to = drag.to;
        console.log("from", from);
        console.log("to", to);
        console.log(to?.b_index == undefined);

        if (to?.b_index === undefined) {
          console.log("RETURN");
          return treesState;
        } else {
          const newTrees = [...treesState];
          console.log(newTrees[from.t_index].branches[from.b_index]);
          let value =
            newTrees[from.t_index].branches[from.b_index].data[from.key];
          delete newTrees[from.t_index].branches[from.b_index].data[from.key];
          newTrees[to.t_index].branches[to.b_index].data[from.key] = value;

          setDrag({ from: {}, to: {}, type: "" });

          return newTrees;
        }
      } else if (drag.type === "TREE") {
        let from = drag.from;
        let to = drag.to;
        console.log("from", from);
        console.log("to", to);

        let newTrees = [...treesState]; // create a copy of the trees array
        let tempTree = newTrees.splice(from.t_index, 1)[0];
        console.log(tempTree);
        newTrees.splice(to.t_index, 0, tempTree);
        console.log(newTrees);

        setDrag({ from: {}, to: {}, type: "" });

        return newTrees;
      } else if (drag.type === "BRANCH") {
        let from = drag.from;
        let to = drag.to;

        console.log("<<< MOVE BRANCH >>>");
        console.log("from", from);
        console.log("to", to);

        const newTrees = [...treesState];
        let branch = newTrees[from.t_index].branches.splice(from.b_index, 1)[0];
        console.log(branch);

        if (to.b_index) {
          newTrees[to.t_index].branches.splice(to.b_index, 0, branch);
        } else {
          newTrees[to.t_index].branches.push(branch);
        }

        setDrag({ from: {}, to: {}, type: "" });
        return newTrees;
      }

    return [...treesState];
  }

  let [treesState, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("trees")) || trees
  );

  useEffect(() => {
    console.log("Tree Changed");
    localStorage.setItem("trees", JSON.stringify(treesState));
  }, [treesState]);

  return (
    <DataContext.Provider
      value={{ treesState, dispatch, trees, drag, setDrag }}
    >
      {children}
    </DataContext.Provider>
  );
}
export { DataContext };
