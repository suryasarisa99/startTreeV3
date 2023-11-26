import { useContext, useEffect, useState, useRef } from "react";
import "./tree.scss";
import { GoTriangleDown, GoTriangleUp, GoTrash } from "react-icons/go";
import { GiCheckMark } from "react-icons/gi";
import { DataContext } from "../context/DataContext";

export default function Tree({ tree, editMode, setEditMode, t_index }) {
  return (
    <div className="tree">
      <p className="tree-name">{tree.name}</p>
      <div className="tree-data">
        {tree.branches.map((branch, b_index) => {
          if (branch.type == "links")
            return (
              <FinalBranch
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

// temporarily disabled Branch
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

function FinalBranch({ branch, editMode, setEditMode, b_index, t_index }) {
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
  const { dispatch } = useContext(DataContext);

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
                      setAddMode(false);
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
                        dispatch({
                          type: "update",
                          t_index,
                          b_index,
                          oldKey: key,
                          newKey: edit.key,
                          url: edit.value,
                        });
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
                          <button
                            type="button"
                            onClick={() => {
                              console.log(key, b_index, t_index);
                              dispatch({
                                type: "delete",
                                t_index,
                                b_index,
                                key,
                              });
                              setEdit({ index: -1 });
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
        )}
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

function Input({ add, b_index, setAddMode, t_index }) {
  const { dispatch } = useContext(DataContext);

  return (
    <form
      className="edit-inputs"
      onSubmit={(e) => {
        e.preventDefault();
        // setEdit(null);
        // add(branch_index, e.target.key.value, e.target.url.value);
        dispatch({
          type: "final-branch",
          b_index: b_index,
          t_index: t_index,
          key: e.target.key.value,
          url: e.target.url.value,
        });
        setAddMode(false);
      }}
    >
      <div className="top-row">
        <input className="edit-key" name="key" />
        <div className="edit-buttons">
          <button type="button">
            <GoTrash />
          </button>
          <button type="submit">
            <GiCheckMark />
          </button>
        </div>
      </div>
      <input type="text" className="edit-value" name="url" />
    </form>
  );
}
