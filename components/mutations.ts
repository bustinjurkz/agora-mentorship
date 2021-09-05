import gql from 'graphql-tag';

gql`
  mutation CreateMeeting($input: CreateMeetingInput!) {
    createMeeting(input: $input)
  }
`;
