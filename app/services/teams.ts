import { supabase } from '@/lib/supabase';

export async function fetchTeamRankings() {
    const { data, error } = await supabase
        .from('list')
        .select('team_name, points');

    if (error) throw error;

    const teamMap: Record<string, number> = {};
    data.forEach((row) => {
        if (!teamMap[row.team_name]) teamMap[row.team_name] = 0;
        teamMap[row.team_name] += row.points;
    });

    const rankings = Object.entries(teamMap)
        .map(([team, total]) => ({ team_name: team, total_points: total }))
        .sort((a, b) => b.total_points - a.total_points);

    return rankings;
}
