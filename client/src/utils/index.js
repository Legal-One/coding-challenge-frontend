import moment from 'moment';
import { CALL_INTEREST } from './constants';

export const indentifierObjectFromArray = (dataArray = []) => {
    let obj = {};
    dataArray.forEach(val => obj[val.identifier] = val);
    return obj;
}

const monthlyLogReducer = (acc, val) => {
    let date = moment(moment(val['dateTime']).format('MMM YYYY')).valueOf();
    if (acc[date]) acc[date].push(val);
    else acc[date] = [val];
    return acc;
};

const numberLogReducer = ({ result, agents }, val) => {
    let number = val["number"];
    if (result[number]) {
        result[number].push({
            ...val,
            agentName: `${agents[val["agentIdentifier"]].firstName} ${agents[val["agentIdentifier"]].lastName}`
        });
    }
    else result[number] = [{
        ...val,
        agentName: `${agents[val["agentIdentifier"]].firstName} ${agents[val["agentIdentifier"]].lastName}`
    }]
    return { result, agents }

};

function compareCallTime(a, b) {

    if (new Date(a.dateTime).valueOf() < new Date(b.dateTime).valueOf()) {
        return -1;
    }
    if (new Date(a.dateTime).valueOf() > new Date(b.dateTime).valueOf()) {
        return 1;
    }
    return 0;
}

function aggregateDailyCallTime(calls = []) {
    let timeSpent = {};

    calls.forEach((call) => {
        if (timeSpent[call.date]) timeSpent[call.date].duration = +timeSpent[call.date].duration + (+call.duration)
        else timeSpent[call.date] = { number: call.date, duration: +call.duration }
    });
    return timeSpent;
}

export const montlyCallLogs = ({ logs = [], agents }) => {
    // calculation for Home > MapComponent
    let reducedLogData = logs.reduce(monthlyLogReducer, {});
    let monthSortedCalls = Object.keys(reducedLogData).sort((a, b) => a - b);
    let mapData = monthSortedCalls.map((date) => { return { date: moment.unix(date / 1000).format('MMM YYYY'), calls: reducedLogData[date].length } });

    // calculation for Home > TableComponent
    let reducedNumberData = logs.reduce(numberLogReducer, { result: {}, agents: agents }).result;
    for (const num in reducedNumberData) {
        reducedNumberData[num] = reducedNumberData[num].sort(compareCallTime).reverse();
    };
    return { mapData, tableData: reducedNumberData }
}

export const convetSecToTime = (duration) => {
    return moment.utc(duration * 1000).format('HH:mm:ss').split(':').filter((val, index) => !(index === 0 && val === "00")).join(":");
}

export const agentCallLogs = ({ calls = [], agent, resolution }) => {
    let sortedCalls = calls.sort(compareCallTime);
    let tableData = sortedCalls.map(call => {
        let dateTime = moment(call.dateTime).format('DD/M/YYYY k:mm:ss').split(' ');
        return {
            ...call,
            date: dateTime[0],
            time: dateTime[1],
            resolution: resolution[call.identifier].resolution
        }
    });
    return {
        tableData,
        mapData: Object.values(aggregateDailyCallTime(tableData))
    }
};

export const numberCallLogs = ({ calls = [], agents, resolution }) => {
    let sortedCalls = calls.sort(compareCallTime);

    let tableData = sortedCalls.map(call => {
        let dateTime = moment(call.dateTime).format('DD/M/YYYY k:mm:ss').split(' ');
        return {
            ...call,
            date: dateTime[0],
            time: dateTime[1],
            agent: `${agents[call.agentIdentifier].firstName} ${agents[call.agentIdentifier].lastName}`,
            resolution: resolution[call.identifier].resolution
        }
    });


    return {
        tableData,
        mapData: tableData.map( call => { return { ...call, interest: CALL_INTEREST[call.resolution] }})
    }
}