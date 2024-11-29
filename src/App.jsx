import { Route, Routes } from 'react-router-dom'
import './App.css'
import Comments from './pages/Comments/Comments'
import Photos from './pages/Photos/Photos'
import Layout from './shared/Layout/Layout'
import Countries from './pages/Countries/Countries'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/photos' element={<Photos />} />
				<Route path='/comments' element={<Comments />} />
				<Route path='/countries' element={<Countries />} />
			</Route>
		</Routes>
	)
}

export default App
