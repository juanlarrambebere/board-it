import KanbanBoard from 'components/KanbanBoard';
import useSubscribeToTasks from 'hooks/useSubscribeToTasks';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  useSubscribeToTasks();

  return (
    <>
      <Head>
        <title>Board it</title>
      </Head>
      <div className="flex justify-center h-full min-h-screen text-neutral-300 bg-neutral-800">
        <KanbanBoard />
      </div>
    </>
  );
};

export default Home;
