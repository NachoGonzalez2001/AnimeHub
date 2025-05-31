"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MediaStats } from "@/components/media-stats"
import { GenreList } from "@/components/genre-list"
import type { AnimeData } from "@/lib/jikan-api"
import { Play, Calendar, Clock, Monitor, ExternalLink } from "lucide-react"

interface AnimeDetailsProps {
  anime: AnimeData
}

export function AnimeDetails({ anime }: AnimeDetailsProps) {
  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "airing":
        return "bg-green-500"
      case "finished airing":
        return "bg-blue-500"
      case "not yet aired":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "airing":
        return "En emisión"
      case "finished airing":
        return "Finalizado"
      case "not yet aired":
        return "Próximamente"
      default:
        return status || "Desconocido"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header con imagen y información básica */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Imagen */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <img
              src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
              alt={anime.title}
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <Button className="w-full" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Ver Anime
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <ExternalLink className="w-5 h-5 mr-2" />
                Ver en MyAnimeList
              </Button>
            </div>
          </div>
        </div>

        {/* Información principal */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className={`${getStatusColor(anime.status)} text-white`}>{getStatusText(anime.status)}</Badge>
              {anime.rating && <Badge variant="outline">{anime.rating}</Badge>}
              {anime.year && <Badge variant="secondary">{anime.year}</Badge>\
            </div>

            <h1 className="text-4xl font-bold mb-2">{anime.title}</h1>

            {anime.title_english && anime.title_english !== anime.title && (
              <p className="text-xl text-muted-foreground mb-2">{anime.title_english}</p>
            )}

            {anime.title_japanese && (
              <p className="text-lg text-muted-foreground mb-4">{anime.title_japanese}</p>
            )}
          </div>

          {/* Información técnica */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Monitor className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium text-muted-foreground">Tipo</div>
                <div className="text-lg font-semibold">{anime.type || "N/A"}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Play className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium text-muted-foreground">Episodios</div>
                <div className="text-lg font-semibold">{anime.episodes || "?"}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <div className="text-sm font-medium text-muted-foreground">Duración</div>
                <div className="text-lg font-semibold">{anime.duration || "N/A"}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                <div className="text-sm font-medium text-muted-foreground">Temporada</div>
                <div className="text-lg font-semibold">
                  {anime.season && anime.year ? `${anime.season} ${anime.year}` : anime.year || "N/A"}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sinopsis */}
          {anime.synopsis && (
            <Card>
              <CardHeader>
                <CardTitle>Sinopsis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{anime.synopsis}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Estadísticas</h2>
        <MediaStats
          score={anime.score}
          scoredBy={anime.scored_by}
          rank={anime.rank}
          popularity={anime.popularity}
          members={anime.members}
          favorites={anime.favorites}
          type="anime"
        />
      </div>

      {/* Géneros y Estudios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GenreList genres={anime.genres} />

        {anime.studios && anime.studios.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Estudios</h3>
            <div className="flex flex-wrap gap-2">
              {anime.studios.map((studio) => (
                <Badge key={studio.mal_id} variant="outline" className="text-sm">
                  {studio.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
