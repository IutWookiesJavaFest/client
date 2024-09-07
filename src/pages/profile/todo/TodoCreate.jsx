import React, { useState } from 'react';
import axios from 'axios';
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
const API_PATH = import.meta.env.VITE_API_PATH;

const TodoCreate = () => {
  // State to manage the form values
  const [buttonLoading, setButtonLoading] = useState(false);
  const [task, setTask] = useState('');
  const [repeat, setRepeat] = useState('0'); // Default value set to "No" (0)

  // Handle form submission with Axios
  const createTodo = async () => {
    setButtonLoading(true);

    // Form data
    const formData = {
      task,
      repeat: repeat === '1', // Convert to boolean
    };

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

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>New Task</CardTitle>
          <CardDescription>Add a new task for a single or repetitive times</CardDescription>
        </CardHeader>
        <CardContent>
          <form >
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
            <Button variant="outline" type="submit" onClick={()=> crateTodo()}>
              {buttonLoading?
                <ButtonLoading/>: "Save"
              }
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TodoCreate;
