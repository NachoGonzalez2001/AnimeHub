"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MediaStats } from "@/components/media-stats"
import { GenreList } from "@/components/genre-list"
import type { MangaData } from "@/lib/jikan-api"
import { BookOpen, Calendar, FileText, User, ExternalLink, Book } from "lucide-react"

interface MangaDetailsProps {
  manga: MangaData
}

export function MangaDetails({ manga }: MangaDetailsProps) {
  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "publishing":
        return "bg-green-500"
      case "finished":
        return "bg-blue-500"
      case "on hiatus":
        return "bg-yellow-500"
      case "discontinued":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "publishing":
        return "En publicación"
      case "finished":
        return "Finalizado"
      case "on hiatus":
        return "En pausa"
      case "discontinued":
        return "Descontinuado"
      default:
        return status || "Desconocido"
    }
  }

  const getTypeIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case "manhwa":
        return "🇰🇷"
      case "manhua":
        return "🇨🇳"
      case "novel":
      case "light novel":
        return "📚"
      case "oneshot":
        return "📄"
      case "doujin":
        return "🎨"
      default:
        return "🇯🇵"
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    try {
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
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
              src={manga.images.jpg.large_image_url || manga.images.jpg.image_url}
              alt={manga.title}
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <Button className="w-full" size="lg">
                <BookOpen className="w-5 h-5 mr-2" />
                Leer Manga
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
              <Badge className={`${getStatusColor(manga.status)} text-white`}>{getStatusText(manga.status)}</Badge>
              {manga.type && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>{getTypeIcon(manga.type)}</span>
                  {manga.type}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-2">{manga.title}</h1>

            {manga.title_english && manga.title_english !== manga.title && (
              <p className="text-xl text-muted-foreground mb-2">{manga.title_english}</p>
            )}

            {manga.title_japanese && <p className="text-lg text-muted-foreground mb-4">{manga.title_japanese}</p>}
          </div>

          {/* Información técnica */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium text-muted-foreground">Capítulos</div>
                <div className="text-lg font-semibold">{manga.chapters || "?"}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Book className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium text-muted-foreground">Volúmenes</div>
                <div className="text-lg font-semibold">{manga.volumes || "?"}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <div className="text-sm font-medium text-muted-foreground">Inicio</div>
                <div className="text-lg font-semibold">{formatDate(manga.published?.from)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                <div className="text-sm font-medium text-muted-foreground">Fin</div>
                <div className="text-lg font-semibold">{formatDate(manga.published?.to)}</div>
              </CardContent>
            </Card>
          </div>

          {/* Sinopsis */}
          {manga.synopsis && (
            <Card>
              <CardHeader>
                <CardTitle>Sinopsis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{manga.synopsis}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Estadísticas</h2>
        <MediaStats
          score={manga.score}
          scoredBy={manga.scored_by}
          rank={manga.rank}
          popularity={manga.popularity}
          members={manga.members}
          favorites={manga.favorites}
          type="manga"
        />
      </div>

      {/* Géneros y Autores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GenreList genres={manga.genres} />

        {manga.authors && manga.authors.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Autores</h3>
            <div className="flex flex-wrap gap-2">
              {manga.authors.map((author) => (
                <Badge key={author.mal_id} variant="outline" className="text-sm flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {author.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
