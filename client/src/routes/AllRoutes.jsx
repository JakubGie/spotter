import Homepage from './Homepage'
import Spot from './Spot'
import NotFound from './NotFound'
import { Routes, Route } from 'react-router-dom'
import CreateNewSpotted from './CreateNewSpotted'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/spotted/:name" element={<Spot />}></Route>
            <Route path="/spotted/stworz" element={<CreateNewSpotted />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    )
}

export default AllRoutes