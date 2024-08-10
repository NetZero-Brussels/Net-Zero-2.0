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