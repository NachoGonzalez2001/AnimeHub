# AnimeHub - Portal de Anime y Manga

## 📋 Información del Proyecto

**Materia:** Laboratorios RIA 2025  
**Parte:** Laboratorio - Parte 2  
**Tecnologías:** React, TypeScript, Next.js, Tailwind CSS  
**API:** Jikan API (MyAnimeList no oficial)  

## 🎯 Descripción

AnimeHub es una aplicación web desarrollada como proyecto del Laboratorio RIA 2025 que permite a los usuarios explorar, buscar y descubrir anime y manga. La aplicación consume la API REST pública de Jikan para obtener información actualizada de MyAnimeList, incluyendo detalles completos, personajes, rankings y recomendaciones.

### Características Principales

- 🔍 **Búsqueda avanzada** de anime y manga con filtros múltiples
- 🏆 **Rankings oficiales** de los mejores anime y manga con filtros por tipo
- 🎭 **Información de personajes** con actores de voz (seiyuu) para anime
- 📱 **Diseño responsive** adaptable a todos los dispositivos
- 💡 **Sistema de recomendaciones** basado en la comunidad de MyAnimeList
- 🎨 **Interfaz moderna** con componentes reutilizables y animaciones
- ⚡ **Comunicación asincrónica** con manejo de estados de carga y errores
- 📊 **Estadísticas detalladas** de puntuaciones, popularidad y miembros
- 🎯 **Navegación intuitiva** con breadcrumbs y estados persistentes

## 🛠️ Tecnologías Utilizadas

### Programación
- **React 18** - Biblioteca de interfaz de usuario con hooks modernos
- **TypeScript** - Tipado estático para JavaScript con interfaces robustas
- **Next.js 14** - Framework de React con App Router y optimizaciones

### CSS y Diseño
- **Tailwind CSS** - Framework de CSS utilitario para diseño rápido
- **shadcn/ui** - Componentes de UI pre-diseñados y accesibles
- **Lucide React** - Iconos SVG optimizados y consistentes

### APIs y Datos
- **Jikan API v4** - API REST pública de MyAnimeList
- **Fetch API** - Para comunicación asincrónica con rate limiting

## 📁 Estructura del Proyecto

