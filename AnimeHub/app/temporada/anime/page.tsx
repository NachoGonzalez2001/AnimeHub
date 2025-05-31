"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { MangaCard } from "@/components/manga-card" // o AnimeCard si tenés uno propio
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

export default function TemporadaAnimePage() {
  const [animeList, setAnimeList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSeasonAnime = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch("https://api.jikan.moe/v4/seasons/now")
        const data = await res.json()
        setAnimeList(data.data)
      } catch (err) {
        setError("Error al cargar los animes de esta temporada")
      } finally {
        setLoading(false)
      }
    }

    fetchSeasonAnime()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Anime de la Temporada Actual</h1>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {animeList.map((anime: any) => (
              <MangaCard key={anime.mal_id} manga={anime} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
