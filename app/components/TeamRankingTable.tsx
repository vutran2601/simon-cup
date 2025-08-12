"use client";
import { useEffect, useState } from "react";
import { fetchTeamRankings } from "@/services/teams";

export default function TeamRankingTable() {
    const [teamRankings, setTeamRankings] = useState<any[]>([]);

    useEffect(() => {
        fetchTeamRankings().then(setTeamRankings);
    }, []);

    return (
        <div className="card">
            <div className="card-header">Bảng xếp hạng theo đội</div>
            <div className="card-content">
                <table>
                    <thead>
                        <tr>
                            <th>Đội</th>
                            <th>Tổng điểm</th>
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
    );
}
