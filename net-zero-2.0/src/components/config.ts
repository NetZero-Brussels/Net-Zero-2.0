import { createConfig, http } from 'wagmi'
import { type Chain } from 'viem'
import { fallback, injected, unstable_connector } from '@wagmi/core';
import { getDefaultConfig } from 'connectkit';

export const chain: Chain = {
	id: 84532,
	name: "Base Sepolia",
	nativeCurrency: {
        decimals: 18,
        name: "Base Sepolia",
        symbol: "ETH",
	},
	rpcUrls: {
	    default: { http: ["https://base-sepolia.g.alchemy.com/v2/pkHx6pj0u2G76QD14i_eIH91oYZAsXqc"] },
	},
	testnet: true,
};

export const config = createConfig(
    getDefaultConfig({
        chains: [chain],
        transports: {
            [chain.id]: fallback([
                unstable_connector(injected),
                http(chain.rpcUrls.default.http[0]),
            ])
        },
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID!,
        appName: "NetZero 2.0",
    }),
)