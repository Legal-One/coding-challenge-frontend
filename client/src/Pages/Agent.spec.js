import React from "react";
import { render } from "@testing-library/react";
import Agent from "./Agent";
import * as mockHook from "../hooks/fetchHook";

jest.mock("react-router-dom", () => ({
    useParams: () => ({
        agentId: "beb04834-9f8b-11e7-9469-8a39b455b609",
        agentName: "John Doe",
    }),
}));

describe("AgentPage", () => {
    test("render with all props passed", () => {
        jest.spyOn(mockHook, "useFetchData").mockImplementation(() => [
            [
                {
                    phoneNumber: "+4912345678",
                    callTime: "2020-10-06T13:50:00.000Z",
                    resolution: "mock-resolution",
                },
                {
                    phoneNumber: "+49987654321",
                    callTime: "2020-11-06T13:50:00.000Z",
                    resolution: "mock-resolution-2",
                },
            ],
            false,
            false,
        ]);
        const { asFragment } = render(<Agent />);
        expect(asFragment()).toMatchSnapshot();
    });

    test("render with error from api service", () => {
        jest.spyOn(mockHook, "useFetchData").mockImplementation(() => [
            [],
            false,
            true,
        ]);
        const { asFragment } = render(<Agent />);
        expect(asFragment()).toMatchSnapshot();
    });

    test("render when waiting for response from api service", () => {
        jest.spyOn(mockHook, "useFetchData").mockImplementation(() => [
            [],
            true,
            false,
        ]);
        const { asFragment } = render(<Agent />);
        expect(asFragment()).toMatchSnapshot();
    });
});
