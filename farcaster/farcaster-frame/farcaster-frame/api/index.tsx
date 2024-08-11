import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { handle } from "frog/vercel";
import { ethers } from "ethers";
import abi from "./abi.json";

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  title: "Reputation Leaderboard",
});

const mockLeaderboard = [
  { address: "0x123...", name: "Alice", reputation: 150 },
  { address: "0x456...", name: "Bob", reputation: 120 },
  { address: "0x789...", name: "Charlie", reputation: 100 },
];

const contractAddress = "0x4e7A32FAd4364710A81e6B98B64cdc14C5a9E29D";

async function getContractInstance() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
}

async function getUserWalletAddress() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();
    console.log(`User's wallet address: ${walletAddress}`);
    return walletAddress;
  } catch (error) {
    console.error("Failed to get wallet address:", error);
    return null;
  }
}

function formatPosition(position) {
  const index = parseInt(position);
  const suffixes = ["th", "st", "nd", "rd"];
  const emoji = ["🥇", "🥈", "🥉"];

  const suffix =
    suffixes[index % 10 > 3 || Math.floor(index / 10) === 1 ? 0 : index % 10];
  const emojiSymbol = emoji[index - 1] || "";

  return `${index}${suffix}`.trim();
}

function formatEmoji(position) {
  const index = parseInt(position);
  const suffixes = ["th", "st", "nd", "rd"];
  const emoji = ["🥇", "🥈", "🥉"];

  const suffix =
    suffixes[index % 10 > 3 || Math.floor(index / 10) === 1 ? 0 : index % 10];
  const emojiSymbol = emoji[index - 1] || "";

  return `${emojiSymbol}`.trim();
}

async function fetchLeaderboard() {
  try {
    return mockLeaderboard;
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    return [];
  }
}

app.frame("/", async (c) => {
  const { buttonValue, inputText, status } = c;
  const position = inputText || buttonValue;

  const leaderboard = await fetchLeaderboard();

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
          {status === "response"
            ? position
              ? `${formatEmoji(position)} The user in ${formatPosition(
                  position
                )} is ${
                  leaderboard[position - 1]?.name || "Unknown User"
                } with address ${
                  leaderboard[position - 1]?.address || "N/A"
                } and a reputation score of ${
                  leaderboard[position - 1]?.reputation || 0
                } points.`
              : ""
            : "🌱 Net Zero Reputation Leaderboard 📋"}
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
          {leaderboard.length > 0 ? (
            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              {leaderboard.map((user, index) => (
                <li
                  key={user.address}
                  style={{
                    marginBottom: 10,
                    padding: "5px 0",
                  }}
                >
                  {index + 1}. {user.name || user.address}: {user.reputation}{" "}
                  points
                </li>
              ))}
            </ul>
          ) : (
            <div>No users found or unable to fetch data.</div>
          )}
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
        ></div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Choose your position..." />,
      <Button value="1">1st 🥇</Button>,
      <Button.Transaction target="/send-tx">Create acc.</Button.Transaction>,
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
