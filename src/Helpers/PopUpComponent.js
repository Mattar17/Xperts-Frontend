//import { SquareChevronUp } from "lucide-react";
export default function PopUpComponent({ children }) {
  return (
    <div className="absolute right-[39px] mt-2 w-[8rem] bg-white shadow-lg rounded-xl p-2 z-50">
      {/*<SquareChevronUp
        color="white"
        className="absolute left-[55px] top-[-15px]"
      />*/}
      {children}
    </div>
  );
}
