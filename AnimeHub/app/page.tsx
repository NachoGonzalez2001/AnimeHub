"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { AnimeCard } from "@/components/anime-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { JikanAPI, type AnimeData } from "@/lib/jikan-api"
import { TrendingUp, Calendar, Star, Search } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [currentSeasonAnime, setCurrentSeasonAnime] = useState<AnimeData[]>([])
  const [topAnime, setTopAnime] = useState<AnimeData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Obtener anime de temporada actual
        const seasonResponse = await JikanAPI.getCurrentSeasonAnime()
        setCurrentSeasonAnime(seasonResponse.data.slice(0, 8))

        // Pequeña pausa para respetar rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Obtener top anime
        const topResponse = await JikanAPI.getTopAnime()
        setTopAnime(topResponse.data.slice(0, 4))
      } catch (error) {
        console.error("Error fetching data:", error)
        // En caso de error, mostrar contenido por defecto
        setCurrentSeasonAnime([])
        setTopAnime([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando contenido...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Bienvenido a AnimeHub</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Tu portal definitivo para descubrir anime y manga</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/anime">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Search className="w-5 h-5 mr-2" />
                Explorar Anime
              </Button>
            </Link>
            <Link href="/manga">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600"
              >
                <Search className="w-5 h-5 mr-2" />
                Explorar Manga
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Top Rankings</h3>
                <p className="text-muted-foreground">Descubre los anime y manga mejor valorados</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Temporada Actual</h3>
                <p className="text-muted-foreground">Mantente al día con los últimos lanzamientos</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Recomendaciones</h3>
                <p className="text-muted-foreground">Encuentra tu próximo anime o manga favorito</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Season Anime */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Anime de Temporada</h2>
            <Link href="/anime">
              <Button variant="outline">Ver todos</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentSeasonAnime.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Anime Preview */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Top Anime</h2>
            <Link href="/top-anime">
              <Button variant="outline">Ver ranking completo</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topAnime.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AH</span>
            </div>
            <span className="font-bold text-xl">AnimeHub</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Datos proporcionados por Jikan API - Una API no oficial de MyAnimeList
          </p>
          <p className="text-sm text-muted-foreground">© 2025 AnimeHub. Proyecto educativo para RIA 2025.</p>
        </div>
      </footer>
    </div>
  )
}
