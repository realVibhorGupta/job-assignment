import { useNavigate } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await axios.get("/logout");
        navigate("/login");
    } catch (err) {
        console.error("Logout failed:", err);
    }
};
  return (
    <Button
      label="Logout"
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600"
    />
  );
};

export default LogoutButton