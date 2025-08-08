import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTVImages, fetchMovieImages } from '../../services/movieApi';
import { MovieDetailSlider } from './MovieDetailSlider';
import './MovieDetailGallery.css'
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Download from 'yet-another-react-lightbox/plugins/download';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

export const MovieDetailGallery = () => {
  const { id, type } = useParams();
  const [imagesDetail, setImagesDetail] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSlides, setLightboxSlides] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const getImagesDetail = async () => {
      try {
        const res =
          type === 'movie'
            ? await fetchMovieImages(id)
            : await fetchTVImages(id);
        setImagesDetail({ ...res.data, type });
      } catch (err) {
        console.log(err);
      }
    };
    getImagesDetail();
  }, [id, type]);

  if (!imagesDetail) {
    return <p className="text-white">Đang tải ảnh...</p>;
  }

  const posters = imagesDetail.posters || 'Không có poster';
  const backgrounds = imagesDetail.backdrops || 'Không có background';

  const handleImageClick = (images, index) => {
    const slides = images.map((img, i) => ({
      src: `https://image.tmdb.org/t/p/w1280${img.file_path}`,
      description: `Ảnh ${i + 1}`, // Dùng cho plugin Captions
    }));
    setLightboxSlides(slides);
    setStartIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div>
      <h2 className="lg:text-xl text-lg font-bold lg:my-8 my-4 text-white">Poster</h2>
      <MovieDetailSlider posters={posters} onImageClick={handleImageClick} />

      <h2 className="lg:text-xl text-lg font-bold lg:my-8 my-4 text-white">Background</h2>
      <MovieDetailSlider backgrounds={backgrounds} onImageClick={handleImageClick} />

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxSlides}
          index={startIndex}
          plugins={[Zoom, Captions, Fullscreen, Download, Thumbnails]}
          animation={{ duration: 600 }}
          carousel={{
            preload: 1,
            finite: true,
          }}
          thumbnails={{
            position: 'bottom',
            width: 50,
            height: 30,
            padding: 1,
          }}
        />
      )}
    </div>
  );
};
