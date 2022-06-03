import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexChart from "react-apexcharts";

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
  const {coinId} = useOutletContext<ChartProps>();
  const {isLoading, data} = useQuery<IDataTypes[]>(['ohlc', coinId], () => fetchCoinHistory(coinId));
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[{data: [0,1,2,3,4], name:'ki'}]}
          options={{
      
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
            },
          }}
        />
      )}
    </div>
  );
}



export default Chart;