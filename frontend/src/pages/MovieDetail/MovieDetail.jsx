import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { BannerDetail } from './BannerDetail';
import { MovieDetailInformation } from './MovieDetailInformation';
import { MovieDetailNotify } from './MovieDetailNotify';
import { Divider } from '../../components/Divider/Divider';
import { MovieDetailGallery } from './MovieDetailGallery';
import { MovieDetailActor } from './MovieDetailActor';
import { MovieDetailRecomment } from './MovieDetailRecomment';
import { Comment } from '../../components/Comment/Comment'
import { ComponentLoading } from '../../components/GlobalLoading/ComponentLoading';
import { useLoading } from '../../context/LoadingContext';
export const MovieDetail = () => {
  const { setComponentsLoading, componentsLoading } = useLoading();
  const { id, type } = useParams();
  const { movieDetail, getMovieDetail } = useAppContext();
  const [activeTab, setActiveTab] = useState('gallery');
  
  const commentRef = useRef(null)
  const scrollToComment = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }


  useEffect(() => {
    const fetchMovieDetail = async () => {
      setComponentsLoading(true);
      await getMovieDetail(id, type);
      setComponentsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    fetchMovieDetail();
  }, [id, type]);

  if (componentsLoading) return <ComponentLoading />;

  if (!movieDetail) {
    return <p className="text-white text-center pt-[20%]">Đang tải thông tin.</p>;
  }

  return (
    <div className="text-white min-h-screen">
      <BannerDetail movie={movieDetail} />

      <div className="grid lg:grid-cols-12 grid-cols-1">
        <MovieDetailInformation movie={movieDetail} />

        <div className="col-span-8 bg-gradient-to-b from-[#1e1e25] to-[#14161d] min-h-screen rounded-4xl">
          <MovieDetailNotify movie={movieDetail} scrollToComment={scrollToComment} />
          <Divider className="border-red-500 border-2 w-[80%] mx-auto mb-8" />
          <div className="lg:px-16 px-10 flex lg:gap-10 gap-6">
            {['gallery', 'actor', 'recomment'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`lg:pb-2 font-semibold lg:border-b-2 cursor-pointer lg:text-sm md:text-sm transition-all duration-200 text-xs
        ${activeTab === tab
                    ? 'lg:text-amber-300 lg:border-amber-300 text-white'
                    : 'text-white lg:border-transparent lg:hover:text-amber-200'}
      `}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'gallery' && 'Gallery'}
                {tab === 'actor' && 'Diễn viên'}
                {tab === 'recomment' && 'Đề xuất'}
              </button>
            ))}

          </div>

          <div className="lg:px-16 px-10">
            {activeTab === 'gallery' && <MovieDetailGallery />}
            {activeTab === 'actor' && <MovieDetailActor />}
            {activeTab === 'recomment' && <MovieDetailRecomment />}
          </div>
          <div ref={commentRef}>
            <Comment className='lg:py-8 lg:px-16 px-12 py-4'/>
          </div>
        </div>
      </div>



    </div>
  );
};
