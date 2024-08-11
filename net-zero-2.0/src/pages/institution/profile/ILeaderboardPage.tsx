import react from "react";
import ILSelect from "../../../components/institution/ILSelect";

export default function ILeaderboardPage() {
  return (
    <div className="mx-[10%] mt-7 mb-20">
      <div className="flex flex-row mb-4 justify-between items-center">
        <h1 className="text-[28px] font-semibold leading-[32px] text-center ">
          LeaderBoard
        </h1>
      </div>
      <p className="mb-[-55px]">
        Compete with other companies with reputation points.
      </p>
      <ILSelect />
    </div>
  );
}
