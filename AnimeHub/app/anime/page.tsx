"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { SearchBar } from "@/components/search-bar"
import { AnimeFilters } from "@/components/anime-filters"
import { AnimeCard } from "@/components/anime-card"
import { Pagination } from "@/components/pagination"
import { useAnimeSearch } from "@/hooks/use-anime-search"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import type { AnimeFilters as AnimeFiltersType } from "@/lib/jikan-api"
import { Search, AlertCircle } from "lucide-react"

export default function AnimePage() {
  const { animes, loading, error, totalPages, currentPage, hasNextPage, searchAnime, clearResults } = useAnimeSearch()
  const [currentFilters, setCurrentFilters] = useState<AnimeFiltersType>({})
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query: string) => {
    const filters: AnimeFiltersType = {
      ...currentFilters,
      q: query || undefined,
      page: 1,
      limit: 20,
    }

    setCurrentFilters(filters)
    setHasSearched(true)
    await searchAnime(filters)
  }

  const handleFiltersChange = async (filters: AnimeFiltersType) => {
    const newFilters: AnimeFiltersType = {
      ...filters,
      q: currentFilters.q,
      page: 1,
      limit: 20,
    }

    setCurrentFilters(newFilters)

    if (hasSearched || Object.keys(filters).length > 0) {
      await searchAnime(newFilters)
    }
  }

  const handlePageChange = async (page: number) => {
    const filters: AnimeFiltersType = {
      ...currentFilters,
      page,
    }

    setCurrentFilters(filters)
    await searchAnime(filters)

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Búsqueda inicial con anime populares
  useEffect(() => {
    const initialSearch = async () => {
      await searchAnime({
        order_by: "popularity",
        sort: "asc",
        page: 1,
        limit: 20,
      })
      setHasSearched(true)
    }

    initialSearch()
  }, [searchAnime])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Buscar Anime</h1>
          <SearchBar onSearch={handleSearch} placeholder="Buscar anime por título..." />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar con filtros */}
          <div className="lg:col-span-1">
            <AnimeFilters onFiltersChange={handleFiltersChange} loading={loading} />
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
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Buscando anime...</p>
                </div>
              </div>
            )}

            {/* Resultados */}
            {!loading && !error && (
              <>
                {animes.length > 0 ? (
                  <>
                    <div className="mb-6">
                      <p className="text-muted-foreground">
                        Mostrando página {currentPage} de {totalPages} ({animes.length} resultados)
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                      {animes.map((anime) => (
                        <AnimeCard key={anime.mal_id} anime={anime} />
                      ))}
                    </div>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      hasNextPage={hasNextPage}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : hasSearched ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No se encontraron resultados</h3>
                      <p className="text-muted-foreground mb-4">
                        Intenta ajustar tus filtros o buscar con términos diferentes
                      </p>
                    </CardContent>
                  </Card>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
