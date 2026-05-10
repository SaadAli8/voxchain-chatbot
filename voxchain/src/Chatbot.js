// Import React and the necessary components
import React from "react";
import Sidebar from "./components/Sidebar";
import ChatLeftSidebar from "./components/ChatLeftSidebar";
import Chatbox from "./components/Chatbox";

const Chatbot = () => {
  const logoPath = "assets/images/logo.svg";
  const avatarPath = "assets/images/user.jpg";

  return (
    <div className="layout-wrapper d-lg-flex">
      <Sidebar logo={logoPath} avatar={avatarPath} />
      <ChatLeftSidebar />
      <Chatbox />
    </div>
  );
};

export default Chatbot;
