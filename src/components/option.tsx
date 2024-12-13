import React, { useState, useRef, useEffect } from "react";

interface OptionsProps {
  primaryBgColor: string;
  secondaryBgColor: string;
  clickedButton: number | null;
  file: File | null;
  text: string;
  textColor: string;
  textSize: string;
  setPrimaryBgColor: React.Dispatch<React.SetStateAction<string>>;
  setSecondaryBgColor: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setClickedButton: React.Dispatch<React.SetStateAction<number | null>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
  setTextSize: React.Dispatch<React.SetStateAction<string>>;
  setVariant: React.Dispatch<React.SetStateAction<string>>;
}

const Option: React.FC<OptionsProps> = ({
  primaryBgColor,
  secondaryBgColor,
  text,
  textColor,
  textSize,
  clickedButton,
  setPrimaryBgColor,
  setSecondaryBgColor,
  setFile,
  setClickedButton,
  setText,
  setTextColor,
  setTextSize,
  setVariant,
}) => {
  const styles: string[] = ["solid", "gradient", "image"];
  const images = Array.from({ length: 12 }, (_, index) => `${index}`);

  const handleClick = (index: number) => {
    setClickedButton((prev) => (prev !== index ? index : prev));

    if (index === 0) {
      setPrimaryBgColor((prev) => prev || "#295144");
      setSecondaryBgColor("");
    } else if (index === 1) {
      setSecondaryBgColor((prev) => prev || "#A25353");
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

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTextColor(e.target.value);
  };

  const handleTextSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSize(e.target.value);
  };

  return (
    <div className="w-full md:w-80 md:min-w-[320px] h-fit rounded-lg py-6 bg-white border">
      <div className="px-3">
        <h1 className="text-base mb-5">Background</h1>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {styles.map((style, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`capitalize ${
                clickedButton === index
                  ? "text-xs font-medium h-8 flex items-center justify-center rounded-[6px] bg-white text-black border"
                  : "text-xs font-medium h-8 flex items-center justify-center rounded-[6px] bg-white  border opacity-25  hover:bg-gray-100 transition-all"
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
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.375 16.375C1.89375 16.375 1.48192 16.2038 1.1395 15.8614C0.797083 15.519 0.625583 15.1068 0.625 14.625V2.375C0.625 1.89375 0.7965 1.48192 1.1395 1.1395C1.4825 0.797083 1.89433 0.625583 2.375 0.625H14.625C15.1063 0.625 15.5184 0.7965 15.8614 1.1395C16.2044 1.4825 16.3756 1.89433 16.375 2.375V14.625C16.375 15.1063 16.2038 15.5184 15.8614 15.8614C15.519 16.2044 15.1068 16.3756 14.625 16.375H2.375ZM2.375 14.625H14.625V2.375H2.375V14.625ZM3.25 12.875H13.75L10.4688 8.5L7.84375 12L5.875 9.375L3.25 12.875Z"
                    fill="#E5E7EB"
                  />
                </svg>
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
      <hr className="border-t my-4"></hr>
      <div className="px-3">
        <h1 className="text-base mb-2">Text</h1>
        <input
          className="border p-2 rounded-lg w-full text-sm focus:outline-none mb-2"
          type="text"
          placeholder="Add your text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        ></input>
        <h1 className="text-sm mb-2">Text Color</h1>
        <input
          className="h-10 w-10 bg-white pointer-events-auto"
          type="color"
          onChange={handleTextColorChange}
          value={textColor}
        />
      </div>
      {text ? (
        <div className="px-3 my-3 flex flex-col">
          <span className="text-sm">Font size: {textSize}px</span>
          <input
            className="active:cursor-grabbing cursor-grab accent-primaryColor my-2"
            type="range"
            value={textSize}
            onChange={handleTextSizeChange}
            min={1}
            max={50}
          />
        </div>
      ) : null}
      <hr className="border-t my-4"></hr>
      <div className="px-3">
        <span className="text-sm">Character Variant</span>
        <div className="grid grid-cols-3 gap-x-2">
          {images.map((image, index) => (
            <div
              key={index}
              className="border p-1 rounded cursor-pointer hover:bg-gray-50"
            >
              <img
                className="w-96 h-10 object-contain"
                src={`/images/variants/${image}.png`}
                onClick={() => setVariant(image)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Option;
