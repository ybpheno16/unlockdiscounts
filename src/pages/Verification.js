import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
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
        position: "relative",
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
    const { user } = UserState();
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCertificate = async () => {
            console.log('Fetching certificate for:', user.serialNumber);

            try {
                const response = await fetch(`http://localhost:8080/api/certificate-verification/${user.serialNumber}`);
                const data = await response.json();

                if (response.ok) {
                    setCertificate(data);
                    console.log("Certificate data:", data); // Log the fetched certificate data
                } else {
                    setError(data.message || "Failed to fetch certificate");
                }
            } catch (err) {
                console.error("Fetch error:", err); // Log any errors
                setError("Failed to fetch certificate. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (user.serialNumber) {
            fetchCertificate();
        } else {
            setError("No certificate code provided.");
            setLoading(false);
        }
    }, [user.serialNumber]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <Card className={classes.card}>
                <h1 className={classes.title}>CERTIFICATE OF COMPLETION</h1>
                <div className={classes.name}>{certificate?.intern_name || "Not available"}</div>
                <div className={classes.date}>
                    Serial number: {certificate?.certificate_code || "Not available"}
                    <br /> Joining date: {certificate?.Joining_date || "Not available"}
                    <br /> Last working Date: {certificate?.Last_date || "Not available"}
                </div>
                <div><h3 className={classes.verified}>VERIFIED</h3></div>
                <p className={classes.info}>
                    Certificate issued on: {certificate?.issued_date || "Not available"} <br />
                </p>
            </Card>
        </div>
    );
};

export default Verification;
