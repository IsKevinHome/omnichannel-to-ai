import * as React from "react";
import Box from "@mui/material/Box";
import "../App.css";
import { useState } from "react";

export default function Chat() {
    const [popup, setPopup] = useState(false);

    return (
        // <div>
        //     <div class="chatContainer" onClick={() => setPopup(!popup)}>
        //         {popup ? (
        //             <div class="chat" stlye={{ display: "block" }}>
        //                 {" "}
        //                 <h2>Ask ChatGPT</h2>
        //             </div>
        //         ) : null}
        //     </div>
        // </div>
    );
}
