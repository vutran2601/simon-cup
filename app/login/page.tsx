"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { isAuthorizedEmail } from "@/lib/config";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (user.email && isAuthorizedEmail(user.email)) {
                router.push("/");
            } else {
                router.push("/unauthorized");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Đăng nhập thất bại. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Kiểm tra nếu đã đăng nhập và email đúng
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.email && isAuthorizedEmail(user.email)) {
                router.push("/");
            }
        });

        return () => unsubscribe();
    }, [router]);

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Đăng Nhập Simon Cup</h1>
                    <p>Vui lòng đăng nhập để tiếp tục</p>
                </div>

                <div className="login-content">
                    {error && (
                        <div className="alert alert-error">
                            <i className="fas fa-exclamation-circle"></i>
                            {error}
                        </div>
                    )}

                    <button
                        className="btn btn-primary google-login-btn"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i>
                                Đang đăng nhập...
                            </>
                        ) : (
                            <>
                                <i className="fab fa-google"></i>
                                Đăng nhập với Google
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
