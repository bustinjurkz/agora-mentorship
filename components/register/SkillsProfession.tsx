import { Skills } from 'generated/graphql';
import React from 'react';
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
  registerState: any;
  setRegisterState: any;
}
export const SkillsProfession: React.FC<SkillsProfessionProps> = ({
  skills,
  registerState,
  setRegisterState,
}) => {
  const theme = useTheme();

  const handleSkillsChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setRegisterState({
      userSkills: typeof value === 'string' ? value.split(',') : value,
    });
  };

  return (
    <ProfileEducationStyle>
      <h1 className="sign-up-text">Skills and Profession</h1>
      <div className="inputs-container">
        <div className="left-inputs">
          <TextField
            id="standard-basic"
            label="Primary Role"
            variant="standard"
            value={registerState.primaryRole}
            onChange={(e) => setRegisterState({ primaryRole: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Secondary Role"
            variant="standard"
            value={registerState.secondaryRole}
            onChange={(e) =>
              setRegisterState({ secondaryRole: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Years Experience"
            InputProps={{ inputProps: { min: 0, max: 50 } }}
            variant="standard"
            type="number"
            value={registerState.yearsExperience}
            onChange={(e) =>
              setRegisterState({ yearsExperience: e.target.value })
            }
          />
        </div>
        <div className="right-inputs">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Skills</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={registerState.userSkills}
              onChange={handleSkillsChange}
              input={<OutlinedInput label="Skills" />}
              MenuProps={MenuProps}
            >
              {skills.map((skill) => (
                <MenuItem
                  key={skill.id}
                  value={skill.skill}
                  style={getStyles(
                    skill.skill,
                    registerState.userSkills,
                    theme,
                  )}
                >
                  {skill.skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </ProfileEducationStyle>
  );
};

const ProfileEducationStyle = styled.div`
  .inputs-container {
    display: flex;
    flex-direction: row;
    height: 100%;

    .left-inputs,
    .right-inputs {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .left-inputs {
      margin-right: 90px;
    }
  }
`;
