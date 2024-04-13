export default function useSize() {
  const calculateRelativeSize = (targetObjectDiameterKm) => {
    const minSizeUnits = 0.001;
    const sunDiameterKm = 1391000;
    const sunSizeUnits = 0.05;
    const scalingFactor = sunSizeUnits / Math.log10(sunDiameterKm);
    return Math.max(scalingFactor * Math.log10(targetObjectDiameterKm), minSizeUnits);
  };
  return { calculateRelativeSize };
}
