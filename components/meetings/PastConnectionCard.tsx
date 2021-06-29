import styled from 'styled-components';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Rating from '@material-ui/lab/Rating';
export interface PastConnectionsCardProps {
  sampleData: any;
}

export const PastConnectionsCard: React.FC<PastConnectionsCardProps> = ({
  sampleData,
}) => {
  return (
    <PastConnectionsCardStyle>
      <div className="container">
        <div className="header">
          <AccountCircleIcon className="avatar" />
          <div className="info">
            <span className="name">{sampleData.mentee}</span>
            <span className="history">1 Consult, 1 Upcoming</span>
          </div>
        </div>
        <div className="card-body">
          <span className="jobtitle">{sampleData.jobtitle}</span>
          <span className="position">{sampleData.position}</span>
          <span className="company">{sampleData.company}</span>
          <div className="rating">
            <Rating className="stars" name="read-only" value={4} readOnly />
          </div>
        </div>
      </div>
    </PastConnectionsCardStyle>
  );
};

const PastConnectionsCardStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  width: 275px;
  .container {
    display: flex;
    border-radius: 5px;
    flex-direction: column;
    background: ${({ theme }) => theme.lightGreen};

    .jobtitle {
      font-weight: 600;
    }
    .rating {
      align-self: flex-end;
      .stars {
        color: ${({ theme }) => theme.mainGreen};
      }
    }

    .card-body {
      display: flex;
      flex-direction: column;
      padding: 15px;
    }
  }

  .header {
    display: inline-flex;
    color: ${({ theme }) => theme.white};
    background: ${({ theme }) => theme.TDGreen};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 10px;
    .avatar {
      font-size: 3rem;
      margin-right: 20px;
      color: ${({ theme }) => theme.white};
    }
    .info {
      display: flex;
      flex-direction: column;
      align-self: center;
      .history {
        font-weight: 400;
        font-size: smaller;
      }
      .name {
        color: ${({ theme }) => theme.white};

        font-weight: 600;
        font-size: larger;
      }
    }
  }
`;
