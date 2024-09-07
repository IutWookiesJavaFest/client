import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './Todo.css';
import { Button } from "@/components/ui/button";
import { FiEdit, FiTrash } from 'react-icons/fi'; // Import icons from React Icons
const API_PATH = import.meta.env.VITE_API_PATH;

const Todo = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // State to manage tasks and their completion status
  const [tasks, setTasks] = useState([
    { id: 1, text: "Read 30 minutes", completed: false },
    { id: 2, text: "Exercise for 20 minutes", completed: false },
    { id: 3, text: "Write daily journal", completed: false },
  ]);

  const getAllDailyTodo = async () => {
    try {
      // POST request using Axios to save the task
      const response = await axios.post(`${API_PATH}/todos`, formData);

      // Handle successful response (e.g., redirect or show success message)
      console.log('Task saved successfully:', response.data);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error saving task:', error);
    }
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle task deletion
  const deleteTask = async (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    try {
      // POST request using Axios to save the task
      const response = await axios.delete('/api/todos');
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error saving task:', error);
    }
  };

  // Handle task update (for now, let's just navigate to the update page)
  const updateTask = (todoId) => {
    navigate(`/profile/todo/update`, { state: { todoId } });
  };

  // Navigate to the todoCreate page when "New Task" is clicked
  const handleNewTaskClick = () => {
    navigate('/profile/todo/create');
  };

  return (
    <div className="p-[10vw] lg:p-[10vw] pt-[18vw] lg:pt-[8vw]">
      <h1 className="text-sm lg:text-3xl font-medium lg:pb-[3vw] text-center">Today's Tasks</h1>
      <Button className="lg:mb-[2vw]" onClick={handleNewTaskClick}>New Task</Button>
      
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between mb-[1vw]">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => handleCheckboxChange(task.id)}
            />
            <label
              htmlFor={`task-${task.id}`}
              className="text-sm lg:text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {task.text}
            </label>
          </div>

          <div className="flex space-x-2">
            <FiEdit
              className="h-5 w-5 text-blue-500 cursor-pointer"
              onClick={() => updateTask(task.id)}
            />
            <FiTrash
              className="h-5 w-5 text-red-500 cursor-pointer"
              onClick={() => deleteTask(task.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;
