import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setCodec("h264");
Config.setCrf(20);
// bt709 + yuv420p: így a böngészők ugyanazt a színt mutatják, mint az oldal
// (a teljes tartományú alapbeállítással a háttér kifehéredett).
Config.setColorSpace("bt709");
Config.setPixelFormat("yuv420p");
// Csak a CI/felhő-konténerben: a már telepített Chromiumot használjuk letöltés helyett.
if (process.env.REMOTION_CHROMIUM) {
  Config.setBrowserExecutable(process.env.REMOTION_CHROMIUM);
}
