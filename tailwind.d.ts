declare module "tailwindcss/lib/util/flattenColorPalette" {
  const flattenColorPalette: (colors: object) => { [key: string]: string };
  export default flattenColorPalette;
}

declare module "mini-svg-data-uri" {
  const svgToDataUri: (svg: string) => string;
  export default svgToDataUri;
}
