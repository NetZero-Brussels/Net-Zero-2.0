import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { handle } from "frog/vercel";
import abi from "./abi.json";

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  title: "Reputation Leaderboard",
});

app.frame("/", async (c) => {
  const { buttonValue, inputText, status } = c;
  const position = inputText || buttonValue;

  return c.res({
    image: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background:
            status === "response"
              ? "linear-gradient(to right, #432889, #17101F)"
              : "linear-gradient(to right, #432889, #17101F)",
          backgroundSize: "100% 100%",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {"🌱 Net Zero 2.0 📋"}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          {"I am already a voter in NetZero."}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
            fontSize: 20,
            marginTop: 40,
          }}
        >
          {"Let's save the planet together!"}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Choose your position..." />,
      <Button.Link href="https://net-zero-2-0.vercel.app/">
        Visit NetZero
      </Button.Link>,
      <Button.Transaction target="/send-tx">Create account</Button.Transaction>,
      status === "response" && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

app.transaction("/send-tx", (c) => {
  const {} = c;
  // Contract transaction response.
  return c.contract({
    abi,
    chainId: "eip155:84532",
    functionName: "createVoter",
    args: ["New", "0x66E30Ce4FB76f08C431080B1C1C95d97311a4526"],
    to: "0x7cA95E87F3A95f4689C6b860CA259A68A5D4c5D7",
  });
});

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== "undefined";
const isProduction = isEdgeFunction || import.meta.env?.MODE !== "development";

devtools(app, isProduction ? {} : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
