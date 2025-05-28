"use client"

import { useState, useCallback } from "react"
import { JikanAPI, type MangaData, type MangaFilters } from "@/lib/jikan-api"

interface UseMangaSearchResult {
  mangas: MangaData[]
  loading: boolean
  error: string | null
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  searchManga: (filters: MangaFilters) => Promise<void>
  clearResults: () => void
}

export function useMangaSearch(): UseMangaSearchResult {
  const [mangas, setMangas] = useState<MangaData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)

  const searchManga = useCallback(async (filters: MangaFilters) => {
    try {
      setLoading(true)
      setError(null)

      const response = await JikanAPI.searchMangaWithFilters(filters)

      setMangas(response.data)
      setTotalPages(response.pagination.last_visible_page)
      setCurrentPage(response.pagination.current_page)
      setHasNextPage(response.pagination.has_next_page)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al buscar manga")
      setMangas([])
    } finally {
      setLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setMangas([])
    setError(null)
    setTotalPages(0)
    setCurrentPage(1)
    setHasNextPage(false)
  }, [])

  return {
    mangas,
    loading,
    error,
    totalPages,
    currentPage,
    hasNextPage,
    searchManga,
    clearResults,
  }
}
