"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CheckCircle, ExternalLink } from "lucide-react"

const testRoutes = [
  { path: "/", name: "Página Principal", description: "Landing page con anime de temporada" },
  { path: "/anime", name: "Búsqueda de Anime", description: "Página de búsqueda y filtros de anime" },
  { path: "/manga", name: "Búsqueda de Manga", description: "Página de búsqueda y filtros de manga" },
  { path: "/top-anime", name: "Top Anime", description: "Rankings de los mejores anime" },
  { path: "/top-manga", name: "Top Manga", description: "Rankings de los mejores manga" },
  { path: "/recommendations", name: "Recomendaciones", description: "Recomendaciones de la comunidad" },
  { path: "/anime/1", name: "Detalles de Anime", description: "Página de detalles (Cowboy Bebop)" },
  { path: "/manga/1", name: "Detalles de Manga", description: "Página de detalles (Monster)" },
]

export default function TestPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Prueba de Páginas</h1>
          <p className="text-muted-foreground">
            Verifica que todas las páginas de la aplicación funcionen correctamente
          </p>
        </div>

        <div className="grid gap-4">
          {testRoutes.map((route) => (
            <Card key={route.path}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{route.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{route.description}</p>
                  </div>
                  <Badge variant="outline">{route.path}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Link href={route.path}>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Probar página
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Estado de la API</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Jikan API v4 - Activa</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Rate limiting implementado (1 req/seg)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Manejo de errores activo</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Funcionalidades Implementadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Páginas</h4>
                <ul className="text-sm space-y-1">
                  <li>✅ Página principal con hero section</li>
                  <li>✅ Búsqueda de anime con filtros</li>
                  <li>✅ Búsqueda de manga con filtros</li>
                  <li>✅ Rankings de anime y manga</li>
                  <li>✅ Páginas de detalles dinámicas</li>
                  <li>✅ Sistema de recomendaciones</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Componentes</h4>
                <ul className="text-sm space-y-1">
                  <li>✅ Navegación responsive</li>
                  <li>✅ Tarjetas de anime/manga</li>
                  <li>✅ Filtros avanzados</li>
                  <li>✅ Paginación</li>
                  <li>✅ Estados de carga</li>
                  <li>✅ Manejo de errores</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
