import React, { useState, useEffect } from "react";
import axios from "axios";

const Chatbox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      avatar: "assets/images/robo.jpg",
      name: "Chatbot",
      text: "Hello! How can I assist you today?",
      time: "10:00",
      isBot: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async () => {
    if (newMessage.trim() === "" || isSending) return;

    const userMessage = {
      id: messages.length + 1,
      avatar: "assets/images/user.jpg",
      name: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString(),
      isBot: false,
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    try {
      setIsSending(true);
      const response = await axios.post("https://api.example.com/chat", {
        message: newMessage,
      });

      const botMessage = {
        id: messages.length + 2,
        avatar: "assets/images/users/avatar-4.jpg",
        name: "Chatbot",
        text: response.data.reply || "Sorry, I didn't understand that.",
        time: new Date().toLocaleTimeString(),
        isBot: true,
      };

      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Failed to fetch chat response:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendClick = () => {
    sendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="user-chat w-100 overflow-hidden">
      <div className="d-lg-flex">
        <div className="w-100 overflow-hidden position-relative">
          <div className="p-3 p-lg-4 border-bottom user-chat-topbar">
            <div className="row align-items-center">
              <div className="col-sm-4 col-8">
                <div className="d-flex align-items-center">
                  <div className="me-3 ms-0">
                    <img
                      src="assets/images/robo.jpg"
                      className="rounded-circle avatar-xs"
                      alt="Chatbot Avatar"
                    />
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <h5 className="font-size-16 mb-0 text-truncate">
                      Chatbot
                      <i className="ri-record-circle-fill font-size-10 text-success d-inline-block ms-1"></i>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-conversation p-3 p-lg-4">
            <ul className="list-unstyled mb-0">
              {messages.map((message) => (
                <li key={message.id} className={message.isBot ? "left" : "right"}>
                  <div className="conversation-list">
                    <div className="chat-avatar">
                      <img src={message.avatar} alt="Avatar" />
                    </div>
                    <div className="user-chat-content">
                      <div className="ctext-wrap">
                        <div className="ctext-wrap-content">
                          <p>{message.text}</p>
                          <p className="chat-time mb-0">
                            <i className="ri-time-line align-middle"></i>
                            <span className="align-middle">{message.time}</span>
                          </p>
                        </div>
                      </div>
                      <div className="conversation-name">{message.name}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="chat-input-section p-3 p-lg-4 border-top mb-0">
            <div className="row g-0">
              <div className="col">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light border-light"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="col-auto">
                <div className="chat-input-links ms-2">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                    </li>
                    <li className="list-inline-item">
                      <button
                        type="button"
                        className="btn btn-link text-decoration-none font-size-16"
                      >
                        <i className="ri-attachment-line"></i>
                      </button>
                    </li>
                    <li className="list-inline-item">
                      <button
                        type="button"
                        className="btn btn-primary font-size-16"
                        onClick={handleSendClick}
                      >
                        <i className="ri-send-plane-2-fill"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
