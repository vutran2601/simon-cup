"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import "./globals.css";
import { c } from "node_modules/framer-motion/dist/types.d-Cjd591yU";

interface Person {
  id: number;
  saint_name: string;
  name: string;
  gender: string;
  class: string;
  team_name: string;
  points: number;
}

interface TeamRanking {
  team_name: string;
  total_points: number;
}



export default function Home() {
  const [topStudents, setTopStudents] = useState<Person[]>([]);
  const [teamRankings, setTeamRankings] = useState<TeamRanking[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

 useEffect(() => {
    fetchTopStudents();
    fetchTeamRankings();
  }, []);

useEffect(() => {
  handleSearch(searchQuery);
}, [searchQuery]);

  async function fetchTopStudents() {
    let { data, error } = await supabase
      .from("list")
      .select("*")
      .order("points", { ascending: false })
      .limit(10);

    if (!error && data) setTopStudents(data);
  }

  async function fetchTeamRankings() {
    let { data, error } = await supabase
      .from("list")
      .select("team_name, points");

    if (!error && data) {
      // Tính tổng điểm theo đội
      const teamMap: any = {};
      data.forEach(row => {
        if (!teamMap[row.team_name]) teamMap[row.team_name] = 0;
        teamMap[row.team_name] += row.points;
      });
      const rankings: any = Object.entries(teamMap).map(([team, total]) => ({
        team_name: team,
        total_points: total
      }));
      rankings.sort((a: any, b: any) => b.total_points - a.total_points);
      setTeamRankings(rankings);
    }
  }

 const handleSearch = async (value: string) => {
  if (value.trim().length < 2) {
    setSearchResults([]);
    return;
  }

  setLoading(true);

  const { data, error } = await supabase
    .from("list")
    .select("*")
    .filter(
      "name",
      "ilike",
      `%${value}%`
    )
    .order("name");

  if (error) {
    console.error("Search error:", error);
    setSearchResults([]);
  } else {
    setSearchResults(data || []);
  }

  setLoading(false);
};

  const addPoint = async (index: number) => {
  const student = searchResults[index];
  const newPoints = (student.points || 0) + 1;

  // Update thẳng vào DB
  const { data, error } = await supabase
    .from("list")
    .update({ points: newPoints })
    .eq("id", student.id); // Cần cột id để xác định row

  if (error) {
    console.error("Lỗi khi cập nhật điểm:", error);
    alert("Không thể cộng điểm!");
    return;
  }

  alert(`Đã cộng 1 điểm cho ${student.name}`);
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

  return (
    <>
      <header>
        <h1 className="header-title">Điểm Danh Tham Dự Thánh Lễ</h1>
      </header>

      <div className="container">
        <div className="grid-container">
          <div className="card full-width">
            <div className="card-header">Tìm Kiếm Và Điểm Danh</div>
            <div className="card-content">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Tìm kiếm (Tên Thánh, Họ, Tên, Lớp, Đội...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary" onClick={startVoiceSearch}>
                  <i className="fas fa-microphone-alt"></i>{" "}
                  {isListening ? "Đang Nghe..." : "Tìm Bằng Giọng Nói"}
                </button>
              </div>

              {loading && (
                <div className="loading">
                  <div className="spinner"></div>
                </div>
              )}

              <ul className="student-list search-results">
                {searchResults.length > 0 ? (
                  searchResults.map((s, i) => (
                    <li className="student-item" key={i}>
                      <div className="student-info">
                        <h3>{`${s.saint_name} ${s.name}`}</h3>
                        <div className="student-meta">
                          Giới tính: {s.gender} | Lớp: {s.class} | Đội: {s.team_name} | Điểm: {s.points}
                        </div>
                      </div>
                      <div className="student-actions">
                        <button
                          className="btn btn-secondary"
                          onClick={() => addPoint(searchResults.indexOf(s))}
                        >
                          Cộng Điểm
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  searchQuery.length >= 2 && !loading && (
                    <div className="no-results">Không tìm thấy kết quả nào</div>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Thứ Hạng Các Đội</div>
            <div className="card-content">
              <table>
                <thead>
                  <tr>
                    <th>Đội</th>
                    <th>Tổng Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  {teamRankings.map((team, i) => (
                    <tr key={i}>
                      <td>{team.team_name}</td>
                      <td>{team.total_points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Top 10 Bạn Cao Điểm Nhất</div>
            <div className="card-content">
              <table>
                <thead>
                  <tr>
                    <th>Tên Thánh</th>
                    <th>Họ</th>
                    <th>Tên</th>
                    <th>Giới Tính</th>
                    <th>Lớp</th>
                    <th>Đội</th>
                    <th>Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  {topStudents.map((s, i) => (
                    <tr key={i}>
                      <td>{s.saint_name}</td>
                      <td>{s.name}</td>
                      <td>{s.gender}</td>
                      <td>{s.class}</td>
                      <td>{s.team_name}</td>
                      <td>{s.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
