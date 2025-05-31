"use client"

import { Navigation } from "@/components/navigation"
import { RecommendationTabs } from "@/components/recommendation-tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Users, Shuffle, Heart } from "lucide-react"

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-yellow-600" />
            <h1 className="text-3xl font-bold">Recomendaciones</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Descubre nuevo contenido basado en las recomendaciones de la comunidad y selecciones aleatorias
          </p>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Comunidad</h3>
                <p className="text-sm text-muted-foreground">Recomendaciones de usuarios reales de MyAnimeList</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Shuffle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Descubrimiento</h3>
                <p className="text-sm text-muted-foreground">Encuentra contenido aleatorio que podrías amar</p>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Tabs de recomendaciones */}
        <RecommendationTabs />
      </div>
    </div>
  )
}
