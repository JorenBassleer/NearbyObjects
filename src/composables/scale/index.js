const useRelativeScale = (earthRadiusInScene) => {
  const earthRadiusInKm = 6371;

  const computeRelativeSize = (distanceInKm) => {
    const logBase = 1; // You can adjust the base of the log here (default: 10)

    const logDistance = Math.log(distanceInKm) / Math.log(logBase);

    const sceneDistance = logDistance * (earthRadiusInScene / earthRadiusInKm);
    return sceneDistance;
  };

  return {
    computeRelativeSize,
  };
};

export default useRelativeScale;
