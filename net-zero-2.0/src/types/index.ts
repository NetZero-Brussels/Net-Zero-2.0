export interface VotingCardData {
  id: number;
  name: string;
  description: string;
  participants: number;
  endTime: string;
}


export interface ProjectCardData {
  id: number;
  teamName: string;
  projectName: string;
  location: string;
  energyExport: string;
  fundRaiseGoal: string;
  currentVote: string;
  endTime: string;
  fundedPercentage: number;
}


export interface ApprovedProjectData {
  id: number;
  name: string;
  description: string;
  moneyRaised: string;
}

// Define a type for the user
export interface AllocationUser {
  id: number;
  name: string;
  points: number;
}