import ChatBar from "./ChartBar";
import './Chart.css'
function Chart(props) {
    const valueArray= props.datapoints.map(v => {
        return v.value;
    });
    const maxValue = Math.max(...valueArray);
    return(
        <div className='chart'>
            {props.datapoints.map(data =>{
                return<ChatBar datapoint={data.value} maxValue={maxValue} key={data.label} label={data.label}/>
            })}
        </div>

    );
}

export default Chart