import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("WaterUI site", () => {
  it("renders hero headline", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /interfaces engineered with flow/i, level: 1 })
    ).toBeInTheDocument();
  });

  it("lists design principles", () => {
    render(<App />);
    expect(screen.getAllByRole("button", { name: /cross-platform/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /high performance/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /design native/i })[0]).toBeInTheDocument();
  });

  it("wires interactive controls in the hero", () => {
    render(<App />);
    expect(screen.getByLabelText(/flow control/i)).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: /live reload/i })).toBeInTheDocument();
    expect(screen.getByText(/rust-first/i)).toBeInTheDocument();
  });

  it("introduces the water cli", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /`water` cli/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view details/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /view details/i }));
    expect(screen.getByText(/theme tokens across targets/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /view commands/i }));
    expect(screen.getByText(/water create studio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sync window/i)).toBeInTheDocument();
  });

  it("highlights the ecosystem layers", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /ecosystem/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/tutorial book/i)).toBeInTheDocument();
  });

  it("surfaces the roadmap milestones", () => {
    render(<App />);
    expect(screen.getByText(/0\.1 first glance/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.3 practical/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.4 self-rendering/i)).toBeInTheDocument();
  });

  it("includes endnote signature", () => {
    render(<App />);
    expect(screen.getByText(/open to the world/i)).toBeInTheDocument();
  });
});
