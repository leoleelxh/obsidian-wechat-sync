export interface CodeTheme {
    background: string;
    text: string;
    comment: string;
    keyword: string;
    function: string;
    string: string;
    number: string;
    operator: string;
    variable: string;
    border: string;
    headerBackground: string;
}

export const codeThemes: Record<string, CodeTheme> = {
    github: {
        background: '#f6f8fa',
        text: '#24292e',
        comment: '#6a737d',
        keyword: '#d73a49',
        function: '#6f42c1',
        string: '#032f62',
        number: '#005cc5',
        operator: '#d73a49',
        variable: '#24292e',
        border: '#e1e4e8',
        headerBackground: '#f1f2f3'
    },
    monokai: {
        background: '#272822',
        text: '#f8f8f2',
        comment: '#75715e',
        keyword: '#f92672',
        function: '#66d9ef',
        string: '#a6e22e',
        number: '#ae81ff',
        operator: '#f92672',
        variable: '#f8f8f2',
        border: '#49483e',
        headerBackground: '#3a3a3a'
    },
    dracula: {
        background: '#282a36',
        text: '#f8f8f2',
        comment: '#6272a4',
        keyword: '#ff79c6',
        function: '#50fa7b',
        string: '#f1fa8c',
        number: '#bd93f9',
        operator: '#ff79c6',
        variable: '#f8f8f2',
        border: '#44475a',
        headerBackground: '#383a4a'
    },
    vs2015: {
        background: '#1e1e1e',
        text: '#d4d4d4',
        comment: '#608b4e',
        keyword: '#569cd6',
        function: '#dcdcaa',
        string: '#ce9178',
        number: '#b5cea8',
        operator: '#d4d4d4',
        variable: '#9cdcfe',
        border: '#404040',
        headerBackground: '#2d2d2d'
    },
    'atom-one-dark': {
        background: '#282c34',
        text: '#abb2bf',
        comment: '#5c6370',
        keyword: '#c678dd',
        function: '#61afef',
        string: '#98c379',
        number: '#d19a66',
        operator: '#56b6c2',
        variable: '#e06c75',
        border: '#3e4451',
        headerBackground: '#21252b'
    }
};
