"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { RecommendationData } from "@/lib/jikan-api"
import { Heart, User, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface RecommendationCardProps {
  recommendation: RecommendationData
  type: "anime" | "manga"
}

export function RecommendationCard({ recommendation, type }: RecommendationCardProps) {
  const [liked, setLiked] = useState(false)

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const handleLike = () => {
    setLiked(!liked)
    // Aquí podrías guardar en localStorage o enviar a una API
  }

  if (!recommendation.entry || recommendation.entry.length < 2) {
    return null
  }

  const [firstEntry, secondEntry] = recommendation.entry

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{recommendation.user.username}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(recommendation.date)}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLike} className={liked ? "text-red-500" : ""}>
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Recomendación visual */}
        <div className="flex items-center gap-4">
          <Link href={`/${type}/${firstEntry.mal_id}`} className="flex-1">
            <div className="group cursor-pointer">
              <img
                src={firstEntry.images.jpg.image_url || "/placeholder.svg"}
                alt={firstEntry.title}
                className="w-full h-32 object-cover rounded-md group-hover:scale-105 transition-transform"
              />
              <h3 className="text-sm font-medium mt-2 line-clamp-2 group-hover:text-blue-600">{firstEntry.title}</h3>
            </div>
          </Link>

          <div className="flex flex-col items-center gap-2">
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
            <Badge variant="secondary" className="text-xs">
              Si te gustó
            </Badge>
          </div>

          <Link href={`/${type}/${secondEntry.mal_id}`} className="flex-1">
            <div className="group cursor-pointer">
              <img
                src={secondEntry.images.jpg.image_url || "/placeholder.svg"}
                alt={secondEntry.title}
                className="w-full h-32 object-cover rounded-md group-hover:scale-105 transition-transform"
              />
              <h3 className="text-sm font-medium mt-2 line-clamp-2 group-hover:text-blue-600">{secondEntry.title}</h3>
            </div>
          </Link>
        </div>

        {/* Contenido de la recomendación */}
        {recommendation.content && (
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground italic">"{recommendation.content}"</p>
          </div>
        )}

        {/* Acciones */}
        <div className="flex gap-2">
          <Link href={`/${type}/${firstEntry.mal_id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              Ver detalles
            </Button>
          </Link>
          <Link href={`/${type}/${secondEntry.mal_id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              Ver recomendado
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
