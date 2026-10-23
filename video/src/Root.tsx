import { Composition } from "remotion";
import { Cegbemutato, DURATION } from "./Cegbemutato";

// 21:9, mert a főoldali videóhely is ilyen arányú (aspect-[21/9]).
export const RemotionRoot = () => (
  <Composition
    id="Cegbemutato"
    component={Cegbemutato}
    durationInFrames={DURATION}
    fps={30}
    width={2240}
    height={960}
  />
);
