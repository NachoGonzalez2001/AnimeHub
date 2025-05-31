"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { MangaCard } from "@/components/manga-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

export default function TemporadaMangaPage() {
  const [mangaList, setMangaList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTopManga = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch("https://api.jikan.moe/v4/manga?order_by=popularity&sort=desc&page=1")
        const data = await res.json()
        setMangaList(data.data)
      } catch (err) {
        setError("Error al cargar mangas populares")
      } finally {
        setLoading(false)
      }
    }

    fetchTopManga()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Manga Popular Reciente</h1>

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
            {mangaList.map((manga: any) => (
              <MangaCard key={manga.mal_id} manga={manga} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
