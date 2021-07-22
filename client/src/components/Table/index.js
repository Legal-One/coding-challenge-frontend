import React from "react";

import "./index.scss";

/*
    param example:
        headers = ["h1", "h2", "h3"]
        rows = [
            ["cell1", "cell2", "cell3"],
            ["cell4", "cell5", "cell6"],
            ["cell7", "cell8", "cell9"]
        ]
*/
const Table = ({ title, headers, rows }) => {
    return (
        <>
            <h3>{title}</h3>
            <table className="Table">
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, i) => (
                                <td key={i}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;
