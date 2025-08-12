"use client";

import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
    const router = useRouter();

    const handleGoBack = () => {
        router.push("/login");
    };

    return (
        <div className="unauthorized-container">
            <div className="unauthorized-card">
                <div className="unauthorized-header">
                    <i className="fas fa-shield-alt"></i>
                    <h1>Không Có Quyền Truy Cập</h1>
                </div>

                <div className="unauthorized-content">
                    <div className="alert alert-error">
                        <i className="fas fa-exclamation-triangle"></i>
                        <p>
                            Tài khoản của bạn chưa được cấp quyền truy cập vào hệ thống điểm danh thi đua tham dự Thánh Lễ - Simon Cup 4.
                            <br /> <br />
                            Vui lòng liên hệ với quản trị viên để được cấp quyền.
                        </p>
                    </div>

                    <div className="unauthorized-actions">
                        <button
                            className="btn btn-primary"
                            onClick={handleGoBack}
                        >
                            <i className="fas fa-arrow-left"></i>
                            Quay lại đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
