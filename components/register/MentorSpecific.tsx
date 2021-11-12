import React from 'react';
import styled from 'styled-components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Theme, useTheme } from '@mui/material/styles';
import { parseDate, servicePrettier, services } from 'components/utils';
import Button from '@mui/material/Button';
import { format, isSameHour } from 'date-fns';
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

export interface MentorSpecificProps {
  registerState: any;
  setRegisterState: any;
  times: Date[];
  setTimes: any;
}

export const MentorSpecific: React.FC<MentorSpecificProps> = ({
  registerState,
  setRegisterState,
  times,
  setTimes,
}) => {
  const theme = useTheme();

  const handleServicesChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setRegisterState({
      userServices: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const selectedDate = new Date();
  const handleSetTime = (time: Date) => {
    if (times.some((timeAdded) => isSameHour(time, timeAdded))) {
      setTimes((times: Date[]) => [
        ...times.filter((timeAdded) => !isSameHour(time, timeAdded)),
      ]);
    } else {
      setTimes((times: Date[]) => [...times, time]);
    }
  };

  const renderTime = (timeslot: 'MORNING' | 'AFTERNOON' | 'EVENING') => {
    const morning = [
      parseDate(selectedDate!, 7),
      parseDate(selectedDate!, 8),
      parseDate(selectedDate!, 9),
      parseDate(selectedDate!, 10),
      parseDate(selectedDate!, 11),
    ];
    const afternoon = [
      parseDate(selectedDate!, 12),
      parseDate(selectedDate!, 13),
      parseDate(selectedDate!, 14),
      parseDate(selectedDate!, 15),
      parseDate(selectedDate!, 16),
    ];
    const evening = [
      parseDate(selectedDate!, 17),
      parseDate(selectedDate!, 18),
      parseDate(selectedDate!, 19),
      parseDate(selectedDate!, 20),
      parseDate(selectedDate!, 21),
    ];

    const renderButton = (time: Date, i: number) => {
      return (
        <Button
          key={i}
          className="container"
          onClick={() => handleSetTime(time)}
          style={{
            background: times.some((timeAdded) => isSameHour(time, timeAdded))
              ? '#1a5336'
              : '#d2e1da',
            color: times.some((timeAdded) => isSameHour(time, timeAdded))
              ? 'white'
              : '#1a5336',
            border: '2px solid white',
          }}
        >
          {format(time, "h:mm aaaaa'm'")}
        </Button>
      );
    };
    switch (timeslot) {
      case 'MORNING':
        return morning.map((morningTime, i: number) =>
          renderButton(morningTime, i),
        );
      case 'AFTERNOON':
        return afternoon.map((afternoonTime, i: number) =>
          renderButton(afternoonTime, i),
        );
      case 'EVENING':
        return evening.map((eveningTime, i: number) =>
          renderButton(eveningTime, i),
        );
    }
  };
  return (
    <MentorSpecificStyle>
      {/* <h1 className="sign-up-text">Services and Availability</h1> */}
      <div className="services">
        <h2>Select your preferred meeting topics</h2>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">
            Preferred Services
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={registerState.userServices}
            onChange={handleServicesChange}
            input={<OutlinedInput label="Skills" />}
            MenuProps={MenuProps}
          >
            {services.map((service, i: number) => (
              <MenuItem
                key={i}
                value={service}
                style={getStyles(service, registerState.userServices, theme)}
              >
                {servicePrettier(service)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="availability">
        <h2>Choose 3 or more suitable timeslots</h2>
        <div className="times">
          <div className="morning">
            <h4 className="label">MORNING</h4>
            {renderTime('MORNING')}
          </div>
          <div className="afternoon">
            <h4 className="label">AFTERNOON</h4>
            {renderTime('AFTERNOON')}
          </div>
          <div className="evening">
            <h4 className="label">EVENING</h4>
            {renderTime('EVENING')}
          </div>
        </div>
      </div>
    </MentorSpecificStyle>
  );
};

const MentorSpecificStyle = styled.div`
  .inputs-container {
    display: flex;
    flex-direction: row;
  }

  .times {
    display: flex;
    justify-content: space-around;
    .label {
      align-self: center;
    }
    .morning,
    .afternoon,
    .evening {
      display: flex;
      flex-direction: column;
    }
    .container {
      margin: 10px 0px;
      padding: 8px 60px;
      width: auto;
      font-size: larger;
      font-weight: 600;
    }
  }
`;
