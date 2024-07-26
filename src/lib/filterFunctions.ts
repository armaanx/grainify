//@ts-nocheck
import {
  amaro,
  ashby,
  ginza,
  hefe,
  inkwell,
  juno,
  kelvin,
  lofi,
  maven,
  moon,
  rise,
  skyline,
  sutro,
  walden,
  xpro2,
  year1977,
} from "instagram-filters";

import {
  brightness,
  colorFilter,
  contrast,
  rgbAdjust,
  saturation,
  sepia,
} from "instagram-filters/lib/filters";

import { pipe } from "instagram-filters/lib/utils/pipe";

const polaroidSX70 = () =>
  pipe(
    colorFilter([255, 240, 220, 0.1]),
    //contrast(0.1),
    saturation(-0.1)
    //brightness(0.05)
  );

const kodakPortra400 = () =>
  pipe(
    colorFilter([255, 230, 210, 0.07]),
    saturation(-0.05),
    //contrast(0.05),
    rgbAdjust([1.05, 1, 0.95])
  );

const fujiSuperia400 = () =>
  pipe(
    colorFilter([220, 255, 245, 0.05]),
    saturation(0.1),
    //contrast(0.05),
    rgbAdjust([0.95, 1.05, 1.05])
  );

const kodakTriX = () => pipe(contrast(0.2), brightness(0.05), saturation(-1));

const polaroid600 = () =>
  pipe(
    colorFilter([200, 255, 255, 0.1]),
    //contrast(0.15),
    saturation(0.05)
    //brightness(0.05)
  );

const lomoColorNegative400 = () =>
  pipe(saturation(0.2), colorFilter([255, 220, 180, 0.05]));

const ilfordHP5Plus = () => pipe(brightness(0.05), saturation(-1));

const kodakGold200 = () =>
  pipe(
    colorFilter([255, 230, 180, 0.1]),
    saturation(0.1),
    contrast(0.05),
    brightness(0.05)
  );

const kodakFunSaver = () =>
  pipe(
    colorFilter([255, 235, 190, 0.1]), // Warm, slightly yellow cast
    //contrast(0.1),
    saturation(0.2),
    brightness(0.05),
    rgbAdjust([1.05, 1, 0.95]) // Enhance reds slightly
  );

const fujiQuickSnap = () =>
  pipe(
    colorFilter([220, 255, 220, 0.08]), // Slight green tint
    //contrast(0.1),
    saturation(0.15),
    brightness(0.05),
    rgbAdjust([0.95, 1.05, 1]) // Enhance greens slightly
  );

const agfaVista400 = () =>
  pipe(
    colorFilter([240, 255, 240, 0.1]), // Green tint in shadows
    contrast(0.1),
    saturation(0.1),
    brightness(-0.05),
    rgbAdjust([0.95, 1.05, 0.95]) // Enhance greens, reduce reds and blues
  );

const kodakUltraMax400 = () =>
  pipe(
    colorFilter([255, 230, 200, 0.1]), // Warm cast
    //contrast(0.05),
    saturation(0.2),
    brightness(0.05),
    rgbAdjust([1.1, 1, 0.9]) // Strong red emphasis, slight blue reduction
  );

const lomographyColor100 = () =>
  pipe(
    colorFilter([255, 220, 180, 0.15]), // Strong warm cast
    //contrast(0.08),
    saturation(0.35),
    //brightness(0.05),
    rgbAdjust([1.1, 1.05, 0.9]) // Enhance reds and greens, reduce blues
  );

const fujifilmIndustrial100 = () =>
  pipe(
    colorFilter([200, 255, 255, 0.1]), // Cool, cyan cast
    //contrast(0.05),
    saturation(-0.05),
    //brightness(0.05),
    rgbAdjust([0.9, 1, 1.1]) // Enhance blues, reduce reds
  );

const kodakGold200Warm = () =>
  pipe(
    colorFilter([255, 220, 180, 0.15]), // Stronger warm cast than original
    //contrast(0.08),
    saturation(0.2),
    //brightness(0.1),
    rgbAdjust([1.15, 1.05, 0.9]) // Strong red and slight green emphasis, reduce blues
  );

