import React, { useState, useEffect } from "react";
import useFormattedDayAndTime from "./lib/utils/date";
import DragSection from "./components/drag-section";
import Option from "./components/option";

const App: React.FC = () => {
  const time = useFormattedDayAndTime();
  const [primaryBgColor, setPrimaryBgColor] = useState<string>("#a59bca");
  const [secondaryBgColor, setSecondaryBgColor] = useState<string>("#A25353");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("#fff");
  const [clickedButton, setClickedButton] = useState<number | null>(0);

  useEffect(() => {
    setClickedButton(0);
  }, []);

  return (
    <main className="bg-gray-100 overflow-y-auto h-screen">
      <header className="font-iBM text-xs">{time}</header>
      <div className="mt-20 2xl:mt-40 flex items-center justify-center overflow-y-auto">
        <div className="w-full md:w-fit flex flex-col-reverse md:flex-row items-start gap-8 md:gap-0 md:items-center md:justify-around md:max-w-[1056px] mx-auto h-full">
          <Option
            primaryBgColor={primaryBgColor}
            secondaryBgColor={secondaryBgColor}
            file={file}
            text={text}
            clickedButton={clickedButton}
            setPrimaryBgColor={setPrimaryBgColor}
            setSecondaryBgColor={setSecondaryBgColor}
            setFile={setFile}
            setClickedButton={setClickedButton}
            setText={setText}
          />
          <DragSection
            primaryBgColor={primaryBgColor}
            secondaryBgColor={secondaryBgColor}
            file={file}
            clickedButton={clickedButton}
            text={text}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
