import { ArrowOutward, GradientShape } from "@/components/icons";
import { useEffect, useRef } from "react";


export default function IndexPage() {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {
      const button = buttonRef.current;
      if (button) {
        const x = e.clientX - button.offsetWidth / 2;
        const y = e.clientY - button.offsetHeight / 2;
        button.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const handleMouseOut = () => {
      const button = buttonRef.current;
      if (button) {
        button.style.transform = "translate(calc(100vw - 100% - 15px), calc(100svh - 100% - 15px))";
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const button = buttonRef.current;
        const touch = e.touches[0];
      if (button) {
        const x = touch.clientX - button.offsetWidth / 2;
        const y = touch.clientY - button.offsetHeight / 2;
        button.style.transform = `translate(${x}px, ${y}px)`;
      }
      const main = document.querySelector("main");
      if (main) {
        main.style.transform = `translate(${(touch.clientX - main.offsetWidth / 2) / 16}px, ${(touch.clientY - main.offsetHeight / 2) / 16}px)`;
      }
    };

    const handleTouchEnd = () => {
      const button = buttonRef.current;
      if (button) {
        button.style.transform = "translate(calc(100vw - 100% - 15px), calc(100svh - 100% - 15px))";
      }
      const main = document.querySelector("main");
      if (main) {
        main.style.transform = "translate(0, 0)";
      }
    };

    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseout", handleMouseOut);
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isMobile) {
      document.body.addEventListener("touchmove", handleTouchMove);
      document.body.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseout", handleMouseOut);
      if (isMobile) {
        document.body.removeEventListener("touchmove", handleTouchMove);
        document.body.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);
  return (
    <>
      <main className="flex flex-col w-100vw h-[100svh] justify-center items-center font-bold text-2xl transition-transform duration-300 ease-soft-spring pointer-events-none">
        <div className="flex gap-2 items-center">
          <h5>Almost</h5>
          <div className="flex gap-2 items-center py-2 px-4 bg-gray-800 rounded-full">
            <GradientShape className="h-5 w-5" />
            <h5 className="text-xl">done</h5>
          </div>
        </div>
        <div className="flex gap-2">
          <h5 className="text-gray-500">Only need</h5>
          <h5 className="text-yellow-600">₹</h5>
          <h5 className="text-gray-500">money to finish</h5>
        </div>
      </main>

      <div
        ref={buttonRef}
        className="button fixed z-20 top-0 left-0 flex gap-2 bg-white rounded-full p-2 pr-3 items-center pointer-events-none transition-transform duration-300 ease-soft-spring"
        style={{
          fontFamily: "'Lexend', sans-serif",
          transform: "translate(calc(100vw - 100% - 15px), calc(100svh - 100% - 15px))"
        }}
      >
        <ArrowOutward className="flex bg-black rounded-full p-1 w-8 h-8" />
        <h5 className="text-sm text-black font-bold">Get Demo</h5>
      </div>
    </>
  );
}
