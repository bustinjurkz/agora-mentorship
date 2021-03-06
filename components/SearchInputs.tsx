import React, { useState } from 'react';
import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import { BackgroundStyle } from './utils';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
export interface SearchInputsProps {
  setMentorSearch: (e: any) => void;
}

export const SearchInputs: React.FC<SearchInputsProps> = ({
  setMentorSearch,
}) => {
  const [servicesSelected, setServicesSelected] = useState<string[]>([]);
  const [titlesSelected, setTitlesSelected] = useState<string[]>([]);
  const [departmentSelected, setDepartmentSelected] = useState<string[]>([]);
  const [schoolSelected, setSchoolSelected] = useState<string[]>([]);
  const [degreeSelected, setDegreeSelected] = useState<string[]>([]);
  const [degreeTypeSelected, setDegreeTypeSelected] = useState<string[]>([]);
  const handleChange = (event: any, searchType: FilterFields) => {
    switch (searchType) {
      case FilterFields.Services:
        return setServicesSelected(event.target.value as string[]);
      case FilterFields.Title:
        return setTitlesSelected(event.target.value as string[]);
      case FilterFields.School:
        return setSchoolSelected(event.target.value as string[]);
      case FilterFields.Degree:
        return setDegreeSelected(event.target.value as string[]);
      case FilterFields.DegreeType:
        return setDegreeTypeSelected(event.target.value as string[]);
      case FilterFields.Department:
        return setDepartmentSelected(event.target.value as string[]);
    }
  };

  enum FilterFields {
    Services,
    Title,
    Department,
    School,
    Degree,
    DegreeType,
  }

  const services = [
    'General',
    'Work-Life Balance',
    'Resume/CV Critique',
    'Mock Interview',
    'Career Planning',
    'Career Transitioning',
  ];

  const title = [
    'Project Manager',
    'Data Scientist I',
    'Data Science Associate',
  ];

  const department = [
    'Modelling & Analytics',
    'Personal Banking',
    'Wealth Advanced Analytics',
  ];

  const school = ['McMaster University', 'Brock University', 'York University'];
  const degree = ['Math & Statistics', 'Computer Science', 'Business'];
  const degreeType = ['B.Sc', 'B.S', 'MA'];

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

  const [clicked, setClicked] = useState(false);

  return (
    <SearchFilterStyle>
      <div className="inputs">
        <FormControl className="search-form">
          <Input
            placeholder="Search"
            id="input-with-icon-adornment"
            onChange={(e) => setMentorSearch(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          onClick={() => setClicked(!clicked)}
          startIcon={<FilterAltIcon />}
        >
          Filter
        </Button>
      </div>

      <Collapse in={clicked}>
        <BackgroundStyle style={{ marginTop: 12 }}>
          <div className="filter-form">
            <FormControl className="field">
              <InputLabel id="demo-mutiple-checkbox-label">Services</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={servicesSelected}
                onChange={(e) => handleChange(e, FilterFields.Services)}
                input={<Input />}
                renderValue={(selected) => (selected as string[]).join(', ')}
                MenuProps={MenuProps}
              >
                {services.map((service) => (
                  <MenuItem key={service} value={service}>
                    <Checkbox
                      checked={servicesSelected.indexOf(service) > -1}
                    />
                    <ListItemText primary={service} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="field">
              <InputLabel id="demo-mutiple-checkbox-label">Title</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={titlesSelected}
                onChange={(e) => handleChange(e, FilterFields.Title)}
                input={<Input />}
                renderValue={(selected) => (selected as string[]).join(', ')}
                MenuProps={MenuProps}
              >
                {title.map((title) => (
                  <MenuItem key={title} value={title}>
                    <Checkbox checked={titlesSelected.indexOf(title) > -1} />
                    <ListItemText primary={title} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="field">
              <InputLabel id="demo-mutiple-checkbox-label">
                Department
              </InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={departmentSelected}
                onChange={(e) => handleChange(e, FilterFields.Department)}
                input={<Input />}
                renderValue={(selected) => (selected as string[]).join(', ')}
                MenuProps={MenuProps}
              >
                {department.map((department) => (
                  <MenuItem key={department} value={department}>
                    <Checkbox
                      checked={departmentSelected.indexOf(department) > -1}
                    />
                    <ListItemText primary={department} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="field">
              <InputLabel id="demo-mutiple-checkbox-label">School</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={schoolSelected}
                onChange={(e) => handleChange(e, FilterFields.School)}
                input={<Input />}
                renderValue={(selected) => (selected as string[]).join(', ')}
                MenuProps={MenuProps}
              >
                {school.map((school) => (
                  <MenuItem key={school} value={school}>
                    <Checkbox checked={schoolSelected.indexOf(school) > -1} />
                    <ListItemText primary={school} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="field">
              <InputLabel id="demo-mutiple-checkbox-label">Degree</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={degreeSelected}
                onChange={(e) => handleChange(e, FilterFields.Degree)}
                input={<Input />}
                renderValue={(selected) => (selected as string[]).join(', ')}
                MenuProps={MenuProps}
              >
                {degree.map((degree) => (
                  <MenuItem key={degree} value={degree}>
                    <Checkbox checked={degreeSelected.indexOf(degree) > -1} />
                    <ListItemText primary={degree} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="field">
              <InputLabel id="demo-mutiple-checkbox-label">
                Degree Type
              </InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={degreeTypeSelected}
                onChange={(e) => handleChange(e, FilterFields.DegreeType)}
                input={<Input />}
                renderValue={(selected) => (selected as string[]).join(', ')}
                MenuProps={MenuProps}
              >
                {degreeType.map((degreeType) => (
                  <MenuItem key={degreeType} value={degreeType}>
                    <Checkbox
                      checked={degreeTypeSelected.indexOf(degreeType) > -1}
                    />
                    <ListItemText primary={degreeType} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </BackgroundStyle>
      </Collapse>
    </SearchFilterStyle>
  );
};

const SearchFilterStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;

  .input {
    display: inline-flex;
  }

  .search-form {
    margin-right: 40px;
  }

  .filter-form {
    display: inline-block;
  }

  .field {
    min-width: 120px;
    max-width: 300px;
  }
`;
