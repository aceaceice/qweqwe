import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReadOnlyLeaf from "./Leaf/ReadOnlyLeaf";
import { useParams } from "react-router-dom";
import Tree from "../../tree";
import Leaf from "./Leaf";
import "./TreeBuilder.css";
import UserList from "../UserList";
import InviteLink from "../InviteLink";
import instance from "../../axios";
const TreeBuilder = () => {
  const user = useSelector((state) => state.auth.user);
  const [tree, setTree] = useState("");
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const you = users.find((u) => u.id === user._id);
  let writingPermission;
  if (you) {
    writingPermission = you.role === "editor" || you.role === "creator";
  }
  const fetchData = async (id) => {
    const res = await instance.post("/api/tree", {
      id,
    });
    setUsers(res.data.participants);
    setTree(Tree.deserialize(res.data.tree));
  };
  useEffect(() => {
    fetchData(id);
  }, [id]);
  const [inviteLink, setInviteLink] = useState(false);
  const [userList, setUserList] = useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const putTree = () => {
    forceUpdate();
    instance.put("/api/tree", { id, tree: tree.serialize() });
  };
  console.log(tree);
  if (tree === "") return;
  return (
    <div className="tree-builder">
      {inviteLink && <InviteLink setInviteLink={setInviteLink} id={id} />}
      {userList && (
        <UserList
          users={users}
          id={id}
          setUserList={setUserList}
          setUsers={setUsers}
        />
      )}
      <div className="tree-builder-buttons">
        <button className="login-button" onClick={() => setInviteLink(true)}>
          Invite Link
        </button>
        <button className="login-button" onClick={() => setUserList(true)}>
          Users
        </button>
      </div>

      {writingPermission ? (
        <Leaf data={tree} key={tree.id} put={putTree} />
      ) : (
        <ReadOnlyLeaf data={tree} key={tree.id} />
      )}
    </div>
  );
};
export default TreeBuilder;
