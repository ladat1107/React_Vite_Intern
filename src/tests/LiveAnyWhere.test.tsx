import LiveAnyWhere from "../components/PageTailwind/LiveAnyWhere";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("Live anywhere", () => {
    render(<LiveAnyWhere />);
    test("Should render live anywhere", () => {
        const liveAnyWhere = screen.getByTestId("live-anywhere")
        expect(liveAnyWhere).toBeInTheDocument();
        expect(liveAnyWhere).toHaveTextContent(/Live AnyWhere$/);
        expect(liveAnyWhere.tagName).toBe("H3");
    })
})
