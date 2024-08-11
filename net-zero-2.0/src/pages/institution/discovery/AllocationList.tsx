import { IonButton } from "@ionic/react";
import { VotingCard } from "../../../components/discovery";
import { mockVotingCardData } from "../../../data/votingCardData";
import { DepositFundsButton, UserList } from "../../../components/institution";
import { AllocationUser } from "../../../types";
import { useState } from "react";
import { TextField } from "@mui/material";

export default function FundedProjects() {
  const [votes, setVotes] = useState(0);
  const [depositAmount, setDepositAmount] = useState("0");
  // Example user data
  const users: AllocationUser[] = [
    { id: 1, name: "Alice", points: 10 },
    { id: 2, name: "Bob", points: 20 },
    // Add more users as needed
  ];

  const handleChangeText = (event: any) => {
    setDepositAmount(event.target.value);
  };


  return (
    <div className="mx-[10%] mt-12">
      <div className="flex flex-row mb-4 justify-between items-center">
        <h1 className="text-[28px] font-semibold leading-[32px] text-center ">
          Allocation for Voters
        </h1>
      </div>
      <p>Assign votes to voters after you deposited your funds.</p>
      <DepositFundsButton setVotes = {setVotes} depositAmount = {depositAmount}>
      <TextField
        label="Enter some text"
        value="0"
        onChange={handleChangeText}
        variant="outlined"
      />
      <UserList users={users} />
      <div>
        
        <h3>Remaining Votes: {votes} </h3>
        <p>
          In order to get more voting power, you need to donate to projects.
        </p>
      </div>
    </div>
  );
}
