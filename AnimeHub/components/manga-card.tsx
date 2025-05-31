"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, BookOpen, TrendingUp } from "lucide-react"
import type { MangaData } from "@/lib/jikan-api"
import Link from "next/link"

interface MangaCardProps {
  manga: MangaData
}

export function MangaCard({ manga }: MangaCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    try {
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return "N/A"
    }
  }

  return (
    <Link href={`/manga/${manga.mal_id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={manga.images.jpg.image_url || "/placeholder.svg"}
            alt={manga.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {manga.score && (
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{manga.score}</span>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {manga.title}
          </h3>

          {manga.synopsis && <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{manga.synopsis}</p>}

          <div className="flex flex-wrap gap-1 mb-3">
            {manga.genres?.slice(0, 3).map((genre) => (
              <Badge key={genre.mal_id} variant="secondary" className="text-xs">
                {genre.name}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{manga.chapters ? `${manga.chapters} cap.` : "En curso"}</span>
          </div>

          {manga.rank && (
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>#{manga.rank}</span>
            </div>
          )}
        </CardFooter>
        <div className="text-lg font-semibold">{manga.published?.from ? formatDate(manga.published.from) : "N/A"}</div>
      </Card>
    </Link>
  )
}
