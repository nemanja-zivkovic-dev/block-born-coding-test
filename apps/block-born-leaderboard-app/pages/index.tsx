import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useEffect, useRef, useState } from 'react';
import 'antd/dist/antd.css';

import type { GetLeaderboardResults } from '@block-born-coding-test/shared-types';
import { Divider, Select, Table, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
  StyledActions,
  StyledContent,
  StyledFooter,
  StyledHeader,
  StyledImage,
  StyledLayout,
  StyledMeta,
  StyledRank,
  StyledSelect,
  StyledWapper,
} from './index.styled';

export function Index({
  initialLeaderboardData,
  initialWeek,
  initialLeague,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [leaderboardData, setLeaderboardData] = useState(
    initialLeaderboardData
  );
  const [selectedWeek, setSelectedWeek] = useState(initialWeek);
  const [selectedLeague, setSelectedLeague] = useState(initialLeague);
  const firstRender = useRef(true);

  useEffect(() => {
    // No need for fetch on initial render as we passed the data from the SSR
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    fetch(
      `http://localhost:3333/api/leaderboard?week=${selectedWeek}&league=${selectedLeague}`
    )
      .then((res) => res.json())
      .then((res) => {
        setLeaderboardData(res);
        // Persist the query params change to the URL so it can be bookmarked or shared with someone
        router.push(
          { query: { week: selectedWeek, league: selectedLeague } },
          undefined,
          { shallow: true }
        );
      });
  }, [selectedWeek, selectedLeague, firstRender]);

  const dataSource = useMemo(
    () =>
      leaderboardData.results.map(({ rank, player, wins, losses, wallet }) => ({
        rank: <StyledRank>#{rank}</StyledRank>,
        player: (
          <>
            <b>{player.value}</b>
            <StyledMeta>{player.meta}</StyledMeta>
          </>
        ),
        wins,
        losses,
        key: wallet,
      })),
    [leaderboardData]
  );

  const columns = useMemo(
    () =>
      leaderboardData.columns
        // Not sure if I should show the "wallet" in the table - leaving it out
        .filter((col) => col.key !== 'wallet')
        .map((col) => ({
          dataIndex: col.key,
          width: col.key === 'rank' ? '3rem' : 'auto',
          ...col,
        })),
    [leaderboardData]
  );

  return (
    <StyledLayout>
      <StyledHeader>
        <img src="/assets/logo.svg" alt="Block Born logo" />
      </StyledHeader>
      <StyledContent>
        <StyledWapper>
          <StyledImage
            src="https://storage.googleapis.com/block-born-prod/projects/content/1658925370974.png"
            alt="Tezotopia"
          />
          <Typography.Title level={4} style={{ margin: 0 }}>
            Leaderboard
          </Typography.Title>
          <StyledActions>
            <StyledSelect
              value={selectedWeek}
              size="large"
              onChange={setSelectedWeek}
            >
              <Select.Option value={1}>Week 1</Select.Option>
              <Select.Option value={2}>Week 2</Select.Option>
              <Select.Option value={3}>Week 3</Select.Option>
              <Select.Option value={4}>Week 4</Select.Option>
            </StyledSelect>

            <StyledSelect
              value={selectedLeague}
              size="large"
              onChange={setSelectedLeague}
            >
              <Select.Option value={1}>League 1</Select.Option>
              <Select.Option value={2}>League 2</Select.Option>
            </StyledSelect>
          </StyledActions>
        </StyledWapper>

        <Divider />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ showSizeChanger: false }}
        />
      </StyledContent>
      <StyledFooter>
        © Copyright Block Born, ${new Date().getFullYear()}. All rights
        reserved.
      </StyledFooter>
    </StyledLayout>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const week = Number(query.week ?? 1);
  const league = Number(query.league ?? 1);

  const data = await fetch(
    `http://localhost:3333/api/leaderboard?league=${league}&week=${week}`
  )
    .then((res) => res.json())
    .then((res: GetLeaderboardResults) => res);

  return {
    props: {
      initialLeaderboardData: data,
      initialWeek: week,
      initialLeague: league,
    },
  };
}

export default Index;
