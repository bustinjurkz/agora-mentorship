import { Mentor } from 'generated/graphql';
import React from 'react';
import styled from 'styled-components';
import { BackgroundStyle } from './helperFunctions';
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
}
const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  return (
    <BackgroundStyle style={{ marginBottom: 35 }}>
      <MentorCardStyle>
        <div className="person-container">
          <AccountCircleIcon />
          <h2 className="name">{mentor.name}</h2>
          <div className="match">83% MATCH</div>
        </div>
        <div className="experience-container">
          <div className="career">
            <div className="primary">
              <WorkIcon />
              {mentor.job_title_primary}
            </div>
            <div className="secondary">
              <RightArrow />
              {mentor.job_title_secondary}
            </div>
          </div>
          <div className="education">
            <div className="primary">
              <SchoolIcon />
              {mentor.school}
            </div>
            <div className="secondary">
              <RightArrow />
              {mentor.degree_type},{mentor.school_major}
            </div>
          </div>
        </div>
        <div className="services-container">
          {mentor.preferred_services.map((x, i: number) => (
            <span key={i} className="service">
              {x}
            </span>
          ))}
        </div>
        <div className="request-container">
          <Button variant="outlined" startIcon={<MeetingRoomIcon />}>
            Request Mentor
          </Button>
          <div className="consults">
            <ForumIcon />
            <span className="item">CONSULTS (4)</span>
          </div>
          <div className="reviews">
            <RateReviewIcon />
            <span className="item">REVIEWS (3)</span>
          </div>
        </div>
      </MentorCardStyle>
    </BackgroundStyle>
  );
};

export default MentorCard;

export const MentorCardStyle = styled.div`
  display: flex;
  justify-content: space-between;
  .person-container {
    display: flex;
    flex-direction: column;
  }
  .experience-container {
    display: flex;
    flex-direction: column;
  }
  .services-container {
    display: flex;
    flex-direction: column;
  }
  .request-container {
    display: flex;
    flex-direction: column;
  }
`;
