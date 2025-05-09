import { getQueryClient, trpc } from '@/trpc/server';

export default async function Home() {
  const queryClient = getQueryClient();
  const hello = await queryClient.fetchQuery(trpc.hello.queryOptions({ text: 'world' }));

  return (
    <div>
      {JSON.stringify(hello, null, 2)}
    </div>
  )
}