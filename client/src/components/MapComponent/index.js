import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { CALL_INTEREST } from '../../utils/constants';
import './styles.scss';

function MapComponent({ data, axis, mapType, title }) {
    return (
        <div className="map">

            <ResponsiveContainer width="100%" height="92%">
                <LineChart
                    data={data}
                    margin={{
                        top: 25,
                        right: 50,
                        left: 10,
                        bottom: 10
                    }}
                >
                    <CartesianGrid />
                    <XAxis className="x-axis" axisLine={false} dataKey={axis.x} />
                    <YAxis
                        className="y-axis"
                        ticks={mapType === 'CALL' ? [0, 1, 2, 3] : null}
                        tickFormatter={(val, index) => {
                            if (mapType === 'CALL') return Object.keys(CALL_INTEREST)[val] || Object.keys(CALL_INTEREST)[index];
                            return val;
                        }}
                        axisLine={false} dataKey={axis.y} tickCount={4}
                    />
                    <Tooltip formatter={(val, name, props) => {
                        if (mapType === 'CALL') return props.payload.resolution;
                        return val;
                    }} />
                    <Line
                        type="monotone"
                        dataKey={axis.y}
                        strokeWidth={4}
                        stroke="#f8c91c"
                        dot={{ r: 5, stroke: '#0d0e11', strokeWidth: 3 }}
                        activeDot={{ r: 8, fill: '#f8c91c' }}
                    />
                </LineChart>
            </ResponsiveContainer>
            <span className="map-title">{title}</span>
        </div>
    )
}

export default MapComponent
