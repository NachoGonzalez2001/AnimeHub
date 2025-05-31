"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { JikanAPI, type CharacterData } from "@/lib/jikan-api"
import { Users, ChevronDown, ChevronUp, Mic, User } from "lucide-react"

interface CharacterListProps {
  mediaId: number
  mediaType: "anime" | "manga"
}

export function CharacterList({ mediaId, mediaType }: CharacterListProps) {
  const [characters, setCharacters] = useState<CharacterData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true)
        setError(null)

        const response =
          mediaType === "anime"
            ? await JikanAPI.getAnimeCharacters(mediaId)
            : await JikanAPI.getMangaCharacters(mediaId)

        setCharacters(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar personajes")
        setCharacters([])
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [mediaId, mediaType])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Personajes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Cargando personajes...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || characters.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Personajes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{error || "No se encontraron personajes para este título"}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const displayedCharacters = showAll ? characters : characters.slice(0, 8)
  const mainCharacters = characters.filter((char) => char.role === "Main")
  const supportingCharacters = characters.filter((char) => char.role === "Supporting")

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Main":
        return "bg-blue-500 text-white"
      case "Supporting":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case "Main":
        return "Principal"
      case "Supporting":
        return "Secundario"
      default:
        return role
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Personajes
          </CardTitle>
          <div className="flex gap-2 text-sm text-muted-foreground">
            {mainCharacters.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {mainCharacters.length} Principales
              </Badge>
            )}
            {supportingCharacters.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {supportingCharacters.length} Secundarios
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedCharacters.map((characterData) => (
            <div key={characterData.character.mal_id} className="group">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="text-center">
                    {/* Imagen del personaje */}
                    <div className="relative mb-3">
                      <img
                        src={characterData.character.images.jpg.image_url || "/placeholder.svg"}
                        alt={characterData.character.name}
                        className="w-20 h-28 object-cover rounded-lg mx-auto group-hover:scale-105 transition-transform"
                      />
                      <Badge className={`absolute -top-2 -right-2 text-xs ${getRoleColor(characterData.role)}`}>
                        {getRoleText(characterData.role)}
                      </Badge>
                    </div>

                    {/* Nombre del personaje */}
                    <h4 className="font-semibold text-sm line-clamp-2 mb-2">{characterData.character.name}</h4>

                    {/* Actor de voz (solo para anime) */}
                    {mediaType === "anime" && characterData.voice_actors && characterData.voice_actors.length > 0 && (
                      <div className="space-y-1">
                        {characterData.voice_actors
                          .filter((va) => va.language === "Japanese")
                          .slice(0, 1)
                          .map((voiceActor, index) => (
                            <div key={index} className="text-xs text-muted-foreground">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Mic className="w-3 h-3" />
                                <span className="font-medium">Seiyuu</span>
                              </div>
                              <p className="line-clamp-2">{voiceActor.person.name}</p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Botón para mostrar más/menos */}
        {characters.length > 8 && (
          <div className="text-center mt-6">
            <Button variant="outline" onClick={() => setShowAll(!showAll)} className="flex items-center gap-2">
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Mostrar menos
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Mostrar todos ({characters.length} personajes)
                </>
              )}
            </Button>
          </div>
        )}

        {/* Información adicional */}
        <div className="mt-6 bg-muted/50 p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Información sobre personajes:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>
              • <strong>Principales:</strong> Personajes centrales de la historia
            </li>
            <li>
              • <strong>Secundarios:</strong> Personajes importantes pero no centrales
            </li>
            {mediaType === "anime" && (
              <li>
                • <strong>Seiyuu:</strong> Actores de voz japoneses (cuando disponible)
              </li>
            )}
            <li>• Datos proporcionados por MyAnimeList</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
