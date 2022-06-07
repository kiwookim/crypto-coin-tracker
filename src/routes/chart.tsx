import { useQuery } from 'react-query';
import { useOutletContext, useParams } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ReactApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}
interface IDataTypes {
  time_open: string,
  time_close: string,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
  market_cap: number
}

function Chart () {
  // const {coinId} = useOutletContext<ChartProps>();
  const {coinId} = useParams();
  console.log(coinId);
  const {isLoading, data} = useQuery<IDataTypes[]>(['ohlc', coinId], () => fetchCoinHistory(coinId as string));
  
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          series={[
            {
            data: data?.map((price) => {
            return{
              x: price.time_close,
              y: [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)]
            }
            })
            },
            ] as any}
          
          type = 'candlestick'
          options = {{
            grid: {show: true},
            xaxis: {
              type: 'datetime',
              labels: {show:false},
              axisBorder: { show: false },
              axisTicks: { show: false }
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            theme: {
              mode: 'dark',
            },
            chart: {
              toolbar: {
                show: false
              },
              background: 'rgba(0, 0, 0, 0.5)'
            }          
          }}
          
        />
      )}
    </div>
  );
}



export default Chart;