import React, { useEffect, useState, useRef } from "react";
import "./tree.scss";
import { GoTriangleDown, GoTriangleUp, GoTrash } from "react-icons/go";
import { GiCheckMark } from "react-icons/gi";
export default function Tree({ tree, editMode, setEditMode }) {

  return (
    <div className="tree">
      <p className="tree-name">{tree.name}</p>
      <div className="tree-data">
        {tree.branches.map((branch) => {
          if (branch.type == "links")
            return (
              <FinalBranch
                editMode={editMode}
                setEditMode={setEditMode}
                branch={branch}
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

function Branch({ subtree, editMode, setEditMode }) {
  return (
    <div className="branch">
      <p className="branch-name">{subtree.name}</p>
      <div className="branch-data">
        {subtree.branches.map((branch) => {
          if (branch.type == "links")
            return <FinalBranch editMode={editMode} branch={branch} />;
          else return <Branch editMode={editMode} subtree={branch} />;
        })}
        {editMode && <p className="add-branch-btn">+</p>}
      </div>
    </div>
  );
}

function FinalBranch({ branch, editMode, setEditMode }) {
  let [showChild, setShowChild] = useState(true);
  let [edit, setEdit] = useState();
  const branchRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClick);
  }, []);

  const handleClick = (e) => {
    // console.log(e.target);
    // console.log(e.currentTarget.tag);
    console.log(branchRef?.current);
    console.log(e.currentTarget.parentNode);
    // if (e.currentTarget.parentNode == "P") return;
    // console.log(branchRef?.current?.contains(e.target));
    // if (!branchRef?.current?.contains(e.target)) setEdit(null);
  };

  return (
    <>
      <div className="final-branch" ref={branchRef}>
        <p
          className="final-branch-name"
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
        {showChild && (
          <ul className="links">
            {Object.entries(branch.data).map(([key, value], index) => {
              if (!editMode)
                return (
                  <a key={value} className="link" href={value}>
                    {key}
                  </a>
                );
              else if (edit?.index != index)
                return (
                  <p
                    className="link"
                    key={value}
                    onClick={() => {
                      setEdit({ index, key, value });
                    }}
                  >
                    {key}
                  </p>
                );
              else
                return (
                  <li className="link">
                    <form
                      className="edit-inputs"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setEdit(null);
                      }}
                    >
                      <div className="top-row">
                        <input
                          value={edit.key}
                          className="edit-key"
                          onChange={(e) =>
                            setEdit((prv) => {
                              return { ...prv, key: e.target.value };
                            })
                          }
                        />
                        <div className="edit-buttons">
                          <button type="button">
                            <GoTrash />
                          </button>
                          <button type="submit">
                            <GiCheckMark />
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="edit-value"
                        value={edit.value}
                        onChange={(e) =>
                          setEdit((prv) => {
                            return { ...prv, value: e.target.value };
                          })
                        }
                      />
                    </form>
                  </li>
                );
            })}
          </ul>
        )}
        {editMode && <p className="add-btn">+</p>}
      </div>
    </>
  );
}
