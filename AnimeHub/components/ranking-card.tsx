"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, TrendingUp, Crown, Medal, Award } from "lucide-react"
import type { AnimeData, MangaData } from "@/lib/jikan-api"
import Link from "next/link"

interface RankingCardProps {
  item: AnimeData | MangaData
  position: number
  type: "anime" | "manga"
  showRealRank?: boolean // Nueva prop para controlar si mostrar el rank real
}

export function RankingCard({ item, position, type, showRealRank = false }: RankingCardProps) {
  const getRankIcon = (pos: number) => {
    switch (pos) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return null
    }
  }

  const getRankBadgeColor = (pos: number) => {
    if (pos <= 3) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
    if (pos <= 10) return "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
    if (pos <= 50) return "bg-gradient-to-r from-green-500 to-green-600 text-white"
    return "bg-muted text-muted-foreground"
  }

  const formatNumber = (num?: number) => {
    if (!num) return "N/A"
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  const linkHref = `/${type}/${item.mal_id}`

  return (
    <Link href={linkHref}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-[1.02]">
        <CardContent className="p-0">
          <div className="flex gap-4 p-4">
            {/* Ranking Position */}
            <div className="flex flex-col items-center justify-center min-w-[80px]">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getRankBadgeColor(position)}`}
              >
                #{position}
              </div>
              {getRankIcon(position) && <div className="mt-2">{getRankIcon(position)}</div>}
              {/* Mostrar rank real solo cuando showRealRank es true y el rank existe y es diferente */}
              {showRealRank && item.rank && item.rank !== position && (
                <div className="text-xs text-muted-foreground mt-1">MAL: #{item.rank}</div>
              )}
            </div>

            {/* Image */}
            <div className="flex-shrink-0">
              <img
                src={item.images.jpg.image_url || "/placeholder.svg"}
                alt={item.title}
                className="w-20 h-28 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                {item.score && (
                  <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{item.score}</span>
                  </div>
                )}
              </div>

              {/* Type and Status */}
              <div className="flex flex-wrap gap-2 mb-3">
                {item.type && <Badge variant="secondary">{item.type.toUpperCase()}</Badge>}
                {item.status && (
                  <Badge variant="outline" className="text-xs">
                    {item.status}
                  </Badge>
                )}
                {"episodes" in item && item.episodes && (
                  <Badge variant="outline" className="text-xs">
                    {item.episodes} eps
                  </Badge>
                )}
                {"chapters" in item && item.chapters && (
                  <Badge variant="outline" className="text-xs">
                    {item.chapters} caps
                  </Badge>
                )}
              </div>

              {/* Synopsis */}
              {item.synopsis && <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.synopsis}</p>}

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {item.rank && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>#{item.rank}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{formatNumber(item.members)}</span>
                </div>
                {item.scored_by && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{formatNumber(item.scored_by)} votos</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {item.genres && item.genres.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {item.genres.slice(0, 3).map((genre) => (
                    <Badge key={genre.mal_id} variant="outline" className="text-xs">
                      {genre.name}
                    </Badge>
                  ))}
                  {item.genres.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.genres.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
