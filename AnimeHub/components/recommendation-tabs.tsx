"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { RecommendationCard } from "@/components/recommendation-card"
import { RandomPicks } from "@/components/random-picks"
import { Pagination } from "@/components/pagination"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRecommendations } from "@/hooks/use-recommendations"
import { useEffect, useState } from "react"
import { Play, BookOpen, AlertCircle, RefreshCw } from "lucide-react"

export function RecommendationTabs() {
  const {
    recommendations,
    randomPicks,
    loading,
    error,
    currentPage,
    hasNextPage,
    fetchRecommendations,
    fetchRandomPicks,
    clearRecommendations,
  } = useRecommendations()

  const [activeTab, setActiveTab] = useState<"anime" | "manga">("anime")
  const [randomLoading, setRandomLoading] = useState(false)

  useEffect(() => {
    fetchRecommendations(activeTab)
  }, [activeTab, fetchRecommendations])

  const handleTabChange = (value: string) => {
    const newTab = value as "anime" | "manga"
    setActiveTab(newTab)
    clearRecommendations()
  }

  const handlePageChange = (page: number) => {
    fetchRecommendations(activeTab, page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRefreshRandom = async () => {
    setRandomLoading(true)
    await fetchRandomPicks(activeTab, 6)
    setRandomLoading(false)
  }

  const handleRefreshRecommendations = () => {
    fetchRecommendations(activeTab, 1)
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="anime" className="flex items-center gap-2">
          <Play className="w-4 h-4" />
          Recomendaciones de Anime
        </TabsTrigger>
        <TabsTrigger value="manga" className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Recomendaciones de Manga
        </TabsTrigger>
      </TabsList>

      <TabsContent value="anime" className="space-y-8">
        <RecommendationTabContent
          type="anime"
          recommendations={recommendations}
          randomPicks={randomPicks}
          loading={loading}
          randomLoading={randomLoading}
          error={error}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          onPageChange={handlePageChange}
          onRefreshRandom={handleRefreshRandom}
          onRefreshRecommendations={handleRefreshRecommendations}
        />
      </TabsContent>

      <TabsContent value="manga" className="space-y-8">
        <RecommendationTabContent
          type="manga"
          recommendations={recommendations}
          randomPicks={randomPicks}
          loading={loading}
          randomLoading={randomLoading}
          error={error}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          onPageChange={handlePageChange}
          onRefreshRandom={handleRefreshRandom}
          onRefreshRecommendations={handleRefreshRecommendations}
        />
      </TabsContent>
    </Tabs>
  )
}

interface RecommendationTabContentProps {
  type: "anime" | "manga"
  recommendations: any[]
  randomPicks: any[]
  loading: boolean
  randomLoading: boolean
  error: string | null
  currentPage: number
  hasNextPage: boolean
  onPageChange: (page: number) => void
  onRefreshRandom: () => void
  onRefreshRecommendations: () => void
}

function RecommendationTabContent({
  type,
  recommendations,
  randomPicks,
  loading,
  randomLoading,
  error,
  currentPage,
  hasNextPage,
  onPageChange,
  onRefreshRandom,
  onRefreshRecommendations,
}: RecommendationTabContentProps) {
  return (
    <>
      {/* Descubrimientos aleatorios */}
      <RandomPicks items={randomPicks} type={type} onRefresh={onRefreshRandom} loading={randomLoading} />

      {/* Recomendaciones de la comunidad */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recomendaciones de la Comunidad</h2>
          <Button variant="outline" onClick={onRefreshRecommendations} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando recomendaciones...</p>
            </div>
          </div>
        ) : recommendations.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {recommendations.map((rec) => (
                <RecommendationCard key={rec.mal_id} recommendation={rec} type={type} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={10} // Limitar a 10 páginas para recomendaciones
              hasNextPage={hasNextPage && currentPage < 10}
              onPageChange={onPageChange}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <p className="mb-4">No se pudieron cargar las recomendaciones en este momento.</p>
              <Button variant="outline" onClick={onRefreshRecommendations}>
                Intentar de nuevo
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
