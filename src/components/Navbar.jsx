import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiHandCoinLine, RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-ligh-gray "
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 righ top-2"
      >
      </span>
        {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick ,screenSize,setScreenSize} =
    useStateContext();

    useEffect(()=>{
      const handleResize=()=>setScreenSize(window.innerWidth);
      window.addEventListener('resize',handleResize);
      handleResize();

      return ()=>window.removeEventListener('resize',handleResize)
    },[])

    useEffect(()=>{
     if(screenSize<=900 ){
      setActiveMenu(false)
     }else{
      setActiveMenu(true)
     }
    },[screenSize])

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="menu"
        customFunc={() => setActiveMenu(previous => !previous)}
        color="blue"
        icon={<AiOutlineMenu />}
      />
      <div className="flex ">
        <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color="blue"
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={() => handleClick("chat")}
          color="blue"
          icon={<BsChatLeft />}
        />
        <NavButton
          title="Notifications"
          dotColor="#03C9D7"
          customFunc={() => handleClick("notification")}
          color="blue"
          icon={<RiNotification3Line />}
        />
        <TooltipComponent content="profile" position="BottomCenter">
          <div
            className="flex item gap-2 cursor p-1 
       hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userprofile")}
          >
            <img
              src={avatar}
              alt="user-profile"
              className="rounded-full w-8 h-8"
            />
            <p>
              <span className="text-gray-400 text-14 ">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14 ">
                Michale
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14 " />
          </div>
        </TooltipComponent>
        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userprofile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
