const useRelativeScale = (earthScale) => {
  const earthDiameterInKm = 6371 * 2; // Earth's diameter in kilometers
  const earthDiameterInScene = earthScale * earthDiameterInKm; // Earth's diameter in the scene

  const scaleFactor = earthDiameterInScene / earthDiameterInKm;

  const computeRelativeSize = (realWorldValueInKm) => realWorldValueInKm * scaleFactor;

  return {
    computeRelativeSize,
  };
};

export default useRelativeScale;
