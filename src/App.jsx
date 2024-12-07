import { useState } from 'react';
import './styles/App.css';
import Header from './components/Header/Header';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import Modal from './components/Modal/Modal';
import Pagination from './components/pagination/Pagination';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const taskPerPage = 4;

  // タスク追加
  const addTask = taskText => {
    if (taskText.trim() === '') {
      setError('Please input task');
      return;
    }

    if (taskText.length > 30) {
      setError('Please input task until 30 text');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  // Enterキーでタスクを追加
  const handleKeyDown = (e, taskText, setTaskText) => {
    if (e.key === 'Enter') {
      if (taskText.trim() === '') {
        setError('Please input task');
        return;
      }

      addTask(taskText);
      setTaskText('');
    }
  };

  // タスク削除
  const deleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);

    // タスク削除後のページ数を再計算
    const totalPages = Math.ceil(updatedTasks.length / taskPerPage);

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  };

  // タスク完了/未完了の切り替え
  const toggleTaskCompletion = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //ページ切り替え
  const handlePageChange = page => setCurrentPage(page);

  // 現在のページに表示するタスクの計算
  const startIndex = (currentPage - 1) * taskPerPage;
  const currentTasks = tasks.slice(startIndex, startIndex + taskPerPage);

  // モーダル閉じる
  const closeModal = () => {
    setError('');
  };

  return (
    <div className="App">
      <Header />
      <TaskForm addTask={addTask} handleKeyDown={handleKeyDown} />
      {tasks.length > 0 ? (
        <>
          <TaskList
            tasks={currentTasks}
            deleteTask={deleteTask}
            toggleTaskCompletion={toggleTaskCompletion}
          />
          <Pagination
            totalTasks={tasks.length}
            tasksPerPage={taskPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>No any task</p>
      )}
      <Modal isOpen={error} message={error} onClose={closeModal} />
    </div>
  );
}

export default App;
