import { Composition } from "remotion";
import { Cegbemutato, DURATION } from "./Cegbemutato";

// 21:9, mert a főoldali videóhely is ilyen arányú (aspect-[21/9]).
// Két kompozíció, ugyanaz a felépítés: magyar és angol szöveggel.
export const RemotionRoot = () => (
  <>
    <Composition
      id="Cegbemutato"
      component={Cegbemutato}
      defaultProps={{ lang: "hu" as const }}
      durationInFrames={DURATION}
      fps={30}
      width={2240}
      height={960}
    />
    <Composition
      id="IntroEn"
      component={Cegbemutato}
      defaultProps={{ lang: "en" as const }}
      durationInFrames={DURATION}
      fps={30}
      width={2240}
      height={960}
    />
  </>
);
