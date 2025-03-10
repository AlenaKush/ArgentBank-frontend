import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/api";
import AccountsList from "../components/AccountsList";

function ProfilePage() {
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect to login if no token
      return;
    }

    const fetchProfile = async () => {
      try {
        const { body } = await getUserProfile(token);
        setUser(body); // Save user data
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [token, navigate]);

  if (!user) return <p className="loading">Loading...</p>; // Display while loading

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back <br />
          {user.firstName} {user.lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <AccountsList /> 
    </main>
  );
}

export default ProfilePage;
