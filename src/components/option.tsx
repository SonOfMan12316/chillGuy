import React, { useState } from "react";

interface OptionsProps {
  primaryBgColor: string;
  secondaryBgColor: string;
  clickedButton: number | null;
  setPrimaryBgColor: React.Dispatch<React.SetStateAction<string>>;
  setSecondaryBgColor: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setClickedButton: React.Dispatch<React.SetStateAction<number | null>>;
}

const Option: React.FC<OptionsProps> = ({
  primaryBgColor,
  secondaryBgColor,
  clickedButton,
  setPrimaryBgColor,
  setSecondaryBgColor,
  setFile,
  setClickedButton,
}) => {
  const styles: string[] = ["solid", "gradient", "image"];

  const handleClick = (index: number) => {
    setClickedButton(index === clickedButton ? null : index);

    if (index === 0) {
      setPrimaryBgColor((prev) => prev || "#295144");
      setSecondaryBgColor("");
      setFile(null);
    } else if (index === 1) {
      setSecondaryBgColor((prev) => prev || "#A25353");
      setFile(null);
    } else if (index === 2) {
      setSecondaryBgColor("");
    }
  };

  const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPrimaryBgColor(e.target.value);
  };

  const handleSecondaryColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setSecondaryBgColor(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <div className="w-screen md:w-80 md:min-w-[320px] h-fit rounded-lg p-6 bg-white border">
      <div className="background-bit bg-white">
        <h1 className="text-base mb-5">Background</h1>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {styles.map((style, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`text-xs h-8 flex items-center justify-center rounded-[6px] border capitalize ${
                clickedButton === index ? "text-black" : "opacity-25"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
        <div className="styling section flex flex-col">
          {clickedButton === 2 ? (
            <>
              <label
                htmlFor="file-upload"
                className="w-full p-6 border-[2px] border-dashed border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2"
              >
                <span>Upload Background</span>
              </label>
              <input
                id="file-upload"
                accept="image/*"
                className="hidden"
                type="file"
                onChange={handleFileChange}
              />
            </>
          ) : (
            <>
              <label className="text-sm my-2 text-gray-600">
                Primary Color
              </label>
              <input
                className="h-10 w-10 bg-white pointer-events-auto"
                type="color"
                onChange={handlePrimaryColorChange}
                value={primaryBgColor}
              />
              {clickedButton === 1 && (
                <>
                  <label className="text-sm my-2 text-gray-600">
                    Secondary Color
                  </label>
                  <input
                    className="h-10 w-10 bg-white pointer-events-auto"
                    type="color"
                    onChange={handleSecondaryColorChange}
                    value={secondaryBgColor}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Option;
