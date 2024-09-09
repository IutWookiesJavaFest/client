import { useState, useEffect } from "react";
import { MinusIcon, PlusIcon, CircleX, ShoppingCart, CircleMinus} from "lucide-react";
import { Button } from '@/components/ui/button';

const Cart = ({ cartItems, setCartItems }) => {
  const [clickCount, setClickCount] = useState(0);
  const [localCartItems, setLocalCartItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);

  // Load from localStorage if cartItems and setCartItems are not provided
  useEffect(() => {
    if (!cartItems) {
      const storedCart = JSON.parse(localStorage.getItem('medAidCart')) || [];
      setLocalCartItems(storedCart);
      calculateTotal(storedCart);
    } else {
      calculateTotal(cartItems);
    }
  }, [cartItems]);

  // Handle the update logic
  const getCartItems = () => cartItems || localCartItems;
  const updateCartItems = (updatedCart) => {
    if (setCartItems) {
      setCartItems(updatedCart);
    } else {
      setLocalCartItems(updatedCart);
    }
    localStorage.setItem('medAidCart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Increment item quantity
  const incrementQuantity = (index) => {
    const updatedCart = [...getCartItems()];
    updatedCart[index].quantity += 1;
    updatedCart[index].totalPrice = updatedCart[index].quantity * updatedCart[index].price;
    updateCartItems(updatedCart);
  };

  // Decrement item quantity
  const decrementQuantity = (index) => {
    const updatedCart = [...getCartItems()];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updatedCart[index].totalPrice = updatedCart[index].quantity * updatedCart[index].price;
      updateCartItems(updatedCart);
    }
  };

  // Remove item from cart
  const removeItem = (index) => {
    const updatedCart = getCartItems().filter((_, i) => i !== index);
    updateCartItems(updatedCart);
  };

  // Calculate the total bill
  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.totalPrice, 0);
    setTotalBill(total);
  };

  // Buy functionality (Clear cart and display message)
  const handleBuy = () => {
    alert(`Thank you for your purchase! Total: $${totalBill}`);
    updateCartItems([]);  // Clear the cart
  };

  const items = getCartItems();

  return (
    <>
    {clickCount%2 == 1?
    <div onClick={()=> setClickCount((prev => prev + 1))} className="bg-white fixed right-5 top-1/2 transform -translate-y-1/2 flex cursor-pointer w-10 aspect-square rounded-full border-black border-[1px] shadow-md">
        <ShoppingCart className="mx-auto my-auto"/>
    </div>
    :
    <div className="bg-white fixed right-0 top-1/2 transform -translate-y-1/2 h-[520px] w-[350px] sm:w-[400px] shadow-md border-[1px] mt-[30px] pt-[15px] px-[10px]">
      <CircleMinus className="flex cursor-pointer" onClick={()=> setClickCount(prev => (prev > 0 ? prev - 1 : 1))}/>
      <p className="text-center text-lg font-semibold mb-3">Happy Shopping</p>
      {items.length > 0 ? (
        <div className="flex flex-col justify-between h-[90%]">
          <div>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center h-[70px] border-b-[1px] py-[15px]">
                <img src={item.imageUrl} className="h-[100%] w-[10%]" alt={item.name} />
                <p className="text-sm">{item.name}</p>
                <div>
                  <Button variant="outline" size="icon" onClick={() => decrementQuantity(index)} className="mr-[5px]">
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="font-bold w-6 text-center mr-[5px]">{item.quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => incrementQuantity(index)}>
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p>${item.totalPrice.toFixed(2)}</p>
                <CircleX className="cursor-pointer" onClick={() => removeItem(index)} />
              </div>
            ))}
          </div>
          
          <div className="border-t-[1px] pt-2 mt-3">
            <p className="text-lg font-semibold mb-3">Total: ${totalBill.toFixed(2)}</p>
            <Button className="w-full" onClick={handleBuy}>Buy</Button>
          </div>
        </div>
      ) : (
        <p className="p-[20px] text-center">Your cart is empty</p>
      )}
    </div>
    }
    </>
  );
};

export default Cart;
