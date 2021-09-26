import Button from '@material-ui/core/Button';
import { Majors, Mentee, Mentor } from 'generated/graphql';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  BackgroundStyle,
  majorPrettier,
  servicePrettier,
  UserType,
} from './utils';

export enum FieldType {
  'bio',
  'position',
  'education',
  'services',
}

export interface PersonalInfoProps {
  user: Mentor | Mentee;
  schoolName: string;
  userType: UserType;
  majors: Majors[];
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  user,
  schoolName,
  majors,
  userType,
}) => {
  const major = majorPrettier(majors[0]!.major);

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
        return userType === UserType.mentor && 'Services Offered';
    }
  };
  const renderContentBody = () => {
    switch (fieldSelected) {
      case FieldType.bio:
        return user?.bio;
      case FieldType.education:
        return (
          <div className="education">
            <div className="major">{major}</div>
            <div className="school">{schoolName}</div>
            <div className="year">{user?.school_year}</div>
          </div>
        );
      case FieldType.position:
        return (
          <div className="job-info">
            <div className="primary">{user?.job_title_primary}</div>
            <div className="secondary">{user?.job_title_secondary}</div>
          </div>
        );
      case FieldType.services:
        return (
          userType === UserType.mentor &&
          user?.preferred_services.map((x) => {
            return (
              <div key={x} className="service">
                {servicePrettier(x!)}
              </div>
            );
          })
        );
    }
  };
  return (
    <PersonalInfoStyle>
      <div className="header">
        <h2>Personal Info</h2>
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
          {userType === UserType.mentor && (
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
          )}
        </div>
      </BackgroundStyle>
      <BackgroundStyle style={{ marginTop: 17 }} fullHeight>
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
  .service {
    margin: 5px 0px 15px 0px;
    font-weight: 600;
  }
  .job-info {
    .primary {
      font-weight: 600;
      margin-bottom: 5px;
    }
  }
  .header {
    display: inline-flex;
    justify-content: space-between;
  }
  .edit {
    color: ${({ theme }) => theme.lightGrey};
  }

  .fields {
    display: inline-flex;
    justify-content: space-between;
  }
  .info-content {
    flex: auto;
    margin: 0px 10px;
    .content-body {
      margin-left: 0px 10px;
      margin-bottom: 5px;
      .education {
        .major {
          font-weight: 600;
          margin-bottom: 5px;
        }
      }
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
