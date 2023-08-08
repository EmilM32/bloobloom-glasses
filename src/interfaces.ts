// Define color filter options as an enum
export enum Colour {
  Black = 'black',
  Tortoise = 'tortoise',
  Coloured = 'coloured',
  Crystal = 'crystal',
  Dark = 'dark',
  Bright = 'bright'
}

// Define shape filter options as an enum
export enum Shape {
  Square = 'square',
  Rectangle = 'rectangle',
  Round = 'round',
  CatEye = 'cat-eye'
}

export enum AvailableFilters {
  Colour = 'colour',
  Shape = 'shape'
}

// Define the query parameters for the collections endpoint
export interface CollectionQueryParams {
  page: Page
  filters: Filters
}

// Define the structure of the Page object
export interface Page {
  limit: number
  number: number
}

// Define the structure of the Filters object
export interface Filters {
  colour: string[]
  shape: string[]
}

export interface MetaData {
  total_count: number
}

export interface Collections {
  collections: Collection[]
  meta: MetaData
}

export interface Collection {
  id: number
  name: string
  configuration_name: string
}

export interface Glasses {
  glasses: Glass[]
  meta: MetaData
}

export interface GlassMedia {
  id: number
  url: string
  position: number
}

export interface GlassVariant {
  id: number
  default_glass_variant: boolean
  media: GlassMedia[]
}

export interface Glass {
  id: number
  name: string
  glass_variants: GlassVariant[]
}
