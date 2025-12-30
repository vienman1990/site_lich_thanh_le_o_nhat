export type Mass = {
  time: string;
  title: string;
  celebrant?: string | null;
};

export type MassesByDate = Record<string, Mass[]>;