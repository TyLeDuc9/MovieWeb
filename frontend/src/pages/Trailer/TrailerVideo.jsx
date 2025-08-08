import { fetchTrailerById } from '../../services/movieApi';
import { useParams } from 'react-router-dom';
import { Title } from '../../components/Title/Title'
import { useLoading } from '../../context/LoadingContext';
import { ComponentLoading } from '../../components/GlobalLoading/ComponentLoading';
import React, { useEffect, useState } from 'react';
export const TrailerVideo = () => {
  const { id, type } = useParams();
  const { setComponentsLoading, componentsLoading } = useLoading();
  const [trailer, setTrailer] = useState(null);
  useEffect(() => {
    const getTrailer = async (id, type = '') => {
      try {
        setComponentsLoading(true);
        const res = await fetchTrailerById(id, type);
        setTrailer(res);
      } catch (err) {
        console.error('Lỗi lấy trailer:', err);
      } finally {
        setComponentsLoading(false);
      }
    };

    getTrailer(id, type);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, type]);


  if (componentsLoading) return <ComponentLoading />;
  if (!trailer) {
    return <p className="text-red-400 text-center pt-56">Không tìm thấy trailer phù hợp.</p>;
  }

  return (
    <div className="pt-28 w-full">
      <Title
        title={trailer.name || 'Trailer'}
        className="mb-6"
        linkColor="text-yellow-300 lg:text-xl text-sm font-bold"
      />
      <div className="lg:w-full lg:h-[90vh] w-f h-[30vh]  rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};