```
AnimeHub/
├── app/                          # Páginas de Next.js (App Router)
│   ├── anime/                    # Búsqueda de anime
│   │   ├── [id]/                 # Detalles de anime dinámico
│   │   └── page.tsx
│   ├── manga/                    # Búsqueda de manga
│   │   ├── [id]/                 # Detalles de manga dinámico
│   │   └── page.tsx
│   ├── top-anime/                # Rankings de anime
│   ├── top-manga/                # Rankings de manga
│   ├── recommendations/          # Sistema de recomendaciones
│   ├── test/                     # Página de pruebas (desarrollo)
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Página de inicio
│   └── globals.css               # Estilos globales
├── components/                   # Componentes reutilizables
│   ├── ui/                       # Componentes base de shadcn/ui
│   ├── anime-card.tsx            # Tarjeta de anime
│   ├── manga-card.tsx            # Tarjeta de manga
│   ├── character-list.tsx        # Lista de personajes
│   ├── navigation.tsx            # Barra de navegación
│   ├── search-bar.tsx            # Barra de búsqueda
│   ├── anime-filters.tsx         # Filtros de anime
│   ├── manga-filters.tsx         # Filtros de manga
│   ├── ranking-filters.tsx       # Filtros de ranking
│   ├── pagination.tsx            # Componente de paginación
│   ├── ranking-card.tsx          # Tarjeta de ranking
│   ├── recommendation-card.tsx   # Tarjeta de recomendación
│   ├── media-stats.tsx           # Estadísticas de medios
│   ├── genre-list.tsx            # Lista de géneros
│   └── ...
├── hooks/                        # Hooks personalizados
│   ├── use-anime-search.ts       # Hook para búsqueda de anime
│   ├── use-manga-search.ts       # Hook para búsqueda de manga
│   └── use-recommendations.ts    # Hook para recomendaciones
├── lib/                          # Utilidades y configuración
│   ├── jikan-api.ts              # Cliente de la API de Jikan
│   └── utils.ts                  # Funciones utilitarias
└── README.md                     # Documentación del proyecto
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Conexión a internet (para la API de Jikan)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd AnimeHub
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

### Scripts Disponibles

```bash
npm run dev          # Ejecutar en modo desarrollo
npm run build        # Construir para producción
npm run start        # Ejecutar en modo producción
npm run lint         # Ejecutar linter
```

## 📖 Historias de Usuario

### HU-001: Búsqueda de Anime
**Como** usuario interesado en anime  
**Quiero** buscar anime por título y aplicar filtros avanzados  
**Para** encontrar contenido que me interese  

**Criterios de Aceptación:**
- ✅ Puedo buscar anime por título
- ✅ Puedo filtrar por tipo, estado, género, clasificación
- ✅ Los resultados se muestran en tarjetas informativas
- ✅ Puedo navegar entre páginas de resultados
- ✅ Los filtros se mantienen al cambiar de página

### HU-002: Búsqueda de Manga
**Como** lector de manga  
**Quiero** buscar manga, manhwa y manhua con filtros específicos  
**Para** descubrir nuevo contenido de lectura  

**Criterios de Aceptación:**
- ✅ Puedo buscar por título en diferentes idiomas
- ✅ Puedo filtrar por tipo (manga, manhwa, manhua, light novel)
- ✅ Puedo filtrar por estado de publicación
- ✅ Los resultados muestran información relevante (capítulos, volúmenes)
- ✅ Incluye estadísticas por tipo en tiempo real

### HU-003: Ver Detalles Completos
**Como** usuario  
**Quiero** ver información detallada de un anime o manga  
**Para** decidir si me interesa consumir ese contenido  

**Criterios de Aceptación:**
- ✅ Puedo acceder a detalles desde las tarjetas de resultados
- ✅ Veo información completa: sinopsis, géneros, estadísticas
- ✅ Para anime: episodios, duración, estudios, personajes con seiyuu
- ✅ Para manga: capítulos, volúmenes, autores, personajes
- ✅ Sección de personajes con imágenes y roles

### HU-004: Explorar Rankings Oficiales
**Como** usuario  
**Quiero** ver los rankings oficiales de MyAnimeList  
**Para** descubrir contenido de alta calidad  

**Criterios de Aceptación:**
- ✅ Puedo ver top anime y manga por separado
- ✅ Los rankings mantienen el orden oficial de MAL
- ✅ Puedo filtrar rankings por tipo específico
- ✅ Puedo navegar por páginas del ranking
- ✅ Numeración secuencial clara y consistente

### HU-005: Recibir Recomendaciones
**Como** usuario  
**Quiero** recibir recomendaciones personalizadas  
**Para** descubrir contenido nuevo basado en preferencias de la comunidad  

**Criterios de Aceptación:**
- ✅ Puedo ver recomendaciones de la comunidad de MAL
- ✅ Puedo obtener selecciones aleatorias
- ✅ Las recomendaciones muestran pares relacionados
- ✅ Puedo navegar a los detalles desde las recomendaciones
- ✅ Sistema de tabs para anime y manga separados

### HU-006: Explorar Personajes
**Como** fan de anime y manga  
**Quiero** ver información de los personajes principales  
**Para** conocer mejor la historia y sus protagonistas  

**Criterios de Aceptación:**
- ✅ Puedo ver personajes principales y secundarios
- ✅ Veo imágenes y nombres de los personajes
- ✅ Para anime: información de actores de voz (seiyuu)
- ✅ Roles claramente diferenciados con badges de color
- ✅ Opción de mostrar/ocultar personajes adicionales

## 🌐 Servicios Web Utilizados

### Jikan API v4
**URL Base:** `https://api.jikan.moe/v4`  
**Tipo:** REST API pública  
**Documentación:** https://docs.api.jikan.moe/

#### Endpoints Utilizados:

