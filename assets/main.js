import Alpine from 'alpinejs'
import { injectSpeedInsights } from '@vercel/speed-insights';

injectSpeedInsights();

window.Alpine = Alpine

Alpine.start()