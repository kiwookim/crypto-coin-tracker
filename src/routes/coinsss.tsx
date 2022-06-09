import { Link } from 'react-router-dom';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { ReactDOM } from 'react';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atom';


const Container = styled.div`
  padding: 0px 15px;
  max-width: 500px;
  margin: auto;
`;


const Header = styled.header`
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px;
`;

const Image = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;


const Title = styled.h1`
  color : ${props => props.theme.accentColor};
  font-size: 48px;
  margin-bottom: 5px;
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

const ThemeIcon = styled.span`
  font-size: 20px;
  margin-top: 4px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: transform 0.3s ease-in;
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
  const setisDark = useSetRecoilState(isDarkAtom);
  const toggleBtn = ()=> setisDark(current => !current);


  return (
    <Container>
      <Helmet>
        <title>Crypto Coin Tracker</title>
      </Helmet>
      <Header>
        <Title>Crypto Coin Tracker</Title>
        <ThemeIcon>
            <FontAwesomeIcon icon={faCircleHalfStroke} onClick={toggleBtn}/>
        </ThemeIcon>
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