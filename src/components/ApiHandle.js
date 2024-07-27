export const handleGetMovies = async (title) => {
  const response = await fetch(
    `https://www.omdbapi.com/?s=${title}&apikey=f8808664`
  );
  return response.json();
};
