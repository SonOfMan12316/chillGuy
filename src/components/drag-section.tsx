import React, { useEffect, useRef, useState } from "react";
import chillGuy from "/images/chill-guy.png";

type Position = {
  top: Number;
  right: Number;
}

const DragSection: React.FC = () => {
  const dragableRef = useRef<HTMLImageElement | null>(null);
  const dragzoneRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<Position>({ top: 140, right: 140 });

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

        document.onmouseup = dragMouseUp;
        document.onmousemove = dragMouseMove;
        document.addEventListener('touchstart', dragMouseDown, { passive: false });
        document.ontouchmove = dragMouseMove;
        document.ontouchend = dragMouseUp;
      };

      dragzone.onmousedown = dragMouseDown;
      dragzone.ontouchstart = dragMouseDown;
    };

    if (dragableRef.current && dragzoneRef.current) {
      dragElement(dragableRef.current, dragzoneRef.current);
    }
    setPosition({top: 140, right: 140 })
  }, []);

  return (
    <div
      ref={dragzoneRef}
      className="overflow-hidden relative mt-20 rounded-md bg-ch-chill-guy h-[350px] w-full"
    >
      <div className="">
        <img
          ref={dragableRef}
          src={chillGuy}
          alt="Draggable"
          className="cursor-grab absolute h-1/2 w-auto object-contain"
          style={{
            top: `${position.top}px`,
            right: `${position.right}px`
          }}
        />
      </div>
    </div>
  );
};

export default DragSection;
