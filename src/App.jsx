import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './shared/Layout'
import MainPage from './pages/MainPage'
import CarsPage from './pages/CarsPage'
import ClothesPage from './pages/ClothesPage'
import PhotosPage from './pages/PhotoPage/PhotosPage'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<MainPage />} />
				<Route path='/cars' element={<CarsPage />} />
				<Route path='/clothes' element={<ClothesPage />} />
				<Route path='/photos' element={<PhotosPage />} />
			</Route>
		</Routes>
	)
}

export default App
