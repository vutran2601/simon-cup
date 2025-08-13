"use client";
import { useEffect } from "react";

interface NotificationPopupProps {
    message: string;
    type: "success" | "error";
    isOpen: boolean;
    onClose: () => void;
}

export default function NotificationPopup({ message, type, isOpen, onClose }: NotificationPopupProps) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const bgColor = type === "success" ? "rgba(34, 197, 94, 0.95)" : "rgba(239, 68, 68, 0.95)";
    const borderColor = type === "success" ? "#22c55e" : "#ef4444";

    return (
        <div style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: bgColor,
            color: "white",
            padding: "16px 24px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            border: `1px solid ${borderColor}`,
            zIndex: 1000,
            animation: "slideIn 0.3s ease-out",
            maxWidth: "400px",
            fontSize: "14px",
            fontWeight: "500"
        }}>
            {message}
            <button 
                onClick={onClose}
                style={{
                    marginLeft: "12px",
                    background: "none",
                    border: "none",
                    color: "white",
                    fontSize: "18px",
                    cursor: "pointer",
                    opacity: 0.8,
                    transition: "opacity 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "0.8"}
            >
                ×
            </button>
            <style jsx>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}
