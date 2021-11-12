import { Language, Majors, University } from 'generated/graphql';
import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Theme, useTheme } from '@mui/material/styles';
import {
  BackgroundStyle,
  degrees,
  DegreeType,
  majorPrettier,
} from 'components/utils';
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
export interface ProfileEducationProps {
  languages: Pick<Language, 'id' | 'language'>[];
  universities: Pick<University, 'id' | 'name'>[];
  majors: Pick<Majors, 'id' | 'major'>[];
  registerState: any;
  setRegisterState: any;
}
export const ProfileEducation: React.FC<ProfileEducationProps> = ({
  languages,
  universities,
  majors,
  registerState,
  setRegisterState,
}) => {
  const theme = useTheme();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setRegisterState({
      userLanguage: typeof value === 'string' ? value.split(',') : value,
    });
  };
  const handleUniversityChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setRegisterState({
      userUniversity: typeof value === 'string' ? value.split(',') : value,
    });
  };
  const handleMajorChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setRegisterState({
      userMajor: typeof value === 'string' ? value.split(',') : value,
    });
  };
  const handleDegreeChange = (event: SelectChangeEvent) => {
    setRegisterState({ userDegree: event.target.value as DegreeType });
  };
  return (
    <ProfileEducationStyle>
      <h1 className="sign-up-text">Profile Details and Education</h1>
      <BackgroundStyle style={{ padding: 30, width: 600 }}>
        <div className="inputs-container">
          <div className="left-side">
            <TextField
              id="standard-basic"
              label="Full Name"
              variant="standard"
              value={registerState.fullName}
              onChange={(e) => setRegisterState({ fullName: e.target.value })}
            />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              type="email"
              value={registerState.email}
              onChange={(e) => setRegisterState({ email: e.target.value })}
            />
            <TextField
              id="standard-basic"
              label="Birth Year"
              variant="standard"
              type="number"
              InputProps={{ inputProps: { min: 1940, max: 2500 } }}
              value={registerState.birthYear}
              onChange={(e) => setRegisterState({ birthYear: e.target.value })}
            />
          </div>
          <div className="right-side">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">
                Languages Spoken
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                defaultValue={'English'}
                value={registerState.userLanguage}
                onChange={handleLanguageChange}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {languages.map((language) => (
                  <MenuItem
                    key={language.id}
                    value={language.language}
                    style={getStyles(
                      language.language,
                      registerState.userLanguage,
                      theme,
                    )}
                  >
                    {language.language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">
                College & University
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={registerState.userUniversity}
                onChange={handleUniversityChange}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {universities.map((university) => (
                  <MenuItem
                    key={university.id}
                    value={university.name}
                    style={getStyles(
                      university.name,
                      registerState.userUniversity,
                      theme,
                    )}
                  >
                    {university.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">
                Field of Study
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={registerState.userMajor}
                onChange={handleMajorChange}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {majors.map((major) => (
                  <MenuItem
                    key={major.id}
                    value={major.major}
                    style={getStyles(
                      major.major,
                      registerState.userMajor,
                      theme,
                    )}
                  >
                    {majorPrettier(major.major)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">
                Highest Degree Achieved
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={registerState.userDegree as DegreeType}
                onChange={handleDegreeChange}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {degrees.map((degree, i: number) => (
                  <MenuItem key={i} value={degree}>
                    {degree}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </BackgroundStyle>
    </ProfileEducationStyle>
  );
};

const ProfileEducationStyle = styled.div`
  .inputs-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    .left-side,
    .right-side {
      display: flex;
      flex-direction: column;
    }
    .left-side {
      margin-top: 3px;
      margin-right: 90px;
    }
    .left-side * {
      margin-bottom: 10px;
    }
    .right-side * {
      margin-bottom: 7px;
    }
  }
`;
