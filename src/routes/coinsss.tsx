import { Link } from 'react-router-dom';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { ReactDOM } from 'react';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';


const Container = styled.div`
  padding: 0px 15px;
  max-width: 500px;
  margin: auto;
`;


const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const Image = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;


const Title = styled.h1`
  color : ${props => props.theme.accentColor};
  font-size: 48px;
`;


const CoinList = styled.ul`
  margin-top: 20px;
`;


const Coin = styled.li`
  background-color: ${props => props.theme.genericColor};
  margin-bottom: 8px;
  border-radius: 12px;
  a {
    transition: color 0.3s ease-in;
    display: flex;
    padding: 15px;
    align-items: center;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;


interface CoinInterface {
    id:string,
    name:string,
    symbol:string,
    rank:number,
    is_new:boolean,
    is_active:boolean,
    type:string
}


function Coinsss () {
  const {isLoading, data} = useQuery<CoinInterface[]>('allCoins', fetchCoins);


  return (
    <Container>
      <Helmet>
        <title>Crypto Coin Tracker</title>
      </Helmet>
      <Header>
        <Title>Crypto Coin Tracker</Title>
      </Header>
      <CoinList>
        {data?.slice(0,100).map((coin)=>
          <Coin key= {coin.id}>
            <Link to = {`/${coin.id}`} state = {{name: coin.name}}>
              <Image src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="coin-image" />
              {coin.name} &rarr;
            </Link>
          </Coin>
        )}
      </CoinList>
    </Container>
    );
}

export default Coinsss;