// import React from 'react'
// import { useSelector } from 'react-redux'
// import { MainTableProps } from '../../Types/ui'
// import './MainTable.css'
// import { AppState } from '../../Types'
// function MainTable({ agents, resolution, logs }: any) {
//   const agent = useSelector((state: AppState) => state.agents.agents)
//   const log = useSelector((state: AppState) => state.logs.logs)
//   const res = useSelector((state: AppState) => state.resolution.resolution)
//   console.log(logs)
//   return (
//     <table>
//       <tbody>
//         <tr>
//           <th>Phone number</th>
//           {/*  <th>Number of calls</th> */}
//           <th>Last call details </th>
//         </tr>
//         {log && res.identifier && agent.identifier && (
//           <tr>
//             {log.identifier === res.identifier &&
//             log.agentIdentifier === agent.identifier ? (
//               <td>{log.number}</td>
//             ) : null}
//             {/*  <td>3 calls</td> */}
//             {log.identifier === res.identifier &&
//             log.agentIdentifier === agent.identifier ? (
//               <td>{agent.firstName}</td>
//             ) : null}
//           </tr>
//         )}
//       </tbody>
//     </table>
//   )
// }

// export default MainTable

import React from 'react'
import { useSelector } from 'react-redux'

import AgentTableData from '../AgentTableData'
import LogsTableData from '../LogsTableData'
import ResTableData from '../ResTableData'
import './MainTable.css'

function MainTable({ agents, logs, res }: any) {
  return (
    <table>
      <tbody>
        <tr>
          <th>Phone number</th>
          <th>Number of calls</th>
          <th>Last call details </th>
        </tr>
        <tr>
          <td>
            <LogsTableData logs={logs} />
          </td>
          <td>
            <ResTableData resolution={res} />
          </td>
          <td>
            <AgentTableData agent={agents} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default MainTable
