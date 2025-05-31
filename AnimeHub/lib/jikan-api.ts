// Tipos para la API de Jikan
export interface AnimeData {
  mal_id: number
  title: string
  title_english?: string
  title_japanese?: string
  images: {
    jpg: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
  }
  synopsis?: string
  score?: number
  scored_by?: number
  rank?: number
  popularity?: number
  members?: number
  favorites?: number
  status?: string
  episodes?: number
  duration?: string
  rating?: string
  genres?: Array<{ mal_id: number; name: string }>
  studios?: Array<{ mal_id: number; name: string }>
  year?: number
  season?: string
  type?: string
}

export interface MangaData {
  mal_id: number
  title: string
  title_english?: string
  title_japanese?: string
  images: {
    jpg: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
  }
  synopsis?: string
  score?: number
  scored_by?: number
  rank?: number
  popularity?: number
  members?: number
  favorites?: number
  status?: string
  chapters?: number
  volumes?: number
  genres?: Array<{ mal_id: number; name: string }>
  authors?: Array<{ mal_id: number; name: string }>
  published?: {
    from?: string
    to?: string
  }
  type?: string
}

export interface CharacterData {
  character: {
    mal_id: number
    name: string
    images: {
      jpg: {
        image_url: string
      }
    }
    url: string
  }
  role: string
  voice_actors?: Array<{
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
  }>
}

export interface JikanResponse<T> {
  data: T[]
  pagination: {
    last_visible_page: number
    has_next_page: boolean
    current_page: number
    items: {
      count: number
      total: number
      per_page: number
    }
  }
}

export interface JikanSingleResponse<T> {
  data: T
}

export interface AnimeFilters {
  q?: string
  type?: "tv" | "movie" | "ova" | "special" | "ona" | "music"
  status?: "airing" | "complete" | "upcoming"
  rating?: "g" | "pg" | "pg13" | "r17" | "r" | "rx"
  genres?: string
  order_by?:
    | "mal_id"
    | "title"
    | "start_date"
    | "end_date"
    | "episodes"
    | "score"
    | "scored_by"
    | "rank"
    | "popularity"
    | "members"
    | "favorites"
  sort?: "desc" | "asc"
  page?: number
  limit?: number
}

export interface MangaFilters {
  q?: string
  type?: "manga" | "novel" | "lightnovel" | "oneshot" | "doujin" | "manhwa" | "manhua"
  status?: "publishing" | "complete" | "hiatus" | "discontinued" | "upcoming"
  genres?: string
  order_by?:
    | "mal_id"
    | "title"
    | "start_date"
    | "end_date"
    | "chapters"
    | "volumes"
    | "score"
    | "scored_by"
    | "rank"
    | "popularity"
    | "members"
    | "favorites"
  sort?: "desc" | "asc"
  page?: number
  limit?: number
}

export interface Genre {
  mal_id: number
  name: string
  url: string
  count: number
}

export interface RecommendationEntry {
  mal_id: number
  title: string
  images: {
    jpg: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
  }
}

export interface RecommendationData {
  mal_id: string
  entry: RecommendationEntry[]
  content: string
  date: string
  user: {
    username: string
    url: string
  }
}

const BASE_URL = "https://api.jikan.moe/v4"

