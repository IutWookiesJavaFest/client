import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import hooks from React Router
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonLoading from '@/mycomponents/loading/Loading';
import PageLoading from '@/mycomponents/loading/PageLoading';
const API_PATH = import.meta.env.VITE_API_PATH;

const TodoUpdate = () => {
  const navigate = useNavigate(); // For navigation after update
  const location = useLocation();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [task, setTask] = useState('');
  const [repeat, setRepeat] = useState('0');
  const [pageLoading, setPageLoading] = useState(true);

    //check if todoId parsed 
  if (!location.state || !location.state.todoId) {
    useEffect(() => {
      console.error("No medicine ID found in location state");
      navigate("/profile/todo"); // Redirect to a safe page, like medicine list
    }, []); // Runs only on initial render
    return null; // Render nothing while redirecting
  }

  const { todoId } = location.state;

  // Fetch the task when the component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${API_PATH}/todos/${todoId}`); // Fetch task by ID
        const { task, repeat } = response.data;
        setTask(task); // Set the task text
        setRepeat(repeat ? '1' : '0'); // Set repeat status (as '1' or '0')
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchTask();
  }, [todoId]); // Only run when the component mounts and `id` changes

  // Handle form submission to update the task
  const handleUpdate = async (e) => {
    setButtonLoading(true);
    e.preventDefault();

    // Form data for updating the task
    const formData = {
      task,
      repeat: repeat === '1', // Convert repeat value to boolean
    };

    try {
      // PUT request using Axios to update the task
      const response = await axios.put(`${API_PATH}/todos/${todoId}`, formData);

      // Handle successful response (e.g., redirect or show success message)
      console.log('Task updated successfully:', response.data);
      navigate('/profile/todo'); // Navigate back to the todo list
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error updating task:', error);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      {
        pageLoading ? 
          <PageLoading /> 
          :
          <Card className="w-[350px]">
            <CardHeader>
            <CardTitle>Update Task</CardTitle>
            <CardDescription>Update your task and set if it's repetitive or not</CardDescription>
            </CardHeader>
            <CardContent>
            <form>
                <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Task</Label>
                    <Input
                    id="name"
                    placeholder="Write the task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="repeat">Repeat</Label>
                    <Select value={repeat} onValueChange={setRepeat}>
                    <SelectTrigger id="repeat">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </div>
            </form>
            </CardContent>
            <CardFooter className="flex justify-between">
            <Button variant="outline" type="submit" onClick={handleUpdate}>
                {buttonLoading ? <ButtonLoading /> : "Update"}
            </Button>
            </CardFooter>
        </Card>
      }
    </div>
  );
};

export default TodoUpdate;
