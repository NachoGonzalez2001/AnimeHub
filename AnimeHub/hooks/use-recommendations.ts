"use client"

import { useState, useCallback } from "react"
import { JikanAPI, type RecommendationData, type AnimeData, type MangaData } from "@/lib/jikan-api"

interface UseRecommendationsResult {
  recommendations: RecommendationData[]
  randomPicks: (AnimeData | MangaData)[]
  loading: boolean
  error: string | null
  currentPage: number
  hasNextPage: boolean
  fetchRecommendations: (type: "anime" | "manga", page?: number) => Promise<void>
  fetchRandomPicks: (type: "anime" | "manga", count?: number) => Promise<void>
  clearRecommendations: () => void
}

export function useRecommendations(): UseRecommendationsResult {
  const [recommendations, setRecommendations] = useState<RecommendationData[]>([])
  const [randomPicks, setRandomPicks] = useState<(AnimeData | MangaData)[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)

  const fetchRecommendations = useCallback(async (type: "anime" | "manga", page = 1) => {
    try {
      setLoading(true)
      setError(null)

      const response =
        type === "anime" ? await JikanAPI.getAnimeRecommendations(page) : await JikanAPI.getMangaRecommendations(page)

      setRecommendations(response.data)
      setCurrentPage(response.pagination.current_page)
      setHasNextPage(response.pagination.has_next_page)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar recomendaciones")
      setRecommendations([])
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchRandomPicks = useCallback(async (type: "anime" | "manga", count = 6) => {
    try {
      setError(null)
      const picks: (AnimeData | MangaData)[] = []

      for (let i = 0; i < count; i++) {
        try {
          const response = type === "anime" ? await JikanAPI.getRandomAnime() : await JikanAPI.getRandomManga()
          picks.push(response.data)

          // Pequeña pausa entre requests para respetar rate limiting
          if (i < count - 1) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
        } catch (err) {
          console.warn(`Error fetching random ${type} ${i + 1}:`, err)
          // Continuar con el siguiente en caso de error
        }
      }

      setRandomPicks(picks)
    } catch (err) {
      console.error("Error fetching random picks:", err)
      setError("Error al cargar contenido aleatorio")
    }
  }, [])

  const clearRecommendations = useCallback(() => {
    setRecommendations([])
    setRandomPicks([])
    setError(null)
    setCurrentPage(1)
    setHasNextPage(false)
  }, [])

  return {
    recommendations,
    randomPicks,
    loading,
    error,
    currentPage,
    hasNextPage,
    fetchRecommendations,
    fetchRandomPicks,
    clearRecommendations,
  }
}
