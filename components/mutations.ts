import gql from 'graphql-tag';

gql`
  mutation ProposeMeeting($input: ProposeMeetingInput!) {
    proposeMeeting(input: $input)
  }
`;

gql`
  mutation CreateMeeting($input: CreateMeetingInput!) {
    createMeeting(input: $input)
  }
`;

gql`
  mutation CancelMeeting($input: CancelMeetingInput!) {
    cancelMeeting(input: $input)
  }
`;
