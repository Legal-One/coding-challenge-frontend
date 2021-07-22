import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import * as mockHook from "../hooks/fetchHook";
import Home from "./Home";

describe("HomePage", () => {
    test("render with all props passed", () => {
        jest.spyOn(mockHook, "useFetchData").mockImplementation(() => [
            [
                {
                    agentName: "John Doe",
                    agentIdentifier: "beb04834-9f8b-11e7-9469-8a39b455b609",
                    lastCallTime: "2020-10-06T13:50:00.000Z",
                    phoneNumber: "+4912345678",
                    callCount: 13,
                },
                {
                    agentName: "Spiderman",
                    agentIdentifier: "aeb04834-9f8b-11e7-9469-8a39b455b709",
                    lastCallTime: "2020-11-06T13:50:00.000Z",
                    phoneNumber: "+4912345678",
                    callCount: 1,
                },
            ],
            false,
            false,
        ]);
        const { asFragment } = render(
            <Router>
                <Home />
            </Router>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test("render with error from api service", () => {
        jest.spyOn(mockHook, "useFetchData").mockImplementation(() => [
            [],
            false,
            true,
        ]);
        const { asFragment } = render(
            <Router>
                <Home />
            </Router>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test("render when waiting for response from api service", () => {
        jest.spyOn(mockHook, "useFetchData").mockImplementation(() => [
            [],
            true,
            false,
        ]);
        const { asFragment } = render(
            <Router>
                <Home />
            </Router>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
