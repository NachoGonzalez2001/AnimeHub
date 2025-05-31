"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { JikanAPI, type MangaFilters, type Genre } from "@/lib/jikan-api"
import { Filter, X } from "lucide-react"

interface MangaFiltersProps {
  onFiltersChange: (filters: MangaFilters) => void
  loading?: boolean
}

const MANGA_TYPES = [
  { value: "manga", label: "Manga" },
  { value: "novel", label: "Novela" },
  { value: "lightnovel", label: "Light Novel" },
  { value: "oneshot", label: "One-shot" },
  { value: "doujin", label: "Doujinshi" },
  { value: "manhwa", label: "Manhwa" },
  { value: "manhua", label: "Manhua" },
]

const MANGA_STATUS = [
  { value: "publishing", label: "En publicación" },
  { value: "complete", label: "Completado" },
  { value: "hiatus", label: "En pausa" },
  { value: "discontinued", label: "Descontinuado" },
  { value: "upcoming", label: "Próximamente" },
]

const ORDER_BY_OPTIONS = [
  { value: "score", label: "Puntuación" },
  { value: "popularity", label: "Popularidad" },
  { value: "rank", label: "Ranking" },
  { value: "title", label: "Título" },
  { value: "start_date", label: "Fecha de inicio" },
  { value: "end_date", label: "Fecha de fin" },
  { value: "chapters", label: "Capítulos" },
  { value: "volumes", label: "Volúmenes" },
  { value: "members", label: "Miembros" },
  { value: "favorites", label: "Favoritos" },
]

export function MangaFilters({ onFiltersChange, loading }: MangaFiltersProps) {
  const [filters, setFilters] = useState<MangaFilters>({})
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await JikanAPI.getMangaGenres()
        setGenres(response.data)
      } catch (error) {
        console.error("Error fetching manga genres:", error)
      }
    }

    fetchGenres()
  }, [])

  const updateFilters = (newFilters: Partial<MangaFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handleGenreToggle = (genreId: number) => {
    const newSelectedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId]

    setSelectedGenres(newSelectedGenres)
    updateFilters({
      genres: newSelectedGenres.length > 0 ? newSelectedGenres.join(",") : undefined,
    })
  }

  const clearFilters = () => {
    setFilters({})
    setSelectedGenres([])
    onFiltersChange({})
  }

  const hasActiveFilters = Object.keys(filters).some((key) => filters[key as keyof MangaFilters] !== undefined)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros de Manga
          </CardTitle>
          <div className="flex gap-2">
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                Limpiar
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? "Ocultar" : "Mostrar"}
            </Button>
          </div>
        </div>
      </CardHeader>

      {showFilters && (
        <CardContent className="space-y-4">
          {/* Tipo de Manga */}
          <div>
            <label className="text-sm font-medium mb-2 block">Tipo</label>
            <Select value={filters.type || ""} onValueChange={(value) => updateFilters({ type: value as any })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {MANGA_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Estado de Publicación */}
          <div>
            <label className="text-sm font-medium mb-2 block">Estado de Publicación</label>
            <Select value={filters.status || ""} onValueChange={(value) => updateFilters({ status: value as any })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                {MANGA_STATUS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ordenar por */}
          <div>
            <label className="text-sm font-medium mb-2 block">Ordenar por</label>
            <div className="flex gap-2">
              <Select
                value={filters.order_by || ""}
                onValueChange={(value) => updateFilters({ order_by: value as any })}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_BY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filters.sort || ""} onValueChange={(value) => updateFilters({ sort: value as any })}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Orden" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Por defecto</SelectItem>
                  <SelectItem value="desc">Descendente</SelectItem>
                  <SelectItem value="asc">Ascendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Géneros */}
          <div>
            <label className="text-sm font-medium mb-2 block">Géneros</label>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {genres.map((genre) => (
                <Badge
                  key={genre.mal_id}
                  variant={selectedGenres.includes(genre.mal_id) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => handleGenreToggle(genre.mal_id)}
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
            {selectedGenres.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2">{selectedGenres.length} género(s) seleccionado(s)</p>
            )}
          </div>

          {/* Información adicional */}
          <div className="bg-muted/50 p-3 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Tipos de contenido:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>
                <strong>Manga:</strong> Cómics japoneses tradicionales
              </li>
              <li>
                <strong>Manhwa:</strong> Cómics coreanos
              </li>
              <li>
                <strong>Manhua:</strong> Cómics chinos
              </li>
              <li>
                <strong>Light Novel:</strong> Novelas ligeras japonesas
              </li>
              <li>
                <strong>One-shot:</strong> Historia completa en un capítulo
              </li>
              <li>
                <strong>Doujinshi:</strong> Obras independientes de fans
              </li>
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
