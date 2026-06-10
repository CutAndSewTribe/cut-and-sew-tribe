import { searchContent } from "@/services/search/search.service";

export function searchSite(
  query: string,
) {
  return searchContent(query);
}
