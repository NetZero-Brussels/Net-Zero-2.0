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
export interface User {
  id: number;
  name: string;
  team: string;
  points: number;
}

export const leaderboardData: User[] = [
  { id: 1, name: "Alice", team: "Marketing", points: 150 },
  { id: 2, name: "Bob", team: "Security", points: 120 },
  { id: 3, name: "Charlie", team: "Development", points: 130 },
  { id: 4, name: "David", team: "Marketing", points: 100 },
  { id: 5, name: "Eve", team: "Security", points: 170 },
  { id: 6, name: "Frank", team: "Development", points: 160 },
  { id: 7, name: "Grace", team: "Marketing", points: 110 },
  { id: 8, name: "Hank", team: "Security", points: 140 },
  { id: 9, name: "Ivy", team: "Development", points: 150 },
];

interface LeaderboardProps {
  team: string;
  duration: string;
}

export const LeaderboardList: React.FC<LeaderboardProps> = ({
  team,
  duration,
}) => {
  const filteredData = leaderboardData.filter((user) => user.team === team);

  return (
    <div>
      <Box mt={1}>
        <List>
          {filteredData.map((user, index) => (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar>{/* <StarIcon /> */}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${index + 1}. ${user.name}`} />
              {`Points: ${user.points} pts`}
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};
