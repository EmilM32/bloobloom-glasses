import { BASE_URL } from '@/constans'
import type { CollectionQueryParams } from '../interfaces'

export function buildCollectionUrl(category: string, params: CollectionQueryParams): string {
  const url = new URL(`${BASE_URL}/${category}/glasses`)

  // Add page parameters
  url.searchParams.append('page[limit]', params.page.limit.toString())
  url.searchParams.append('page[number]', params.page.number.toString())

  // Add filters
  url.searchParams.append('filters[lens_variant_presciptions]', 'fashion')
  url.searchParams.append('filters[lens_variant_types]', 'classic')
  url.searchParams.append('filters[frame_variant_home_trial_available]', 'false')

  // Add colour filter parameters
  for (const colour of params.filters.colour) {
    url.searchParams.append(
      'filters[glass_variant_frame_variant_colour_tag_configuration_names][]',
      colour
    )
  }

  // Add shape filter parameters
  for (const shape of params.filters.shape) {
    url.searchParams.append(
      'filters[glass_variant_frame_variant_frame_tag_configuration_names][]',
      shape
    )
  }

  return url.toString()
}
