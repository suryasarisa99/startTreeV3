import React, { useEffect } from "react";
import Tree from "../components/Tree";
import { themeTree } from "../data";
import "./theme.scss";
import { useNavigate } from "react-router-dom";

export default function Theme() {
  const navigate = useNavigate();
  // --final-branch-color: rgb(255, 0, 225);
  // --branch-color: rgb(193, 223, 0);
  // --branch-color: rgb(72, 255, 0);
  // --link-color: rgb(154, 73, 147);

  // --tree-name-color: var(--tree-color);
  // --tree-dash-color: var(--tree-color);
  // --tree-line-color: var(--tree-color);

  // --final-branch-name-color: var(--final-branch-color);
  // --final-branch-dash-color: var(--final-branch-color);
  // --final-branch-line-color: var(--final-branch-color);

  // --branch-name-color: var(--branch-color);
  // --branch-dash-color: var(--branch-color);
  // --branch-line-color: var(--branch-color);

  useEffect(() => {
    const propertyNames = [
      "--tree-color",
      "--final-branch-color",
      "--link-color",
      "--tree-name-color",
      "--tree-dash-color",
      "--tree-line-color",
      "--final-branch-name-color",
      "--final-branch-dash-color",
      "--final-branch-line-color",
      // "--branch-color",
      // "--branch-name-color",
      // "--branch-dash-color",
      // "--branch-line-color",
    ];
    const styles = getComputedStyle(
      // document.getElementsByClassName("theme-page")[0]
      document.documentElement
    );
    setTimeout(() => {
      const themeColors = propertyNames.reduce((obj, key) => {
        obj[key] = styles.getPropertyValue(key);
        return obj;
      }, {});
      console.log(themeColors);
      setThemeColors(themeColors);
    }, 2);
  }, []);

  const [themeColors, setThemeColors] = React.useState({});

  function handleApply() {
    const root = document.documentElement;
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    navigate("/");
    localStorage.setItem("theme", JSON.stringify(themeColors));
  }

  const mainColors = ["--tree-color", "--final-branch-color", "--branch-color"];
  const subColors = ["name", "dash", "line"];

  function update(key, color) {
    const Theme = document.getElementsByClassName("theme-page")[0];
    setThemeColors((prv) => ({ ...prv, [key]: color }));
    Theme.style.setProperty(key, color);

    let suffixKey = key.split("--")[1].split("-").slice(0, -1).join("-");
    if (mainColors.includes(key)) {
      console.log("suffix key: ", suffixKey);
      //
      subColors.forEach((subColor) => {
        const newKey = `--${suffixKey}-${subColor}-color`;
        setThemeColors((prv) => ({ ...prv, [newKey]: color }));
        Theme.style.setProperty(newKey, color);
      });
    } else {
      console.log("false: suffix key: ", suffixKey);
    }
  }
  return (
    <div className="theme-page">
      <div className="colors">
        <input type="color" value={"#ff0000"} />
        {Object.entries(themeColors).map(([key, value]) => (
          <div key={key} className="color">
            <input
              type="color"
              value={value}
              onChange={(e) => update(key, e.target.value)}
            />
            <span>{key}</span>
          </div>
        ))}
      </div>
      <div>
        <Tree key={themeTree.name} t_index={0} tree={themeTree} />
        <button onClick={handleApply} className="btn">
          Save
        </button>
      </div>
    </div>
  );
}
