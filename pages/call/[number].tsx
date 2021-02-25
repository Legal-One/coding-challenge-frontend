import { GetServerSideProps, NextPage } from "next";
import fetch from "node-fetch";
import { LogData, AgentData } from "../index";
import { ResolutionData } from "../agent/[id]";
import moment from "moment";
import { CSSProperties } from "react";
import Link from "next/link";

type Result = {
  agent: string;
  time: string;
  resolution: string;
  agentId: string;
};

const NumberPage: NextPage<{ results: Result[] }> = ({ results }) => {
  return (
    <div>
      <h1> Number Log </h1>
      <table style={style}>
        <tbody>
          <tr>
            {" "}
            <th>Agent Name</th>
            <th>Call date and time</th>
            <th>Resolution</th>
          </tr>
          {results.map((result, index) => {
            return (
              <>
                <tr key={index}>
                  <td>
                    {" "}
                    <Link href="/agent/[id]" as={`/agent/${result.agentId}`}>
                      {result.agent}
                    </Link>
                  </td>
                  <td>{result.time}</td>
                  <td>{result.resolution}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const { number } = params;
  const logResult = await fetch("http://localhost:3001/logs");
  const agentResult = await fetch("http://localhost:3001/agents");
  const resolutionResult = await fetch("http://localhost:3001/resolutions");

  const logData: LogData[] = await logResult.json();
  const resolutionData: ResolutionData[] = await resolutionResult.json();
  const agentData: AgentData[] = await agentResult.json();

  if (!logData || !resolutionData || !agentData) {
    return {
      notFound: true,
    };
  }
  const resMap = new Map(
    resolutionData.map((data) => [data.identifier, data.resolution])
  );

  const agents = new Map(agentData.map((agent) => [agent.identifier, agent]));

  const numberLogs = logData.filter((log) => log.number == number);
  const results = numberLogs.map((log) => {
    const agent = agents.get(log.agentIdentifier);
    return {
      agent: agent.firstName + " " + agent.lastName,
      time: moment(log.dateTime).format("DD/MM/YYYY HH:MM:SS"),
      resolution: resMap.get(log.identifier),
      agentId: agent.identifier,
    };
  });

  return {
    props: { results },
  };
};
const style: CSSProperties = {
  width: "50%",
  textAlign: "center",
};
export default NumberPage;
