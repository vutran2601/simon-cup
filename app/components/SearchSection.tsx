"use client";
import { useState } from "react";
import { searchStudents, addPointToStudent } from "@/services/students";
import EditStudentModal from "./EditStudentModal";
import AddStudentModal from "./AddStudentModal";

export default function SearchSection() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleSearch = async (value: string) => {
        if (value.trim().length < 2) return setSearchResults([]);
        setLoading(true);
        try { setSearchResults(await searchStudents(value)); } catch { }
        setLoading(false);
    };

    const handleAddPoint = async (student: any) => {
        try {
            await addPointToStudent(student.id, (student.points || 0) + 1);
            alert(`Đã cộng 1 điểm cho ${student.name}`);
        } catch {
            alert("Không thể cộng điểm!");
        }
    };

    return (
        <div className="card full-width">
            <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Tìm kiếm và điểm danh</span>
                <button className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 14, borderRadius: 6, background: "#7c3aed" }} onClick={() => setIsAddModalOpen(true)}>
                    Thêm cá nhân mới
                </button>
            </div>
            <div className="card-content">
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Tìm kiếm..."
                        value={searchQuery}
                        onChange={e => { setSearchQuery(e.target.value); handleSearch(e.target.value); }}
                    />
                </div>
                {loading && <div className="loading">Đang tải...</div>}
                {!loading && (
                    <ul className="student-list search-results search-results-container">
                        {searchResults.length > 0 ? searchResults.map((s, i) => (
                            <li key={i} className="student-item">
                                <div className="student-info">
                                    <h3>{`${s.saint_name} ${s.name}`}</h3>
                                    <div className="student-meta">
                                        Giới tính: {s.gender} | Lớp: {s.class} | Đội: {s.team_name} |<br />
                                        Điểm: {s.points}
                                    </div>
                                </div>
                                <div className="action-btn-group">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleAddPoint(s)}
                                    >
                                        Cộng điểm
                                    </button>
                                    <button
                                        className="btn btn-edit"
                                        onClick={() => { setSelectedStudent(s); setIsModalOpen(true); }}
                                    >
                                        Sửa
                                    </button>
                                </div>
                            </li>
                        )) : (searchQuery.length >= 2 && !loading && <div>Không tìm thấy kết quả nào</div>)}
                    </ul>
                )}
                {selectedStudent && (
                    <EditStudentModal
                        student={selectedStudent}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onUpdate={() => handleSearch(searchQuery)}
                    />
                )}
                <AddStudentModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={() => handleSearch(searchQuery)}
                />
            </div>
        </div>
    );
}