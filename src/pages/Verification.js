import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { UserState } from "../contexts/VerifyContext";

const useStyles = makeStyles({
    card: {
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
        border: "1px solid #ddd",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        position: "relative",  // For logo positioning
    },
    logo: {
        textAlign: "left",
        fontSize: "24px",
        fontWeight: "bold",
        position: "absolute",  // Position the logo
        top: "20px",
        left: "20px",
        width: "100px",
        height: "auto",
    },
    title: {
        fontSize: "30px",
        fontWeight: "bold",
        margin: "20px 0",
    },
    name: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    date: {
        fontSize: "16px",
        color: "#666",
    },
    info: {
        fontSize: "16px",
        color: "#666",
        marginTop: "20px",
    },
    verified: {
        marginTop: "7px",
    },
});

const Verification = () => {
    const classes = useStyles();
    const { user } = UserState();  // Destructure user from context
    const [certificate, setCertificate] = useState(null); // State for certificate data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/certificate-verification/${user.serialNumber}`);
                const data = await response.json();

                if (response.ok) {
                    // Extract the certificate from the response data
                    const certData = data.certverify[0];
                    setCertificate(certData);
                } else {
                    setError(data.message || "Failed to fetch certificate");
                }
            } catch (err) {
                setError("Failed to fetch certificate. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [user.serialNumber]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <Card className={classes.card}>
                <h1 className={classes.title}>CERTIFICATE OF COMPLETION</h1>
                <div className={classes.name}>{user.internName}</div>
                <div className={classes.date}>
                    Serial number: {certificate?.certificate_code}
                    <br /> Joining date: {certificate?.joining_date || "Not available"}
                </div>
                <div><h3 className={classes.verified}>VERIFIED</h3></div>
                <p className={classes.info}>
                    Certificate issued on: {certificate?.issue_date || "Not available"} <br />
                </p>
            </Card>
        </div>
    );
};

export default Verification;
