import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetailCard from './pages/DetailCard';
import MyCard from './pages/MyCard';
import Navbar from './pages/Navbar';

function Router() {
    return (
        <BrowserRouter>
            <Navbar>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/detail/:id' element={<DetailCard />} />
                    <Route path='/my-pokemon' element={<MyCard />} />
                </Routes>
            </Navbar>
        </BrowserRouter>
    );
}

export default Router;