import { GetServerSideProps, NextPage } from "next";
import fetch from "node-fetch";
import { LogData } from "../index";
import moment from "moment";
import { CSSProperties } from "react";
import Link from "next/link";

export type ResolutionData = {
  identifier: string;
  resolution: string;
};

type Result = {
  number: string;
  time: string;
  resolution: string;
};

const AgentPage: NextPage<{ results: Result[] }> = ({ results }) => {
  return (
    <div>
      <h1> Agent Log </h1>
      <table style={style}>
        <tbody>
          <tr>
            {" "}
            <th>Phone Number</th>
            <th>Call date and time</th>
            <th>Resolution</th>
          </tr>
          {results.map((result, index) => {
            return (
              <>
                <tr key={index}>
                  <td>
                    {" "}
                    <Link href="/call/[number]" as={`/call/${result.number}`}>
                      {result.number}
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
  const { id } = params;
  const logResult = await fetch("http://localhost:3001/logs");
  const resolutionResult = await fetch("http://localhost:3001/resolutions");

  const logData: LogData[] = await logResult.json();
  const resolutionData: ResolutionData[] = await resolutionResult.json();

  if (!logData || !resolutionData) {
    return {
      notFound: true,
    };
  }
  const resMap = new Map(
    resolutionData.map((data) => [data.identifier, data.resolution])
  );
  const agentLogs = logData.filter((log) => log.agentIdentifier == id);

  const results = agentLogs.map((log) => {
    return {
      number: log.number,
      time: moment(log.dateTime).format("DD/MM/YYYY HH:MM:SS"),
      resolution: resMap.get(log.identifier),
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
export default AgentPage;
