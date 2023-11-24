import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import  ApexChart from "react-apexcharts";
import { IHistorical } from "./Chart";

interface IpriceProps {
  coinId: string,
}

function Price({coinId}: IpriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
  fetchCoinHistory(coinId),
  {
    refetchInterval: 10000,
  }
);
  return (
    <div>
      {isLoading ? (
      "Loading chart..."
    ) : (
      <ApexChart 
        type="candlestick"
        series={[
            {
              name: "Price",
              data:
                  data?.map((price) => ({
                    x: new Date(1538884800000),
                    y: [6604.98, 6606, 6604.07, 6606]
                  })) ?? [],
            },
          ]}
        options= {{
        chart: {
          type: 'candlestick',
          height: 350
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }}
    />
    )}
    </div>
  )
}

export default Price;

