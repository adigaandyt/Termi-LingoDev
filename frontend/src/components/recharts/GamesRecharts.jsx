import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useSelector} from 'react-redux'


const data = [
    {
      name: 'Game A',
      GuessTheTerm: 5,
      TransMe: 2,
      // amt: 2400,
    },
    {
      name: 'Game B',
      GuessTheTerm: 3,
      TransMe: 1,
      // amt: 2210,
    },
    {
      name: 'Game C',
      GuessTheTerm: 2,
      TransMe: 9,
      // amt: 2290,
    },
    {
      name: 'Game D',
      GuessTheTerm: 2,
      TransMe: 3,
      // amt: 2000,
    },
    {
      name: 'Game E',
      GuessTheTerm: 1,
      TransMe: 4,
      // amt: 2181,
    },
    {
      name: 'Game F',
      GuessTheTerm: 2,
      TransMe: 3,
      // amt: 2500,
    },
    {
      name: 'Game G',
      GuessTheTerm: 3,
      TransMe: 4,
      // amt: 2100,
    },
  ];
  
  function GamesRecharts (){
    const {GamesRechartData} =useSelector(state=>state.auth)


 
    return(<>
        <div dir='ltr' className=" mt-3 text-center " style={{"margin":"auto"}}>
        <ResponsiveContainer width="100%" aspect={2} >
        <LineChart
          width={500}
          height={300}
          data={GamesRechartData}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}

        >
          {/* <CartesianGrid strokeDasharray="3 10" /> */}
          <XAxis dataKey="name" />
          <YAxis scale="pow" exponent={0} domain={[0, 10]}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" strokeWidth={5} dataKey="TransMe" stroke="#8884d8" activeDot={{ r: 1 }} />
          <Line type="monotone" strokeWidth={5} dataKey="GuessTheTerm" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
        </div>
    </>)
}
export default GamesRecharts
