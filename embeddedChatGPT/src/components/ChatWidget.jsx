import React, { useState } from "react";
import axios from "axios"; // Add this at the top of your file

import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import "./ChatWidget.css";

function ChatWidget() {
    const [isChatOpen, setChatOpen] = useState(false);
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const toggleChatWidget = () => setChatOpen(!isChatOpen);

    // const sendMessage = () => {
    //     if (inputMessage.trim() !== "") {
    //         setUserMessages([...userMessages, inputMessage]);
    //         setInputMessage("");
    //     }
    // };

    const sendMessage = async () => {
        if (inputMessage.trim() !== "") {
            const newMessages = [...messages, { user: inputMessage }];

            setMessages(newMessages);

            try {
                const response = await axios.post("http://localhost:5000/api/chat", {
                    messages: newMessages,
                });

                setMessages((messages) => [...messages, response.data]);
            } catch (err) {
                console.log(err);
            }

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
                    {messages.map((message, i) => (
                        <div key={i}>
                            {message.user && <div id="user-text">User: {message.user}</div>}
                            {message.gpt && <div id="GPT-text">chatGPT: {message.gpt}</div>}
                        </div>
                    ))}
                </div>
                <form
                    id="chat-input"
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default ChatWidget;
