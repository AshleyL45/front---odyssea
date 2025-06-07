import React from "react";

const MessageBox = ({type, text}: { type: "error" | "success", text: string }) => {
    const role = type === "error" ? "alert" : "status";

    return (
        <p
            role={role}
            aria-live={type === "error" ? "assertive" : "polite"}
            style={{
                color: type === "error" ? "red" : "green",
                marginTop: "1rem"
            }}
        >
            {text}
        </p>
    );
};

export default MessageBox;
