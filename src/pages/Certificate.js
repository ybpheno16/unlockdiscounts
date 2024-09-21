import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from "./Certificate.module.css";
import { UserState } from "../contexts/VerifyContext";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
    textField: {
        marginBottom: '16px',
    },
    button: {
        marginTop: '16px',
    },
});

const Certificate = () => {
    const [state, setState] = useState({
        serialNumber: "",
        internName: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUser } = UserState();
    const classes = useStyles();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Check if fields are empty
        if (!state.serialNumber || !state.internName) {
            setError("Please fill in both the Serial Number and Intern Name.");
            setLoading(false);
            return;
        }

        // Log the request body for debugging
        const requestBody = {
            intern_name: state.internName,
            certificate_code: state.serialNumber,
        };
        console.log("Submitting:", requestBody);

        try {
            const response = await fetch("https://products2-tt3o.onrender.com/api/certificate-verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (response.ok) {
                // Update the user context with form data
                setUser({
                    serialNumber: state.serialNumber,
                    internName: state.internName,
                });

                // Redirect to the verification page
                navigate("/verification");
            } else {
                setError(data.message || "An error occurred");
            }
        } catch (error) {
            setError("Failed to verify certificate. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setError(""); // Clear the error when user types again
        setState((prevState) => ({
            ...prevState,
            [id]: value.trim(),
        }));
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <h1 className={styles.heading}>Verify Certificate</h1>
                <form
                    onSubmit={handleSubmit}
                    className={styles.form}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        className={classes.textField}
                        onChange={handleChange}
                        id="serialNumber"
                        label="Serial Number"
                        value={state.serialNumber}
                        fullWidth
                    />
                    <TextField
                        className={classes.textField}
                        onChange={handleChange}
                        id="internName"
                        label="Intern Name"
                        value={state.internName}
                        fullWidth
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <Button
                        className={`${classes.button} ${styles.buttonPrimary}`}
                        variant="contained"
                        type="submit"
                        disabled={loading || !state.serialNumber || !state.internName}
                    >
                        {loading ? "Verifying..." : "Verify"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Certificate;
