import KanbanBoard from 'components/KanbanBoard';
import useSubscribeToNewTasks from 'hooks/useSubscribeToNewTasks';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  useSubscribeToNewTasks();

  return (
    <>
      <div className="h-full min-h-screen text-neutral-300 bg-neutral-800">
        <KanbanBoard />
      </div>
    </>
  );
};

export default Home;