const fujiSuperiaXTra400 = () =>
  pipe(
    colorFilter([240, 255, 240, 0.08]), // Slight green tint
    //contrast(0.09),
    saturation(0.25),
    brightness(0.05),
    rgbAdjust([0.95, 1.1, 1.05]) // Enhance greens and blues
  );

const kodakEktachrome100 = () =>
  pipe(
    colorFilter([240, 240, 255, 0.05]), // Slight cool cast
    //contrast(0.08),
    saturation(0.15),
    brightness(0.05),
    rgbAdjust([1, 1, 1.1]) // Slight blue emphasis
  );

const polaroidOriginals = () =>
  pipe(
    colorFilter([255, 240, 220, 0.2]), // Strong warm cast
    //contrast(0.09),
    saturation(0.1),
    //brightness(0.15),
    rgbAdjust([1.1, 1, 0.9]) // Enhance reds, reduce blues
  );

const disposableSummer = () =>
  pipe(
    colorFilter([255, 235, 180, 0.15]), // Warm, sunny cast
    //contrast(0.09),
    saturation(0.3),
    brightness(0.05),
    rgbAdjust([1.1, 1.05, 0.9]) // Enhance reds and greens, reduce blues for a summery feel
  );

const vintagePostcard = () =>
  pipe(
    sepia(0.3),
    colorFilter([255, 240, 220, 0.1]), // Slight warm cast
    //contrast(0.08),
    saturation(-0.2),
    brightness(0.05)
  );

const fauxInfrared = () =>
  pipe(
    colorFilter([255, 0, 150, 0.2]), // Strong magenta cast
    //contrast(0.1),
    saturation(-0.5),
    brightness(0.05),
    rgbAdjust([1.2, 0.8, 1]) // Enhance reds, reduce greens for faux infrared look
  );

const crossProcessed = () =>
  pipe(
    colorFilter([0, 255, 255, 0.15]), // Cyan cast
    //contrast(0.1),
    saturation(0.4),
    brightness(0.05),
    rgbAdjust([0.9, 1.1, 1.1]) // Enhance greens and blues, reduce reds
  );

const faded70s = () =>
  pipe(
    colorFilter([255, 200, 150, 0.15]), // Warm, slightly orange cast
    contrast(-0.1),
    saturation(-0.1),
    brightness(0.07),
    rgbAdjust([1.1, 1, 0.9]) // Enhance reds, reduce blues
  );

const vintageChrome = () =>
  pipe(
    colorFilter([255, 240, 220, 0.1]), // Slight warm cast
    //contrast(0.1),
    saturation(0.1),
    brightness(0.05),
    rgbAdjust([1.05, 1, 0.95]) // Slight red emphasis, reduced blues
  );

const lomofi = () =>
  pipe(
    colorFilter([255, 220, 180, 0.1]), // Warm cast
    //contrast(0.1),
    saturation(0.5),
    brightness(0.05),
    rgbAdjust([1.1, 1.1, 0.9]) // Enhance reds and greens, reduce blues
  );

const cinematic80s = () =>
  pipe(
    colorFilter([50, 130, 255, 0.1]), // Blue cast
    //contrast(0.1),
    saturation(0.1),
    brightness(-0.05),
    rgbAdjust([0.9, 1, 1.2]) // Enhance blues, reduce reds
  );

const goldenHours = () =>
  pipe(
    colorFilter([255, 200, 110, 0.2]), // Strong golden cast
    //contrast(0.07),
    saturation(0.1),
    //brightness(0.05),
    rgbAdjust([1.1, 1, 0.8]) // Enhance reds, reduce blues
  );

const vintageNoir = () =>
  pipe(
    colorFilter([200, 180, 160, 0.1]), // Slight sepia tone
    //contrast(0.1),
    saturation(-0.8), // Near black and white
    brightness(-0.07),
    rgbAdjust([1.1, 1, 0.9]) // Slight warmth
  );

const disposableGreenYellow = () =>
  pipe(
    colorFilter([245, 255, 230, 0.1]), // Slight yellow-green tint
    rgbAdjust([1, 1.1, 0.9]), // Increase green, decrease blue
    contrast(0.05),
    saturation(-0.1),
    brightness(-0.05), // Slightly darker for that disposable camera feel
    colorFilter([20, 255, 20, 0.05]), // Add a touch more green
    colorFilter([255, 255, 20, 0.05]) // And a touch of yellow
  );

