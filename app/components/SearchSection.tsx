"use client";
import { useState } from "react";
import { searchStudents, addPointToStudent } from "@/services/students";

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

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

  return (
    <div className="card full-width">
      <div className="card-header">Tìm kiếm và điểm danh</div>
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
                  <button className="btn btn-secondary" onClick={() => handleAddPoint(s)}>
                    Cộng điểm
                  </button>
                </li>
              ))
            ) : (
              searchQuery.length >= 2 && !loading && <div>Không tìm thấy kết quả nào</div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
