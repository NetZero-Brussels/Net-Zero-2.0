import { Button, Frog, TextInput } from 'frog';
import { devtools } from 'frog/dev';
import { serveStatic } from 'frog/serve-static';
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel';
// import axios from 'axios';  

export const app = new Frog({
  basePath: '/api',
  title: 'Reputation Leaderboard',
});

const mockLeaderboard = [
  { address: '0x123...', name: 'Alice', reputation: 150 },
  { address: '0x456...', name: 'Bob', reputation: 120 },
  { address: '0x789...', name: 'Charlie', reputation: 100 },
];

function formatPosition(position) {
  const index = parseInt(position);
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const emoji = ['🥇', '🥈', '🥉'];

  const suffix = suffixes[(index % 10) > 3 || Math.floor(index / 10) === 1 ? 0 : index % 10];
  const emojiSymbol = emoji[index - 1] || '';

  return `${index}${suffix}`.trim();
}

function formatEmoji(position) {
  const index = parseInt(position);
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const emoji = ['🥇', '🥈', '🥉'];

  const suffix = suffixes[(index % 10) > 3 || Math.floor(index / 10) === 1 ? 0 : index % 10];
  const emojiSymbol = emoji[index - 1] || '';

  return `${emojiSymbol}`.trim();
}

async function fetchLeaderboard() {
  try {
    return mockLeaderboard;
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return [];
  }
}

app.frame('/', async (c) => {
  const { buttonValue, inputText, status } = c;
  const position = inputText || buttonValue;

  const leaderboard = await fetchLeaderboard();

  return c.res({
    text: (
      <div
        style={{
          color: 'white',
          fontSize: 24,
          fontStyle: 'normal',
          textAlign: 'center',
          marginTop: 30,
        }}
      >
        {status === 'response'
          ? position
            ? `${formatEmoji(position)} The user in ${formatPosition(position)} is ${
                leaderboard[position - 1]?.name || 'Unknown User'
              } with address ${leaderboard[position - 1]?.address || 'N/A'} and a reputation score of ${
                leaderboard[position - 1]?.reputation || 0
              } points.`
            : ''
          : '🌱 Net Zero Reputation Leaderboard 📋'}
      </div>
    ),
    leaderboard: (
      <div
        style={{
          color: 'white',
          fontSize: 20,
          marginTop: 20,
          textAlign: 'center',
        }}
      >
        {leaderboard.length > 0 ? (
          <ul
            style={{
              listStyleType: 'none',
              padding: 0,
            }}
          >
            {leaderboard.map((user, index) => (
              <li
                key={user.address}
                style={{
                  marginBottom: 10,
                }}
              >
                {index + 1}. {user.name || user.address}: {user.reputation} points
              </li>
            ))}
          </ul>
        ) : (
          <div>No users found or unable to fetch data.</div>
        )}
      </div>
    ),
    intents: [
      <TextInput placeholder="Choose your position..." />,
      <Button value="1">1st 🥇</Button>,
      <Button value="2">2nd 🥈</Button>,
      <Button value="3">3rd 🥉</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined';
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development';

devtools(app, isProduction ? {} : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);