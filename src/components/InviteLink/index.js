import "./InviteLink.css";
const API_URL = process.env.REACT_APP_API_URL;
const InviteLink = (props) => {
  const { id, setInviteLink } = props;
  return (
    <div className="invite-link-background">
      <div className="invite-link">
        <input
          value={`${API_URL}/api/tree-invite/${id}`}
          className="input"
          readOnly
        />
        <img
          src="../delete-svgrepo-com.svg"
          className="item-icon user-list-close"
          alt="close"
          onClick={() => {
            props.setInviteLink(false);
          }}
        />
      </div>
    </div>
  );
};
export default InviteLink;
