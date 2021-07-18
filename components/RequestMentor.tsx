import { Mentor, Services } from 'generated/graphql';
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

export interface RequestMentorProps {
  mentor: Mentor;
  back: () => void;
}

const RequestMentor: React.FC<RequestMentorProps> = ({ mentor, back }) => {
  const [topic, setTopic] = useState<Services>();
  const [finish, setFinish] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic((event.target as HTMLInputElement).value as Services);
  };
  const [times, setTimes] = useState(['']);
  const handleSetTime = (time: string) => {
    if (times.some((timeAdded) => time === timeAdded)) {
      setTimes((times) => [...times.filter((timeAdded) => timeAdded !== time)]);
    } else {
      setTimes((times) => [...times, time]);
    }
  };
  const renderTime = (timeslot: 'MORNING' | 'AFTERNOON' | 'EVENING') => {
    const morning = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'];
    const afternoon = ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
    const evening = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];

    const renderButton = (t: string, i: number) => {
      return (
        <Button
          key={i}
          className="container"
          onClick={() => handleSetTime(t)}
          value={t}
          style={{
            background: times.some((timeAdded) => timeAdded === t)
              ? '#1a5336'
              : '',
            color: times.some((timeAdded) => timeAdded === t) ? 'white' : '',
          }}
        >
          {t}
        </Button>
      );
    };
    switch (timeslot) {
      case 'MORNING':
        return morning.map((m, i: number) => renderButton(m, i));
      case 'AFTERNOON':
        return afternoon.map((a, i: number) => renderButton(a, i));
      case 'EVENING':
        return evening.map((e, i: number) => renderButton(e, i));
    }
  };
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
      <MentorCard mentor={mentor} request={true} />
      <div className="topic-question">
        <h2>Which topic do you want to discuss with {mentor.name}?</h2>
        <h4 className="select-one">(Select one)</h4>
      </div>
      <FormControl className="select-service" component="fieldset">
        <RadioGroup
          aria-label="service"
          name="services"
          value={topic}
          onChange={handleChange}
        >
          <FormControlLabel
            value={Services.SkillsForSuccess}
            control={<Radio />}
            label="Skills for Success"
          />
          <FormControlLabel
            value={Services.CareerDevelopment}
            control={<Radio />}
            label="Career Development"
          />
          <FormControlLabel
            value={Services.General}
            control={<Radio />}
            label="General"
          />
          <FormControlLabel
            value={Services.WorkLifeBalance}
            control={<Radio />}
            label="Work-Life Balance"
          />
          <FormControlLabel
            value={Services.CareerPlanning}
            control={<Radio />}
            label="Career Planning"
          />
          <FormControlLabel
            value={Services.MockInterview}
            control={<Radio />}
            label="Mock Interview"
          />
          <FormControlLabel
            value={Services.ResumeCritique}
            control={<Radio />}
            label="Resume/CV Critique"
          />
          <FormControlLabel
            value={Services.SuccessAtWork}
            control={<Radio />}
            label="Success at Work"
          />
        </RadioGroup>
      </FormControl>
      <Divider className="divider" />
      <div className="select-times">
        <h2>Please choose 3 or more suitable timeslots:</h2>
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
      <Button
        variant="contained"
        disabled={times.length < 4 || !topic}
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

  .select-times {
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
        border: 2px solid #008a00;
        margin: 10px 0px;
        padding: 8px 60px;
        font-size: larger;
        font-weight: 600;
      }
    }
    margin-bottom: 50px;
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
