import Chart from "../Chart/Chart";

function ExpenseChart(props) {
    const datapoints = [
        {label:'JAN',value:0},
        {label:'FEB',value:0},
        {label:'MAR',value:0},
        {label:'APR',value:0},
        {label:'MAY',value:0},
        {label:'JUN',value:0},
        {label:'JUL',value:0},
        {label:'AUG',value:0},
        {label:'SEP',value:0},
        {label:'OCT',value:0},
        {label:'NOV',value:0},
        {label:'DEC',value:0}
    ];
    props.expenses.forEach(function(expense){
        const expenseMonth = expense.date.getMonth();
        datapoints[expenseMonth].value =+ expense.amount;
    });
    return(
    <Chart datapoints={datapoints}/>
    );
}

export default ExpenseChart