"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

interface Character {
  mal_id: number
  name: string
  name_kanji?: string
  about?: string
  favorites: number
  nicknames: string[]
  images: {
    jpg: {
      image_url: string
    }
  }
  voice_actors?: VoiceActor[]
}

interface VoiceActor {
  person: {
    mal_id: number
    name: string
    images: {
      jpg: {
        image_url: string
      }
    }
  }
  language: string
}

export default function CharacterSearchPage() {
  const [query, setQuery] = useState("")
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError("")
    setSelectedCharacter(null)
    try {
      const res = await fetch(`https://api.jikan.moe/v4/characters?q=${encodeURIComponent(query)}&limit=20`)
      const data = await res.json()

      if (!data.data || data.data.length === 0) {
        setCharacters([])
        setError("No se encontraron personajes con ese nombre.")
      } else {
        setCharacters(data.data)
      }
    } catch (err) {
      console.error(err)
      setError("Error al obtener personajes.")
    } finally {
      setLoading(false)
    }
  }

  const fetchCharacterDetails = async (id: number) => {
    setLoading(true)
    setError("")
    try {
      const [fullRes, voicesRes] = await Promise.all([
        fetch(`https://api.jikan.moe/v4/characters/${id}/full`),
        fetch(`https://api.jikan.moe/v4/characters/${id}/voices`)
      ])

      const fullData = await fullRes.json()
      const voicesData = await voicesRes.json()

      if (fullData.data) {
        const fullCharacter = {
          ...fullData.data,
          voice_actors: voicesData.data || []
        }
        setSelectedCharacter(fullCharacter)
      } else {
        setError("No se pudo cargar la información del personaje.")
      }
    } catch (err) {
      console.error(err)
      setError("Error al obtener detalles del personaje.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Search + List */}
          <div className="flex flex-col flex-shrink-0 w-full md:w-1/3">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-6 h-6 text-blue-500" />
              <h1 className="text-2xl font-bold">Buscar Personaje</h1>
            </div>

            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                placeholder="Ejemplo: Luffy"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch() }}
              />
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? "Buscando..." : "Buscar"}
              </Button>
            </div>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <div className="overflow-y-auto max-h-[500px] border rounded-md p-2">
              {characters.length === 0 && !error && (
                <p className="text-muted-foreground">Introduce un nombre y busca personajes.</p>
              )}

              {characters.map((char) => (
                <div
                  key={char.mal_id}
                  onClick={() => fetchCharacterDetails(char.mal_id)}
                  className={`cursor-pointer flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 ${
                    selectedCharacter?.mal_id === char.mal_id ? "bg-blue-200" : ""
                  }`}
                >
                  <img
                    src={char.images.jpg.image_url}
                    alt={char.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{char.name}</p>
                    {char.name_kanji && (
                      <p className="text-xs text-muted-foreground">{char.name_kanji}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Character Details */}
          <div className="flex-1">
            {selectedCharacter ? (
              <Card>
                <CardContent className="p-6 text-center flex flex-col items-center">
                  <img
                    src={selectedCharacter.images.jpg.image_url}
                    alt={selectedCharacter.name}
                    className="w-48 h-48 rounded-full mb-4 object-cover"
                  />
                  <h2 className="text-3xl font-bold mb-1">{selectedCharacter.name}</h2>
                  {selectedCharacter.name_kanji && (
                    <p className="text-muted-foreground mb-2">{selectedCharacter.name_kanji}</p>
                  )}
                  <p className="text-sm text-muted-foreground mb-2">
                    Nicknames: {selectedCharacter.nicknames.length > 0 ? selectedCharacter.nicknames.join(", ") : "Ninguno"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Favoritos: {selectedCharacter.favorites}
                  </p>
                  <p className="text-left whitespace-pre-wrap max-w-prose mt-4">
                    {selectedCharacter.about || "No hay información disponible."}
                  </p>

                  {/* Voice Actors Section */}
                  {selectedCharacter.voice_actors && selectedCharacter.voice_actors.length > 0 && (
                    <div className="mt-6 w-full max-w-xl text-left">
                      <h3 className="text-xl font-semibold mb-3">Seiyu (Actores de voz)</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedCharacter.voice_actors.map((va) => (
                          <div key={va.person.mal_id} className="flex items-center gap-4">
                            <img
                              src={va.person.images.jpg.image_url}
                              alt={va.person.name}
                              className="w-14 h-14 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-semibold">{va.person.name}</p>
                              <p className="text-sm text-muted-foreground">{va.language}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <p className="text-muted-foreground text-center mt-20">
                Selecciona un personaje para ver más detalles.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
