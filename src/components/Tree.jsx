import React, { useState } from "react";
import "./tree.scss";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
export default function Tree({ tree }) {
  return (
    <div className="tree">
      <p className="tree-name">{tree.name}</p>
      <div className="tree-data">
        {tree.branches.map((branch) => {
          if (branch.type == "links") return <FinalBranch branch={branch} />;
          else return <Branch subtree={branch} />;
        })}
      </div>
    </div>
  );
}

function Branch({ subtree }) {
  return (
    <div className="branch">
      <p className="branch-name">{subtree.name}</p>
      <div className="branch-data">
        {subtree.branches.map((branch) => {
          if (branch.type == "links") return <FinalBranch branch={branch} />;
          else return <Branch subtree={branch} />;
        })}
      </div>
    </div>
  );
}

function FinalBranch({ branch }) {
  let [showChild, setShowChild] = useState(true);
  return (
    <>
      <div className="final-branch">
        <p
          className="final-branch-name"
          onClick={() => {
            setShowChild((prv) => !prv);
          }}
        >
          {branch.name}
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
        </p>
        {showChild && (
          <ul className="links">
            {Object.entries(branch.data).map(([key, value]) => {
              return (
                <a key={value} href={value}>
                  {key}
                </a>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
