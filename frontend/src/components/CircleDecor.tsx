/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import DisplayTab from '../interfaces/MainColumn';

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

function CircleDecor(props: { expand: boolean, currentTab: DisplayTab; }) {
  const { expand, currentTab } = props;

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
        style={{
          display: currentTab === DisplayTab.Home ? 'block' : 'none'
        }}
      >
        <Circle
          size={currentTab === DisplayTab.Home ? 85 : 0}
          expand={expand}
          zIndex={30}
          speed="duration-[2500ms]"
          color={400}
        />
        <Circle
          size={currentTab === DisplayTab.Home ? 75 : 0}
          expand={expand}
          zIndex={20}
          speed="duration-[2000ms]"
          color={500}
        />
        <Circle
          size={currentTab === DisplayTab.Home ? 65 : 0}
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