**Búsqueda y Listados:**
- `GET /anime` - Buscar anime con filtros
- `GET /manga` - Buscar manga con filtros
- `GET /top/anime` - Top anime con filtros por tipo
- `GET /top/manga` - Top manga con filtros por tipo
- `GET /seasons/now` - Anime de temporada actual

**Detalles:**
- `GET /anime/{id}` - Detalles de anime específico
- `GET /manga/{id}` - Detalles de manga específico

**Personajes:**
- `GET /anime/{id}/characters` - Personajes de anime con seiyuu
- `GET /manga/{id}/characters` - Personajes de manga

**Recomendaciones:**
- `GET /recommendations/anime` - Recomendaciones de anime
- `GET /recommendations/manga` - Recomendaciones de manga
- `GET /random/anime` - Anime aleatorio
- `GET /random/manga` - Manga aleatorio

**Metadatos:**
- `GET /genres/anime` - Géneros de anime
- `GET /genres/manga` - Géneros de manga

#### Características de la API:
- **Rate Limiting:** 1 request por segundo (implementado en el cliente)
- **Paginación:** Soporte para navegación por páginas
- **Filtros:** Múltiples parámetros de filtrado
- **Datos:** Información actualizada de MyAnimeList
- **Personajes:** Imágenes, roles y actores de voz

## 🎨 Diseño del Sistema

### Arquitectura de Componentes

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Pages (App    │    │   Components    │    │   Hooks         │
│   Router)       │    │   (UI Layer)    │    │   (Logic)       │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • /             │    │ • AnimeCard     │    │ • useAnimeSearch│
│ • /anime        │◄──►│ • MangaCard     │◄──►│ • useMangaSearch│
│ • /manga        │    │ • CharacterList │    │ • useRecommend. │
│ • /top-anime    │    │ • Navigation    │    │                 │
│ • /top-manga    │    │ • SearchBar     │    │                 │
│ • /recommend.   │    │ • Filters       │    │                 │
│ • /test         │    │ • Pagination    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   API Layer     │
                       │   (Jikan API)   │
                       ├─────────────────┤
                       │ • JikanAPI      │
                       │ • Rate Limiting │
                       │ • Error Handle  │
                       │ • TypeScript    │
                       │ • Characters    │
                       └─────────────────┘
```

### Flujo de Datos

1. **Usuario interactúa** con componentes de UI
2. **Componentes llaman** a hooks personalizados
3. **Hooks ejecutan** llamadas a la API a través de JikanAPI
4. **API responde** con datos tipados
5. **Hooks actualizan** estado local
6. **Componentes re-renderizan** con nuevos datos

### Patrones de Diseño Utilizados

- **Custom Hooks:** Encapsulación de lógica de estado
- **Compound Components:** Componentes que trabajan juntos
- **Render Props:** Componentes flexibles y reutilizables
- **Container/Presentational:** Separación de lógica y presentación
- **Lazy Loading:** Carga diferida de contenido no crítico

## 🗺️ Mapa de Navegación

```
                    ┌─────────────┐
                    │   Inicio    │
                    │     (/)     │
                    └──────┬──────┘
                           │
        ┌──────────────────┼─────────────────┐
        │                  │                 │
   ┌────▼────┐       ┌─────▼─────┐      ┌────▼────┐
   │  Anime  │       │   Manga   │      │Rankings │
   │ Search  │       │  Search   │      │         │
   └────┬────┘       └─────┬─────┘      └────┬────┘
        │                  │                 │
   ┌────▼────┐       ┌─────▼─────┐      ┌────▼────┐
   │ Anime   │       │   Manga   │      │Top Anime│
   │Details  │       │ Details   │      │Top Manga│
   │+ Chars  │       │+ Chars    │      └─────────┘
   └─────────┘       └───────────┘     
                           │           
                     ┌─────▼─────┐    
                     │Recommend. │     
                     │  System   │     
                     └───────────┘
