import { supabase } from "@/lib/supabase";

export async function fetchTopStudents(limit = 10) {
  const { data, error } = await supabase
    .from("list")
    .select("*")
    .gt("points", 0)
    .order("points", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function searchStudents(keyword: string) {
  const { data, error } = await supabase
    .from("list")
    .select("*")
    .ilike("name", `%${keyword}%`)
    .order("name");

  if (error) throw error;
  return data || [];
}

export async function addPointToStudent(id: number, newPoints: number) {
  const { data, error } = await supabase
    .from("list")
    .update({ points: newPoints })
    .eq("id", id);

  if (error) throw error;
  return data;
}

export async function updateStudentInfo(id: number, studentData: any) {
  const { data, error } = await supabase
    .from("list")
    .update(studentData)
    .eq("id", id);

  if (error) throw error;
  return data;
}

export async function createStudent(studentData: any) {
  const { data, error } = await supabase
    .from("list")
    .insert([studentData]);

  if (error) throw error;
  return data;
}

export async function fetchAllTeams() {
  return ['Đội 0', 'Đội 1', 'Đội 2', 'Đội 3', 'Đội 4'];
}
