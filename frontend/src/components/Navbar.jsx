import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  const handleClick = (route) => {
    navigate(`/${route}`);
  };

  return (
    <nav class="flex items-center justify-around bg-sky-700/85 text-3xl border-b border-gray-800 p-2 ">
      <div>
        <Button onClick={() => handleClick("")}>Home</Button>
      </div>
      <h1>Music Studio</h1>
      {user ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Button onClick={() => handleClick("login")}>Login</Button>
      )}
    </nav>
  );
};
