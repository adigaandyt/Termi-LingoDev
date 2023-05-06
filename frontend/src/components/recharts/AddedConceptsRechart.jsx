import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,ResponsiveContainer } from 'recharts';
import { getDataForConceptsAddedRechart } from '../../features/conceptsProfile/conceptProfileSlice';

// const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

// const data = [
//   {
//     name: 'Page A',
//     uv: 4,
//   },
//   {
//     name: 'Page B',
//     uv: 3,
//   },
//   {
//     name: 'Page C',
//     uv: 2,
//   },
//   {
//     name: 'Page D',
//     uv: 2,
//   },
//   {
//     name: 'Page E',
//     uv: 1,
//   },
//   {
//     name: 'Page F',
//     uv: 2,
//   },
//   {
//     name: 'Page G',
//     uv: 3,
//   },
// ];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
function AddedConceptsRechart(){
    const {data,userRating}=useSelector(state=>state.conceptsProfile)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getDataForConceptsAddedRechart())
    },[])
    return (
        <div dir='ltr' className=" mt-3 " style={{"margin":"auto"}}>
         <ResponsiveContainer  dir='ltr' width="100%" aspect={2}>
    <BarChart
    //   className='w-100'
    width={500}
      height={300}
      data={data&&data}
      margin={{
        top: 5,
        right: 20,
        left: -10,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data&&data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index===userRating-1?'lawngreen':'lightcoral'} />
        ))}
      </Bar>
    </BarChart>
    </ResponsiveContainer>
    </div>
  );
    
}
export default AddedConceptsRechart