const useRelativeScale = (earthScale) => {
  const earthDiameterInKm = 12742;
  const earthDiameterInScene = earthScale * earthDiameterInKm;

  const scaleFactor = earthDiameterInScene / earthDiameterInKm;

  const computeRelativeScale = (realWorldValueInKm) => realWorldValueInKm * scaleFactor;

  const computeRelativeDistance = (distance) => (distance / earthDiameterInKm) ** 1 * earthScale;

  return {
    computeRelativeDistance,
    computeRelativeScale,
  };
};

export default useRelativeScale;
