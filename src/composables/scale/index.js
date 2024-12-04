const useRelativeScale = (earthScale) => {
  const earthRealRadius = 6371;
  const earthDiameterInKm = 12742;

  const computeRelativeDistance = (distance) => (distance / earthDiameterInKm) ** 1 * earthScale;

  const scaleLogarithmic = (realDistance) => earthScale * (Math.log(realDistance + 1) / Math.log(earthRealRadius + 1));

  return {
    scaleLogarithmic,
    computeRelativeDistance,
  };
};

export default useRelativeScale;
