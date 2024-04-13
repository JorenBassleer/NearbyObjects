import relativeVariables from '../../utils/relativeVariables.json';

export default function useDistance() {
  const calculateRelativeDistance = (distanceInKm) => {
    const scalingFactor = relativeVariables.sunSizeUnits / relativeVariables.sunDiameterKm;

    return distanceInKm * scalingFactor;
  };
  return { calculateRelativeDistance };
}
