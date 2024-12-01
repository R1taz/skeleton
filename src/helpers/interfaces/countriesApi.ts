import { CategoryType, ICountry } from './countriesInterfaces'

export interface IGetCountriesAPI {
	current_page: number
	page_size: number
	category?: CategoryType
	keywords?: string
}

export interface IResponseGetCountriesAPI {
	countries: ICountry[] | undefined
	totalCount: number | undefined
}
