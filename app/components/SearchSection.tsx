"use client";
import { useState } from "react";
import { searchStudents, addPointToStudent } from "@/services/students";
import EditStudentModal from "./EditStudentModal";
import AddStudentModal from "./AddStudentModal";

export default function SearchSection() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleSearch = async (value: string) => {
        if (value.trim().length < 2) {
            setSearchResults([]);
            return;
        }
        setLoading(true);
        try {
            const results = await searchStudents(value);
            setSearchResults(results);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const startVoiceSearch = () => {
        if (!("webkitSpeechRecognition" in window)) {
            alert("Trình duyệt không hỗ trợ nhận diện giọng nói");
            return;
        }
        setIsListening(true);
        const SpeechRecognition = (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "vi-VN";
        recognition.onresult = (event: any) => {
            let transcript = event.results[0][0].transcript;
            transcript = transcript.replace(/[.?!]+$/, "");
            setSearchQuery(transcript);
            setTimeout(() => handleSearch(transcript), 100);
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
    };

    const handleAddPoint = async (student: any) => {
        try {
            await addPointToStudent(student.id, (student.points || 0) + 1);
            alert(`Đã cộng 1 điểm cho ${student.name}`);
        } catch (e) {
            alert("Không thể cộng điểm!");
        }
    };

    const handleEditStudent = (student: any) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        handleSearch(searchQuery);
    };

    const handleAddNewStudent = () => {
        setIsAddModalOpen(true);
    };

    const handleAddSuccess = () => {
        handleSearch(searchQuery);
    };

    return (
        <div className="card full-width">
            <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Tìm kiếm và điểm danh</span>
                <button
                    className="btn btn-primary"
                    style={{
                        padding: "8px 16px",
                        fontSize: "14px",
                        borderRadius: "6px",
                        background: "#7c3aed",
                        color: "white",
                        border: "none",
                        fontWeight: 500,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        transition: "background 0.2s"
                    }}
                    onClick={handleAddNewStudent}
                >
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
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleSearch(e.target.value);
                        }}
                    />
                    <button className="btn btn-primary btn-icon" onClick={startVoiceSearch}>
                        {isListening ? (
                            <i className="fas fa-microphone-alt pulse-animation"></i>
                        ) : (
                            <i className="fas fa-microphone-alt"></i>
                        )}
                    </button>
                </div>

                {loading && <div className="loading">Đang tải...</div>}

                {!loading && (
                    <ul className="student-list search-results search-results-container">
                        {searchResults.length > 0 ? (
                            searchResults.map((s, i) => (
                                <li key={i} className="student-item">
                                    <div className="student-info">
                                        <h3>{`${s.saint_name} ${s.name}`}</h3>
                                        <div className="student-meta">
                                            Giới tính: {s.gender} | Lớp: {s.class} | Đội: {s.team_name} | Điểm: {s.points}
                                        </div>
                                    </div>
                                    <div
                                        className="action-btn-group"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            marginTop: 4,
                                            marginBottom: 4,
                                            flexWrap: "wrap" // Nếu muốn responsive, hoặc bỏ nếu luôn đủ chỗ
                                        }}>
                                        <button className="btn btn-secondary" style={{
                                            padding: "6px 18px",
                                            fontSize: 15,
                                            borderRadius: 6,
                                            background: "#fff",
                                            color: "#7c3aed",
                                            border: "1.5px solid #7c3aed",
                                            fontWeight: 500,
                                            boxShadow: "none",
                                            transition: "background 0.2s"
                                        }} onClick={() => handleAddPoint(s)}>
                                            Cộng điểm
                                        </button>
                                        <button className="btn btn-edit" style={{
                                            padding: "6px 14px",
                                            fontSize: 14,
                                            borderRadius: 6,
                                            background: "#f5f5f5",
                                            color: "#333",
                                            border: "1px solid #ccc",
                                            fontWeight: 500,
                                            boxShadow: "none",
                                            transition: "background 0.2s"
                                        }} onClick={() => handleEditStudent(s)}>
                                            Sửa
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            searchQuery.length >= 2 && !loading && <div>Không tìm thấy kết quả nào</div>
                        )}
                    </ul>
                )}

                {selectedStudent && (
                    <EditStudentModal
                        student={selectedStudent}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onUpdate={handleUpdate}
                    />
                )}
                <AddStudentModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAddSuccess}
                />
            </div>
        </div>
    );
}
