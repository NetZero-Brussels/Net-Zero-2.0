import { IonSearchbar } from "@ionic/react";
import { useEffect, useState } from "react";

import { useActiveAccount } from "thirdweb/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import nyancat from "../../public/nyancat.gif";
import BalanceButton from "./BalanceButton";

export default function DiscoveryHeader() {
  const [walletAddr, setWalletAddr] = useState<string | undefined>(undefined);
  //usestate for the reputation points of the user
  const [reputationPoints, setReputationPoints] = useState<number>(0);

  const activeAccount = useActiveAccount();
  console.log(activeAccount);
  useEffect(() => {
    setWalletAddr(activeAccount?.address);
  }, [activeAccount]);

  return (
    <div className="mx-[3%] mt-10 flex flex-col gap-3">
      <div className="mx-[3%] flex flex-row justify-between mb-3">
        <div className="flex flex-row gap-7 items-center text-center">
          {(walletAddr && (
            <>
              <Jazzicon diameter={48} seed={jsNumberForAddress(walletAddr)} />
            </>
          )) || (
            <img
              src={nyancat}
              alt="nyancat"
              className="rounded-full h-12 w-12"
            />
          )}

          <p>{reputationPoints} Reputation Points</p>
        </div>
        <BalanceButton />
      </div>
      <IonSearchbar
        showClearButton="always"
        animated={true}
        placeholder="Search a Project"
      ></IonSearchbar>
    </div>
  );
}
