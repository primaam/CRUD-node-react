import React from "react";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
    return (
        <div>
            <div>{children}</div>
        </div>
    );
};

export default Layout;
