<<<<<<< HEAD
import Fireflies from '@/components/firefly/firefly'
=======
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'

import { Line } from 'react-chartjs-2'
// import test from '../data/test.json'

Chart.register(CategoryScale)
>>>>>>> mei

export default function Test() {
  // const datas = test.users
  // labels: datas.map((data) => data.year)
  // datas.map((data) => data.userGain)
  const data = {
    labels: ['Wed', 'ff', 'gg', 'gg', 'hh', 'jj', '88'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const options = {}

  return (
    <>
<<<<<<< HEAD
      <Fireflies></Fireflies>
=======
      <div className="container">
        <Line data={data} options={options}></Line>
      </div>
>>>>>>> mei
    </>
  )
}
