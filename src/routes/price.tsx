import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinTickers } from '../api';
import styled, {keyframes} from 'styled-components';


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

const Animation = keyframes`
  0% {
    transform: none;
    opacity: 0;
  }
  1% {
    transform: translateY(-5px);
    opacity: 0;
  }
  100% {
    transform: none;
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  main:first-child {
    animation-delay: 0.2s;
  }
  main:nth-child(2) {
    animation-delay: 0.4s;
  }
  main:nth-child(3) {
    animation-delay: 0.6s;
  }
  main:nth-child(4) {
    animation-delay: 0.8s;
  }
  main:nth-child(5) {
    animation-delay: 1s;
  }
  main:last-child {
    animation-delay: 1.2s;
  }
`;

const Overview = styled.main`
  width: 100%;
  height: 50px;
  background-color: ${props => props.theme.genericColor};
  border: 1.5px solid ${props => props.theme.genericColor};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  margin: 10px 0;
  padding: 20px;
  transform: translateY(-5px);
  opacity: 0;
  animation: ${Animation} 0.5s linear forwards;
`;


const PriceItem = styled.div`
  width: 100%;
`;
const SectionTitle = styled.h3`
  width: 50%;
  color: ${props => props.theme.textColor};
  font-size: 12px;
  font-weight: 600;
`;
const NumberText = styled.h3<{ isPositive?: Boolean }>`
  font-size: 20px;
  font-weight: 900px;
  color: ${(props) => (props.isPositive ?  'darkgreen' : "	firebrick")};
`;

function checkForPositive(value: number | undefined) {
  if (value) {
    return value > 0;
  }
}
function Price () {
  const {coinId} = useParams();
  const {isLoading, data} = useQuery<PriceData>(['prices',coinId], () => fetchCoinTickers(coinId as string), {refetchInterval: 5000});
  
return(
  <Container>
    {isLoading ? 'Loading Price....' : (
      <>
        <Overview>
          <SectionTitle>All Time High : </SectionTitle>
          <NumberText isPositive={true}>${data?.quotes.USD.ath_price.toFixed(3)}</NumberText>
        </Overview>

        <Overview>
          <SectionTitle>Change from All Time High : </SectionTitle>
          <NumberText isPositive={checkForPositive(data?.quotes.USD.percent_from_price_ath)}>{data?.quotes.USD.percent_from_price_ath.toFixed(3)} %</NumberText>
        </Overview>

        <Overview>
          <SectionTitle>Change in the last 24 hours : </SectionTitle>
          <NumberText isPositive={checkForPositive(data?.quotes.USD.percent_change_24h)}>{data?.quotes.USD.percent_change_24h.toFixed(3)} %</NumberText>
        </Overview>

        <Overview>
          <SectionTitle>Change in the last 7 days : </SectionTitle>
          <NumberText isPositive={checkForPositive(data?.quotes.USD.percent_change_7d)}>{data?.quotes.USD.percent_change_7d.toFixed(3)} %</NumberText>
        </Overview>

        <Overview>
          <SectionTitle>Change in the last 30 days : </SectionTitle>
          <NumberText isPositive={checkForPositive(data?.quotes.USD.percent_change_30d)}>{data?.quotes.USD.percent_change_30d.toFixed(3)} %</NumberText>
        </Overview>

        <Overview>
          <SectionTitle>Change in the last year : </SectionTitle>
          <NumberText isPositive={checkForPositive(data?.quotes.USD.percent_change_1y)}>{data?.quotes.USD.percent_change_1y.toFixed(3)} %</NumberText>
        </Overview>
      </>
    )}



  </Container>
)
}



export default Price;
