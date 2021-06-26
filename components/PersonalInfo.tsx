import Button from '@material-ui/core/Button';
import { Mentor } from 'generated/graphql';
import React, { useState } from 'react';
import styled from 'styled-components';
import { BackgroundStyle } from './helperFunctions';

export enum FieldType {
  'bio',
  'position',
  'education',
  'services',
}

export interface PersonalInfoProps {
  mentorInfo: Mentor;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ mentorInfo }) => {
  const [fieldSelected, setFieldSelected] = useState<FieldType>(FieldType.bio);
  const renderContentHeader = () => {
    switch (fieldSelected) {
      case FieldType.bio:
        return 'Personal Bio';
      case FieldType.education:
        return 'Education';
      case FieldType.position:
        return 'Job Position';
      case FieldType.services:
        return 'Services Offered';
    }
  };
  const renderContentBody = () => {
    switch (fieldSelected) {
      case FieldType.bio:
        return mentorInfo.bio;
      case FieldType.education:
        return (
          <div className="education">
            <div className="school">{mentorInfo.school}</div>
            <div className="major">{mentorInfo.school_major}</div>
            <div className="year">{mentorInfo.school_year}</div>
          </div>
        );
      case FieldType.position:
        return (
          <div className="job-info">
            <div className="primary">{mentorInfo.job_title_primary}</div>
            <div className="secondary">{mentorInfo.job_title_secondary}</div>
          </div>
        );
      case FieldType.services:
        return mentorInfo.preferred_services.map((x) => {
          return (
            <div key={x} className="services">
              {x}
            </div>
          );
        });
    }
  };
  return (
    <PersonalInfoStyle>
      <div className="header">
        <h2>Personal Info</h2>{' '}
        <Button size={'small'} className="edit">
          Edit All
        </Button>
      </div>
      <BackgroundStyle>
        <div className="fields">
          <Button
            onClick={() => {
              setFieldSelected(FieldType.bio);
            }}
            variant={fieldSelected === FieldType.bio ? 'contained' : 'text'}
            disableElevation
            className="field bio"
          >
            Bio
          </Button>
          <Button
            disableElevation
            onClick={() => {
              setFieldSelected(FieldType.position);
            }}
            variant={
              fieldSelected === FieldType.position ? 'contained' : 'text'
            }
            className="field position"
          >
            Job Position
          </Button>
          <Button
            disableElevation
            onClick={() => {
              setFieldSelected(FieldType.education);
            }}
            variant={
              fieldSelected === FieldType.education ? 'contained' : 'text'
            }
            className="field education"
          >
            Education
          </Button>
          <Button
            disableElevation
            onClick={() => {
              setFieldSelected(FieldType.services);
            }}
            variant={
              fieldSelected === FieldType.services ? 'contained' : 'text'
            }
            className="field services"
          >
            Services
          </Button>
        </div>
      </BackgroundStyle>
      <BackgroundStyle style={{ marginTop: 17 }}>
        <div className="info-content">
          <div className="info-content-header">
            <h4 className="header-text">{renderContentHeader()}</h4>

            <Button size={'small'} className="edit">
              Edit
            </Button>
          </div>
          <div className="content-body">{renderContentBody()}</div>
        </div>
      </BackgroundStyle>
    </PersonalInfoStyle>
  );
};

export default PersonalInfo;

const PersonalInfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  .header {
    display: inline-flex;
    justify-content: space-between;
  }

  .fields {
    display: inline-flex;
    justify-content: space-between;
  }
  .info-content {
    .content-body {
      margin-left: 0px 10px;
      margin-bottom: 5px;
    }
  }

  .info-content-header {
    display: inline-flex;
    height: 45px;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    .header-text {
      color: ${({ theme }) => theme.TDGreen};
    }
  }
`;
