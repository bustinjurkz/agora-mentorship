import { Prisma, PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server-micro';
import { GraphQLError } from 'graphql';
import { Context } from './context';
import * as resolvers from './resolvers';
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
        const context: Context = { prisma, isTest: true };
        return context;
      },
      playground: true,
      tracing: input.tracing,
      formatError: (err) => {
        console.log(input, err);
        return err;
      },
    }),
  };
}
