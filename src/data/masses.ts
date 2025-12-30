import massesByDateRaw from './masses.json' assert { type: 'json' };

import type { MassesByDate } from '../types/mass';

// Cast để có type checking
export const massesByDate = massesByDateRaw as MassesByDate;