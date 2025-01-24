import { useEffect, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom } from "@liveblocks/react/suspense";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { useSelf } from "@liveblocks/react";
import { stringToColor } from "@/lib/stringToColor";

type EditorProps = {
  doc: Y.Doc;
  provider: any;
};
const Editor = () => {
  {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc>();
    const [provider, setProvider] = useState<LiveblocksYjsProvider>();

    // Set up Liveblocks Yjs provider
    useEffect(() => {
      const yDoc = new Y.Doc();
      const yProvider = new LiveblocksYjsProvider(room, yDoc);
      setDoc(yDoc);
      setProvider(yProvider);

      return () => {
        yDoc?.destroy();
        yProvider?.destroy();
      };
    }, [room]);

    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start gap-2 justify-end">
          {/* translate feature */}
          {/* chat to document feature */}
          {/* Dark Mode */}
        </div>
        {doc && provider && <BlockNote doc={doc} provider={provider} />}
      </div>
    );
  }
};
export default Editor;

function BlockNote({ doc, provider }: EditorProps) {
  const userInfo = useSelf((me) => me.info);
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,

      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),

      // Information for this user:
      user: {
        name: userInfo?.name!,
        color: stringToColor(userInfo?.email || "1"),
      },
    },
  });

  return <BlockNoteView editor={editor} />;
}
