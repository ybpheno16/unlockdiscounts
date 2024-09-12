import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./Certificate.module.css"; // Import CSS module
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
    const [error, setError] = useState(""); // State to handle errors
    const [loading, setLoading] = useState(false); // State to handle loading

    const { setUser } = UserState(); 
    const classes = useStyles();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Clear previous errors

        try {
            const response = await fetch("http://localhost:8080/api/certificate-verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    intern_name: state.internName,
                    certificate_code: state.serialNumber,
                }),
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
                // Handle error from backend
                setError(data.message || "An error occurred");
            }
        } catch (error) {
            // Handle network or unexpected errors
            setError("Failed to verify certificate. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
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
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? "Verifying..." : "Verify"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Certificate;
