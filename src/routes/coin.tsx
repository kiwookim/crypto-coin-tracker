import { useEffect,useState } from 'react';
import { Outlet, Routes, Route, useParams ,useLocation, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import Chart from './chart';
import Price from './price';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import { stringify } from 'querystring';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { hover } from '@testing-library/user-event/dist/hover';


const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${props => props.theme.genericColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 15px;
  max-width: 500px;
  margin: auto;
`;


const Header = styled.header`
  height: 12vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 42px 0;
`;

const Title = styled.h1`
  color : ${props => props.theme.accentColor};
  font-size: 40px;
  text-align: center;
`;

const HomeIcon = styled.span`
  font-size: 34px;
  color: ${props => props.theme.accentColor};
  &:hover {
    color: black;
    transition: color 0.3s ease-in;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.genericColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  line-height: 1.5;
`;


interface IRouterState {
  name: string;
}


interface IInfoData {
  id:string;
  name:string;
  symbol:  string;
  rank:  number;
  is_new:  boolean;
  is_active:  boolean;
  type:  string;
  description:  string;
  message:  string;
  open_source:  boolean;
  started_at:  string;
  development_status:  string;
  hardware_wallet:  boolean;
  proof_type:  string;
  org_structure:  string;
  hash_algorithm:  string;
  first_data_at:  string;
  last_data_at:  string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}


function Coin () {
  const {coinId} = useParams<{coinId:string}>();
  const location = useLocation();
  const name = location.state as IRouterState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const {isLoading : infoLoading, data: infoData} = useQuery(['info',coinId], ()=> fetchCoinInfo(coinId ? coinId : ""), {
    refetchInterval: 5000
  });
  const {isLoading: tickerLoading,data: tickerData} = useQuery(['tickers',coinId], ()=> fetchCoinTickers(coinId ? coinId : ""),{
    refetchInterval: 5000
  });
  const loading = infoLoading || tickerLoading;


  return (
    <Container>
      <Helmet>
        <title>{name?.name ? name.name : loading ? "Loading..." : infoData?.name}</title>
      </Helmet>
      <Header>
        <Link to='/'>
          <HomeIcon>  
            <FontAwesomeIcon icon={faHome}/> 
          </HomeIcon>
        </Link>
        <Title>
          {name?.name ? name.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickerData.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Outlet context = {{coinId}}/>
        </>
      )}
    </Container>
  );
}

export default Coin;