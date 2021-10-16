import './ChartBar.css'
function ChatBar(props) {
    const barHeight = (Math.round(props.datapoint/props.maxValue)*100);

    return(
    <div className="chart-bar">
        <div className="chart-bar__inner">
            <div className="chart-bar__fill" style={{height:barHeight}}>
            </div>
        </div>
        <div className="chart-bar__label">{props.label}</div>
    </div>
    );
}

export default ChatBar