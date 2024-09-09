import { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ButtonLoading from "@/mycomponents/loading/Loading";
const API_PATH = import.meta.env.VITE_API_PATH;

 
const MedicineCreate = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    imgLink: "",
    genericName: "",
    price: "",
  })
  const [buttonLoading, setButtonLoading] = useState(false);
  

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  // Axios POST request
  const handleCreate = async () => {
    try {
      setButtonLoading(true);
      const response = await axios.post(`${API_PATH}/medicine/create`, formData)
      console.log("Form submitted successfully:", response.data)
      setButtonLoading(false);
      navigate(`/medicine`);
    } catch (error) {
      console.error("Error submitting the form:", error)
    }
  }

  return (
    <div className="flex justify-center items-center h-[100vh] pt-[2vw]">
        <Card className="w-[350px]">
        <CardHeader>
            <CardTitle>Add Medicine</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
            <form>
            <div className="grid w-full items-center gap-4">
                {/* Name Field */}
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of medicine" value={formData.name} onChange={handleChange} />
                </div>

                {/* Image Link Field */}
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="imgLink">Image Link</Label>
                <Input id="imgLink" placeholder="Image link of your medicine" value={formData.imgLink} onChange={handleChange} />
                </div>

                {/* Generic Name Field */}
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="genericName">Generic Name</Label>
                <Input id="genericName" placeholder="Generic name of medicine" value={formData.genericName} onChange={handleChange} />
                </div>

                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Price</Label>
                <Input type="number" id="price" placeholder="Price of Medicine" value={formData.price} onChange={handleChange} />
                </div>

                <Button type="button" onClick={()=>handleCreate()}>
                    {buttonLoading?
                        <ButtonLoading />
                        :
                        "Save"
                    }
                </Button>

            </div>
            </form>
        </CardContent>
        </Card>
    </div>
  )
}

export default MedicineCreate;