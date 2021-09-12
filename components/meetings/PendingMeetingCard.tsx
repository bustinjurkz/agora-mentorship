import styled from 'styled-components';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { servicePrettier } from 'components/utils';
import format from 'date-fns/format';
import { Meeting, Mentee, Mentor } from 'generated/graphql';
import addHours from 'date-fns/addHours';

export interface PendingMeetingCardProps {
  meeting: Meeting;
  otherUser: Mentor | Mentee;
}

export const PendingMeetingCard: React.FC<PendingMeetingCardProps> = ({
  meeting,
  otherUser,
}) => {
  return (
    <PendingMeetingCardStyle>
      <div className="card-container">
        <span className="meeting-type">{servicePrettier(meeting.topic!)}</span>

        <span className="date">
          {format(new Date(meeting.start_time), 'PPPP')}
        </span>

        <div className="meeting-times">
          {meeting?.proposed_times?.map((x, i: number) => (
            <div key={i} className="time">
              {format(new Date(x?.time), "h:mm aaaaa'm'")} -{' '}
              {format(addHours(new Date(x?.time), 1), "h:mm aaaaa'm'")}
            </div>
          ))}
        </div>
        <div className="mentee">
          <AccountCircleIcon className="avatar" />
          <div className="info">
            <span className="name">{otherUser.name}</span>
            <span className="jobtitle">{otherUser.job_title_primary}</span>
          </div>
        </div>
      </div>
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
  .card-container {
    display: flex;
    border-radius: 5px;
    border-left: 5px solid #ff9500;
    padding: 20px 45px;
    flex-direction: column;
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
      margin-top: 12px;
      background: #ececec;
      padding: 12px;
      border-radius: 5px;
      .time {
        margin-bottom: 8px;
      }
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
