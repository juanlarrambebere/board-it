import KanbanBoard from 'components/KanbanBoard';
import useSubscribeToNewTasks from 'hooks/useSubscribeToNewTasks';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  useSubscribeToNewTasks();

  return (
    <>
      <div className="flex w-full h-screen">
        <KanbanBoard />
      </div>
    </>
  );
};

export default Home;
