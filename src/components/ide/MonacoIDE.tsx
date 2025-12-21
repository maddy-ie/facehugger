import { FC, useState } from 'react'
import Editor, { type Monaco } from '@monaco-editor/react'
import Theme from './Theme'

export const MonacoIDE: FC = () => {
    const [value, setValue] = useState<string>(`# Welcome to the embedded IDE
# Try editing this Python file

def greet(name: str) {
  return f'Hello, {name}'
}

print(greet('world'))
`)

  const handleEditorWillMount = (monaco: Monaco) => {
    // Define the custom theme here
    monaco.editor.defineTheme('theme', Theme);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language="python"
          theme="theme"
          beforeMount={handleEditorWillMount}
          onChange={(val) => val !== undefined && setValue(val)}
          defaultValue={value}
          options={{ automaticLayout: true, minimap: { enabled: true } }}
        />
      </div>
    </div>
  )
}

export default MonacoIDE;
