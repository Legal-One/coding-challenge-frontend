import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import fetch from "node-fetch";
import { CSSProperties } from "react";

export type AgentData = {
  identifier: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
};

export type LogData = {
  identifier: string;
  agentIdentifier: string;
  number: string;
  dateTime: string;
  duration: number;
};

type AggData = {
  number: string;
  times: number;
  agent: string;
  time: string;
  id: string;
};

const IndexPage: NextPage<{ aggLog: AggData[] }> = ({ aggLog }) => {
  return (
    <div>
      <h1> Home Page </h1>
      <table style={style}>
        <tbody>
          <tr>
            {" "}
            <th>Phone Number</th>
            <th>Number of Calls</th>
            <th>Last Call Details</th>
          </tr>
          {aggLog.map((log, index) => {
            return (
              <>
                <tr key={index}>
                  <td>
                    <Link href="/call/[number]" as={`/call/${log.number}`}>
                      {log.number}
                    </Link>
                  </td>
                  <td>{log.times}</td>
                  <td>
                    <Link href="/agent/[id]" as={`/agent/${log.id}`}>
                      {log.agent}
                    </Link>
                    / {log.time}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const logResult = await fetch("http://localhost:3001/logs");
  const agentResult = await fetch("http://localhost:3001/agents");

  const logData: LogData[] = await logResult.json();
  const agentData: AgentData[] = await agentResult.json();

  if (!logData || !agentData) {
    return {
      notFound: true,
    };
  }

  const agents = new Map(agentData.map((agent) => [agent.identifier, agent]));
  const sortedLogs = logData.sort(
    (a, b) => +new Date(b.dateTime) - +new Date(a.dateTime)
  );
  const regex = /(?<=T).*(?=:)/gm;
  const numberSet = new Set(logData.map((log) => log.number));
  const numberSetArray = [...numberSet];
  const aggLog = numberSetArray.map((number) => {
    const n = sortedLogs.filter((log) => log.number == number);

    const lastAgent = agents.get(n[0].agentIdentifier);

    return {
      number,
      times: n.length,
      agent: lastAgent.firstName + " " + lastAgent.lastName,
      time: n[0].dateTime.match(regex),
      id: lastAgent.identifier,
    };
  });

  return {
    props: { aggLog },
  };
};

const style: CSSProperties = {
  width: "50%",
  textAlign: "center",
};
export default IndexPage;
