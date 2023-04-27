import { useEffect } from 'react'
import Spinner from '../../layout/Spinner'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useSelector, useDispatch } from 'react-redux'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
function TenGameOChart() {
  const { playerStats } = useSelector((state) => state.player)

  const lastTen = playerStats.slice(playerStats.length - 10, playerStats.length)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Performance Tracking: Last Ten Games',
        size: 'large',
      },
    },
  }
  const labels = lastTen.map((g) => '')
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Points',
        data: lastTen.map((g) => g.points),
        borderColor: '#3DBFF2',
        backgroundColor: '#2D3540',
      },
      {
        label: 'Assists',
        data: lastTen.map((g) => g.assists),
        borderColor: '#32D99C',
        backgroundColor: '#2D3540',
      },
      {
        label: 'Rebounds',
        data: lastTen.map((g) => g.totReb),
        borderColor: '#F2B138',
        backgroundColor: '#2D3540',
      },
    ],
  }

  return (
    <Line
      data={data}
      options={options}
    />
  )
}

export default TenGameOChart
