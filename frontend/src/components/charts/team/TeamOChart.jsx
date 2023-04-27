import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTeamStats } from '../../../features/team/teamSlice'
import Spinner from '../../layout/Spinner'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import teamService from '../../../features/team/teamService'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function TeamOChart() {
  const { teamStats } = useSelector((state) => state.team)

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Year to Year: Offensive Performance',
      },
    },
  }

  const labels = [
    '2018/2019',
    '2019/2020',
    '2020/2021',
    '2021/2022',
    '2022/2023',
  ]

  const data = {
    labels,
    datasets: [
      {
        label: 'Points',
        data: teamStats.map((y) => y.response[0].points),
        backgroundColor: '#3DBFF2',
      },
      {
        label: 'FG%',
        data: teamStats.map(
          (y) => (Number(y.response[0].fgp) / 100) * y.response[0].points
        ),
        backgroundColor: '#F2B138',
      },
      {
        label: 'Assists',
        data: teamStats.map((y) => y.response[0].assists),
        backgroundColor: '#32D99C',
      },
      {
        label: 'Turnovers',
        data: teamStats.map((y) => y.response[0].turnovers),
        backgroundColor: '#F53F4B',
      },
    ],
  }

  return (
    <div>
      {teamStats.length > 0 ? (
        <Bar
          options={options}
          data={data}
        />
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default TeamOChart
