import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import useFormattedDayAndTime from "./lib/utils/date";
import DragSection from "./components/drag-section";
import Option from "./components/option";

const App: React.FC = () => {
  const time = useFormattedDayAndTime();
  const [primaryBgColor, setPrimaryBgColor] = useState<string>("#a59bca");
  const [secondaryBgColor, setSecondaryBgColor] = useState<string>("#A25353");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [textSize, setTextSize] = useState<string>("24");
  const [clickedButton, setClickedButton] = useState<number | null>(0);
  const [variant, setVariant] = useState<string>("0");

  const dragzoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setClickedButton(0);
  }, []);

  return (
    <main className="bg-gray-100 overflow-y-auto h-screen">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          error: {
            style: {
              background: "#ffcccc",
              color: "#fe0808",
              fontSize: "0.7rem",
              cursor: "pointer",
            },
          },
          success: {
            style: {
              background: "#d8ffc5",
              color: "#1e5b00",
              fontSize: "0.7rem",
              cursor: "pointer",
            },
          },
        }}
      />
      <header className="font-iBM text-xs">{time}</header>
      <div className="mt-20 2xl:mt-40 flex items-center justify-center overflow-y-auto">
        <div className="w-full md:w-fit flex flex-col-reverse md:flex-row items-start gap-8 md:gap-0 md:items-center md:justify-around md:max-w-[1056px] mx-auto h-full">
          <Option
            primaryBgColor={primaryBgColor}
            secondaryBgColor={secondaryBgColor}
            file={file}
            text={text}
            textColor={textColor}
            textSize={textSize}
            clickedButton={clickedButton}
            setPrimaryBgColor={setPrimaryBgColor}
            setSecondaryBgColor={setSecondaryBgColor}
            setFile={setFile}
            setTextColor={setTextColor}
            setClickedButton={setClickedButton}
            setText={setText}
            setTextSize={setTextSize}
            setVariant={setVariant}
            dragzoneRef={dragzoneRef}
          />
          <DragSection
            primaryBgColor={primaryBgColor}
            secondaryBgColor={secondaryBgColor}
            file={file}
            clickedButton={clickedButton}
            text={text}
            textColor={textColor}
            textSize={textSize}
            variant={variant}
            dragzoneRef={dragzoneRef}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
