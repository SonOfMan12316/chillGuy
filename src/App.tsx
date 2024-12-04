import React, { useState } from "react";
import useFormattedDayAndTime from "./lib/utils/date";
import DragSection from "./components/drag-section";
import Option from "./components/option";

const App = () => {
  const time = useFormattedDayAndTime();
  const [primaryBgColor, setPrimaryBgColor] = useState<string>("#295144");
  const [secondaryBgColor, setSecondaryBgColor] = useState<string>("#A25353");
  const [file, setFile] = useState<File | null>(null);
  const [clickedButton, setClickedButton] = useState<number | null>(0);

  return (
    <main className="bg-gray-100 overflow-y-auto h-screen">
      <header className="font-iBM text-xs">{time}</header>
      <div className="mt-20 2xl:mt-40 flex items-center justify-center overflow-y-auto">
        <div className="flex w-screen flex-col-reverse md:flex-row items-start gap-8 md:gap-0 md:items-center md:max-w-[1056px] mx-auto h-full">
          <Option
            primaryBgColor={primaryBgColor}
            secondaryBgColor={secondaryBgColor}
            clickedButton={clickedButton}
            setPrimaryBgColor={setPrimaryBgColor}
            setSecondaryBgColor={setSecondaryBgColor}
            setFile={setFile}
            setClickedButton={setClickedButton}
          />
          <DragSection
            primaryBgColor={primaryBgColor}
            secondaryBgColor={secondaryBgColor}
            file={file}
            clickedButton={clickedButton}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
