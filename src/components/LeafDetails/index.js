import "./LeafDetails.css";
const LeafDetails = (props) => {
  const { completed, setDetails } = props;
  return (
    <div className="details">
      <div className="details-table">
        <img
          src="../delete-svgrepo-com.svg"
          className="item-icon details-close"
          alt="delete"
          onClick={() => {
            setDetails(false);
          }}
        />
        <div className="details-table-time">Completed on</div>
        <div className="details-table-time-value">{`${new Date(
          completed.timestamp
        )}`}</div>
        <div className="details-table-user">Completed by</div>
        <div className="details-table-user-value">{completed.user.name}</div>
      </div>
    </div>
  );
};
export default LeafDetails;
