import { useQuery } from '@tanstack/vue-query';
import { fetchAsteroids as fetchAsteroidsAPI } from '@/api/asteroid';

const useAsteroids = () => {
  const fetchAsteroids = async (dates) => useQuery({
    queryKey: ['asteroids', dates],
    queryFn: async () => fetchAsteroidsAPI(dates),
    staletime: 500,
  });

  return {
    fetchAsteroids,
  };
};

export default useAsteroids;
