import { debounce } from 'lodash'
import { City, Cities } from '~/types'

export const filterCities = (value: string, cities: Cities): Cities => {
  if (!cities) return []

  const lowercasedValue = value.toLowerCase()

  return cities
    .filter((city: City) => city.name.toLowerCase().startsWith(lowercasedValue))
    .reduce<Cities>((acc, current) => {
      const city = acc.find((item) => item.name === current.name)
      if (!city) {
        return acc.concat([current])
      } else {
        return acc
      }
    }, [])
    .slice(0, 100)
}

export const debouncedFilterCities = (
  filterFn: () => void,
  delay: number = 300
): (() => void) => debounce(filterFn, delay)
