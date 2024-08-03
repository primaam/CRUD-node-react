import React from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();

    const formDetail = [
        {
            type: "text",
            placeholder: "Your Username",
            name: "username",
            value: formData.username,
        },
        {
            type: "password",
            placeholder: "Your Password",
            name: "password",
            value: formData.password,
        },
    ];

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await axios({
                method: "POST",
                url: "http://localhost:5000/api/auth/login",
                data: formData,
            });

            if (result.status === 200) {
                localStorage.setItem("token", result.data.token);
                navigate("/");
            } else {
                alert(result.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.layout}>
            <div className={styles.mainLayout}>
                <div className={styles.loginLayout}>
                    <div className={styles.titleLayout}>
                        <h1>Welcome to The Notes</h1>
                        <h2>please sign in here</h2>
                    </div>
                    <form onSubmit={handleLogin}>
                        {formDetail.map((item, i) => {
                            return (
                                <div key={i}>
                                    <label>{item.placeholder}</label>
                                    <br />
                                    <br />
                                    <input
                                        className={styles.formInput}
                                        type={item.type}
                                        placeholder={item.placeholder}
                                        name={item.name}
                                        value={item.value}
                                        onChange={(e) => handleFormChange(e)}
                                    />
                                </div>
                            );
                        })}
                        <button type="submit">{loading ? "Loading...." : "Submit"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
