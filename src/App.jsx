import { useState } from 'react';
import './styles/App.css';
import Header from './components/Header/Header';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import Modal from './components/Modal/Modal';
import Pagination from './components/pagination/Pagination';
import SearchBar from './components/SearchBar/SearchBar';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTask, setFilteredTask] = useState([]);
  const taskPerPage = 4;

  // タスク追加
  const addTask = taskText => {
    if (taskText.trim() === '') {
      setError('Please input task');
      return;
    }
    // Validation
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
    const targetTasks = filteredTask.length > 0 ? filteredTask : tasks;
    const updatedTasks = targetTasks.filter(task => task.id !== id);
    setTasks(tasks.filter(task => task.id !== id));

    setFilteredTask(updatedTasks);

    // タスク削除後のページ数を再計算
    const totalPages = Math.ceil(updatedTasks.length / taskPerPage);

    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  };

  // タスク完了/未完了の切り替え
  const toggleTaskCompletion = id => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    if (filteredTask.length > 0) {
      const updatedFilteredTasks = filteredTask.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setFilteredTask(updatedFilteredTasks);
    }
  };

  //ページ切り替え
  const handlePageChange = page => setCurrentPage(page);

  // 検索トリガー
  const handleSerach = () => {
    const result = tasks.filter(task =>
      task.text.toLowerCase().includes(searchQuery?.trim().toLowerCase())
    );
    setFilteredTask(result);
    setCurrentPage(1);
  };

  // 現在のページに表示するタスクの計算
  const displayTasks = filteredTask.length > 0 ? filteredTask : tasks;

  const startIndex = (currentPage - 1) * taskPerPage;

  const currentTasks = displayTasks.slice(startIndex, startIndex + taskPerPage);

  // ページ数計算
  const totalTasks = displayTasks.length;
  const totalPages = Math.ceil(totalTasks / taskPerPage);

  // モーダル閉じる
  const closeModal = () => {
    setError('');
  };

  return (
    <div className="App">
      <Header />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSerach}
      />
      <TaskForm addTask={addTask} handleKeyDown={handleKeyDown} />
      {filteredTask.length > 0 ? (
        <>
          <TaskList
            tasks={currentTasks}
            deleteTask={deleteTask}
            toggleTaskCompletion={toggleTaskCompletion}
          />
          <Pagination
            totalTasks={filteredTask.length}
            tasksPerPage={taskPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : searchQuery ? (
        <p>No tasks found for {searchQuery}</p>
      ) : tasks.length > 0 ? (
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
