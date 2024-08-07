export interface Country {
  id: number
  name: string
  iso2: string
  iso3: string
  phonecode: string
  capital: string
  currency: string
  native: string
  emoji: string
}

export interface Countries extends Array<Country> {}

export interface City {
  id: number
  name: string
}

export interface Cities extends Array<City> {}

export interface GetCitiesParams {
  countryCode: string
}
