import { Skills } from 'generated/graphql';
import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Theme, useTheme } from '@mui/material/styles';

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export interface SkillsProfessionProps {
  skills: Pick<Skills, 'id' | 'skill'>[];
}
export const SkillsProfession: React.FC<SkillsProfessionProps> = ({
  skills,
}) => {
  const theme = useTheme();
  const [yearsExperience, setYearsExperience] = useState('');
  const [primaryRole, setPrimaryRole] = useState('');
  const [secondaryRole, setSecondaryRole] = useState('');
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const handleSkillsChange = (event: SelectChangeEvent<typeof userSkills>) => {
    const {
      target: { value },
    } = event;
    setUserSkills(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <ProfileEducationStyle>
      <h1 className="sign-up-text">Skills and Profession</h1>
      <div className="inputs-container">
        <TextField
          id="standard-basic"
          label="Primary Role"
          variant="standard"
          value={primaryRole}
          onChange={(e) => setPrimaryRole(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Secondary Role"
          variant="standard"
          value={secondaryRole}
          onChange={(e) => setSecondaryRole(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Years Experience"
          variant="standard"
          value={yearsExperience}
          onChange={(e) => setYearsExperience(e.target.value)}
        />
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Skills</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={userSkills}
            onChange={handleSkillsChange}
            input={<OutlinedInput label="Skills" />}
            MenuProps={MenuProps}
          >
            {skills.map((skill) => (
              <MenuItem
                key={skill.id}
                value={skill.skill}
                style={getStyles(skill.skill, userSkills, theme)}
              >
                {skill.skill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </ProfileEducationStyle>
  );
};

const ProfileEducationStyle = styled.div`
  .inputs-container {
    display: flex;
    flex-direction: column;
  }
`;
