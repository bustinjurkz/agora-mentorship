import { Language, Majors, University } from 'generated/graphql';
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
export type DegreeType =
  | 'College Diploma'
  | 'Bachelors (3 years)'
  | 'Honours (4 years)'
  | 'Masters'
  | 'Professional Degree'
  | 'PhD';

export interface ProfileEducationProps {
  languages: Pick<Language, 'id' | 'language'>[];
  universities: Pick<University, 'id' | 'name'>[];
  majors: Pick<Majors, 'id' | 'major'>[];
}
export const ProfileEducation: React.FC<ProfileEducationProps> = ({
  languages,
  universities,
  majors,
}) => {
  const theme = useTheme();
  const degrees: DegreeType[] = [
    'College Diploma',
    'Bachelors (3 years)',
    'Honours (4 years)',
    'Masters',
    'Professional Degree',
    'PhD',
  ];
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [userLanguage, setUserLanguage] = useState<string[]>([]);
  const [userUniversity, setUserUniversity] = useState<string[]>([]);
  const [userMajor, setUserMajor] = useState<string[]>([]);
  const [userDegree, setUserDegree] = useState<DegreeType>();
  const handleLanguageChange = (
    event: SelectChangeEvent<typeof userLanguage>,
  ) => {
    const {
      target: { value },
    } = event;
    setUserLanguage(typeof value === 'string' ? value.split(',') : value);
  };
  const handleUniversityChange = (
    event: SelectChangeEvent<typeof userUniversity>,
  ) => {
    const {
      target: { value },
    } = event;
    setUserUniversity(typeof value === 'string' ? value.split(',') : value);
  };
  const handleMajorChange = (event: SelectChangeEvent<typeof userMajor>) => {
    const {
      target: { value },
    } = event;
    setUserMajor(typeof value === 'string' ? value.split(',') : value);
  };
  const handleDegreeChange = (event: SelectChangeEvent) => {
    setUserDegree(event.target.value as DegreeType);
  };
  return (
    <ProfileEducationStyle>
      <h1 className="sign-up-text">Profile Details and Education:</h1>
      <div className="inputs-container">
        <div className="profile-inputs">
          <TextField
            id="standard-basic"
            label="Full Name"
            variant="standard"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            type={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Birth Year"
            variant="standard"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">
              Languages Spoken
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={userLanguage}
              onChange={handleLanguageChange}
              input={<OutlinedInput label="Languages (1 or more)" />}
              MenuProps={MenuProps}
            >
              {languages.map((language) => (
                <MenuItem
                  key={language.id}
                  value={language.language}
                  style={getStyles(language.language, userLanguage, theme)}
                >
                  {language.language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="education-inputs">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">
              College & University
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={userUniversity}
              onChange={handleUniversityChange}
              input={<OutlinedInput label="School" />}
              MenuProps={MenuProps}
            >
              {universities.map((university) => (
                <MenuItem
                  key={university.id}
                  value={university.name}
                  style={getStyles(university.name, userUniversity, theme)}
                >
                  {university.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Major</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={userMajor}
              onChange={handleMajorChange}
              input={<OutlinedInput label="Major" />}
              MenuProps={MenuProps}
            >
              {majors.map((major) => (
                <MenuItem
                  key={major.id}
                  value={major.major}
                  style={getStyles(major.major, userMajor, theme)}
                >
                  {major.major}
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
              value={userDegree as DegreeType}
              onChange={handleDegreeChange}
              input={<OutlinedInput label="Major" />}
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
    </ProfileEducationStyle>
  );
};

const ProfileEducationStyle = styled.div`
  .inputs-container {
    display: flex;
    flex-direction: row;
    .profile-inputs,
    .education-inputs {
      display: flex;
      flex-direction: column;
    }
  }
`;
