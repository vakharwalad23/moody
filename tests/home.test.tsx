import { screen, render } from "@testing-library/react";
import { vi } from "vitest";
import Home from "../app/page";

vi.mock("@clerk/nextjs/server", () => {
  return {
    auth: () =>
      new Promise((resolve) =>
        resolve({ userId: "user_2NNEqL2nrIRdJ194ndJqAHwEfxC" })
      ),
    ClerkProvider: ({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "user_2NNEqL2nrIRdJ194ndJqAHwEfxC",
        fullName: "John Doe",
      },
    }),
  };
});

test("Home", async () => {
  render(await Home());
  expect(screen.getByText("AI based Journal App")).toBeTruthy();
});
