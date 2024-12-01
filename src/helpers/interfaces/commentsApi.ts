import { IGetCountriesAPI } from './countriesApi'

export type IGetCommentsAPI = Pick<
	IGetCountriesAPI,
	'current_page' | 'page_size'
>
