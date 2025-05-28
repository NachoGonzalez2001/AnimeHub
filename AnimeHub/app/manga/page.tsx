"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { SearchBar } from "@/components/search-bar"
import { MangaFilters } from "@/components/manga-filters"
import { MangaCard } from "@/components/manga-card"
import { Pagination } from "@/components/pagination"
import { useMangaSearch } from "@/hooks/use-manga-search"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { MangaFilters as MangaFiltersType } from "@/lib/jikan-api"
import { Search, AlertCircle, BookOpen, TrendingUp } from "lucide-react"

export default function MangaPage() {
  const { mangas, loading, error, totalPages, currentPage, hasNextPage, searchManga, clearResults } = useMangaSearch()
  const [currentFilters, setCurrentFilters] = useState<MangaFiltersType>({})
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query: string) => {
    const filters: MangaFiltersType = {
      ...currentFilters,
      q: query || undefined,
      page: 1,
      limit: 20,
    }

    setCurrentFilters(filters)
    setHasSearched(true)
    await searchManga(filters)
  }

  const handleFiltersChange = async (filters: MangaFiltersType) => {
    const newFilters: MangaFiltersType = {
      ...filters,
      q: currentFilters.q,
      page: 1,
      limit: 20,
    }

    setCurrentFilters(newFilters)

    if (hasSearched || Object.keys(filters).length > 0) {
      await searchManga(newFilters)
    }
  }

  const handlePageChange = async (page: number) => {
    const filters: MangaFiltersType = {
      ...currentFilters,
      page,
    }

    setCurrentFilters(filters)
    await searchManga(filters)

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Búsqueda inicial con manga populares
  useEffect(() => {
    const initialSearch = async () => {
      await searchManga({
        order_by: "popularity",
        sort: "asc",
        page: 1,
        limit: 20,
      })
      setHasSearched(true)
    }

    initialSearch()
  }, [searchManga])

  const getActiveFiltersCount = () => {
    return Object.keys(currentFilters).filter(
      (key) => currentFilters[key as keyof MangaFiltersType] !== undefined && key !== "page" && key !== "limit",
    ).length
  }

  const getFilterSummary = () => {
    const summary = []
    if (currentFilters.type) summary.push(`Tipo: ${currentFilters.type}`)
    if (currentFilters.status) summary.push(`Estado: ${currentFilters.status}`)
    if (currentFilters.order_by) summary.push(`Orden: ${currentFilters.order_by}`)
    return summary
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold">Buscar Manga</h1>
          </div>
          <p className="text-muted-foreground mb-4">
            Descubre manga, manhwa, manhua, light novels y más contenido de lectura
          </p>
          <SearchBar onSearch={handleSearch} placeholder="Buscar manga por título..." />

          {/* Filtros activos */}
          {getActiveFiltersCount() > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Filtros activos:</span>
              {getFilterSummary().map((filter, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {filter}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar con filtros */}
          <div className="lg:col-span-1">
            <MangaFilters onFiltersChange={handleFiltersChange} loading={loading} />

            {/* Información adicional */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Consejos de búsqueda
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Usa términos en inglés o japonés para mejores resultados</li>
                  <li>• Combina filtros para búsquedas más específicas</li>
                  <li>• Prueba diferentes tipos: manga, manhwa, manhua</li>
                  <li>• Ordena por popularidad para descubrir títulos populares</li>
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
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Buscando manga...</p>
                </div>
              </div>
            )}

            {/* Resultados */}
            {!loading && !error && (
              <>
                {mangas.length > 0 ? (
                  <>
                    <div className="mb-6 flex justify-between items-center">
                      <p className="text-muted-foreground">
                        Mostrando página {currentPage} de {totalPages} ({mangas.length} resultados)
                      </p>

                      {/* Estadísticas rápidas */}
                      <div className="hidden sm:flex gap-4 text-sm text-muted-foreground">
                        <span>📚 {mangas.filter((m) => m.type === "manga").length} Manga</span>
                        <span>🇰🇷 {mangas.filter((m) => m.type === "manhwa").length} Manhwa</span>
                        <span>🇨🇳 {mangas.filter((m) => m.type === "manhua").length} Manhua</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                      {mangas.map((manga) => (
                        <MangaCard key={manga.mal_id} manga={manga} />
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
                      <div className="text-sm text-muted-foreground">
                        <p>Sugerencias:</p>
                        <ul className="mt-2 space-y-1">
                          <li>• Verifica la ortografía</li>
                          <li>• Usa términos más generales</li>
                          <li>• Prueba buscar en inglés</li>
                          <li>• Cambia los filtros de tipo o estado</li>
                        </ul>
                      </div>
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
