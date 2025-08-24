"use client";
import { useEffect, useState } from "react";
import { fetchTeamRankings } from "@/services/teams";
import TeamBadge from "./TeamBadge";

export default function TeamRankingTable() {
    const [teamRankings, setTeamRankings] = useState<any[]>([]);
    const [memberCounts, setMemberCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        fetchTeamRankings().then(setTeamRankings);
    }, []);

    const handleMemberCountChange = (teamName: string, count: number) => {
        if (count >= 1) {
            setMemberCounts(prev => ({
                ...prev,
                [teamName]: count
            }));
        }
    };

    const calculateAverageScore = (totalPoints: number, teamName: string) => {
        const count = memberCounts[teamName];
        if (!count || count === 0) return "-";
        return (totalPoints / count).toFixed(2);
    };

    return (
        <div className="card">
            <div className="card-header">Bảng xếp hạng theo đội</div>
            <div className="card-content">
                <table>
                    <thead>
                        <tr>
                            <th>Đội</th>
                            <th>Lượt đi lễ</th>
                            <th>Sĩ số</th>
                            <th>Điểm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamRankings.map((team, i) => (
                            <tr key={i}>
                                <td>
                                    <TeamBadge teamName={team.team_name} />
                                </td>
                                <td>{team.total_points}</td>
                                <td>
                                    <input
                                        type="number"
                                        min="1"
                                        value={memberCounts[team.team_name] || ""}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            handleMemberCountChange(team.team_name, isNaN(value) ? 0 : value);
                                        }}
                                        placeholder="Nhập sĩ số"
                                        style={{
                                            width: "80px",
                                            padding: "4px 8px",
                                            border: "1px solid #ddd",
                                            borderRadius: "4px"
                                        }}
                                    />
                                </td>
                                <td>
                                    {calculateAverageScore(team.total_points, team.team_name)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
