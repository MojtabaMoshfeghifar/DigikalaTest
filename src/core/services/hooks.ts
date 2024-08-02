import {useQuery} from '@tanstack/react-query';
import {getMovies, getMovieDetail} from './services';

export function useGetMovieDetails(id: string) {
  return useQuery({
    queryKey: ['getMovieDetail'],
    queryFn: () => getMovieDetail(id),
  });
}
export function useGetMovies() {
  return useQuery({queryKey: ['getMovies'], queryFn: () => getMovies()});
}
