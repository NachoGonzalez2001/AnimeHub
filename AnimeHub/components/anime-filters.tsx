"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { JikanAPI, type AnimeFilters, type Genre } from "@/lib/jikan-api"
import { Filter, X } from "lucide-react"

interface AnimeFiltersProps {
  onFiltersChange: (filters: AnimeFilters) => void
  loading?: boolean
}

const ANIME_TYPES = [
  { value: "tv", label: "TV" },
  { value: "movie", label: "Película" },
  { value: "ova", label: "OVA" },
  { value: "special", label: "Especial" },
  { value: "ona", label: "ONA" },
  { value: "music", label: "Música" },
]

const ANIME_STATUS = [
  { value: "airing", label: "En emisión" },
  { value: "complete", label: "Completado" },
  { value: "upcoming", label: "Próximamente" },
]

const ANIME_RATINGS = [
  { value: "g", label: "G - Todas las edades" },
  { value: "pg", label: "PG - Niños" },
  { value: "pg13", label: "PG-13 - Adolescentes 13+" },
  { value: "r17", label: "R - 17+ (violencia y profanidad)" },
  { value: "r", label: "R+ - Desnudez leve" },
]

const ORDER_BY_OPTIONS = [
  { value: "score", label: "Puntuación" },
  { value: "popularity", label: "Popularidad" },
  { value: "rank", label: "Ranking" },
  { value: "title", label: "Título" },
  { value: "start_date", label: "Fecha de inicio" },
  { value: "episodes", label: "Episodios" },
]

export function AnimeFilters({ onFiltersChange, loading }: AnimeFiltersProps) {
  const [filters, setFilters] = useState<AnimeFilters>({})
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await JikanAPI.getAnimeGenres()
        setGenres(response.data)
      } catch (error) {
        console.error("Error fetching genres:", error)
      }
    }

    fetchGenres()
  }, [])

  const updateFilters = (newFilters: Partial<AnimeFilters>) => {
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

  const hasActiveFilters = Object.keys(filters).some((key) => filters[key as keyof AnimeFilters] !== undefined)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
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
          {/* Tipo */}
          <div>
            <label className="text-sm font-medium mb-2 block">Tipo</label>
            <Select value={filters.type || ""} onValueChange={(value) => updateFilters({ type: value as any })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {ANIME_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Estado */}
          <div>
            <label className="text-sm font-medium mb-2 block">Estado</label>
            <Select value={filters.status || ""} onValueChange={(value) => updateFilters({ status: value as any })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                {ANIME_STATUS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clasificación */}
          <div>
            <label className="text-sm font-medium mb-2 block">Clasificación</label>
            <Select value={filters.rating || ""} onValueChange={(value) => updateFilters({ rating: value as any })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar clasificación" />
              </SelectTrigger>
              <SelectContent>
                {ANIME_RATINGS.map((rating) => (
                  <SelectItem key={rating.value} value={rating.value}>
                    {rating.label}
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
          </div>
        </CardContent>
      )}
    </Card>
  )
}
