import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Comments from './pages/Comments/Comments.tsx'
import Photos from './pages/Photos/Photos.tsx'
import Layout from './shared/Layout/Layout.tsx'
import Countries from './pages/Countries/Countries.tsx'

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
