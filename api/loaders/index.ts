// import DataLoader from 'dataloader';
// import { Context } from '../context';
// import { Language, Majors, PrismaClient, Skills, University } from '@db/client';

// function toMap<K, V>(values: V[], key: (x: V) => K): Map<K, V> {
//   return new Map(values.map((v) => [key(v), v]));
// }

// function toLookup<K, V>(values: V[], key: (x: V) => K): Map<K, V[]> {
//   const map = new Map<K, V[]>();
//   for (const v of values) {
//     const k = key(v);
//     const entry = map.get(k);
//     if (!entry) {
//       map.set(k, [v]);
//     } else {
//       entry.push(v);
//     }
//   }
//   return map;
// }

// function makeSingleLoader<TResult>(input: {
//   with: keyof PrismaClient;
//   load: string;
// }) {
//   return (ctx: Context) =>
//     new DataLoader(async (ids: readonly number[]): Promise<TResult[]> => {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const result = await (ctx.prisma[input.with] as any).findMany({
//         where: { id: { in: [...ids] } },
//         select: {
//           id: true,
//           [input.load]: true,
//         },
//       });
//       const map = toMap<number, { id: number }>(result, (x) => x.id);
//       return ids.map((x) => {
//         const val = map.get(x);
//         if (!val) return null;
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         return (val as any)[input.load];
//       });
//     });
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// function makeListLoader<TResult>(input: {
//   load: keyof PrismaClient;
//   byField: keyof TResult;
// }) {
//   return (ctx: Context) =>
//     new DataLoader(async (ids: readonly number[]) => {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const result = await (ctx.prisma[input.load] as any).findMany({
//         where: { [input.byField]: { in: [...ids] } },
//       });
//       const map = toLookup<number, TResult>(
//         result,
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         (x) => (x as any)[input.byField],
//       );
//       return ids.map((x) => map.get(x) ?? []);
//     });
// }

// export default {
//   languageByUserId: makeListLoader<Language>({
//     load: 'language',
//     byField: 'userId',
//   }),
//   skillsByUserId: makeListLoader<Skills>({
//     with: 'user',
//     load: 'skills',
//   }),
//   majorsByUserId: makeListLoader<Majors>({
//     with: 'user',
//     load: 'majors',
//   }),
//   universityByUserId: makeListLoader<University>({
//     with: 'user',
//     load: 'university',
//   }),
//   // companionsByPlantId: makeListLoader<Companion>({
//   //   load: 'companion',
//   //   byField: 'plantId',
//   // }),
//   // whenToPlantByPlantId: makeListLoader<WhenToPlant>({
//   //   load: 'whenToPlant',
//   //   byField: 'plantId',
//   // }),
// };
