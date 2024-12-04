import React, { useEffect, useRef, useState, useMemo } from "react";
import chillGuy from "/images/chill-guy.png";

type Position = {
  top: Number;
  right: Number;
};

interface DragSectionProp {
  primaryBgColor: string;
  secondaryBgColor: string | null;
  file: File | null;
  clickedButton: number | null;
}

const DragSection: React.FC<DragSectionProp> = ({
  primaryBgColor,
  secondaryBgColor,
  file,
  clickedButton,
}) => {
  const dragableRef = useRef<HTMLImageElement | null>(null);
  const dragzoneRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<Position>({ top: 140, right: 140 });

  const backgroundStyle = useMemo(() => {
    if (file) {
      return {
        backgroundImage: `url(${URL.createObjectURL(file)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "",
      };
    } else if (clickedButton === 2 && primaryBgColor && !file) {
      return { backgroundColor: primaryBgColor };
    } else if (primaryBgColor && !secondaryBgColor) {
      return { backgroundColor: primaryBgColor };
    } else if (primaryBgColor && secondaryBgColor) {
      return {
        backgroundImage: `linear-gradient(to right, ${primaryBgColor}, ${secondaryBgColor})`,
      };
    }
  }, [primaryBgColor, secondaryBgColor, file]);

  useEffect(() => {
    const dragElement = (element: HTMLElement, dragzone: HTMLElement) => {
      let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

      const dragMouseUp = () => {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;

        element.classList.remove("drag");
      };

      const dragMouseMove = (event: MouseEvent | TouchEvent) => {
        const clientX =
          "touches" in event ? event.touches[0].clientX : event.clientX;
        const clientY =
          "touches" in event ? event.touches[0].clientY : event.clientY;

        pos1 = pos3 - clientX;
        pos2 = pos4 - clientY;
        pos3 = clientX;
        pos4 = clientY;

        const maxX = dragzone.offsetWidth - element.offsetWidth;
        const maxY = dragzone.offsetHeight - element.offsetHeight;

        const newX = Math.min(Math.max(element.offsetLeft - pos1, 0), maxX);
        const newY = Math.min(Math.max(element.offsetTop - pos2, 0), maxY);

        element.style.top = `${newY}px`;
        element.style.left = `${newX}px`;
      };

      const dragMouseDown = (event: MouseEvent | TouchEvent) => {
        event.preventDefault();
        const clientX =
          "touches" in event ? event.touches[0].clientX : event.clientX;
        const clientY =
          "touches" in event ? event.touches[0].clientY : event.clientY;

        pos3 = clientX;
        pos4 = clientY;
        element.classList.add("drag");

        document.onmousemove = dragMouseMove;
        document.onmouseup = dragMouseUp;
        document.ontouchmove = dragMouseMove;
        document.ontouchend = dragMouseUp;
      };

      dragzone.onmousedown = (event) => {
        if (event.target === element) dragMouseDown(event);
      };

      dragzone.ontouchstart = (event) => {
        if (event.target === element) dragMouseDown(event);
      };
    };

    if (dragableRef.current && dragzoneRef.current) {
      dragElement(dragableRef.current, dragzoneRef.current);
    }
    setPosition({ top: 140, right: 140 });

    return () => {
      if (dragzoneRef.current) {
        dragzoneRef.current.onmousedown = null;
        dragzoneRef.current.ontouchstart = null;
      }
      document.onmousemove = null;
      document.onmouseup = null;
      document.ontouchmove = null;
      document.ontouchend = null;
    };
  }, []);

  return (
    <div className="w-full md:flex-1 md:ml-6 flex justify-center overflow-scroll">
      <div className="w-full md:flex md:flex-1 md:ml-6">
        <div className="relative bg-transparent mx-auto h-[350px] w-[350px] lg:h-[600px] lg:w-[600px]">
          <div
            ref={dragzoneRef}
            style={{
              ...backgroundStyle,
            }}
            className="relative rounded-xl h-full w-full shadow-lg overflow-hidden"
          >
            <img
              ref={dragableRef}
              src={chillGuy}
              alt="Draggable"
              className="cursor-grab absolute w-auto h-1/2 object-contain"
              style={{
                top: `${position.top}px`,
                right: `${position.right}px`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragSection;
