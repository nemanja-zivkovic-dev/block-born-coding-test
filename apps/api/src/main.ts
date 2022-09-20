import * as express from 'express';
import * as cors from 'cors';
import axios from 'axios';

import type { GetLeaderboardResultsRaw } from '@block-born-coding-test/shared-types';

const app = express();
app.use(cors());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api ziko!' });
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const week = req.query.week || 1;
    const league = req.query.league || 1;
    const response = await axios.get<GetLeaderboardResultsRaw>(
      `https://api.blockborn.gg/api/games/tezotopia/leaderboard?league=${league}&week=${week}`,
      {
        headers: {
          ['x-api-key']: 'ab0c0aa0-7923-439f-a03a-282db91612a6',
        },
      }
    );

    res.send(response.data.data);
  } catch (err) {
    res.send({ error: 'errors.somethingWentWrong' }); // just a placeholder for error handling
  }
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
