import { Prisma, PrismaClient } from '@prisma/client';
import { ApolloError, ApolloServer, gql } from 'apollo-server-micro';
import { GraphQLError } from 'graphql';
import { Context } from './context';
import * as resolvers from './resolvers';
import fs from 'fs';
import path from 'path';

export interface MakeGraphServerInput {
  tracing?: boolean;
  logError?: (err: GraphQLError) => void;
  isTest: boolean;
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
      typeDefs: gql(
        input.isTest
          ? fs
              .readFileSync(path.join(process.cwd(), '/schema.graphql'))
              .toString()
          : fs.readFileSync(path.join('api/schema.graphql')).toString(),
      ),
      resolvers: resolvers as any,
      context: () => {
        const context: Context = { prisma, isTest: true };
        return context;
      },
      playground: true,
      tracing: input.tracing,
      formatError: (err) => {
        console.log(input, err);
        if (err.extensions?.code === 'INTERNAL_SERVER_ERROR') {
          if (input.logError) input.logError(err);
          return new ApolloError(
            'Internal Server Error',
            'INTERNAL_SERVER_ERROR',
          );
        }
        return err;
      },
    }),
  };
}
