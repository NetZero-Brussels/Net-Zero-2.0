import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { handle } from "frog/vercel";
import abi from "./abi.json";

export const app = new Frog({
  title: "Net Zero 2.0",
});

app.frame("/", (c) => {
  return c.res({
    image: "https://net-zero-2-0.vercel.app/preview.png",
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
