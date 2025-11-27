export default function PopUpComponent({ children }) {
  return (
    <div className="absolute bg-white h-[50px] w-[90px] z-50">{children}</div>
  );
}
