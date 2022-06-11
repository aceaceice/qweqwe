import axios from "axios";
import { useSelector } from "react-redux";
import instance from "../../axios";
import "./UserList.css";
const API_URL = process.env.REACT_APP_API_URL;
const UserList = (props) => {
  const user = useSelector((state) => state.auth.user._id);
  const promotePrivilege =
    props.users.filter((usr) => usr.id === user && usr.role === "creator")
      .length !== 0;

  return (
    <div className="user-list">
      <div className="user-list-table">
        <img
          src="../delete-svgrepo-com.svg"
          className="item-icon user-list-close"
          alt="close"
          onClick={() => {
            props.setUserList(false);
          }}
        />
        {props.users.map((user) => {
          return (
            <div key={user.id}>
              {user.name} {user.role}
              {user.role === "viewer" && promotePrivilege && (
                <button
                  className="btn"
                  onClick={async () => {
                    const res = await instance.post("/api/tree/promote", {
                      userId: user.id,
                      treeId: props.id,
                    });
                    props.setUsers(
                      props.users.map((usr) => {
                        if (usr.id === user.id) {
                          return { ...res.data, name: user.name };
                        } else {
                          return usr;
                        }
                      })
                    );
                  }}
                >
                  Promote
                </button>
              )}
              {user.role === "editor" && promotePrivilege && (
                <button
                  className="btn"
                  onClick={async () => {
                    const res = await instance.post("/api/tree/revoke", {
                      userId: user.id,
                      treeId: props.id,
                    });
                    props.setUsers(
                      props.users.map((usr) => {
                        if (usr.id === user.id) {
                          return { ...res.data, name: user.name };
                        } else {
                          return usr;
                        }
                      })
                    );
                  }}
                >
                  Revoke
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default UserList;
