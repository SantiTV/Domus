import React from "react";
import "../styles/ChatList.css";

const ChatList = ({ users, selectedUser, onSelectUser }) => {
  return (
    <div className="chat-list">
      <h2>Chats</h2>
      {users.map((user) => (
        <div
          key={user.id}
          className={`chat-user ${selectedUser.id === user.id ? "active" : ""}`}
          onClick={() => onSelectUser(user)}
        >
          <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div className="username">{user.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
