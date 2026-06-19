import {
  searchContent,
} from "@/services/search/search.service";

import type {
  SearchFilters,
} from "@/services/search/search.types";


export function searchSite(
  query: string,
  filters?: SearchFilters,
) {

  return searchContent(
    query,
    filters,
  );

}

