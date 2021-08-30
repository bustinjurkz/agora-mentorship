import { MentorWithScore, Services } from 'generated/graphql';
import React, { useState } from 'react';
import styled from 'styled-components';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Button from '@material-ui/core/Button';
import MentorCard from './MentorCard';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Divider from '@material-ui/core/Divider';
import RequestConfirmation from './RequestConfirmation';
import TimeSelect from './TimeSelect';
import { isEqual } from 'date-fns';

export interface RequestMentorProps {
  mentor: MentorWithScore;
  back: () => void;
}

const RequestMentor: React.FC<RequestMentorProps> = ({ mentor, back }) => {
  const [topic, setTopic] = useState<Services>();
  const [finish, setFinish] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic((event.target as HTMLInputElement).value as Services);
  };
  const [times, setTimes] = useState<Date[]>([]);
  const handleSetTime = (time: Date) => {
    if (times.some((timeAdded) => isEqual(time, timeAdded))) {
      setTimes((times) => [
        ...times.filter((timeAdded) => !isEqual(time, timeAdded)),
      ]);
    } else {
      setTimes((times) => [...times, time]);
    }
  };

  const mentorSelected = mentor.mentor?.mentor;

  const services = [
    { value: Services.CareerDevelopment, label: 'Career Development' },
    { value: Services.CareerPlanning, label: 'Career Planning' },
    { value: Services.General, label: 'General' },
    { value: Services.MockInterview, label: 'Mock Interview' },
    { value: Services.ResumeCritique, label: 'Resume/CV Critique' },
    { value: Services.SkillsForSuccess, label: 'Skills for Success' },
    { value: Services.SuccessAtWork, label: 'Success at Work' },
    { value: Services.WorkLifeBalance, label: 'Work-Life Balance' },
  ];

  return (
    <RequestMentorStyle>
      <div className="header">
        <Button
          className="back"
          startIcon={<KeyboardBackspaceIcon className="back-icon" />}
          onClick={() => back()}
        >
          Back
        </Button>

        <h1>You've Selected:</h1>
      </div>
      <MentorCard mentorWithScore={mentor} request={true} />
      <div className="topic-question">
        <h2>Which topic do you want to discuss with {mentorSelected?.name}?</h2>
        <h4 className="select-one">(Select one)</h4>
      </div>
      <FormControl className="select-service" component="fieldset">
        <RadioGroup
          aria-label="service"
          name="services"
          value={topic}
          onChange={handleChange}
        >
          {services.map((x, key: number) => {
            return (
              <FormControlLabel
                value={x.value}
                control={<Radio />}
                label={x.label}
                key={key}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <Divider className="divider" />
      <TimeSelect
        handleSetTime={handleSetTime}
        times={times}
        mentor={mentorSelected!}
      />
      <Button
        variant="contained"
        disabled={times.length < 3 || !topic}
        disableElevation
        className="finish"
        onClick={() => setFinish(true)}
      >
        Finish
      </Button>
      <RequestConfirmation
        finish={finish}
        setFinish={setFinish}
        topic={topic!}
        times={times}
      />
    </RequestMentorStyle>
  );
};

export default RequestMentor;

const RequestMentorStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .header {
    .back {
      font-size: larger;
    }
  }

  .topic-question {
    display: inline-flex;
    align-items: center;
    .select-one {
      margin-left: 15px;
    }
  }

  .divider {
    margin: 40px 0px;
  }

  .finish {
    width: 200px;
    height: 60px;
    align-self: center;
    color: white;
    font-size: larger;
    background: ${(props) => props.theme.TDGreen};
  }
`;
