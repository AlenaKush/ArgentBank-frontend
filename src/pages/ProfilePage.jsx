import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../api/api";
import { setUser } from "../redux/userSlice";
import AccountsList from "../components/AccountsList";

function ProfilePage() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect to home if no token
      return;
    }

    if (!user) {
      const fetchProfile = async () => {
        try {
          const { body } = await getUserProfile(token);
          dispatch(setUser(body)); // Save user in Redux
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          navigate("/login");
        }
      };
      fetchProfile();
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [token, navigate, dispatch, user]);

  // ✅ Функция для сохранения имени пользователя
  const handleSave = async () => {
    try {
      const { body } = await updateUserProfile(token, firstName, lastName);
      dispatch(setUser(body)); // Сохраняем обновленного пользователя в Redux
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  // ✅ Функция отмены редактирования
  const handleCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <>
          <div className="header-edit">
            <input
              type="text"
              className="edit-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className="edit-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
            <div className="edit-buttons">
              <button className="save-button" onClick={handleSave}>Save</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h1>
              Welcome back <br />
              {user.firstName} {user.lastName}!
            </h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
          </>
        )}
      </div>
      <AccountsList />
    </main>
  );
}

export default ProfilePage;
