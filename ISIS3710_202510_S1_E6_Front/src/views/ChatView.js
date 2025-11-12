import React, { useState } from "react";
import ChatList from "../components/ChatList";
import ChatWidget from "../components/Chat";
import "../styles/ChatView.css";

const mockUsers = [
  { id: 1, name: "lauths_12" },
  { id: 2, name: "marcela.xx" },
  { id: 3, name: "juliweb.dev" },
];

function ChatView() {
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="chat-view-container">
      <div className="chat-content">
        {/* Lista de usuarios */}
        <ChatList
          users={mockUsers}
          selectedUser={selectedUser}
          onSelectUser={handleSelectUser}
        />

        {/* Área de conversación */}
        <ChatWidget selectedUser={selectedUser} />
      </div>
    </div>
  );
}

export default ChatView;
