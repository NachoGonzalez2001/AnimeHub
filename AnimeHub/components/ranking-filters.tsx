"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { TrendingUp, X } from "lucide-react"

interface RankingFiltersProps {
  type: "anime" | "manga"
  currentType?: string
  onTypeChange: (type: string) => void
  onClear: () => void
}

const ANIME_TYPES = [
  { value: "tv", label: "TV" },
  { value: "movie", label: "Película" },
  { value: "ova", label: "OVA" },
  { value: "special", label: "Especial" },
  { value: "ona", label: "ONA" },
]

const MANGA_TYPES = [
  { value: "manga", label: "Manga" },
  { value: "novel", label: "Novela" },
  { value: "lightnovel", label: "Light Novel" },
  { value: "oneshot", label: "One-shot" },
  { value: "doujin", label: "Doujinshi" },
  { value: "manhwa", label: "Manhwa" },
  { value: "manhua", label: "Manhua" },
]

export function RankingFilters({ type, currentType, onTypeChange, onClear }: RankingFiltersProps) {
  const types = type === "anime" ? ANIME_TYPES : MANGA_TYPES
  const hasFilters = currentType && currentType !== ""

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Filtros de Ranking
          </CardTitle>
          {hasFilters && (
            <Button variant="outline" size="sm" onClick={onClear}>
              <X className="w-4 h-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Tipo de {type === "anime" ? "Anime" : "Manga"}</label>
          <Select value={currentType || ""} onValueChange={(value) => onTypeChange(value)}>
            <SelectTrigger>
              <SelectValue placeholder={`Todos los tipos de ${type}`} />
            </SelectTrigger>
            <SelectContent>
              {types.map((typeOption) => (
                <SelectItem key={typeOption.value} value={typeOption.value}>
                  {typeOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* <div className="bg-muted/50 p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Información del Ranking:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Rankings basados en puntuaciones de MyAnimeList</li>
            <li>• Actualizado regularmente por la comunidad</li>
            <li>• Filtros por tipo para rankings específicos</li>
            <li>• Top 1000 {type === "anime" ? "animes" : "mangas"} disponibles</li>
          </ul>
        </div> */}
      </CardContent>
    </Card>
  )
}
