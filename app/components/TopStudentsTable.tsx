"use client";
import { useEffect, useState } from "react";
import { fetchTopStudents } from "@/services/students";

export default function TopStudentsTable() {
  const [topStudents, setTopStudents] = useState<any[]>([]);

  useEffect(() => {
    fetchTopStudents().then(setTopStudents);
  }, []);

  return (
    <div className="card">
      <div className="card-header">Bảng xếp hạng cá nhân (Top 10)</div>
      <div className="card-content">
        <table>
          <thead>
            <tr>
              <th>Tên Thánh</th>
              <th>Tên</th>
              <th>Giới tính</th>
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
  );
}
