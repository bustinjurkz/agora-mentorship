import { Mentor, Services } from 'generated/graphql';
import React from 'react';
import styled from 'styled-components';
import { BackgroundStyle, servicePrettier } from './helperFunctions';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import RightArrow from '@material-ui/icons/SubdirectoryArrowRight';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Button from '@material-ui/core/Button';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ForumIcon from '@material-ui/icons/Forum';
export interface MentorCardProps {
  mentor: Mentor;
  request?: boolean;
  setMentorRequested?: (x: Mentor) => void;
}
const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  request,
  setMentorRequested,
}) => {
  const renderServiceTag = (service: Services) => {
    const prettyService = servicePrettier(service);
    return <div className="tag-container">{prettyService}</div>;
  };

  return (
    <BackgroundStyle style={{ marginBottom: 35 }}>
      <MentorCardStyle>
        <div className="person-container">
          <AccountCircleIcon className="icon" />
          <h2 className="name">{mentor.name}</h2>
          <div className="match-container">
            <div className="percentage">83%</div>
            <div className="match">match</div>
          </div>
        </div>
        <div className="experience-container">
          <div className="career">
            <div className="primary">
              <WorkIcon className="icon" />
              <h3>{mentor.job_title_primary}</h3>
            </div>
            <div className="secondary">
              <RightArrow className="icon" />
              {mentor.job_title_secondary}
            </div>
          </div>
          <div className="education">
            <div className="primary">
              <SchoolIcon className="icon" />
              <h4> {mentor.school}</h4>
            </div>
            <div className="secondary">
              <RightArrow className="icon" />
              {mentor.school_major}, {mentor.degree_type}
            </div>
          </div>
        </div>
        <div className="services-container">
          <h5>PREFERRED SERVICES:</h5>
          <div className="tags">
            {mentor.preferred_services.map((x, i: number) => (
              <span key={i} className="service">
                {renderServiceTag(x!)}
              </span>
            ))}
          </div>
        </div>
        {!request && (
          <div className="request-container">
            <Button
              variant="outlined"
              className="button"
              onClick={() => setMentorRequested && setMentorRequested(mentor)}
              startIcon={<MeetingRoomIcon className="meeting-icon" />}
            >
              Request Mentor
            </Button>
            <div className="consults">
              <ForumIcon className="icon" />
              <span className="item">CONSULTS (4)</span>
            </div>
            <div className="reviews">
              <RateReviewIcon className="icon" />
              <span className="item">REVIEWS (3)</span>
            </div>
          </div>
        )}
      </MentorCardStyle>
    </BackgroundStyle>
  );
};

export default MentorCard;

export const MentorCardStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0px;
  margin: 0px 20px;
  .person-container,
  .services-container,
  .experience-container,
  .request-container {
    width: 230px;
    display: flex;
    flex-direction: column;
  }
  .person-container {
    align-items: center;

    .icon {
      font-size: 125px;
      color: ${(props) => props.theme.TDGreen};
    }
    .match-container {
      display: inline-flex;
      align-items: center;
      align-self: center;

      .percentage {
        background-color: ${(props) => props.theme.TDGreen};
        color: white;
        padding: 6px;
        font-weight: 500;
        margin-right: 10px;
      }
      .match {
        font-weight: 600;
      }
    }
  }
  .experience-container {
    .primary {
      display: inline-flex;
      align-items: center;
    }
    .secondary {
      margin-left: 15px;
    }
    .icon {
      color: ${(props) => props.theme.TDGreen};
      margin-right: 10px;
    }
  }
  .services-container {
    .tags {
      .tag-container {
        padding: 8px;
        margin-bottom: 8px;
        background: ${(props) => props.theme.TDGreen};
        color: white;
        width: fit-content;
      }
    }
  }
  .request-container {
    margin-top: 15px;
    .icon {
      color: ${(props) => props.theme.TDGreen};
    }
    .meeting-icon {
      font-size: xx-large;
    }
    .item {
      margin-left: 10px;
      font-size: smaller;
    }
    .consults,
    .reviews {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      font-weight: 600;
    }

    .button {
      color: ${(props) => props.theme.TDGreen};
      border: 3.5px solid #008a00 !important;
      margin-bottom: 20px;
      height: 100px;
      font-weight: 600;
      font-size: 18px;
    }
  }
`;
