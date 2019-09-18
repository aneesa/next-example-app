import Layout from '../components/Layout';
import Link from 'next/link';

const Todos = props => (
  <Layout>
    <h1>To Dos</h1>
    {props.tasks.map(task => (
      <div key={task.id}>
        <p>{task.id} - {task.task}</p>
      </div>
    ))}
  </Layout>
);

Todos.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/api/todos');
  const tasks = await res.json();

  return { tasks };
};

export default Todos;
