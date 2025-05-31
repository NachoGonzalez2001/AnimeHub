"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimeCard } from "@/components/anime-card"
import { MangaCard } from "@/components/manga-card"
import type { AnimeData, MangaData } from "@/lib/jikan-api"
import { Shuffle, RefreshCw } from "lucide-react"

interface RandomPicksProps {
  items: (AnimeData | MangaData)[]
  type: "anime" | "manga"
  onRefresh: () => void
  loading?: boolean
}

export function RandomPicks({ items, type, onRefresh, loading }: RandomPicksProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shuffle className="w-5 h-5" />
            Descubrimientos Aleatorios
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Nuevas opciones
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) =>
              type === "anime" ? (
                <AnimeCard key={item.mal_id} anime={item as AnimeData} />
              ) : (
                <MangaCard key={item.mal_id} manga={item as MangaData} />
              ),
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Shuffle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Haz clic en "Nuevas opciones" para descubrir contenido aleatorio</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
