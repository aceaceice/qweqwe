import TreeList from "./components/TreeList";
import TreeBuilder from "./components/TreeBuilder";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import Loading from "./components/Loading";
import axios from "axios";
function App() {
  const user = useSelector((state) => state.auth);
  const isAuth = !!user.user;
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {user.loading ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/tree/:id" element={<TreeBuilder />} />
              <Route path="/tree-list" element={<TreeList />} />
            </Route>
            <Route
              path="/login"
              element={isAuth ? <Navigate to="/tree-list" /> : <Login />}
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
