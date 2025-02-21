import ImageGrid from "../components/PageTailwind/ImageGrid";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("ImageGrid", () => {
    render(<ImageGrid />);
    test("Should render ImageGrid", () => {
        const image = screen.getByTestId("image")
        expect(image).toBeInTheDocument();
    })
})



