"use server";
import React, { useState, useEffect, useContext, useRef } from "react";
import { GoTriangleDown, GoTriangleUp, GoTrash } from "react-icons/go";
import { GiCheckMark } from "react-icons/gi";
import { DataContext } from "../context/DataContext";

import Input from "./Input";

export default function FinalBranch({
  branch,
  editMode,
  setEditMode,
  b_index,
  t_index,
}) {
  let [showChild, setShowChild] = useState(true);
  let [edit, setEdit] = useState();
  let [addMode, setAddMode] = useState(false);
  const branchRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClick);
  }, []);

  const handleClick = (e) => {
    // console.log(e.target);
    // console.log(e.currentTarget.tag);
    // console.log(branchRef?.current);
    // console.log(e.currentTarget.parentNode);
    // if (e.currentTarget.parentNode == "P") return;
    // console.log(branchRef?.current?.contains(e.target));
    // if (!branchRef?.current?.contains(e.target)) setEdit(null);
  };
  const { dispatch, drag, setDrag } = useContext(DataContext);

  // Drag and Drop for LInk
  function handleDragLink(key) {
    setDrag((prv) => ({
      from: {
        b_index,
        t_index,
        key,
      },
      type: "LINK",
      to: {},
    }));
  }
  function handleDragOverLink(e, key) {
    // console.log("dragOverLink", key);
    e.stopPropagation();
    setDrag((prv) => ({
      ...prv,
      to: {
        b_index,
        t_index,
        key,
      },
    }));
  }
  function handleLinkDragEnd(e) {
    e.stopPropagation();
    console.log("Dispatch LINK");
    dispatch({
      type: "MOVE",
    });
  }

  // Drag and Drop for Branch

  function handleDragBranch(b_index) {
    setDrag((prv) => ({
      from: {
        b_index,
        t_index,
      },
      type: "BRANCH",
      to: {},
    }));
  }
  function handleDragOverBranch(e, b_index) {
    // e.preventDefault();
    e.stopPropagation();

    setDrag((prv) => ({
      ...prv,
      to: {
        b_index,
        t_index,
      },
    }));
  }
  function handleBranchDragEnd(e) {
    e.stopPropagation();
    console.log("Dispatch MOVE");

    dispatch({
      type: "MOVE",
    });
  }

  function handleDrop(e) {
    e.preventDefault();
    let url = e.dataTransfer.getData("text/plain");
    if (url) {
      console.log(url);
      let name = prompt("Link found " + url);
      if (!url.includes("http")) url = "https://" + url;
      dispatch({
        type: "final-branch",
        b_index: b_index,
        t_index: t_index,
        key: name,
        url: url,
      });
    } else {
      console.log("No link found");
    }
  }

  return (
    <>
      <div
        className="final-branch"
        ref={branchRef}
        style={
          drag.to?.b_index === b_index && drag.to?.t_index === t_index
            ? {
                // backgroundColor: "#191919",
                // borderRadius: "12px",
                // margin: "12px",
                // padding: "10px 4px",
              }
            : {}
        }
      >
        <p
          className="final-branch-name"
          draggable
          onDragStart={() => handleDragBranch(b_index)}
          onDragEnter={(e) => handleDragOverBranch(e, b_index)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnd={handleBranchDragEnd}
          onDrop={handleDrop}
          onClick={() => {
            if (!editMode) setShowChild((prv) => !prv);
          }}
        >
          {branch.name}
          {!editMode && (
            <>
              {!showChild ? (
                <GoTriangleDown
                  className="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowChild(true);
                  }}
                />
              ) : (
                <GoTriangleUp
                  className="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowChild(false);
                  }}
                />
              )}
            </>
          )}
        </p>

        <ul className="links">
          {Object.entries(branch.data).map(([key, value], index) => {
            // display Links
            if (!editMode) {
              if (showChild)
                return (
                  <a key={value} className="link" href={value}>
                    {key}
                  </a>
                );
            }
            // Edit Mode && and Make others links as just P tag
            else if (edit?.index != index)
              return (
                <p
                  className="link"
                  draggable
                  onDragStart={() => handleDragLink(key)}
                  onDragEnter={(e) => handleDragOverLink(e, key)}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnd={handleLinkDragEnd}
                  key={value}
                  onClick={() => {
                    setAddMode(false);
                    setEdit({ index, key, value });
                  }}
                >
                  {key}
                </p>
              );
            // Edit Mode && and Display Edit Inputs
            else
              return (
                <li className="link">
                  <Input
                    b_index={b_index}
                    t_index={t_index}
                    edit={edit}
                    setEdit={setEdit}
                  />
                </li>
              );
          })}

          {/* Add New Link ( Input ) */}
          {addMode && (
            <li className="link">
              <Input
                b_index={b_index}
                setAddMode={setAddMode}
                t_index={t_index}
              />
            </li>
          )}
        </ul>
        {/*  Top Right Corner Edit Mode Button  */}
        {editMode && !addMode && (
          <p
            className="add-btn"
            onClick={() => {
              setAddMode(true);
              setEdit(null);
            }}
          >
            +
          </p>
        )}
      </div>
    </>
  );
}
