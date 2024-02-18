import { GoTriangleDown, GoTriangleUp, GoTrash } from "react-icons/go";
import { GiCheckMark } from "react-icons/gi";
import { DataContext } from "../context/DataContext";
import FinalBranch from "./FinalBranch";

// temporarily disabled Branch
export default function Branch({ subtree, editMode, setEditMode }) {
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
