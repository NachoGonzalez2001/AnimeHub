"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Music, Search, Play } from "lucide-react"

interface Anime {
  mal_id: number
  title: string
  title_japanese?: string
  images: { jpg: { image_url: string } }
}

interface Theme {
  openings: string[]
  endings: string[]
}

export default function AnimeThemesSearchPage() {
  const [query, setQuery] = useState("")
  const [animeResults, setAnimeResults] = useState<Anime[]>([])
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)
  const [themes, setThemes] = useState<Theme | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true); setError(""); setSelectedAnime(null); setThemes(null)
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=20`)
      const data = await res.json()
      if (!data.data || data.data.length === 0) {
        setAnimeResults([]); setError("No se encontraron animes con ese nombre.")
      } else setAnimeResults(data.data)
    } catch {
      setError("Error al obtener resultados del anime.")
    } finally { setLoading(false) }
  }

  const fetchThemes = async (id: number) => {
    setLoading(true); setError(""); setThemes(null)
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/themes`)
      const data = await res.json()
      if (data.data) {
        setSelectedAnime(animeResults.find(a => a.mal_id === id) || null)
        setThemes(data.data)
      } else {
        setError("No se pudieron cargar los temas musicales.")
      }
    } catch {
      setError("Error al obtener los openings/endings.")
    } finally { setLoading(false) }
  }

const handlePlayVideo = (themeTitle: string) => {
  let cleaned = themeTitle.replace(/^\d+:\s*/, "")
  const titleMatch = cleaned.match(/["'](.+?)["']/)
  const title = titleMatch ? titleMatch[1] : ""
  const artistMatch = cleaned.match(/by\s+([^(]+)/i)
  const artist = artistMatch ? artistMatch[1].trim() : ""
  const searchQuery = `${title} ${artist} anime`
  window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, "_blank")
}

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col w-full md:w-1/3 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-6 h-6 text-blue-500" />
              <h1 className="text-2xl font-bold">Buscar Openings y Endings</h1>
            </div>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Ejemplo: Naruto"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? "Buscando..." : "Buscar"}
              </Button>
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="overflow-y-auto w-full max-h-[500px] border rounded-md p-2">
              {animeResults.length === 0 && !error && (
                <p className="text-muted-foreground">
                  Introduce un anime para obtener sus openings y endings.
                </p>
              )}
              {animeResults.map(anime => (
                <div
                  key={anime.mal_id}
                  onClick={() => fetchThemes(anime.mal_id)}
                  className={`cursor-pointer flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 ${
                    selectedAnime?.mal_id === anime.mal_id ? "bg-blue-200" : ""
                  }`}
                >
                  <img src={anime.images.jpg.image_url} alt={anime.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="overflow-hidden">
                    <p className="font-semibold truncate">{anime.title}</p>
                    {anime.title_japanese && (
                      <p className="text-xs text-muted-foreground truncate">{anime.title_japanese}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {selectedAnime && themes ? (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <img
                      src={selectedAnime.images.jpg.image_url}
                      alt={selectedAnime.title}
                      className="w-40 h-56 object-cover rounded-md mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-2">{selectedAnime.title}</h2>
                    {selectedAnime.title_japanese && (
                      <p className="text-muted-foreground mb-4">{selectedAnime.title_japanese}</p>
                    )}
                  </div>

                  {/* Openings */}
                  <div className="mt-6">
                    <h3 className="flex items-center gap-2 text-xl font-semibold mb-2">
                      <Music className="w-5 h-5 text-blue-500" /> Openings
                    </h3>
                    {themes.openings.length > 0 ? (
                      <ul className="list-disc list-inside text-sm space-y-2">
                        {themes.openings.map((op, i) => (
                          <li key={i} className="flex justify-between items-center">
                            <span className="truncate max-w-[70%]">{op}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="ml-2 flex items-center gap-1"
                              onClick={() => handlePlayVideo(op)}
                            >
                              <Play className="w-4 h-4" /> Escuchar
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No hay openings disponibles.</p>
                    )}
                  </div>

                  {/* Endings */}
                  <div className="mt-6">
                    <h3 className="flex items-center gap-2 text-xl font-semibold mb-2">
                      <Music className="w-5 h-5 text-blue-500" /> Endings
                    </h3>
                    {themes.endings.length > 0 ? (
                      <ul className="list-disc list-inside text-sm space-y-2">
                        {themes.endings.map((ed, i) => (
                          <li key={i} className="flex justify-between items-center">
                            <span className="truncate max-w-[70%]">{ed}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="ml-2 flex items-center gap-1"
                              onClick={() => handlePlayVideo(ed)}
                            >
                              <Play className="w-4 h-4" /> Escuchar
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No hay endings disponibles.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <p className="text-muted-foreground text-center mt-20">
                Selecciona un anime para ver sus openings y endings.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
