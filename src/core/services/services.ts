export const getMovies = async () => {
  const url =
    'https://yts.mx/api/v2/list_movies.json?minimum_rating=8&page=1&sort_by=year';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Parsed JSON data:', data);

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

export const getMovieDetail = async (id: string) => {
  const url = 'https://yts.mx/api/v2/movie_details.json?movie_id=' + id;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Parsed JSON data:', data);

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};
