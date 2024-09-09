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

 
const DoctorCreate = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    imgLink: "",
    specialist: "",
    fee: "",
    phoneNo: "",
    calendlyLink: "",
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
      const response = await axios.post(`${API_PATH}/doctor/create`, formData)
      console.log("Form submitted successfully:", response.data)
      setButtonLoading(false);
      navigate(`/medicine`);
    } catch (error) {
      console.error("Error submitting the form:", error)
    }
  }

  return (
    <div className="flex justify-center pt-[17vw] pb-[8vw] md:pt-[10vw] md:pb-[5vw] lg:pt-[7vw] lg:pb-[3vw]">
        <Card className="w-[400px]">
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
                    <Input id="name" placeholder="Name of doctor" value={formData.name} onChange={handleChange} />
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Name</Label>
                    <Input type="email" id="name" placeholder="Email of doctor" value={formData.email} onChange={handleChange} />
                </div>

                {/* Image Link Field */}
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="imgLink">Image Link</Label>
                <Input id="imgLink" placeholder="Image link of Doctor" value={formData.imgLink} onChange={handleChange} />
                </div>

                {/* Generic Name Field */}
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="specialist">Generic Name</Label>
                <Input id="spcialist" placeholder="Speciality of doctor" value={formData.specialist} onChange={handleChange} />
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="fee">Fee</Label>
                    <Input type="number" id="fee" placeholder="Fee of doctor" value={formData.fee} onChange={handleChange} />
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="calendlyLink">Calendly Link</Label>
                    <Input id="calendlyLink" placeholder="calendly link of doctor" value={formData.calendlyLink} onChange={handleChange} />
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

export default DoctorCreate;