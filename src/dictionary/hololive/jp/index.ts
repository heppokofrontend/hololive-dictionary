import { hololiveJpGamers } from "./gamers";
import { hololiveJpGen0 } from "./gen0";
import { hololiveJpGen1 } from "./gen1";
import { hololiveJpGen2 } from "./gen2";
import { hololiveJpGen3 } from "./gen3";
import { hololiveJpGen4 } from "./gen4";
import { hololiveJpGen5 } from "./gen5";

export const hololiveJp: LiverData[] = [
  ...hololiveJpGen0,
  ...hololiveJpGen1,
  ...hololiveJpGen2,
  ...hololiveJpGamers,
  ...hololiveJpGen3,
  ...hololiveJpGen4,
  ...hololiveJpGen5,
];
