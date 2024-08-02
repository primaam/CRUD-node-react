import React from "react";
import styles from "./NotFound.module.css";

const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1>Hmm....</h1>
            <h2>We don't know this page exist</h2>
            <h2>Would you mind back to your previous page?</h2>
        </div>
    );
};

export default NotFound;
