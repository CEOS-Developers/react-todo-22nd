import Header from '@/components/Header/Header';
import Calendar from '@/components/Calendar/Calendar';
import TodoModal from '@/components/TodoModal/TodoModal';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Calendar />
      </main>
      <TodoModal />
    </>
  );
};

export default Home;