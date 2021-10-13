import React from 'react';
import { BackgroundStyle } from './utils';
import { useSelector } from 'react-redux';
import { selectPendingMeetings, selectUpcomingMeetings } from 'redux/store';
export interface NotificationBannerProps {
  userName: string;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  userName,
}) => {
  const upcomingMeetings = useSelector(selectUpcomingMeetings);
  const pendingMeetings = useSelector(selectPendingMeetings);

  return (
    <BackgroundStyle backgroundColor="#ff9500">
      <div className="notification-banner">
        Hi {userName}, you have{' '}
        {upcomingMeetings && upcomingMeetings?.length > 0
          ? upcomingMeetings?.length
          : 'no'}{' '}
        upcoming &{' '}
        {pendingMeetings && pendingMeetings.length > 0
          ? pendingMeetings.length
          : 'no'}{' '}
        pending meetings!
      </div>
    </BackgroundStyle>
  );
};
