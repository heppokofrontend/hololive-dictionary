import { hololiveEnGen1 } from "./gen1";
import { hololiveEnGen1_5 } from "./gen1.5";
import { hololiveEnGen2 } from "./gen2";

export const hololiveEn: LiverData[] = [
  ...hololiveEnGen1,
  ...hololiveEnGen1_5,
  ...hololiveEnGen2,
];
