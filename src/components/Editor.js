import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closebrackets";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ACTIONS from "../Actions";
import toast from "react-hot-toast";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realTimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current.on("change", (instance, changes) => {
        console.log(changes);
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });

      // editorRef.current.setValue(`console.log('hello')`);
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  async function handleCopyCode() {
    try {
      const code = editorRef.current.getValue();
      console.log(code);
      toast.success("Code copied successfully");
      await navigator.clipboard.writeText(code);
    } catch (err) {
      toast.error("Could not copy code");
    }
  }

  return (
    <>
      <ContentCopyIcon
        sx={{ color: "white" }}
        className="copy-content"
        onClick={handleCopyCode}
      />
      <textarea id="realTimeEditor"></textarea>;
    </>
  );
};

export default Editor;
