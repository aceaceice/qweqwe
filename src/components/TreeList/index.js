import axios from "axios";
import React, { useEffect, useState } from "react";
import Tree from "../../tree";
import "./TreeList.css";
import TreeItem from "./TreeItem";
import instance from "../../axios";
const TreeList = () => {
  const [trees, setTrees] = useState([]);
  const [name, setName] = useState("");
  const [input, setInput] = useState(false);
  const fetchTrees = async () => {
    const res = await instance.get("/api/trees");
    setTrees(res.data);
  };
  const deleteItem = async (treeId) => {
    const res = await instance.post("/api/tree-delete", { treeId });
    if (res.data.deletedCount === 1) {
      setTrees(trees.filter((item) => item._id !== treeId));
    }
  };
  const uninviteSelf = async (treeId) => {
    const res = await instance.post("/api/tree-uninvite", { treeId });
    if (res.data.modifiedCount === 1) {
      setTrees(trees.filter((item) => item._id !== treeId));
    }
  };
  useEffect(() => {
    fetchTrees();
  }, []);
  return (
    <div>
      {input ? (
        <div>
          <p>Select a name</p>
          <input
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="login-button"
            onClick={async () => {
              const result = await instance.post("/api/tree-create", {
                tree: new Tree(name, { status: false }).serialize(),
                name,
              });
              setTrees([...trees, result.data]);
              setInput(false);
              setName("");
            }}
          >
            Ok
          </button>
        </div>
      ) : (
        <button
          className="login-button"
          onClick={() => {
            setInput(true);
          }}
        >
          Create a tree
        </button>
      )}
      <div className="tree-list">
        {trees.map((tree) => (
          <TreeItem
            tree={tree}
            key={tree._id}
            deleteItem={deleteItem}
            uninviteSelf={uninviteSelf}
          />
        ))}
      </div>
    </div>
  );
};
export default TreeList;
