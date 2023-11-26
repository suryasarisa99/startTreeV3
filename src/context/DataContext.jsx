import { createContext, useState, useReducer } from "react";
import { trees } from "../data";
const DataContext = createContext();

export default function DataProvider({ children }) {
  function reducer(trees, action) {
    trees;
    if (action.type == "final-branch") {
      trees[action.t_index].branches[action.b_index].data[action.key] =
        action.url;
      return [...trees];
    }
    if (action.type == "update") {
      let branch = trees[action.t_index].branches[action.b_index];
      branch.data[action.newKey] = action.url;
      if (action.oldKey != action.newKey) delete branch.data[action.oldKey];
      return [...trees];
    }
    if (action.type == "delete") {
      delete trees[action.t_index].branches[action.b_index].data[action.key];
      return [...trees];
    }
    if (action.type == "new-final-branch") {
      let branch = trees[action.t_index].branches.push(action.branch);
      return [...trees];
    }
    return [...trees];
  }

  let [treesState, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("trees")) || trees
  );
  return (
    <DataContext.Provider value={{ treesState, dispatch, trees }}>
      {children}
    </DataContext.Provider>
  );
}
export { DataContext };
