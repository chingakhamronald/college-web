import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    }
  ]
});

//log on in dev env
if (process.env.NEXT_PUBLIC_NODE_ENV === 'dev') {
  prisma.$on('query', async e => {
    console.log('Query: ' + e.query);
    console.log('Params: ' + e.params);
    console.log('Duration: ' + e.duration + 'ms');
  });
}
