import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Loader2  } from '@/components/ui';;

export const CodeEditor = ({ value, onChange, language, readOnly = false }) => {
  const { theme } = useTheme();

  const handleEditorChange = (value) => {
    onChange(value);
  };

  return (
    <div className="h-full w-full bg-editor-background">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={handleEditorChange}
        theme={theme === "dark" ? "vs-dark" : "vs-light"}
        loading={
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        }
        options={{
          minimap: { enabled: false },
          fontSize: window.innerWidth < 768 ? 12 : 14,
          fontFamily: "Fira Code, Monaco, Menlo, Ubuntu Mono, monospace",
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: "on",
          contextmenu: true,
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly,
          cursorStyle: "line",
          cursorBlinking: "blink",
          renderWhitespace: "selection",
          renderControlCharacters: false,
          fontLigatures: true,
        }}
      />
    </div>
  );
};