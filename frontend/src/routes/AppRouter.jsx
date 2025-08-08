import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Home } from '../pages/Home/Home';
import { MovieDetail } from '../pages/MovieDetail/MovieDetail';
import { Cast } from '../pages/Cast/Cast';
import { Category } from '../pages/Category/Category';
import { Standalone } from '../pages/Standalone/Standalone';
import { Series } from '../pages/Series/Series';
import { CastPages } from '../pages/CastPages/CastPages';
import { Trailer } from '../pages/Trailer/Trailer';
import { Country } from '../pages/Country/Country';
import { SearchPage } from '../pages/SearchPage/SearchPage';
import { User } from '../pages/User/User';
import { Favorite } from '../pages/Favorite/Favorite';
import { UserLayout } from '../layouts/UserLayout';
export const AppRouter = () => {
  return (
    <div className='bg-[#14161d]'>
      <Header />
      <Routes>
        {/* Public */}
        <Route path='/' element={<Home />} />
        <Route path='/phim/:slug/:type/:id' element={<MovieDetail />} />
        <Route path='/cast/:id' element={<Cast />} />
        <Route path='/the-loai/:genreSlug/:genreId' element={<Category />} />
        <Route path='/phim-le' element={<Standalone />} />
        <Route path='/phim-bo' element={<Series />} />
        <Route path='/dien-vien' element={<CastPages />} />
        <Route path='/trailer/:slug/:type/:id' element={<Trailer />} />
        <Route path='/quoc-gia/:code' element={<Country />} />
        <Route path='/tim-kiem' element={<SearchPage />} />

        {/* User layout */}
        <Route path='/user' element={<UserLayout />}>
          <Route path='profile' element={<User />} />
          <Route path='favorite' element={<Favorite />} />
        </Route>
      


      </Routes>
      <Footer />
    </div>
  );
};
