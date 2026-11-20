import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const WARDS = ["Chinsali Central", "Mwika", "Lubwa", "Mulilansolo", "Kabanda", "Other"];
export const CATEGORIES = ["Water", "Roads", "Sanitation", "Health", "Education", "Electricity", "Safety", "Other"];

export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: async () => {
    const { data, error } = await supabase.from("projects").select("*").order("created_at");
    if (error) throw error;
    return data;
  },
});

export const pollsQuery = queryOptions({
  queryKey: ["polls"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("polls")
      .select("id, question, active, poll_options(id, label, votes)")
      .eq("active", true);
    if (error) throw error;
    return data;
  },
});

export const formatKwacha = (n: number | null) => (n == null ? "—" : `K${n.toLocaleString("en-ZM")}`);
