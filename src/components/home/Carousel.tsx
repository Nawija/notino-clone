"use client";
import { PORTFOLIO } from "@/src/constants";
import { ArrowLeft, ArrowRight } from "@/src/ui/svg/Arrows";
import { useEffect, useRef, useState } from "react";

export default function Carousel() {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const scroll = (scrollOffset: number): void => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += scrollOffset;
    }
  };

  const onMouseDown = (e: React.MouseEvent): void => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainer.current?.offsetLeft ?? 0));
    setScrollLeft(scrollContainer.current?.scrollLeft ?? 0);
  };

  const onMouseLeave = (): void => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const onMouseUp = (): void => {
    setIsDragging(false);
  };

  const onMouseMove = (e: MouseEvent): void => {
    if (!isDragging || !scrollContainer.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.current.offsetLeft;
    const walk = (x - startX) * 3;
    scrollContainer.current.scrollLeft = scrollLeft - walk;
  };

  const checkScrollPosition = (): void => {
    if (scrollContainer.current) {
      const container = scrollContainer.current;
      const atStart = container.scrollLeft === 0;
      const atEnd =
        container.scrollLeft + container.clientWidth === container.scrollWidth;

      setIsAtStart(atStart);
      setIsAtEnd(atEnd);
    }
  };

  useEffect(() => {
    const container = scrollContainer.current;
    if (container) {
      container.addEventListener("mousedown", onMouseDown as any);
      container.addEventListener("mouseleave", onMouseLeave as any);
      container.addEventListener("mouseup", onMouseUp as any);
      container.addEventListener("mousemove", onMouseMove as any);
      container.addEventListener("scroll", checkScrollPosition);

      return () => {
        container.removeEventListener("mousedown", onMouseDown as any);
        container.removeEventListener("mouseleave", onMouseLeave as any);
        container.removeEventListener("mouseup", onMouseUp as any);
        container.removeEventListener("mousemove", onMouseMove as any);
        container.removeEventListener("scroll", checkScrollPosition);
      };
    }
  }, [isDragging, startX, scrollLeft]);

  return (
    <section className="flex w-full flex-col items-center justify-start overflow-hidden py-24 lg:flex-row lg:py-48">
      <div className="mb-12 flex flex-col items-center justify-center space-y-3 px-3 text-center lg:ml-24 lg:w-96 lg:text-start">
        <h2 className="text-main text-2xl font-semibold lg:text-3xl">
          Lorem ipsum dolor sit amet consectetur
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
          temporibus quo blanditiis.
        </p>
      </div>

      <div className="relative flex w-full justify-between lg:w-3/4">
        <div
          ref={scrollContainer}
          className="no-scrollbar flex snap-x items-start justify-start overflow-x-scroll py-16 pl-[12%] lg:pl-0"
        >
          {PORTFOLIO.map((p, i) => (
            <div
              key={i}
              className="bg-main border-main relative mr-10 h-80 w-[75%] flex-shrink-0 snap-center overflow-hidden rounded-lg border p-3 pb-5 shadow-2xl shadow-white/10 sm:w-1/2 md:w-1/4 lg:p-4 lg:pb-8"
            >
              <img
                src={p.url}
                draggable="false"
                alt="..."
                className=" h-full w-full object-cover object-top"
              />
              <div className="bg-main border-main absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border lg:h-4 lg:w-4" />
            </div>
          ))}
        </div>
        {!isAtStart && (
          <button
            aria-label="przesuń w lewo"
            onClick={() => scroll(-330)}
            className="bg-main border-main absolute left-0 top-1/2 z-10 mr-3 rounded border p-1.5 text-white"
          >
            <ArrowLeft h={24} w={24} />
          </button>
        )}
        {!isAtEnd && (
          <button
            aria-label="przesuń w prawo"
            onClick={() => scroll(330)}
            className="bg-main border-main absolute -right-3 top-1/2 z-10 mr-3 rounded border p-1.5 text-white"
          >
            <ArrowRight h={24} w={24} />
          </button>
        )}
      </div>
    </section>
  );
}
