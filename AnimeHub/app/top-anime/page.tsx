"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { RankingCard } from "@/components/ranking-card"
import { RankingFilters } from "@/components/ranking-filters"
import { Pagination } from "@/components/pagination"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { JikanAPI, type AnimeData } from "@/lib/jikan-api"
import { Trophy, TrendingUp, AlertCircle, Crown } from "lucide-react"

export default function TopAnimePage() {
  const [animes, setAnimes] = useState<AnimeData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [typeFilter, setTypeFilter] = useState<string>("")

  const fetchTopAnime = async (page: number, type?: string) => {
    try {
      setLoading(true)
      setError(null)

      // Usar siempre el endpoint de top anime que mantiene el ranking correcto
      const response = await JikanAPI.getTopAnime(page, type)

      setAnimes(response.data)
      setTotalPages(response.pagination.last_visible_page)
      setHasNextPage(response.pagination.has_next_page)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar el ranking")
      setAnimes([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTopAnime(currentPage, typeFilter)
  }, [currentPage, typeFilter])

  const handleTypeChange = (type: string) => {
    setTypeFilter(type)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleClearFilters = () => {
    setTypeFilter("")
    setCurrentPage(1)
  }

  const getStartRank = () => {
    return (currentPage - 1) * 25 + 1
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <h1 className="text-3xl font-bold">Top Anime</h1>
          </div>
          <p className="text-muted-foreground mb-4">
            Los anime mejor valorados según MyAnimeList, ordenados por puntuación
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="flex justify-center flex-col">
              <CardContent className="p-4 text-center">
                <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">Top Ranking</div>
                <div className="text-sm text-muted-foreground">
                  {typeFilter ? `Top ${typeFilter.toUpperCase()}` : "Ranking oficial de MAL"}
                </div>
              </CardContent>
            </Card>

            <Card className="flex justify-center flex-col">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">Página {currentPage}</div>
                <div className="text-sm text-muted-foreground">
                  Posiciones {getStartRank()}-{Math.min(getStartRank() + 24, getStartRank() + animes.length - 1)}
                </div>
              </CardContent>
            </Card>

            <Card className="flex justify-center flex-col">
              <CardContent className="p-4 text-center flex justify-center flex-col">
                <div className="text-2xl font-bold">{animes.length}</div>
                <div className="text-sm text-muted-foreground">Resultados en esta página</div>
                {typeFilter && (
                  <Badge variant="secondary" className="mt-2">
                    Filtrado por: {typeFilter.toUpperCase()}
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Top anime preview */}
          {currentPage === 1 && animes.length > 0 && !typeFilter && (
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-4">
                <Crown className="w-12 h-12 text-yellow-600" />
                <div>
                  <h3 className="text-lg font-bold">🏆 #1 Anime de Todos los Tiempos</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>{animes[0]?.title}</strong> - Puntuación: {animes[0]?.score}/10
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Filtro activo info */}
          {typeFilter && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Filtrado por tipo: {typeFilter.toUpperCase()}</h3>
                  <p className="text-sm text-muted-foreground">
                    Mostrando solo anime de tipo {typeFilter}, manteniendo el orden del ranking oficial
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar con filtros */}
          <div className="lg:col-span-1">
            <RankingFilters
              type="anime"
              currentType={typeFilter}
              onTypeChange={handleTypeChange}
              onClear={handleClearFilters}
            />

            {/* Información adicional */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Sobre el Ranking
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Basado en puntuaciones de usuarios de MyAnimeList</li>
                  <li>• Mantiene el orden oficial del ranking</li>
                  <li>• Numeración secuencial para mejor experiencia</li>
                  <li>• Actualizado en tiempo real desde MAL</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            {/* Error */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Cargando ranking...</p>
                </div>
              </div>
            )}

            {/* Resultados */}
            {!loading && !error && (
              <>
                {animes.length > 0 ? (
                  <>
                    <div className="space-y-4 mb-8">
                      {animes.map((anime, index) => {
                        // Siempre usar posición secuencial basada en página e índice
                        // Esto garantiza numeración consistente 1, 2, 3, 4...
                        const position = (currentPage - 1) * 25 + index + 1

                        return (
                          <RankingCard
                            key={anime.mal_id}
                            item={anime}
                            position={position}
                            type="anime"
                            showRealRank={!typeFilter} // Mostrar rank real solo cuando no hay filtros
                          />
                        )
                      })}
                    </div>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.min(totalPages, 100)} // Limitar a páginas razonables
                      hasNextPage={hasNextPage && currentPage < 100}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No se encontraron resultados</h3>
                      <p className="text-muted-foreground mb-4">
                        No hay anime en el ranking con los filtros seleccionados
                      </p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
