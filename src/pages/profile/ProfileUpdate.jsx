import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from 'react-router-dom';
import PageLoading from "@/mycomponents/loading/PageLoading";
import ButtonLoading from "@/mycomponents/loading/Loading";
const API_PATH = import.meta.env.VITE_API_PATH;

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [pageLoading, setPageLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    imgLink: "",
    age: "",
  });

    //check if medicineId parsed 
    if (!location.state || !location.state.profile) {
      useEffect(() => {
        console.error("No profile found in location state");
        navigate("/profile"); // Redirect to a safe page, like medicine list
      }, []); // Runs only on initial render
      return null; // Render nothing while redirecting
    }
  
    const { profile } = location.state;

    useEffect(() => {
      const { name, imgLink, age } = profile;
      setFormData({ name, imgLink, age });
      setPageLoading(false);
    }, [profile]);

    // Handle input changes
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Axios PUT request to update the medicine
    const updateProfile = async () => {
      try {
        setButtonLoading(true);
        const response = await axios.put(`${API_PATH}/profile/update/${profile.id}`, formData);
        console.log("Profile updated successfully:", response.data);
        setButtonLoading(false);
        navigate(`/profile`);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };

  return (
    <div className="flex justify-center items-center h-[100vh] pt-[2vw]">
      <Card className="w-[350px]">
        {pageLoading?
            <PageLoading />
            :
            <>
            <CardHeader>
                <CardTitle>Update Profile</CardTitle>
                <CardDescription>Update existing profiile details.</CardDescription>
            </CardHeader>
            <CardContent>
            <form>
                <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    />
                </div>

                {/* Image Link Field */}
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="imgLink">Image Link</Label>
                    <Input
                    id="imgLink"
                    placeholder="Your Image link "
                    value={formData.imgLink}
                    onChange={handleChange}
                    />
                </div>

                {/* Generic Name Field */}
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="age">Generic Name</Label>
                    <Input
                    type="number"
                    id="age"
                    placeholder="Your age"
                    value={formData.age}
                    onChange={handleChange}
                    />
                </div>

                <Button type="button" onClick={()=>updateProfile()}>
                    {buttonLoading?
                        <ButtonLoading />
                        :
                        "Save"
                    }
                </Button>
                </div>
            </form>
            </CardContent>
            </>
        }
      </Card>
    </div>
  )
}

export default ProfileUpdate
