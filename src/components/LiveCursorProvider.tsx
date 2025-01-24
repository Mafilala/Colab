"use client";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import FollowPointer from "./FollowPointer";

const LiveCursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    updateMyPresence({ cursor });
  };

  const handlePointerLeave = () => {
    updateMyPresence({ cursor: null });
  };
 
  return (
    <div
      className="relative"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {others
        .filter((other) => other.presence.cursor)
        .map(({ connectionId, presence, info }) => {
          const { cursor } = presence;
          if (!cursor) return null;
          return (
            <FollowPointer
              key={connectionId}
              info={info}
              x={cursor.x}
              y={cursor.y}
            />
          );
        })}
      {children}
    </div>
  );
};
export default LiveCursorProvider;