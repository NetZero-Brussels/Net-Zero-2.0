import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { handle } from "frog/vercel";
import abi from "./abi.json";

export const app = new Frog({
  title: "Net Zero 2.0",
});

app.frame("/", async (c) => {
  return c.res({
    action: "/finish",
    image: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(to right, #432889, #17101F)",
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
            fontSize: 38,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          <div>{"I am already a voter in NetZero."}</div>
          <div>{"What are you waiting for?"}</div>
          <div>{"Let's save the planet together!"}</div>
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="What is your name?" />,
      <Button.Link href="https://net-zero-2-0.vercel.app/">
        Visit NetZero
      </Button.Link>,
      <Button.Transaction target="/send-tx">Create account</Button.Transaction>,
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

if (import.meta.env?.MODE === "development") devtools(app, { serveStatic });
else devtools(app, { assetsPath: "/.frog" });

export const GET = handle(app);
export const POST = handle(app);
