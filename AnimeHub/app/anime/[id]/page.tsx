"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { AnimeDetails } from "@/components/anime-details"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { JikanAPI, type AnimeData } from "@/lib/jikan-api"
import { ArrowLeft, AlertCircle } from "lucide-react"

export default function AnimeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [anime, setAnime] = useState<AnimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const animeId = params.id as string

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true)
        setError(null)

        const id = Number.parseInt(animeId)
        if (isNaN(id)) {
          throw new Error("ID de anime inválido")
        }

        const response = await JikanAPI.getAnimeById(id)
        setAnime(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar el anime")
      } finally {
        setLoading(false)
      }
    }

    if (animeId) {
      fetchAnime()
    }
  }, [animeId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando detalles del anime...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button variant="outline" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || "No se pudo cargar el anime"}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a la búsqueda
        </Button>

        <AnimeDetails anime={anime} />
      </div>
    </div>
  )
}
