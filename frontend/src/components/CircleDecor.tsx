import React from 'react';

interface CircleProps {
  size: number;
  expand: boolean;
  zIndex: number,
  speed: string;
  color: number;
}

function Circle(props: CircleProps) {
  const { size, expand, zIndex, speed, color } = props;
  const difference = 3;

  return (
    <div
      className={`transition-all ${speed}
                  bg-red-${color} absolute bottom-0 right-0
                  rounded-full opacity-10 z-${zIndex}
                  ease-in-out delay-200`}
      style={{
        width: `${expand ? `${size}vw` : `${size - difference}vw`}`,
        height: `${expand ? `${size}vw` : `${size - difference}vw`}`
      }}
    />
  );
}

function CircleDecor(props: { expand: boolean }) {
  const { expand } = props;

  return (
    <div
      className="absolute"
      style={{
        bottom: '-40vw',
        right: '-30vw'
      }}
    >
      <div
        className="relative w-full h-full"
      >
        <Circle
          size={85}
          expand={expand}
          zIndex={30}
          speed="duration-[2500ms]"
          color={400}
        />
        <Circle
          size={75}
          expand={expand}
          zIndex={20}
          speed="duration-[2000ms]"
          color={500}
        />
        <Circle
          size={65}
          expand={expand}
          zIndex={10}
          speed="duration-[1800ms]"
          color={600}
        />
      </div>
    </div>
  );
}

export default CircleDecor;
