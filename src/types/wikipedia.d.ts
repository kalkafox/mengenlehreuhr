export interface WikipediaResponse {
  type: string
  title: string
  displaytitle: string
  namespace: Namespace
  wikibase_item: string
  titles: Titles
  pageid: number
  thumbnail: Originalimage
  originalimage: Originalimage
  lang: string
  dir: string
  revision: string
  tid: string
  timestamp: Date
  description: string
  description_source: string
  coordinates: Coordinates
  content_urls: ContentUrls
  extract: string
  extract_html: string
}

export interface ContentUrls {
  desktop: Desktop
  mobile: Desktop
}

export interface Desktop {
  page: string
  revisions: string
  edit: string
  talk: string
}

export interface Coordinates {
  lat: number
  lon: number
}

export interface Namespace {
  id: number
  text: string
}

export interface Originalimage {
  source: string
  width: number
  height: number
}

export interface Titles {
  canonical: string
  normalized: string
  display: string
}
