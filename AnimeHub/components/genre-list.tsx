"use client"

import { Badge } from "@/components/ui/badge"

interface Genre {
  mal_id: number
  name: string
}

interface GenreListProps {
  genres?: Genre[]
  title?: string
  maxDisplay?: number
}

export function GenreList({ genres, title = "Géneros", maxDisplay = 10 }: GenreListProps) {
  if (!genres || genres.length === 0) {
    return null
  }

  const displayGenres = genres.slice(0, maxDisplay)
  const remainingCount = genres.length - maxDisplay

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {displayGenres.map((genre) => (
          <Badge key={genre.mal_id} variant="secondary" className="text-sm">
            {genre.name}
          </Badge>
        ))}
        {remainingCount > 0 && (
          <Badge variant="outline" className="text-sm">
            +{remainingCount} más
          </Badge>
        )}
      </div>
    </div>
  )
}
