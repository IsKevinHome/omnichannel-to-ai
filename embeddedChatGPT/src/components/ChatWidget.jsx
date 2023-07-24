import React, { useState } from "react";
import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import "./ChatWidget.css";

function ChatWidget() {
    const [isChatOpen, setChatOpen] = useState(false);
    const [inputMessage, setInputMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    const toggleChatWidget = () => setChatOpen(!isChatOpen);

    const sendMessage = () => {
        if (inputMessage.trim() !== "") {
            setChatMessages([...chatMessages, inputMessage]);
            setInputMessage("");
        }
    };

    return (
        <div>
            <div id="chat-widget-button" onClick={toggleChatWidget}>
                <ForumTwoToneIcon className="chat-icon" fontSize="large" />
            </div>

            <div id="chat-widget-container" style={{ visibility: isChatOpen ? "visible" : "hidden", opacity: isChatOpen ? 1 : 0 }}>
                <div id="chat-header">
                    <span style={{ paddingLeft: "2px" }}> ChatGPT</span>
                </div>
                <div id="chat-messages">
                    {chatMessages.map((message, i) => (
                        <div key={i}>{message}</div>
                    ))}
                </div>
                <div id="chat-input">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default ChatWidget;
