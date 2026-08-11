import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Pattern } from "@/types/pattern";

type PatternRow = Pattern;

function mapPattern(row: PatternRow): Pattern {
return {
...row,
position:
row.position === null || row.position === undefined
? null
: Number(row.position),
};
}

export async function getPublishedPatterns(): Promise<Pattern[]> {
const { data, error } = await supabaseAdmin
.from("patterns")
.select("*")
.eq("published", true)
.order("position", { ascending: true });

if (error || !data) {
console.error("getPublishedPatterns error:", error);
return [];
}

return data.map(mapPattern);
}

export async function getFeaturedPatterns(): Promise<Pattern[]> {
const { data, error } = await supabaseAdmin
.from("patterns")
.select("*")
.eq("published", true)
.eq("featured", true)
.order("position", { ascending: true });

if (error || !data) {
console.error("getFeaturedPatterns error:", error);
return [];
}

return data.map(mapPattern);
}

export async function getPatternBySlug(
slug: string
): Promise<Pattern | null> {
const { data, error } = await supabaseAdmin
.from("patterns")
.select("*")
.eq("slug", slug)
.eq("published", true)
.single();

if (error || !data) {
return null;
}

return mapPattern(data);
}

export async function getAllPatterns(): Promise<Pattern[]> {
const { data, error } = await supabaseAdmin
.from("patterns")
.select("*")
.order("position", { ascending: true });

if (error || !data) {
console.error("getAllPatterns error:", error);
return [];
}

return data.map(mapPattern);
}

export async function getPatternById(
id: string
): Promise<Pattern | null> {
const { data, error } = await supabaseAdmin
.from("patterns")
.select("*")
.eq("id", id)
.single();

if (error || !data) {
return null;
}

return mapPattern(data);
}

export async function updatePatternPositions(
positions: { id: string; position: number }[]
): Promise<void> {
for (const item of positions) {
const { error } = await supabaseAdmin
.from("patterns")
.update({ position: item.position })
.eq("id", item.id);


if (error) {
  throw error;
}


}
}


