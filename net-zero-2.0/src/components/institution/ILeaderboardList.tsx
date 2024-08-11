import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

// data/mockData.ts
export interface LeaderboardCompany {
  id: number;
  name: string;
  points: number;
}

export const IleaderboardData: LeaderboardCompany[] = [
  { id: 1, name: "Apple", points: 10384 },
  { id: 2, name: "Google", points: 995 },
  { id: 3, name: "Tesla", points: 867 },
  { id: 4, name: "Samsung", points: 846 },
  { id: 5, name: "Paypal", points: 642 },
];

interface LeaderboardProps {
  duration: string;
}

export const ILeaderboardList: React.FC<LeaderboardProps> = ({ duration }) => {
  const filteredData = IleaderboardData;

  return (
    <div>
      <Box mt={1}>
        <List>
          {filteredData.map((company, index) => (
            <ListItem key={company.id}>
              <ListItemAvatar>
                <Avatar>{/* <StarIcon /> */}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${index + 1}. ${company.name}`} />
              {`Points: ${company.points} pts`}
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};