```

### Justificación de Usabilidad

**Navegación Intuitiva:**
- Barra de navegación fija con iconos descriptivos
- Breadcrumbs implícitos en títulos de página
- Botones "Volver" en páginas de detalle

**Búsqueda Eficiente:**
- Barra de búsqueda prominente
- Filtros colapsibles para no abrumar
- Resultados paginados para mejor rendimiento

**Información Rica:**
- Tarjetas con información esencial visible
- Sección de personajes con imágenes y roles
- Estados de carga para feedback inmediato
- Mensajes de error descriptivos

**Responsive Design:**
- Navegación móvil con menú hamburguesa
- Grids adaptables según tamaño de pantalla
- Componentes optimizados para touch

## 🧩 Componentes Visuales

### 1. Componentes de Navegación
- **Navigation:** Barra de navegación principal
- **Breadcrumbs:** Navegación contextual (implícita)

### 2. Componentes de Búsqueda
- **SearchBar:** Barra de búsqueda con validación
- **AnimeFilters/MangaFilters:** Paneles de filtros específicos
- **RankingFilters:** Filtros para rankings por tipo
- **Pagination:** Navegación entre páginas de resultados

### 3. Componentes de Visualización
- **AnimeCard/MangaCard:** Tarjetas de contenido
- **RankingCard:** Tarjetas especiales para rankings
- **RecommendationCard:** Tarjetas de recomendaciones
- **CharacterList:** Lista de personajes con imágenes y roles

### 4. Componentes de Estado
- **Loading Spinners:** Indicadores de carga
- **Error Alerts:** Mensajes de error
- **Empty States:** Estados vacíos informativos

### 5. Componentes de Datos
- **MediaStats:** Estadísticas compartidas
- **GenreList:** Lista de géneros
- **RandomPicks:** Selecciones aleatorias

## 🔄 Comunicación Asincrónica

### Implementación
- **Fetch API** para todas las llamadas HTTP
- **async/await** para manejo de promesas
- **Rate Limiting** implementado (1 req/seg)
- **Error Handling** robusto con try/catch
- **Carga de personajes** asíncrona en páginas de detalle

### Ejemplos de Uso

```typescript
// Hook personalizado con async/await
const useAnimeSearch = () => {
  const [animes, setAnimes] = useState<AnimeData[]>([])
  const [loading, setLoading] = useState(false)
  
  const searchAnime = useCallback(async (filters: AnimeFilters) => {
    try {
      setLoading(true)
      const response = await JikanAPI.searchAnimeWithFilters(filters)
      setAnimes(response.data)
    } catch (error) {
      // Manejo de errores
    } finally {
      setLoading(false)
    }
  }, [])
  
  return { animes, loading, searchAnime }
}
```

### Endpoints de Personajes

```typescript
// Obtener personajes de anime con seiyuu
static async getAnimeCharacters(id: number): Promise<{ data: CharacterData[] }> {
  const url = `${BASE_URL}/anime/${id}/characters`
  return this.makeRequest<{ data: CharacterData[] }>(url)
}

// Obtener personajes de manga
static async getMangaCharacters(id: number): Promise<{ data: CharacterData[] }> {
  const url = `${BASE_URL}/manga/${id}/characters`
  return this.makeRequest<{ data: CharacterData[] }>(url)
}
```

### Rate Limiting
```typescript
class JikanAPI {
  private static lastRequestTime = 0
  private static readonly REQUEST_DELAY = 1000
  