// Función para manejar delays entre requests (Jikan tiene rate limiting)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class JikanAPI {
  private static lastRequestTime = 0
  private static readonly REQUEST_DELAY = 1000 // 1 segundo entre requests

  private static async makeRequest<T>(url: string): Promise<T> {
    // Rate limiting: esperar al menos 1 segundo entre requests
    const now = Date.now()
    const timeSinceLastRequest = now - this.lastRequestTime
    if (timeSinceLastRequest < this.REQUEST_DELAY) {
      await delay(this.REQUEST_DELAY - timeSinceLastRequest)
    }
    this.lastRequestTime = Date.now()

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  // Buscar anime
  static async searchAnime(query: string, page = 1): Promise<JikanResponse<AnimeData>> {
    const url = `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20`
    return this.makeRequest<JikanResponse<AnimeData>>(url)
  }

  // Buscar manga
  static async searchManga(query: string, page = 1): Promise<JikanResponse<MangaData>> {
    const url = `${BASE_URL}/manga?q=${encodeURIComponent(query)}&page=${page}&limit=20`
    return this.makeRequest<JikanResponse<MangaData>>(url)
  }

  // Obtener detalles de anime
  static async getAnimeById(id: number): Promise<JikanSingleResponse<AnimeData>> {
    const url = `${BASE_URL}/anime/${id}`
    return this.makeRequest<JikanSingleResponse<AnimeData>>(url)
  }

  // Obtener detalles de manga
  static async getMangaById(id: number): Promise<JikanSingleResponse<MangaData>> {
    const url = `${BASE_URL}/manga/${id}`
    return this.makeRequest<JikanSingleResponse<MangaData>>(url)
  }

  // Obtener personajes de anime
  static async getAnimeCharacters(id: number): Promise<{ data: CharacterData[] }> {
    const url = `${BASE_URL}/anime/${id}/characters`
    return this.makeRequest<{ data: CharacterData[] }>(url)
  }

  // Obtener personajes de manga
  static async getMangaCharacters(id: number): Promise<{ data: CharacterData[] }> {
    const url = `${BASE_URL}/manga/${id}/characters`
    return this.makeRequest<{ data: CharacterData[] }>(url)
  }

  // Top anime con filtro de tipo
  static async getTopAnime(page = 1, type?: string): Promise<JikanResponse<AnimeData>> {
    let url = `${BASE_URL}/top/anime?page=${page}&limit=25`
    if (type && type !== "") {
      url += `&type=${type}`
    }
    return this.makeRequest<JikanResponse<AnimeData>>(url)
  }

  // Top manga con filtro de tipo
  static async getTopManga(page = 1, type?: string): Promise<JikanResponse<MangaData>> {
    let url = `${BASE_URL}/top/manga?page=${page}&limit=25`
    if (type && type !== "") {
      url += `&type=${type}`
    }
    return this.makeRequest<JikanResponse<MangaData>>(url)
  }

  // Anime de temporada actual
  static async getCurrentSeasonAnime(): Promise<JikanResponse<AnimeData>> {
    const url = `${BASE_URL}/seasons/now`
    return this.makeRequest<JikanResponse<AnimeData>>(url)
  }

  // Buscar anime con filtros avanzados
  static async searchAnimeWithFilters(filters: AnimeFilters): Promise<JikanResponse<AnimeData>> {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, value.toString())
      }
    })

    const url = `${BASE_URL}/anime?${params.toString()}`
    return this.makeRequest<JikanResponse<AnimeData>>(url)
  }

  // Obtener géneros de anime
  static async getAnimeGenres(): Promise<{ data: Genre[] }> {
    const url = `${BASE_URL}/genres/anime`
    return this.makeRequest<{ data: Genre[] }>(url)
  }

  // Buscar manga con filtros avanzados
  static async searchMangaWithFilters(filters: MangaFilters): Promise<JikanResponse<MangaData>> {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, value.toString())
      }
    })

    const url = `${BASE_URL}/manga?${params.toString()}`
    return this.makeRequest<JikanResponse<MangaData>>(url)
  }

  // Obtener géneros de manga
  static async getMangaGenres(): Promise<{ data: Genre[] }> {
    const url = `${BASE_URL}/genres/manga`
    return this.makeRequest<{ data: Genre[] }>(url)
  }

  // Obtener recomendaciones de anime
  static async getAnimeRecommendations(page = 1): Promise<JikanResponse<RecommendationData>> {
    const url = `${BASE_URL}/recommendations/anime?page=${page}`
    return this.makeRequest<JikanResponse<RecommendationData>>(url)
  }

  // Obtener recomendaciones de manga
  static async getMangaRecommendations(page = 1): Promise<JikanResponse<RecommendationData>> {
    const url = `${BASE_URL}/recommendations/manga?page=${page}`
    return this.makeRequest<JikanResponse<RecommendationData>>(url)
  }

  // Obtener recomendaciones específicas para un anime
  static async getAnimeRecommendationsById(id: number): Promise<any> {
    const url = `${BASE_URL}/anime/${id}/recommendations`
    return this.makeRequest(url)
  }

  // Obtener recomendaciones específicas para un manga
  static async getMangaRecommendationsById(id: number): Promise<any> {
    const url = `${BASE_URL}/manga/${id}/recommendations`
    return this.makeRequest(url)
  }

  // Obtener anime/manga aleatorio para recomendaciones
  static async getRandomAnime(): Promise<JikanSingleResponse<AnimeData>> {
    const url = `${BASE_URL}/random/anime`
    return this.makeRequest<JikanSingleResponse<AnimeData>>(url)
  }

  static async getRandomManga(): Promise<JikanSingleResponse<MangaData>> {
    const url = `${BASE_URL}/random/manga`
    return this.makeRequest<JikanSingleResponse<MangaData>>(url)
  }
}
