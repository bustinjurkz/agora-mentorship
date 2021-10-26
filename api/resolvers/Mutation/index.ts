import { MutationResolvers, Services } from '../../generated/graphql';
import { google } from 'googleapis';
import config from '../../config';
import {
  DegreeType,
  getHighestEducation,
  servicePrettier,
} from 'components/utils';
import { addHours, parseISO } from 'date-fns';
export const Mutation: MutationResolvers = {
  createUser: async (_, { input }, ctx) => {
    await ctx.prisma.user
      .create({
        data: {
          email: input.email,
          password: input.password,
        },
      })

      .then(async (x) => {
        console.log('CREATED USER WITH ID: ', x.id);
        if (input.mentee) {
          await ctx.prisma.user.update({
            where: {
              id: x.id,
            },
            data: {
              language: {
                connect: input.language.map((x) => {
                  return { language: x };
                }),
              },
              university: {
                connect: input.university.map((x) => {
                  return { name: x };
                }),
              },
              majors: {
                connect: input.majors.map((x) => {
                  return { major: x };
                }),
              },
              skills: {
                connect: input.skills.map((x) => {
                  return { skill: x };
                }),
              },

              mentee: {
                create: {
                  birthyear: input.mentee.birthyear as number,
                  degree_type: input.mentee.degree_type as string,
                  highest_education: getHighestEducation(
                    input.mentee.degree_type as DegreeType,
                  ),
                  name: input.mentee.name,
                  years_experience: input.mentee.years_experience,
                  bio: input.mentee.bio,
                  job_title_primary: input.mentee.job_title_primary,
                  job_title_secondary: input.mentee.job_title_secondary,
                  preferred_services: input.mentee
                    .preferred_services as Services[],
                },
              },
            },
          });
        } else if (input.mentor) {
          await ctx.prisma.user.update({
            where: {
              id: x.id,
            },
            data: {
              language: {
                connect: input.language.map((x) => {
                  return { language: x };
                }),
              },
              university: {
                connect: input.university.map((x) => {
                  return { name: x };
                }),
              },
              majors: {
                connect: input.majors.map((x) => {
                  return { major: x };
                }),
              },
              skills: {
                connect: input.skills.map((x) => {
                  return { skill: x };
                }),
              },

              mentor: {
                create: {
                  birthyear: input.mentor.birthyear as number,
                  degree_type: input.mentor.degree_type as DegreeType,
                  highest_education: getHighestEducation(
                    input.mentor.degree_type as DegreeType,
                  ),
                  name: input.mentor.name,
                  years_experience: input.mentor.years_experience,
                  bio: input.mentor.bio,
                  job_title_primary: input.mentor.job_title_primary,
                  job_title_secondary: input.mentor.job_title_secondary,
                  preferred_services: input.mentor
                    .preferred_services as Services[],
                  availability: {
                    create: input.mentor!.availability!.map((x) => {
                      return { time: x! };
                    }),
                  },
                },
              },
            },
          });
        }
      })
      .catch((e) => {
        throw e;
      });
    return true;
  },
  proposeMeeting: async (_, { input }, ctx) => {
    const userMenteeId = await ctx.prisma.mentee.findFirst({
      where: { userId: parseInt(input.menteeId) },
      select: {
        id: true,
      },
    });
    const res = await ctx.prisma.meeting.create({
      data: {
        topic: input.topic,
        proposed_times: {
          create: input.proposed_times.map((x) => {
            return { time: new Date(x) };
          }),
        },
        mentee: { connect: { id: userMenteeId?.id } },
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
      config.google.oauthClientSecret,
    );
    oAuth2Client.setCredentials({ refresh_token: config.google.refreshToken });
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    calendar.events
      .insert({
        auth: oAuth2Client,
        calendarId: 'primary',
        requestBody: {
          summary: `Meeting between ${input.mentorName} and ${input.menteeName}`,
          location: 'Remote',
          description: `An informational networking session on the topic of: ${servicePrettier(
            input.topic,
          )}. Please note Agora Mentoring does not attend the meeting, we merely organize it.`,

          start: {
            dateTime: input.start_time,
          },
          end: {
            dateTime: addHours(parseISO(input.start_time), 1) as any,
          },
          attendees: [
            { email: menteeEmail?.email },
            { email: input.mentorEmail },
          ],
          conferenceData: {
            createRequest: {
              conferenceSolutionKey: {
                type: 'hangoutsMeet',
              },
              requestId: randomstring.generate(),
            },
          },
        },
        conferenceDataVersion: 1,
        sendNotifications: true,
      })
      .then(() => {
        ctx.prisma.meeting
          .update({
            where: {
              id: parseInt(input.id),
            },
            data: {
              start_time: input.start_time,
            },
          })
          .catch((e) => {
            throw e;
          });
      })
      .catch((e) => {
        console.log('catch: ', e);
        return false;
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
