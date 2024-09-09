import { useState, useEffect } from "react"
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react"
import PageLoading from '@/mycomponents/loading/PageLoading'
import ButtonLoading from "@/mycomponents/loading/Loading"
import Cart from "./Cart"
const API_PATH = import.meta.env.VITE_API_PATH;

const MedicineView = () => {
  const location = useLocation();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]); // Add cartItems state

  //check if medicineId parsed 
  if (!location.state || !location.state.medicine) {
    useEffect(() => {
      console.error("No medicine ID found in location state");
      navigate("/medicine"); // Redirect to a safe page, like medicine list
    }, []); // Runs only on initial render
    return null; // Render nothing while redirecting
  }

  const { medicine } = location.state;

  // Load the cart from local storage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('medAidCart')) || [];
    setCartItems(storedCart);
  }, []);

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => (prev > 0 ? prev - 1 : 1))

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('medAidCart')) || [];
    const newItem = {
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      quantity: quantity,
      imageUrl: medicine.imageUrl,
      totalPrice: medicine.price * quantity,
    };

    const itemIndex = cart.findIndex(item => item.id === newItem.id);

    if (itemIndex > -1) {
      cart[itemIndex].quantity += quantity;
      cart[itemIndex].totalPrice = cart[itemIndex].price * cart[itemIndex].quantity;
    } else {
      cart.push(newItem);
    }

    localStorage.setItem('medAidCart', JSON.stringify(cart));
    setCartItems(cart); // Update the cartItems state here
    setQuantity(0);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] pt-[5vw]">
      {
        pageLoading ? <PageLoading /> : (
          <Card className="w-[90vw] md:w-[40vw] xl:w-[22vw]">
            <CardHeader>
              <CardTitle className="lg:text-2xl font-bold">{medicine?.name}</CardTitle>
              <p>{medicine?.genericName}</p>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="aspect-square relative">
                <img src={medicine?.imageUrl} alt={medicine?.name} className="rounded-md" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">${medicine?.price}</span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity === 0}>
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="font-bold text-xl w-8 text-center">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={incrementQuantity}>
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={quantity === 0} onClick={addToCart}>
                {buttonLoading ? <ButtonLoading /> : (
                  <>
                    <ShoppingCartIcon className="mr-2 h-4 w-4" />
                    <p>Add to Cart</p>
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )
      }
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default MedicineView;