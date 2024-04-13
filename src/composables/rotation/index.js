export default function useRotation() {
  // 30 seconds equate to one rotation of Earth
  // 30 seconds = 1 day
  const calculateRelativeRotation = (relativeFullRotationInDays) => {
    const earthFullRotationInSeconds = 30;
    const bodyRotationPeriodInSeconds = earthFullRotationInSeconds * relativeFullRotationInDays;

    const degreesPerSecond = 360 / bodyRotationPeriodInSeconds;
    // Set to radians
    return degreesPerSecond * (Math.PI / 180);
  };
  return { calculateRelativeRotation };
}
