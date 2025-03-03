import { useState } from "react";

function ProfilePage() {
  const [userName, setUserName] = useState("Tony Jarvis");
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState(userName);

  const accounts = [
    { title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance" },
    { title: "Argent Bank Savings (x6712)", amount: "$10,928.42", description: "Available Balance" },
    { title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance" }
  ];

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setUserName(newUserName);
    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{userName}!</h1>
        {isEditing ? (
          <div>
            <input 
              type="text" 
              value={newUserName} 
              onChange={(e) => setNewUserName(e.target.value)} 
            />
            <button className="edit-button" onClick={handleSaveClick}>Save</button>
          </div>
        ) : (
          <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      {accounts.map((account, index) => (
        <section className="account" key={index}>
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
}

export default ProfilePage;
