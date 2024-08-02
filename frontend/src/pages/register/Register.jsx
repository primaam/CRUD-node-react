import React from "react";
import axios from "axios";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = React.useState({
        username: "",
        fullName: "",
        password: "",
        repeatPassword: "",
    });
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();

    const formDetail = [
        {
            type: "text",
            placeholder: "Your Full Name",
            name: "fullName",
            value: formData.fullName,
        },
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
        {
            type: "text",
            placeholder: "Repeat Password",
            name: "repeatPassword",
            value: formData.repeatPassword,
        },
    ];

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await axios({
                method: "POST",
                url: "http://localhost:5000/api/auth/register",
                data: formData,
            });

            if (result.status === 201) {
                navigate("/login");
            } else {
                alert(result.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={styles.layout}>
            <div className={styles.mainLayout}>
                <div className={styles.titleLayout}>
                    <h1>Welcome to The Notes</h1>
                    <h2>please sign up here</h2>
                </div>
                <form onSubmit={handleSubmit}>
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
    );
};

export default Register;
