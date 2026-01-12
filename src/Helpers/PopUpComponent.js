//import { SquareChevronUp } from "lucide-react";
export default function PopUpComponent({ children }) {
  return (
    <div className="absolute mt-2 right-[-12px] w-[8rem] bg-white shadow-lg rounded-xl z-50">
      {/*<SquareChevronUp
        color="white"
        className="absolute left-[55px] top-[-15px]"
      />*/}
      {children}
    </div>
  );
}
