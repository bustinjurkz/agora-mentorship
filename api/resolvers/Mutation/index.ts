import { MutationResolvers } from '../../generated/graphql';
import { google } from 'googleapis';
import config from '../../config';
import { servicePrettier } from 'components/utils';
import { addHours, parseISO } from 'date-fns';
export const Mutation: MutationResolvers = {
  proposeMeeting: async (_, { input }, ctx) => {
    const res = await ctx.prisma.meeting.create({
      data: {
        topic: input.topic,
        proposed_times: {
          create: input.proposed_times.map((x) => {
            return { time: new Date(x) };
          }),
        },
        mentee: { connect: { id: parseInt(input.menteeId) } },
        mentor: { connect: { id: parseInt(input.mentorId) } },
      },
      include: {
        proposed_times: true,
      },
    });

    return res.id.toString();
  },
  createMeeting: async (_, { input }, ctx) => {
    const menteeEmail = await ctx.prisma.user.findFirst({
      where: { id: parseInt(input.menteeUserId) },
      select: {
        email: true,
      },
    });
    const randomstring = require('randomstring');
    const { OAuth2 } = google.auth;
    const oAuth2Client = new OAuth2(
      config.google.oauthClientId,
      config.google.oauthclientSecret,
    );
    oAuth2Client.setCredentials({ refresh_token: config.google.refreshToken });
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    const event = {
      summary: `Meeting between ${input.mentorName} and ${input.menteeName}`,
      location: 'Remote',
      description: `An informational networking session on the topic of: ${servicePrettier(
        input.topic,
      )}. Please note Agora Mentoring does not attend the meeting, we merely organize it.`,
      start: {
        dateTime: input.start_time,
      },
      end: {
        dateTime: addHours(parseISO(input.start_time), 1),
      },
      attendees: [{ email: menteeEmail?.email }, { email: input.mentorEmail }],
      conferenceData: {
        createRequest: {
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
          requestId: randomstring.generate(),
        },
      },
    };

    const insertEvent = async () => {
      try {
        //@ts-ignore
        await calendar.events.insert({
          calendarId: 'primary',
          auth: oAuth2Client,
          resource: event,
          conferenceDataVersion: 1,
          sendNotifications: true,
        });
        return;
      } catch (e) {
        return e;
      }
    };
    insertEvent()
      .then(() =>
        ctx.prisma.meeting.update({
          where: {
            id: parseInt(input.id),
          },
          data: {
            start_time: input.start_time,
          },
        }),
      )
      .catch((e) => {
        throw e;
      });

    return true;
  },
  cancelMeeting: async (_, { input }, ctx) => {
    const res = await ctx.prisma.meeting.update({
      where: {
        id: parseInt(input.id),
      },
      data: {
        cancelled: true,
        cancel_reason: input.cancel_reason,
      },
    });

    console.log('res:', res);
    return true;
  },
};
