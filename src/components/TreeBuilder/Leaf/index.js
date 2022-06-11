import { useState } from "react";
import { useSelector } from "react-redux";
import LeafDetails from "../../LeafDetails";
import "./Leaf.css";
const Leaf = (props) => {
  const user = useSelector((state) => state.auth.user);
  const { name, children, completed } = props.data;
  const [edit, setEdit] = useState(false);
  const [inputName, setIntputName] = useState(name);
  const [details, setDetails] = useState(false);
  return (
    <div className="subtree">
      {details && <LeafDetails completed={completed} setDetails={setDetails} />}
      <div className={`subtree-name ${completed.status ? "completed" : ""}`}>
        {props.data.parentNode === null ? (
          ""
        ) : (
          <img
            src="../delete-svgrepo-com.svg"
            className="item-icon delete"
            alt="delete"
            onClick={() => {
              props.data.removeNode(props.data);
              props.put();
            }}
          />
        )}
        <div>
          {edit ? (
            <div>
              <input
                value={inputName}
                onChange={(e) => setIntputName(e.target.value)}
              />
              <div
                onClick={() => {
                  props.data.name = inputName;
                  props.put();
                  setEdit(false);
                }}
              >
                Ok
              </div>
            </div>
          ) : (
            <div className="item-name">
              <div> {name} </div>
              <img
                src="../edit-icon.svg"
                className="item-icon edit"
                alt="edit"
                onClick={() => {
                  setEdit(true);
                }}
              />
            </div>
          )}
        </div>
        <div className="item-actions">
          <img
            src="../mono-item-add.svg"
            className="item-icon add"
            alt="add"
            onClick={() => {
              props.data.createChildNode("New Task", { status: false });
              props.put();
            }}
          />
          {completed.status && (
            <img
              src="../logo192.png"
              className="item-icon"
              onClick={() => setDetails(true)}
            />
          )}
          <img
            src="../green-tick.svg"
            className="item-icon complete"
            alt="complete"
            onClick={() => {
              props.data.setCompleted(user);
              props.put();
            }}
          />
        </div>
      </div>
      <div className="children">
        {!!children.length &&
          children.map((child) => (
            <Leaf key={child.id} data={child} put={props.put} />
          ))}
      </div>
    </div>
  );
};
export default Leaf;
