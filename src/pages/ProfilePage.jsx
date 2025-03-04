import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/api";

function ProfilePage() {
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Если нет токена → переходим на логин
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token); //  Используем API
        setUser(data.body); // Сохраняем данные пользователя
      } catch (error) {
        console.error(error);
        navigate("/login"); // Если ошибка, отправляем на логин
      }
    };

    fetchProfile();
  }, [token, navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back <br />
          {user.firstName} {user.lastName}!</h1>
      </div>
    </main>
  );
}

export default ProfilePage;
