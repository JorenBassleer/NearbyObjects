import relativeVariables from '../../utils/relativeVariables.json';

export default function useScale() {
  const scalingFactor = relativeVariables.sunSizeUnits / Math.log10(relativeVariables.sunDiameterKm);
  const calculateRelativeScale = (targetKm) => scalingFactor * Math.log10(targetKm);
  return { calculateRelativeScale };
}
