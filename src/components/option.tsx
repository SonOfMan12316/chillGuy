import React from "react";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

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
  dragzoneRef: React.RefObject<HTMLDivElement>;
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
  dragzoneRef,
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

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTextColor(e.target.value);
  };

  const handleTextSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSize(e.target.value);
  };

  const downloadDragZoneContent = async () => {
    if (dragzoneRef.current) {
      try {
        const canvas = await html2canvas(dragzoneRef.current);
        const dataURL = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataURL;
        toast.success("Image downloaded");
        link.download = "your-chillguy-meme.png";
        link.click();
      } catch (error) {
        toast.error(`Error capturing and downloading content: ${error}`);
      }
    }
  };

  const copyDragZoneContent = async () => {
    const dragzoneElement = dragzoneRef.current;
    if (dragzoneElement) {
      const canvas = await html2canvas(dragzoneElement);

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ]);
          toast.success("Image copied to clipboard");
        } catch {
          toast.error("Error copying image");
        }
      });
    }
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target?.files[0]) {
                    setFile(e.target?.files[0]);
                  }
                }}
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
        <div className="grid grid-cols-3 gap-2">
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
      <hr className="border-t my-4"></hr>
      <div className="grid grid-cols-2 gap-x-4 px-3">
        <button
          className="bg-white hover:bg-gray-50 flex items-center gap-x-2 border text-xs font-medium rounded-lg px-3 py-2"
          onClick={downloadDragZoneContent}
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 3.5H12.25V8.75H14.4375L10.5 12.6875M10.5 3.5H8.75V8.75H6.5625L10.5 12.6875"
              fill="#1E1E1E"
              stroke="#1E1E1E"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.25 16.625H15.75"
              stroke="#1E1E1E"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Download
        </button>
        <button
          onClick={copyDragZoneContent}
          className="bg-white hover:bg-gray-50 flex items-center gap-x-2 border text-xs font-medium rounded-lg px-3 py-2"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.125 0.0937501H8.576C6.96775 0.0937501 5.69375 0.0937501 4.69713 0.227625C3.67163 0.365875 2.84125 0.656375 2.18588 1.31088C1.53138 1.96625 1.24088 2.79663 1.10263 3.82213C0.96875 4.81963 0.96875 6.09275 0.96875 7.701V13C0.968593 13.7818 1.24758 14.5379 1.75546 15.1323C2.26334 15.7266 2.96675 16.1201 3.739 16.2419C3.85887 16.9104 4.09075 17.4809 4.5545 17.9455C5.08125 18.4723 5.7445 18.698 6.532 18.8048C7.29062 18.9063 8.25575 18.9062 9.45187 18.9062H12.1731C13.3693 18.9062 14.3344 18.9063 15.093 18.8048C15.8805 18.698 16.5438 18.4723 17.0705 17.9455C17.5973 17.4188 17.823 16.7555 17.9298 15.968C18.0313 15.2094 18.0312 14.2443 18.0312 13.0481V8.57687C18.0312 7.38075 18.0313 6.41562 17.9298 5.657C17.823 4.8695 17.5973 4.20625 17.0705 3.6795C16.6059 3.21575 16.0354 2.98387 15.3669 2.864C15.2451 2.09175 14.8516 1.38834 14.2573 0.88046C13.6629 0.372577 12.9068 0.093593 12.125 0.0937501ZM13.9887 2.73712C13.8557 2.34862 13.6045 2.01145 13.2703 1.77281C12.9361 1.53417 12.5357 1.406 12.125 1.40625H8.625C6.95638 1.40625 5.77163 1.408 4.87125 1.52875C3.99188 1.64688 3.48438 1.86912 3.11425 2.23925C2.74413 2.60937 2.52188 3.11688 2.40375 3.99625C2.283 4.89663 2.28125 6.08138 2.28125 7.75V13C2.281 13.4107 2.40917 13.8111 2.64781 14.1453C2.88645 14.4795 3.22362 14.7307 3.61212 14.8637C3.59375 14.33 3.59375 13.7263 3.59375 13.0481V8.57687C3.59375 7.38075 3.59375 6.41562 3.69613 5.657C3.80113 4.8695 4.02863 4.20625 4.5545 3.6795C5.08125 3.15275 5.7445 2.927 6.532 2.82113C7.29062 2.71875 8.25575 2.71875 9.45187 2.71875H12.1731C12.8513 2.71875 13.455 2.71875 13.9887 2.73712ZM5.482 4.60875C5.72438 4.36637 6.06387 4.20888 6.707 4.12225C7.36675 4.03388 8.2435 4.03212 9.49912 4.03212H12.1241C13.3797 4.03212 14.2556 4.03388 14.9171 4.12225C15.5594 4.20888 15.8989 4.36725 16.1413 4.60875C16.3836 4.85112 16.5411 5.19062 16.6277 5.83375C16.7161 6.4935 16.7179 7.37025 16.7179 8.62588V13.0009C16.7179 14.2565 16.7161 15.1324 16.6277 15.7939C16.5411 16.4361 16.3828 16.7756 16.1413 17.018C15.8989 17.2604 15.5594 17.4179 14.9163 17.5045C14.2556 17.5929 13.3797 17.5946 12.1241 17.5946H9.49912C8.2435 17.5946 7.36675 17.5929 6.70613 17.5045C6.06388 17.4179 5.72438 17.2595 5.482 17.018C5.23962 16.7756 5.08213 16.4361 4.9955 15.793C4.90713 15.1324 4.90538 14.2565 4.90538 13.0009V8.62588C4.90538 7.37025 4.90713 6.4935 4.9955 5.83288C5.08213 5.19062 5.2405 4.85112 5.482 4.60875Z"
              fill="#1E1E1E"
            />
          </svg>
          Copy
        </button>
      </div>
    </div>
  );
};

export default Option;
