export class EditorFunctions {
    public static getLanguageFromExtension(filePath: string) {
        const ext = filePath.split('.').pop()?.toLowerCase()

        switch (ext) {
            case 'js':
            case 'jsx':
                return 'javascript'
            case 'vue':
                return 'javascript'
            case 'ts':
            case 'tsx':
                return 'typescript'
            case 'java':
                return 'java'
            case 'py':
                return 'python'
            case 'html':
            case 'htm':
                return 'xml'
            case 'css':
                return 'css'
            case 'json':
                return 'json'
            case 'c':
                return 'c'
            case 'cpp':
            case 'cc':
            case 'cxx':
                return 'cpp'
            case 'cs':
                return 'csharp'
            case 'rb':
                return 'ruby'
            case 'php':
                return 'php'
            case 'go':
                return 'go'
            case 'rs':
                return 'rust'
            case 'sh':
            case 'bash':
                return 'bash'
            default:
                return 'plaintext'
        }
    }
}
