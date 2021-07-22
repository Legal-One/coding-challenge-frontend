import React from "react";
import { render } from "@testing-library/react";
import * as mockHook from "../hooks/fetchHook";
import Phone from "./Phone";

jest.mock("react-router-dom", () => ({
    useParams: () => ({
        phoneNumber: "+4912345678",
    }),
}));

describe("PhonePage", () => {
    test("render with all props passed", () => {
        jest.spyOn(mockHook, "useFetchData").mockImplementation(() => [
            [
                {
                    agentName: "John Doe",
                    callTime: "2020-10-06T13:50:00.000Z",
                    resolution: "mock-resolution",
                },
                {
                    agentName: "Spiderman",
                    callTime: "2020-11-06T13:50:00.000Z",
                    resolution: "mock-resolution-2",
                },
            ],
            false,
            false,
        ]);
        const { asFragment } = render(<Phone />);
        expect(asFragment()).toMatchSnapshot();
    });

    test("render with error from api service", () => {
        jest.spyOn(mockHook, "useFetchData").mockImplementation(() => [
            [],
            false,
            true,
        ]);
        const { asFragment } = render(<Phone />);
        expect(asFragment()).toMatchSnapshot();
    });

    test("render when waiting for response from api service", () => {
        jest.spyOn(mockHook, "useFetchData").mockImplementation(() => [
            [],
            true,
            false,
        ]);
        const { asFragment } = render(<Phone />);
        expect(asFragment()).toMatchSnapshot();
    });
});
