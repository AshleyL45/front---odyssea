import React from "react";
import {useNavigate} from "react-router-dom";

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div style={{textAlign: "center", marginTop: "5rem"}}>
            <h1>Denied Access</h1>
            <p>You do not have the rights to access this page.</p>
            <button
                onClick={handleGoBack}
                style={{
                    marginTop: "2rem",
                    padding: "0.75rem 1.5rem",
                    fontSize: "1rem",
                    borderRadius: "8px",
                    backgroundColor: "#2C3E50",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer"
                }}
            >
                BACK TO PREVIOUS PAGE
            </button>
        </div>
    );
};

export default UnauthorizedPage;
