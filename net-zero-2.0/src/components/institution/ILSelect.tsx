// components/LeaderboardSelect.tsx
import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ILeaderboardList } from "./ILeaderboardList";

const durations = ["Daily", "Weekly", "Monthly"];

const ILSelect = () => {
  const [team, setTeam] = useState<string>("Marketing");
  const [duration, setDuration] = useState<string>("Weekly");

  const handleDurationChange = (event: SelectChangeEvent<string>) => {
    setDuration(event.target.value as string);
  };

  return (
    <Box marginTop={2}>
      <Box display="flex" justifyContent={"end"} gap={2}>
        <FormControl>
          <InputLabel id="duration-select-label">Duration</InputLabel>
          <Select
            labelId="duration-select-label"
            id="duration-select"
            value={duration}
            label="Duration"
            onChange={handleDurationChange}
          >
            {durations.map((durationPeriod) => (
              <MenuItem key={durationPeriod} value={durationPeriod}>
                {durationPeriod}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {team && duration && <ILeaderboardList duration={duration} />}
    </Box>
  );
};

export default ILSelect;
