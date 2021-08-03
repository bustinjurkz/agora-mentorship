import { Prisma, PrismaClient } from '@db/client';
import { ApolloServer, gql } from 'apollo-server-micro';
import { GraphQLError } from 'graphql';
import { Context } from './context';
import * as resolvers from './resolvers';
import loaders from './loaders';
import path from 'path';
import fs from 'fs';

export interface MakeGraphServerInput {
  tracing?: boolean;
  logError?: (err: GraphQLError) => void;
  dbLogging?: Prisma.PrismaClientOptions['log'];
}

export interface MakeGraphServerResult {
  server: ApolloServer;
  prisma: PrismaClient;
  cleanup: () => Promise<void>;
}

export function makeGraphServer(
  input: MakeGraphServerInput,
): MakeGraphServerResult {
  const prisma = new PrismaClient({
    log: input.dbLogging,
  });

  return {
    prisma,
    cleanup: () => prisma.$disconnect(),
    server: new ApolloServer({
      typeDefs: gql(fs.readFileSync(path.join('schema.graphql')).toString()),
      resolvers: resolvers as any,
      context: () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context: Context = { prisma, isTest: true, loaders: {} as any };
        const map: Record<string, unknown> = {};
        for (const [k, l] of Object.entries(loaders)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          context.loaders[k] = () => {
            if (map[k]) return map[k];
            map[k] = l(context);
            return map[k];
          };
        }
        return context;
      },
      playground: true,
      tracing: input.tracing,
      formatError: (err) => {
        console.log(input, err);
        // if (!input.production)
        return err;
        // if (err.extensions?.code === 'INTERNAL_SERVER_ERROR') {
        //   if (input.logError) input.logError(err);
        //   return new ApolloError(
        //     'Internal Server Error',
        //     'INTERNAL_SERVER_ERROR',
        //   );
        // }

        return err;
      },
    }),
  };
}
