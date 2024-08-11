import { IonSearchbar } from "@ionic/react";
import { useEffect, useState } from "react";

import { useActiveAccount } from "thirdweb/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import nyancat from "../../public/nyancat.gif";
import BalanceButton from "../LogIn";

export default function IDHeader() {
  const [walletAddr, setWalletAddr] = useState<string | undefined>(undefined);
  //usestate for the reputation points of the user
  const activeAccount = useActiveAccount();
  console.log(activeAccount);
  useEffect(() => {
    setWalletAddr(activeAccount?.address);
  }, [activeAccount]);

  return (
    <div className="mx-[3%] mt-10 flex flex-col gap-3">
      <div className="mx-[3%] flex flex-row justify-between mb-3">
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
