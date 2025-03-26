import Alpine from 'alpinejs'
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from "@vercel/analytics"

injectSpeedInsights();
inject();

window.Alpine = Alpine

Alpine.start()