const filterFunctions = [
  polaroidSX70,
  polaroid600,
  lomoColorNegative400,
  ilfordHP5Plus,
  kodakGold200,
  kodakPortra400,
  fujiSuperia400,
  kodakTriX,
  kodakFunSaver,
  fujiQuickSnap,
  agfaVista400,
  kodakUltraMax400,
  lomographyColor100,
  fujifilmIndustrial100,
  kodakGold200Warm,
  fujiSuperiaXTra400,
  kodakEktachrome100,
  polaroidOriginals,
  disposableSummer,
  vintagePostcard,
  fauxInfrared,
  crossProcessed,
  faded70s,
  vintageChrome,
  lomofi,
  cinematic80s,
  goldenHours,
  vintageNoir,
  disposableGreenYellow,
  inkwell,
  moon,
  juno,
  ashby,
  amaro,
  ginza,
  hefe,
  kelvin,
  lofi,
  maven,
  rise,
  skyline,
  walden,
  year1977,
  sutro,
  xpro2,
];

const filters = [
  { name: "PolaroidSX70", function: filterFunctions[0] },
  { name: "Polaroid600", function: filterFunctions[1] },
  { name: "LomoColorNegative400", function: filterFunctions[2] },
  { name: "IlfordHP5Plus", function: filterFunctions[3] },
  { name: "KodakGold200", function: filterFunctions[4] },
  { name: "KodakPortra400", function: filterFunctions[5] },
  { name: "FujiSuperia400", function: filterFunctions[6] },
  { name: "KodakTriX", function: filterFunctions[7] },
  { name: "KodakFunSaver", function: filterFunctions[8] },
  { name: "FujiQuickSnap", function: filterFunctions[9] },
  { name: "AgfaVista400", function: filterFunctions[10] },
  { name: "KodakUltraMax400", function: filterFunctions[11] },
  { name: "LomographyColor100", function: filterFunctions[12] },
  { name: "FujifilmIndustrial100", function: filterFunctions[13] },
  { name: "KodakGold200Warm", function: filterFunctions[14] },
  { name: "FujiSuperiaXTra400", function: filterFunctions[15] },
  { name: "KodakEktachrome100", function: filterFunctions[16] },
  { name: "PolaroidOriginals", function: filterFunctions[17] },
  { name: "DisposableSummer", function: filterFunctions[18] },
  { name: "VintagePostcard", function: filterFunctions[19] },
  { name: "FauxInfrared", function: filterFunctions[20] },
  { name: "CrossProcessed", function: filterFunctions[21] },
  { name: "Faded70s", function: filterFunctions[22] },
  { name: "VintageChrome", function: filterFunctions[23] },
  { name: "Lomofi", function: filterFunctions[24] },
  { name: "Cinematic80s", function: filterFunctions[25] },
  { name: "GoldenHours", function: filterFunctions[26] },
  { name: "VintageNoir", function: filterFunctions[27] },
  { name: "FallenAngel", function: filterFunctions[28] },
  { name: "NoirClassic", function: filterFunctions[29] },
  { name: "Mono", function: filterFunctions[30] },
  { name: "SuperColor", function: filterFunctions[31] },
  { name: "GoldenEra", function: filterFunctions[32] },
  { name: "Spotlight80", function: filterFunctions[33] },
  { name: "GoldenSun", function: filterFunctions[34] },
  { name: "HighContrast", function: filterFunctions[35] },
  { name: "RadiantHeat", function: filterFunctions[36] },
  { name: "Technicolor", function: filterFunctions[37] },
  { name: "Sunset", function: filterFunctions[38] },
  { name: "Rise", function: filterFunctions[39] },
  { name: "BrightLights", function: filterFunctions[40] },
  { name: "SunnyGlow", function: filterFunctions[41] },
  { name: "1977", function: filterFunctions[42] },
  { name: "BurntEdge", function: filterFunctions[43] },
  { name: "X-Pro", function: filterFunctions[44] },
];

export default filters;
