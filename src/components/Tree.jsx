import { useContext, useEffect, useState, useRef } from "react";
import "./tree.scss";
import { GoTriangleDown, GoTriangleUp, GoTrash } from "react-icons/go";
import { GiCheckMark } from "react-icons/gi";
import { DataContext } from "../context/DataContext";

import Branch from "./Branch";
import FinalBranch from "./FinalBranch";

export default function Tree({ tree, editMode, setEditMode, t_index }) {
  const { drag, setDrag, dispatch } = useContext(DataContext);

  function handleDragTree(t_index) {
    setDrag((prv) => ({
      from: {
        t_index,
      },
      type: "TREE",
      to: {},
    }));
  }
  function handleDragOverTree(t_index) {
    setDrag((prv) => ({
      ...prv,
      to: {
        t_index,
      },
    }));
  }
  function handleDragEnd() {
    console.log("Dispatch TREE");
    dispatch({
      type: "MOVE",
    });
  }

  return (
    <div
      className="tree"
      onDragEnter={() => handleDragOverTree(t_index)}
      style={
        drag.to?.t_index === t_index
          ? {
              // backgroundColor: "#2d2c2c",
              // borderRadius: "16px",
              // padding: "20px 4px",
            }
          : {}
      }
    >
      <p
        className="tree-name"
        draggable
        onDragStart={() => handleDragTree(t_index)}
        onDragEnter={() => handleDragOverTree(t_index)}
        onDragEnd={() => handleDragEnd()}
        onDragOver={(e) => e.preventDefault()}
      >
        {tree.name}
      </p>
      <div className="tree-data">
        {tree.branches.map((branch, b_index) => {
          if (branch.type == "links")
            return (
              <FinalBranch
                key={branch.name + b_index}
                b_index={b_index}
                editMode={editMode}
                setEditMode={setEditMode}
                branch={branch}
                t_index={t_index}
              />
            );
          else
            return (
              <Branch
                editMode={editMode}
                setEditMode={setEditMode}
                subtree={branch}
              />
            );
        })}
        {editMode && <p className="green-branch-btn">+</p>}
      </div>
    </div>
  );
}
