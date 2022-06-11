import "./TreeItem.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const TreeItem = (props) => {
  const user = useSelector((state) => state.auth.user._id);
  const navigate = useNavigate();
  const push = (id) => {
    navigate(`/tree/${id}`);
  };
  const creator = user === props.tree.creator;
  return (
    <div className="list-item">
      {creator ? (
        <img
          onClick={() => {
            props.deleteItem(props.tree._id);
          }}
          src="../delete-svgrepo-com.svg"
          alt="delete"
          className="item-icon"
        />
      ) : (
        <img
          onClick={() => {
            props.uninviteSelf(props.tree._id);
          }}
          src="../delete-svgrepo-com.svg"
          alt="delete"
          className="item-icon"
        />
      )}
      <div
        className="list-item-name"
        onClick={() => {
          push(props.tree._id);
        }}
      >
        <p>Name:{props.tree.name}</p>
        <p>Last modified: {props.tree.lastModified}</p>
      </div>
    </div>
  );
};
export default TreeItem;
