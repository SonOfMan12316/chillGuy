import React, { useEffect, useRef, useState, useMemo } from "react";

type Position = {
  top: Number | string;
  right: Number | string;
};

interface DragSectionProp {
  primaryBgColor: string;
  secondaryBgColor: string | null;
  file: File | null;
  text: string;
  textColor: string;
  clickedButton: number | null;
  textSize: string;
  variant: string;
  dragzoneRef: React.RefObject<HTMLDivElement>;
}

const DragSection: React.FC<DragSectionProp> = ({
  primaryBgColor,
  secondaryBgColor,
  file,
  text,
  textColor,
  textSize,
  clickedButton,
  variant,
  dragzoneRef,
}) => {
  const dragableRef = useRef<HTMLImageElement>(null);
  const draggableTextRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ top: 140, right: 140 });
  const [textPosition, setTextPosition] = useState<Position>({
    top: 200,
    right: 200,
  });

  useEffect(() => {
    if (variant === "9") {
      setPosition({
        top: 0,
        right: 0,
      });
    } else {
      setPosition({
        top: 140,
        right: 140,
      });
    }
  }, [variant]);

  const backgroundStyle = useMemo(() => {
    if (clickedButton === 2 && file) {
      return {
        backgroundImage: `url(${URL.createObjectURL(file)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    } else if (clickedButton === 2 && !file) {
      return { backgroundColor: primaryBgColor };
    } else if (clickedButton === 0 && primaryBgColor) {
      return { backgroundColor: primaryBgColor };
    } else if (clickedButton === 1 && primaryBgColor && secondaryBgColor) {
      return {
        backgroundImage: `linear-gradient(to right, ${primaryBgColor}, ${secondaryBgColor})`,
      };
    }
  }, [clickedButton, primaryBgColor, secondaryBgColor, file]);

  useEffect(() => {
    const dragElement = (elementRef: React.RefObject<HTMLElement>) => {
      let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

      const dragMouseUp = () => {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;

        elementRef.current?.classList.remove("drag");
        elementRef.current?.classList.remove("cursor-grabbing", "drag");
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

        const dragzoneWidth = dragzoneRef.current!.offsetWidth;
        const dragzoneHeight = dragzoneRef.current!.offsetHeight;

        const elementWidth = elementRef.current!.offsetWidth;
        const elementHeight = elementRef.current!.offsetHeight;

        const maxX = dragzoneWidth - elementWidth;
        const maxY = dragzoneHeight - elementHeight;

        const newX = Math.min(
          Math.max(elementRef.current!.offsetLeft - pos1, 0),
          maxX
        );
        const newY = Math.min(
          Math.max(elementRef.current!.offsetTop - pos2, 0),
          maxY
        );

        if (elementRef.current) {
          elementRef.current.style.top = `${newY}px`;
          elementRef.current.style.left = `${newX}px`;
        }
      };

      const dragMouseDown = (event: MouseEvent | TouchEvent) => {
        event.preventDefault();
        const clientX =
          "touches" in event ? event.touches[0].clientX : event.clientX;
        const clientY =
          "touches" in event ? event.touches[0].clientY : event.clientY;

        pos3 = clientX;
        pos4 = clientY;
        elementRef.current?.classList.add("drag");
        elementRef.current?.classList.add("cursor-grabbing", "drag");

        document.onmousemove = dragMouseMove;
        document.onmouseup = dragMouseUp;
        document.ontouchmove = dragMouseMove;
        document.ontouchend = dragMouseUp;
      };

      elementRef.current?.addEventListener("mousedown", dragMouseDown);
      elementRef.current?.addEventListener("touchstart", dragMouseDown);
    };

    if (
      draggableTextRef.current &&
      draggableTextRef.current &&
      dragzoneRef.current
    ) {
      dragElement(draggableTextRef);
      dragElement(dragableRef);
    }
    setPosition({ top: 140, right: 140 });
    setTextPosition({ top: 50, right: 100 });
  }, []);

  return (
    <div className="w-full md:flex-1 md:ml-6 flex justify-center overflow-scroll">
      <div className="w-full md:flex md:flex-1 md:ml-6">
        <div className="relative bg-transparent mx-auto h-[350px] w-[350px] lg:h-[600px] lg:w-[600px]">
          <div
            id="dragzone"
            ref={dragzoneRef}
            style={{
              ...backgroundStyle,
            }}
            className="relative rounded-xl h-full w-full shadow-lg overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="w-full h-full"></div>
            </div>
            <img
              ref={dragableRef}
              src={`/images/variants/${variant}.png`}
              alt="Draggable"
              className="cursor-grab absolute w-auto h-1/2 object-contain"
              style={{
                top: `${position.top}px`,
                left: `${position.right}px`,
              }}
            />
            <div
              className="draggableTextRef absolute uppercase font-franklin font-medium cursor-grab select-none whitespace-pre-wrap text-wrap z-[1000] transform translate-x-0 translate-y-0 px-4"
              ref={draggableTextRef}
              style={{
                top: `${textPosition.top}px`,
                left: `${textPosition.right}px`,
                WebkitTextStroke: "1px black",
                textShadow: "2px 2px 0 black",
                touchAction: "none",
                color: `${textColor}`,
                fontSize: `${textSize}px`,
              }}
            >
              {text || ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragSection;
