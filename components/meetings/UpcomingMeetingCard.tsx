import styled from 'styled-components';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Meeting, Mentee, Mentor } from 'generated/graphql';
import format from 'date-fns/format';
import { servicePrettier } from 'components/utils';
import addHours from 'date-fns/addHours';
import Button from '@material-ui/core/Button';
import { MeetingActionModal } from './MeetingActionModal';
import { useState } from 'react';
export interface UpcomingMeetingCardProps {
  meeting: Meeting;
  otherUser: Mentor | Mentee;
}

export const UpcomingMeetingCard: React.FC<UpcomingMeetingCardProps> = ({
  meeting,
  otherUser,
}) => {
  const [action, setAction] = useState<
    'change' | 'accept' | 'status' | undefined
  >(undefined);
  const [finish, setFinish] = useState(false);
  return (
    <UpcomingCardStyle>
      <h4 className="date">{format(new Date(meeting.start_time), 'PPPP')}</h4>
      <div className="card-container">
        <span className="meeting-type">{servicePrettier(meeting.topic!)}</span>
        <span className="meeting-time">
          {format(new Date(meeting.start_time), "h:mm aaaaa'm'")} -{' '}
          {format(addHours(new Date(meeting.start_time), 1), "h:mm aaaaa'm'")}
        </span>
        <div className="mentee">
          <AccountCircleIcon className="avatar" />
          <div className="info">
            <span className="name">{otherUser.name}</span>
            <span className="jobtitle">{otherUser.job_title_primary}</span>
          </div>
        </div>

        <Button className="button decline" onClick={() => setAction('change')}>
          Cancel
        </Button>
      </div>

      {action !== undefined && (
        <MeetingActionModal
          finish={finish}
          setFinish={setFinish}
          meeting={meeting}
          mentee={meeting.mentee as Mentee}
          action={action}
          setAction={setAction}
        />
      )}
    </UpcomingCardStyle>
  );
};

const UpcomingCardStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  .date {
    color: ${({ theme }) => theme.mainGreen};
  }
  .card-container {
    display: flex;
    border-radius: 5px;
    border-left: 5px solid;
    padding: 20px 30px;
    flex-direction: column;
    background: ${({ theme }) => theme.lightGreen};
    .meeting-type {
      color: ${({ theme }) => theme.mainGreen};
      font-weight: 600;
      margin-bottom: 10px;
    }
    .meeting-time {
      font-size: medium;
    }
    .decline {
      margin-top: 10px;
      display: flex;
      justify-content: flex-start;
    }
  }

  .mentee {
    display: inline-flex;
    margin-top: 25px;
    .avatar {
      color: ${({ theme }) => theme.TDGreen};
      font-size: 3rem;
      margin-right: 20px;
    }
    .info {
      display: flex;
      flex-direction: column;
      .name {
        color: ${({ theme }) => theme.TDGreen};
        font-weight: 600;
      }
    }
  }
`;
