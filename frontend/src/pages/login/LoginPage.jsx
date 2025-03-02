import { Eye, EyeClosed, Spinner, Envelope, Lock } from "@phosphor-icons/react";
import { useAuthStore } from "../../store/useAuthStore";
import { useState } from "react";
import styles from "./Login.module.css";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { login, isLoggingIn } = useAuthStore();

    function handleSubmit(e) {
        e.preventDefault();
        login(formData);
        console.log('logged in')
    }

    return (
        <div>
            <div className={styles.container}>
                <div>
                    <div>
                        <h1>Welcome Back</h1>
                      
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <span>
                            <Envelope size={18} />
                            <input
                                type='email'
                                className={styles.input}
                                placeholder='you@example.com'
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </span>

                    </div>

                    <div className={styles.inputContainer}>
                    <span>
                        <Lock size={18} />
                            <input
                            className={styles.input}
                                type={showPassword ? "text" : "password"}
                                placeholder='••••••••'
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <button
                            className={styles.btn}
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                            </button>
                            </span>
                    </div>

                    <button type='submit' disabled={isLoggingIn}>
                        {isLoggingIn ? (
                            <>
                                <Spinner />
                                Loading...
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </button>
                </form>

                
            </div>
        </div>
    );
}
