/* eslint-disable no-undef */
import { getRightPath } from "../utils";

beforeEach(() => {
    windowSpy = jest.spyOn(window, "window", "get");
});

afterEach(() => {
    windowSpy.mockRestore();
});

test("getRightPath", () => {
    expect(getRightPath()).toBe(`/account`);
    windowSpy.mockImplementation(() => ({
        location: {
            search: "?test=test",
        },
    }));

    expect(getRightPath()).toBe(`/account?test=test`);
    expect(getRightPath("testnet")).toBe(`/testnet/account?test=test`);
    expect(getRightPath("staging")).toBe(`/staging/account?test=test`);
    expect(getRightPath("mainnet")).toBe(`/account?test=test`);
    expect(
        getRightPath(
            "staging",
            { key: "BSC" },
            { key: "Polygon" },
            "BSC",
            "Polygon"
        )
    ).toBe(`/staging/account?test=test`);

    expect(
        getRightPath(
            "staging",
            { key: "Tron" },
            { key: "Polygon" },
            "BSC",
            "Polygon"
        )
    ).toBe(undefined);

    expect(
        getRightPath(
            "testnet",
            "BSC",
            "Tron",
            { key: "BSC" },
            { key: "Polygon" }
        )
    ).toBe(undefined);
});
