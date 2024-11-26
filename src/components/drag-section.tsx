import React, { useEffect, useRef } from "react";
import chillGuy from "/images/chill-guy.png";

const DragSection: React.FC = () => {
  const dragableRef = useRef<HTMLImageElement | null>(null);
  const dragzoneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dragElement = (element: HTMLElement, dragzone: HTMLElement) => {
      let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

      const dragMouseUp = () => {
        document.onmouseup = null;
        document.onmousemove = null;
        element.classList.remove("drag");
      };

      const dragMouseMove = (event: MouseEvent | TouchEvent) => {
        event.preventDefault();

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
      };

      dragzone.onmousedown = dragMouseDown;
      dragzone.ontouchstart = dragMouseDown;
    };

    if (dragableRef.current && dragzoneRef.current) {
      dragElement(dragableRef.current, dragzoneRef.current);
    }
  }, []);

  return (
    <div
      ref={dragzoneRef}
      className="overflow-hidden relative p-4 rounded-md bg-ch-chill-guy h-[350px] w-full"
    >
      <div className="">
        <img
          ref={dragableRef}
          src={chillGuy}
          alt="Draggable"
          className="cursor-grab absolute h-1/2 w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default DragSection;
