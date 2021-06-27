import styled from 'styled-components';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export interface UpcomingMeetingCardProps {
  sampleData: any;
}

export const UpcomingMeetingCard: React.FC<UpcomingMeetingCardProps> = ({
  sampleData,
}) => {
  return (
    <UpcomingCardStyle>
      <h4 className="date">{sampleData.date}</h4>
      <div className="card-container">
        <span className="meeting-type">{sampleData.type}</span>
        <span className="meeting-time">{sampleData.time}</span>
        <div className="mentee">
          <AccountCircleIcon className="avatar" />
          <div className="info">
            <span className="name">{sampleData.mentee}</span>
            <span className="jobtitle">{sampleData.jobtitle}</span>
            <span className="position">{sampleData.position}</span>
            <span className="company">{sampleData.company}</span>
          </div>
        </div>
      </div>
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
      font-size: smaller;
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
