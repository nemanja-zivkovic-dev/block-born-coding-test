export * from './lib/shared-types';

interface Response<T> {
  success: boolean;
  message: null | unknown; // not sure about the type of shape of the message
  data: T;
}

interface Player {
  meta: string;
  value: string;
}

interface LeaderboardResult {
  player: Player;
  wallet: string;
  wins: number;
  losses: number;
  points: number;
  rank: number;
}

interface ColumnBase {
  title: string;
  key: string;
}

// example of specific columns as I've seen some additional fields in the response
interface PlayerColumn extends ColumnBase {
  meta: boolean;
}

export type GetLeaderboardResults = {
  results: LeaderboardResult[];
  columns: ColumnBase[];
};

export type GetLeaderboardResultsRaw = Response<GetLeaderboardResults>;
