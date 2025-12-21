const myCustomTheme = {
    base: 'vs-dark',
    inherit: true,
    rules: [
        { token: 'comment', foreground: '#608b4e', fontStyle: 'italic' },
        { token: 'string', foreground: '#b3b0ff' },
        { token: 'number', foreground: '#f599ff' },
        { token: 'builtin', foreground: '#f599ff' },
        { token: 'keyword', foreground: '#47aeff', fontStyle: 'bold' },
        { token: 'variable', foreground: '#9cdcfe' },
    ],
    colors: {
        'editor.background': '#0d1114ff',
        'editor.foreground': '#d4d4d4',
        'editor.lineNumbersBackground': '#1e1e1e',
        'editor.lineNumbersForeground': '#858585',
        'editor.selectionBackground': '#264f78',
        'editor.wordHighlightBackground': '#575757',
        'editorCursor.foreground': '#aeafad',
        'editorWhitespace.foreground': '#3e3e42',
    },
}

export default myCustomTheme;
