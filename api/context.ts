// import loaders from './loaders';
import { PrismaClient } from '@prisma/client';

// type Loaders = {
//   readonly [P in keyof typeof loaders]: () => ReturnType<typeof loaders[P]>;
// };
export interface Context {
  prisma: PrismaClient;
  // loaders: Loaders;
  isTest: boolean;
}
