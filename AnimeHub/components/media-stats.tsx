"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Users, Heart, TrendingUp } from "lucide-react"

interface MediaStatsProps {
  score?: number
  scoredBy?: number
  rank?: number
  popularity?: number
  members?: number
  favorites?: number
  type: "anime" | "manga"
}

export function MediaStats({ score, scoredBy, rank, popularity, members, favorites, type }: MediaStatsProps) {
  const formatNumber = (num?: number) => {
    if (!num) return "N/A"
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  const stats = [
    {
      icon: Star,
      label: "Puntuación",
      value: score ? score.toFixed(2) : "N/A",
      subtext: scoredBy ? `${formatNumber(scoredBy)} votos` : "",
      color: "text-yellow-600",
    },
    {
      icon: TrendingUp,
      label: "Ranking",
      value: rank ? `#${rank}` : "N/A",
      subtext: "Global",
      color: "text-green-600",
    },
    {
      icon: Users,
      label: "Popularidad",
      value: popularity ? `#${popularity}` : "N/A",
      subtext: "En popularidad",
      color: "text-blue-600",
    },
    {
      icon: Users,
      label: "Miembros",
      value: formatNumber(members),
      subtext: type === "anime" ? "Viendo/Vieron" : "Leyendo/Leyeron",
      color: "text-purple-600",
    },
    {
      icon: Heart,
      label: "Favoritos",
      value: formatNumber(favorites),
      subtext: "En listas de favoritos",
      color: "text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              {stat.subtext && <div className="text-xs text-muted-foreground mt-1">{stat.subtext}</div>}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
