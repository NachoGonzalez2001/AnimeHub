"use client"

import { useState, useCallback } from "react"
import { JikanAPI, type AnimeData, type AnimeFilters } from "@/lib/jikan-api"

interface UseAnimeSearchResult {
  animes: AnimeData[]
  loading: boolean
  error: string | null
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  searchAnime: (filters: AnimeFilters) => Promise<void>
  clearResults: () => void
}

export function useAnimeSearch(): UseAnimeSearchResult {
  const [animes, setAnimes] = useState<AnimeData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)

  const searchAnime = useCallback(async (filters: AnimeFilters) => {
    try {
      setLoading(true)
      setError(null)

      const response = await JikanAPI.searchAnimeWithFilters(filters)

      setAnimes(response.data)
      setTotalPages(response.pagination.last_visible_page)
      setCurrentPage(response.pagination.current_page)
      setHasNextPage(response.pagination.has_next_page)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al buscar anime")
      setAnimes([])
    } finally {
      setLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setAnimes([])
    setError(null)
    setTotalPages(0)
    setCurrentPage(1)
    setHasNextPage(false)
  }, [])

  return {
    animes,
    loading,
    error,
    totalPages,
    currentPage,
    hasNextPage,
    searchAnime,
    clearResults,
  }
}
