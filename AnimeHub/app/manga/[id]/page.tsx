"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { MangaDetails } from "@/components/manga-details"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { JikanAPI, type MangaData } from "@/lib/jikan-api"
import { ArrowLeft, AlertCircle } from "lucide-react"

export default function MangaDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [manga, setManga] = useState<MangaData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const mangaId = params.id as string

  useEffect(() => {
    const fetchManga = async () => {
      try {
        setLoading(true)
        setError(null)

        const id = Number.parseInt(mangaId)
        if (isNaN(id)) {
          throw new Error("ID de manga inválido")
        }

        const response = await JikanAPI.getMangaById(id)
        setManga(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar el manga")
      } finally {
        setLoading(false)
      }
    }

    if (mangaId) {
      fetchManga()
    }
  }, [mangaId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando detalles del manga...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !manga) {
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
            <AlertDescription>{error || "No se pudo cargar el manga"}</AlertDescription>
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

        <MangaDetails manga={manga} />
      </div>
    </div>
  )
}
