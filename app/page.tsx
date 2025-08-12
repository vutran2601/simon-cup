"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { isAuthorizedEmail } from "@/lib/config";
import SearchSection from "@/components/SearchSection";
import TeamRankingTable from "@/components/TeamRankingTable";
import TopStudentsTable from "@/components/TopStudentsTable";
import "./globals.css";

export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user || user.email && !isAuthorizedEmail(user.email)) {
                router.push("/login");
            } else {
                setUser(user);
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <>
            <header>
                <div className="header-content">
                    <h1 className="header-title">SIMON CUP IV - Tham dự Thánh Lễ</h1>
                    <div className="header-user-info">
                        {user && (
                            <div className="user-info">
                                <img
                                    src={user.photoURL || '/default-avatar.png'}
                                    alt="User Avatar"
                                    className="user-avatar"
                                />
                                <span className="user-name">{user.displayName || user.email}</span>
                            </div>
                        )}
                        <button
                            className="btn btn-secondary logout-btn"
                            onClick={handleLogout}
                        >
                            <i className="fas fa-sign-out-alt"></i>
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="grid-container">
                    <SearchSection />
                    <TeamRankingTable />
                    <TopStudentsTable />
                </div>
            </div>
        </>
    );
}
