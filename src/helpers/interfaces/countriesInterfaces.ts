export interface ICountry {
	population: number
	state: CategoryType
	name: NameCountryType
	type: TypeCountryType
	id: string
}

export type CategoryType = string // 'All' | 'Colorado'
type NameCountryType = string // 'Autauga' | 'Baldwin'
type TypeCountryType = 'Country'
