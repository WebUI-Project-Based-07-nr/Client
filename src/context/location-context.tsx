import {
  createContext,
  useState,
  useMemo,
  ReactNode,
  FC,
  Dispatch,
  SetStateAction
} from 'react'
import { Cities, Countries, ItemsWithCount } from '~/types'

interface LocationContextProps {
  selectedCountry: string
  setSelectedCountry: (value: string) => void
  selectedCity: string
  setSelectedCity: (value: string) => void
  countryList: ItemsWithCount<Countries>
  setCountryList: Dispatch<SetStateAction<ItemsWithCount<Countries>>>
  cityCache: { [key: string]: ItemsWithCount<Cities> }
  setCityCache: Dispatch<
    SetStateAction<{ [key: string]: ItemsWithCount<Cities> }>
  >
}

interface LocationProviderProps {
  children: ReactNode
}

export const LocationContext = createContext<LocationContextProps>(
  {} as LocationContextProps
)

export const LocationProvider: FC<LocationProviderProps> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [countryList, setCountryList] = useState<ItemsWithCount<Countries>>({
    count: 0,
    items: []
  })
  const [cityCache, setCityCache] = useState<{
    [key: string]: ItemsWithCount<Cities>
  }>({})

  const contextValue = useMemo(
    () => ({
      selectedCountry,
      setSelectedCountry,
      selectedCity,
      setSelectedCity,
      countryList,
      setCountryList,
      cityCache,
      setCityCache
    }),
    [selectedCountry, selectedCity, countryList, cityCache]
  )

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  )
}
