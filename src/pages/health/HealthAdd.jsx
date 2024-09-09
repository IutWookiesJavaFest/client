import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import ButtonLoading from "@/mycomponents/loading/Loading";
const API_PATH = import.meta.env.VITE_API_PATH;

const HealthAdd = () => {
  const navigate = useNavigate();
  const [emotion, setEmotion] = useState("")
  const [value, setValue] = useState(5)
  const [health, setHealth] = useState("")
  const [buttonLoading, setButtonLoading] = useState(false);

  const emotions = ["Happy", "Sad", "Excited", "Angry", "Calm", "Anxious"]

  const addEmotion = async () => {
    try {
      setButtonLoading(true);
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      
      const response = await axios.post(`${API_PATH}/emotion/add`, {
        date: formattedDate,
        emotion: emotion,
        value: value,
        health: health
      })
      setButtonLoading(false);
      navigate(`/`);
    } catch (error) {
      console.error("Error submitting the form:", error)
    }
  }

  return (
    <div className="flex h-[100vh] items-center">
      <Card className="w-[350px] mx-auto mt-[14vw] md:mt-[8vw] lg:mt-[4vw]">
        <CardHeader>
          <CardTitle>Health Tracker</CardTitle>
          <CardDescription>Select your emotion and its intensity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="emotion">Emotion</Label>
            <Select onValueChange={(value) => setEmotion(value)}>
              <SelectTrigger id="emotion">
                <SelectValue placeholder="Select an emotion" />
              </SelectTrigger>
              <SelectContent>
                {emotions.map((e) => (
                  <SelectItem key={e} value={e.toLowerCase()}>
                    {e}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="intensity">Intensity</Label>
            <Slider
              id="intensity"
              min={0}
              max={10}
              step={1}
              value={[value]}
              onValueChange={(values) => setValue(values[0])}
            />
            <div className="text-center text-sm text-muted-foreground">
              Value: {value}
            </div>
          </div>
          <div className="spacae-y-2">
            <Label htmlFor="health">Health Concern</Label>
            <Textarea 
             placeholder="Write about your health" 
             value={health} 
             onChange={(e) => setHealth(e.target.value)} 
             className="mt-2"
            />
          </div>
          <Button className='w-[100%]' onClick={()=> addEmotion()}>
            {buttonLoading?
                <ButtonLoading />
                :
                "Save"
            }
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default HealthAdd