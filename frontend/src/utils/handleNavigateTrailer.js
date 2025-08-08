import { toSlug } from '../utils/toSlugGenre';

export const handleNavigateTrailer = (navigate, movie) => {
  if (!movie?.id) return;

  const mediaType = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');
  const name = movie.title || movie.name 
  const slug = toSlug(name);

  navigate(`/trailer/${slug}/${mediaType}/${movie.id}`);
};