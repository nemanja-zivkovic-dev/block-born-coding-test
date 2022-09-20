import { Layout, Select } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import styled from 'styled-components';

export const StyledLayout = styled(Layout)`
  height: 100vh;
`;

export const StyledHeader = styled(Header)`
  background-color: rgb(29, 29, 27);
  font-size: 28px;
  font-weight: bold;
  padding-left: 2rem;
  text-transform: uppercase;
`;

export const StyledContent = styled(Content)`
  overflow: auto;
  padding-top: 2rem;
  @media (min-width: 700px) {
    padding: 2rem;
  }
`;

export const StyledWapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledActions = styled.div`
  margin-left: auto;

  > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const StyledImage = styled.img`
  width: auto;
  height: 3rem;
  margin: 0 1rem;
`;

export const StyledFooter = styled(Footer)`
  background-color: rgb(29, 29, 27);
  text-align: center;

  color: rgb(255, 255, 255);
`;

export const StyledSelect = styled(Select)`
  color: #4d4646;
`;

export const StyledRank = styled.span`
  background-color: rgb(82 232 1);
  border-radius: 5px;
  padding: 4px 4px 2px;
  width: 40px;
  display: inline-block;
  text-align: center;
`;

export const StyledMeta = styled.span`
  color: gray;
  margin-left: 0.4rem;
  font-size: 12px;
`;
