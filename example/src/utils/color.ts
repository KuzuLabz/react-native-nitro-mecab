const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h = h % 360;
  if (h < 0) h += 360;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h/360 + 1/3);
    g = hue2rgb(p, q, h/360);
    b = hue2rgb(p, q, h/360 - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

export const getRandomColor = (count: number, opacity: number = 1) => {
    if (count <= 0) return [];
  if (count === 1) return ["rgb(240, 240, 245)"];

  const colors: string[] = [];
  
  // We use HSL color space for better control over lightness and saturation
  // Light colors → high lightness (L > 75–92%), low-to-medium saturation
  const baseLightness = 88;     // 82–94 range works well for "light"
  const lightnessVariation = 6; // ± this value
  const saturation = 65;        // 50–80 looks pastel/light but not washed out
  
  // Golden angle in degrees — gives good distribution around the color wheel
  const goldenAngle = 137.508; // ≈ 360 / golden ratio

  for (let i = 0; i < count; i++) {
    // Spread hues evenly using golden angle
    const hue = (i * goldenAngle) % 360;
    
    // Small variation in lightness & saturation prevents repetition
    const lightness = baseLightness + (i % 5 - 2) * (lightnessVariation / 4);
    const satVariation = 4 - Math.abs((i % 7) - 3); // subtle saturation changes
    
    // Convert HSL → RGB
    const rgb = hslToRgb(
      hue,
      (saturation + satVariation * 3) / 100,
      lightness / 100
    );

    colors.push(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`);
  }

  return colors;
};