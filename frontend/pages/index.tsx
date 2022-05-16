import KanbanBoard from 'components/KanbanBoard';
import useSubscribeToTasks from 'hooks/useSubscribeToTasks';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  useSubscribeToTasks();

  return (
    <>
      <div className="h-full min-h-screen text-neutral-300 bg-neutral-800">
        <KanbanBoard />
      </div>
    </>
  );
};

export default Home;