  private static async makeRequest<T>(url: string): Promise<T> {
    const now = Date.now()
    const timeSinceLastRequest = now - this.lastRequestTime
    if (timeSinceLastRequest < this.REQUEST_DELAY) {
      await delay(this.REQUEST_DELAY - timeSinceLastRequest)
    }
    // ... resto de la implementación
  }
}
```

## 📊 Funcionalidades Implementadas

### ✅ Requisitos Cumplidos

**Páginas y Navegación:**
- ✅ Al menos 2 páginas que naveguen entre sí ✓ (8 páginas implementadas)
- ✅ Intercambio de datos entre páginas ✓ (IDs, filtros, estado)

**Componentes Visuales:**
- ✅ Al menos 4 tipos de componentes visuales ✓ (15+ tipos implementados)
- ✅ Cards, Buttons, Forms, Navigation, Alerts, Character Lists, etc.

**Comunicación:**
- ✅ Comunicación asincrónica ✓ (Fetch API con async/await)
- ✅ Manejo de estados de carga y error

**API REST:**
- ✅ Invoca al menos una API REST pública ✓ (Jikan API v4)
- ✅ Múltiples endpoints utilizados 

### 🚀 Funcionalidades Adicionales

**Tecnologías Avanzadas:**
- ✅ TypeScript para tipado estático
- ✅ Next.js App Router para routing moderno
- ✅ Hooks personalizados para lógica reutilizable
- ✅ Rate limiting para respetar límites de API

**UX/UI Mejorada:**
- ✅ Diseño responsive completo
- ✅ Estados de carga y error informativos
- ✅ Navegación intuitiva con iconos
- ✅ Filtros avanzados y búsqueda
- ✅ Sección de personajes con imágenes y actores de voz

**Rendimiento:**
- ✅ Lazy loading de imágenes
- ✅ Paginación para grandes conjuntos de datos
- ✅ Optimización de re-renders con useCallback
- ✅ Carga asíncrona de personajes


## 🧪 Testing y Calidad

### Herramientas de Análisis
- **TypeScript:** Análisis estático de tipos
- **ESLint:** Análisis de calidad de código
- **Prettier:** Formateo consistente de código

### Testing Manual
- ✅ Todas las rutas funcionan correctamente
- ✅ Navegación entre páginas fluida
- ✅ Filtros y búsquedas operativas
- ✅ Responsive design en múltiples dispositivos
- ✅ Manejo de errores de red
- ✅ Carga de personajes en páginas de detalle

### Página de Pruebas
Incluye una página de pruebas en `/test` para verificar:
- Estado de todas las rutas
- Funcionalidad de componentes
- Estado de la API
- Lista de verificación completa

## 🚀 Despliegue

### Opciones de Despliegue

**Vercel:**
```bash
# Conectar repositorio a Vercel
# Deploy automático en cada push
```

**Netlify:**
```bash
npm run build
# Subir carpeta .next a Netlify
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Variables de Entorno
No se requieren variables de entorno adicionales ya que la API de Jikan es pública.

## 🔧 Configuración de Desarrollo

### Estructura de Archivos de Configuración

```
├── next.config.mjs          # Configuración de Next.js
├── tailwind.config.ts       # Configuración de Tailwind CSS
├── tsconfig.json           # Configuración de TypeScript
├── package.json            # Dependencias y scripts
└── .eslintrc.json         # Configuración de ESLint
```

### Dependencias Principales

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "typescript": "5.x",
    "tailwindcss": "3.x",
    "@radix-ui/react-*": "latest",
    "lucide-react": "latest"
  }
}
```

## 📈 Métricas y Rendimiento

### Optimizaciones Implementadas
- **Code Splitting:** Automático con Next.js
- **Image Optimization:** Componente Image de Next.js
- **Bundle Size:** Optimizado con tree shaking
- **API Calls:** Rate limiting y caching básico
- **Lazy Loading:** Personajes cargados bajo demanda


## 🐛 Problemas Conocidos y Limitaciones

### Limitaciones de la API
- **Rate Limiting:** 1 request por segundo
- **Disponibilidad:** Dependiente de la API de Jikan
- **Datos:** Información limitada a lo disponible en MyAnimeList
- **Personajes:** Algunos títulos pueden no tener información de personajes

## 📄 Licencia

Este proyecto es desarrollado con fines educativos para el curso de Laboratorios RIA 2025.

## 🙏 Agradecimientos

- **Jikan API** por proporcionar acceso gratuito a datos de MyAnimeList
- **shadcn/ui** por los componentes de UI de alta calidad
- **Vercel** por la plataforma de despliegue
- **MyAnimeList** por ser la fuente de datos de anime y manga
