import styled from 'styled-components';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export interface PendingMeetingCardProps {
  sampleData: any;
}

export const PendingMeetingCard: React.FC<PendingMeetingCardProps> = ({
  sampleData,
}) => {
  return (
    <PendingMeetingCardStyle>
      <div className="card-container">
        <span className="meeting-type">{sampleData.type}</span>
        <span className="date">{sampleData.date}</span>

        <div className="meeting-times">
          {sampleData.times.map((x: string, i: number) => (
            <div key={i} className="time">
              {x}
            </div>
          ))}
        </div>
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
    padding: 20px 30px;
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
      margin: 10px 0px 0px 40px;
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
