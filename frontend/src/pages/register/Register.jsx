import React from "react";
import styles from "./Register.module.css";

const Register = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.mainLayout}>
                <div className={styles.registerLayout}>
                    <div className={styles.titleLayout}>
                        <h1>Welcome to The Notes</h1>
                        <h2>please sign up here</h2>
                    </div>
                    <form>
                        <label>Username</label>
                        <br />
                        <input />
                        <br />
                        <br />
                        <label>Password</label>
                        <br />
                        <input />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
