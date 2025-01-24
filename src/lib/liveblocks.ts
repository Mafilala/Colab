import {Liveblocks} from "@liveblocks/node";
const key = process.env.NEXT_SECRET_LIVEBLOCKS_SECRET_KEY;

if (!key) {
   throw new Error("Missing LIVEBLOCKS_PRIVATE_KEY environment variable");
}

const liveblocks = new Liveblocks({secret: key});
export default liveblocks;