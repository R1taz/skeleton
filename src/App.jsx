import { Route, Routes } from 'react-router-dom'
import './App.css'
import Comments from './pages/Comments/Comments'
import VirtualScroll from './pages/VirtualScroll/VirtualScroll'
import Layout from './shared/Layout/Layout'
import Countries from './pages/Countries/Countries'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/virtual' element={<VirtualScroll />} />
				<Route path='/comments' element={<Comments />} />
				<Route path='/countries' element={<Countries />} />
			</Route>
		</Routes>
	)
}

export default App
