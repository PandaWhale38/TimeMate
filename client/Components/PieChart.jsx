import React, {Fragment, Component, useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({user}) => {
const [chartData, setChartData] = useState({})
// WHY!
useEffect(() => {
allData();
}, []);

const  allData = async () => {  
    try {
        const body = {
            emp_location: user.emp_location
        }
        const response = await fetch(`http://localhost:8080/data`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const json = await response.json() 
        console.log('response data from backend', json);
        setChartData(json)
    }
     catch (err) {
      console.log(err);
    }
}

console.log("IAM CHARDATA",chartData)
 

const data = {
  labels: ['Wages', 'Remaining Budget'],
  datasets: [
    {
      label: '% of budget',
      data: [chartData.spent, chartData.budget - chartData.spent],
      backgroundColor: [
        'rgba(249, 126, 81, 1)',
        'rgba(252, 215, 158, 1)',
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(252, 215, 158, 1)',
      ],
      borderWidth: 1,
    },
  ],
};


  return( 
  <Fragment>

    <div className='col-md-3  '>   
  <h1>Wages vs Budget</h1>

  <Doughnut 
  data={data} 
  options = {{
      interaction: {

          mode: 'index'
        }}}
        />
        </div>
  </Fragment>
  
  );

}

export default PieChart;
