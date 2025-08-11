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
        <h1 className="header-title">SIMON CUP IV - Tham dự Thánh Lễ</h1>
        <div style={{
          position: 'absolute',
          right: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          {user && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'white',
              fontSize: '0.875rem'
            }}>
              <img 
                src={user.photoURL || '/default-avatar.png'} 
                alt="User Avatar"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '2px solid white'
                }}
              />
              <span>{user.displayName || user.email}</span>
            </div>
          )}
          <button 
            className="btn btn-secondary logout-btn"
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.875rem'
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
            Đăng xuất
          </button>
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
