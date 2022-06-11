import { useState } from "react";
import { useSelector } from "react-redux";
import LeafDetails from "../../LeafDetails";
import "./Leaf.css";
const Leaf = (props) => {
  const user = useSelector((state) => state.auth.user);
  const { name, children, completed } = props.data;
  const [details, setDetails] = useState(false);
  return (
    <div className="subtree">
      {details && <LeafDetails completed={completed} setDetails={setDetails} />}
      <div className={`subtree-name ${completed.status ? "completed" : ""}`}>
        <div>
          <div className="item-name">
            <div> {name} </div>
          </div>
        </div>
        <div className="item-actions">
          {completed.status && (
            <img
              src="../logo192.png"
              className="item-icon"
              onClick={() => setDetails(true)}
            />
          )}
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
