export function calculateContrast(hsl1, hsl2) {
  const rgb1 = hslToRgb(hsl1[0], hsl1[1], hsl1[2]);
  const rgb2 = hslToRgb(hsl2[0], hsl2[1], hsl2[2]);

  const luminance1 = calculateLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const luminance2 = calculateLuminance(rgb2[0], rgb2[1], rgb2[2]);
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  return (lighter + 0.05) / (darker + 0.05);
}

function calculateLuminance(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const a = [r, g, b].map(v => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const chroma = (1 - Math.abs((2 * l) - 1)) * s;
  const h_dash = h / 60;
  const intermediate = chroma * (1 - Math.abs((h_dash % 2)-1));
  const c = chroma;
  const x = intermediate;

  const values = [
    [c, x, 0], // reddish
    [x, c, 0], // yellowish
    [0, c, x], // greenish
    [0, x, c], // cyanish
    [x, 0, c], // blueish
    [c, 0, x]  //purpleish
  ];

  const rgb_dash = values[Math.floor(h_dash)];
  const lightness_additive = l - (c / 2);
  return rgb_dash.map(value => (value + lightness_additive) * 255);
}

export function rgbToHex(r, g, b) {
  const toHex = x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hslToHex(h, s, l) {
  const rgb = hslToRgb(h, s, l);
  const [r, g, b] = rgb;
  return rgbToHex(r, g, b);
}
