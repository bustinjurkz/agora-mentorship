import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { servicePrettier, UserType } from 'components/utils';
import format from 'date-fns/format';
import { Meeting, Mentee, Mentor } from 'generated/graphql';
import addHours from 'date-fns/addHours';
import React, { useState } from 'react';
import TimerIcon from '@mui/icons-material/Timer';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import { MeetingActionModal } from './MeetingActionModal';

export interface PendingMeetingCardProps {
  meeting: Meeting;
  otherUser: Mentor | Mentee;
  userType: UserType;
  mentorEmail?: string;
  mentorName?: string;
  refetch: () => void;
}

export const PendingMeetingCard: React.FC<PendingMeetingCardProps> = ({
  meeting,
  otherUser,
  userType,
  mentorEmail,
  mentorName,
  refetch,
}) => {
  const [action, setAction] = useState<
    'change' | 'accept' | 'status' | undefined
  >(undefined);
  const [finish, setFinish] = useState(false);
  return (
    <PendingMeetingCardStyle>
      <div className="card-container">
        <div className="mentee">
          <AccountCircleIcon className="avatar" />
          <div className="info">
            <span className="name">{otherUser.name}</span>
            <span className="jobtitle">{otherUser.job_title_primary}</span>
          </div>
        </div>
        <span className="meeting-type">{servicePrettier(meeting.topic!)}</span>

        <span className="date">
          {format(new Date(meeting!.proposed_times![0]?.time as Date), 'PPPP')}
        </span>

        <div className="meeting-times">
          {meeting?.proposed_times?.map((x, i: number) => (
            <div key={i} className="time">
              {format(new Date(x?.time), "h:mm aaaaa'm'")} -{' '}
              {format(addHours(new Date(x?.time), 1), "h:mm aaaaa'm'")}
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <Button
            className="button decline"
            onClick={() => setAction('change')}
          >
            <CancelIcon fontSize="large" />
            {userType === 'mentor' ? 'Decline' : 'Cancel'}
          </Button>
          {userType === 'mentor' ? (
            <Button
              className="button accept"
              onClick={() => setAction('accept')}
            >
              <CheckBoxIcon fontSize="large" />
              Accept
            </Button>
          ) : (
            <Button
              className="button accept"
              onClick={() => setAction('status')}
              disabled={true}
            >
              <TimerIcon fontSize="large" />
              Status
            </Button>
          )}
        </div>
      </div>

      {action !== undefined && (
        <MeetingActionModal
          finish={finish}
          setFinish={setFinish}
          meeting={meeting}
          mentee={meeting.mentee as Mentee}
          action={action}
          setAction={setAction}
          mentorEmail={mentorEmail}
          mentorName={mentorName}
          refetch={refetch}
        />
      )}
    </PendingMeetingCardStyle>
  );
};

const PendingMeetingCardStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  .date {
    color: ${({ theme }) => theme.mainGreen};
  }

  .action-buttons {
    display: flex;
    flex-direction: row;
    .accept {
      color: ${({ theme }) => theme.TDGreen};
    }
    .decline {
      color: #e01111;
    }
  }
  .card-container {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border-left: 5px solid #ff9500;
    padding: 0px 30px 15px 30px;
    background: ${({ theme }) => theme.lightGreen};
    .meeting-type {
      color: ${({ theme }) => theme.mainGreen};
      font-weight: 600;
      margin-bottom: 10px;
    }
    .meeting-times {
      display: flex;
      flex-direction: column;
      font-size: smaller;
      margin-bottom: 2rem;
      margin-top: 12px;
      background: #ececec;
      padding: 12px;
      border-radius: 5px;
      .time {
        font-size: medium;
        margin-bottom: 8px;
      }
    }
  }

  .mentee {
    display: inline-flex;
    margin-top: 25px;
    margin-bottom: 30px;
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
