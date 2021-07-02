import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAllAgentsThunk } from '../../redux-thunk/getAllAgentsThunk'
import { ROUTES } from '../../routes'

import '../agent/agent.css'

// import for the atomic and molecular components
import Text from '../../components/atoms/text'
import StatusCard from '../../components/molecules/statusCards'

function AgentList() {
  const history = useHistory()
  const completeLogData = useSelector((state) => state.allAgents)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllAgentsThunk())
  }, [dispatch])

  return (
    <>
      {completeLogData && (
        <div className="agentDetails">
          <Text
            size="p1"
            bold
            primary
            onClick={() =>
              history.push({
                pathname: ROUTES.DASHBOARD
              })
            }
          >
            🠔 Back to Dashboard
          </Text>
          <div style={{ marginTop: '32px' }} />
          <Text primary size="h2" bold>
            List of all the Agents 👨🏻‍💼
          </Text>
          <div style={{ marginTop: '32px' }} />
          <StatusCard
            status="Number of Agents"
            count={completeLogData?.length}
          />
          <div className="agentList">
            {completeLogData.map((eachAgent) => (
              <div>
                <div style={{ marginTop: '32px' }} />
                <span
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    textDecorationColor: '#fff5e9'
                  }}
                >
                  <Text
                    primary
                    size="p1"
                    onClick={() =>
                      history.push({
                        pathname: `${ROUTES.AGENT}}/${eachAgent.identifier}`
                      })
                    }
                  >
                    {eachAgent.firstName || ''} {eachAgent.lastName || ''}
                  </Text>
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '32px' }} />
        </div>
      )}
    </>
  )
}

export default AgentList
