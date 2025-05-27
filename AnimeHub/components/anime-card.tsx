"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, TrendingUp } from "lucide-react"
import type { AnimeData } from "@/lib/jikan-api"
import Link from "next/link"

interface AnimeCardProps {
  anime: AnimeData
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.mal_id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={anime.images.jpg.image_url || "/placeholder.svg"}
            alt={anime.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {anime.score && (
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{anime.score}</span>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {anime.title}
          </h3>

          {anime.synopsis && <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{anime.synopsis}</p>}

          <div className="flex flex-wrap gap-1 mb-3">
            {anime.genres?.slice(0, 3).map((genre) => (
              <Badge key={genre.mal_id} variant="secondary" className="text-xs">
                {genre.name}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{anime.year || "N/A"}</span>
          </div>

          {anime.rank && (
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>#{anime.rank}</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
