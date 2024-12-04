import { hololiveDevIsFlowGlow } from './flowglow';
import { hololiveDevIsReGLOSS } from './regloss';

export const hololiveDevIs: LiverData[] = [...hololiveDevIsReGLOSS, ...hololiveDevIsFlowGlow];
