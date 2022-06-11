import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser, logOut } from "../../state/actions/authActions";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  
  return (
    <div className="header">
      <button
        className="btn"
        onClick={() => {
          navigate("/tree-list");
        }}
      >
        trees
      </button>
      <div>
        {user === "" ? (
          <button
            className="btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            login
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => {
              dispatch(logOut());
            }}
          >
            logout
          </button>
        )}
      </div>
    </div>
  );
};
export default Header;
