import { Skills } from 'generated/graphql';
import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Theme, useTheme } from '@mui/material/styles';
import { BackgroundStyle } from 'components/utils';
import Input from '@mui/material/Input';

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
      <BackgroundStyle style={{ padding: 30, width: 600 }}>
        <div className="inputs-container">
          <TextField
            id="standard-basic"
            label="Current Job Title"
            variant="standard"
            value={registerState.primaryRole}
            onChange={(e) => setRegisterState({ primaryRole: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Current Department"
            variant="standard"
            value={registerState.secondaryRole}
            onChange={(e) =>
              setRegisterState({ secondaryRole: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Years Experience in Primary Role"
            InputProps={{ inputProps: { min: 0, max: 50 } }}
            variant="standard"
            type="number"
            value={registerState.yearsExperience}
            onChange={(e) =>
              setRegisterState({ yearsExperience: e.target.value })
            }
          />

          <FormControl>
            <InputLabel id="demo-multiple-name-label">
              Skills (Choose 3)
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={registerState.userSkills}
              onChange={handleSkillsChange}
              input={<Input />}
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
      </BackgroundStyle>
    </ProfileEducationStyle>
  );
};

const ProfileEducationStyle = styled.div`
  .inputs-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-self: center;
    width: 100%;
  }
  .inputs-container * {
    margin-bottom: 8px;
  }
`;
