import axios from 'axios';
import React, {  useEffect , useState} from 'react';

const Home =()=>{

    const [Data, setData] = useState([]);
   const [count , setCount] = useState(0);
    useEffect(async() => {
        const data  = await axios.get('http://localhost:8000/')
        const all = data.data
        setData(all);
        setCount(count+1);
    }, []);
    
    return(
        <div>
            <h1>Home</h1>

            <table >
            <tr>
            <th>Phone Number</th>
            <th>Number of calls</th>
            <th>Last call Details</th>
            </tr>
            {
                Data && Data.map(elem => {
                     return(
                         <tr key={elem.id}>
                         <td>{elem.number}</td>
                         <td>{elem.numberOfCall}</td>
                         <td>{elem.name}/{elem.duration}</td>
                         </tr>
                     )
                 })
             }
              
            
            </table>

        </div>
    )
}
export default Home;