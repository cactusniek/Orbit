// FolderTree:
export interface FolderData {
    path: string
    name: string
    type: string
    depth: number
}

export class Node<T> {
    constructor(data: T = null, parentNode: Node<T> = null, children: Array<Node<T>> = null) {
        this.data = data
        this.parent = parentNode
        this.children = children
    }

    styling: HTMLDivElement
    children: Array<Node<T>>
    parent: Node<T>
    data: T
}

export interface FileItemProps {
    currentNode: Node<FolderData>
    clickFile: (filePath: string, currentNode: Node<FolderData>) => void
}

// FolderTree:

// ToolsBar:
export enum Actions {
    RENAME = 'RENAME',
    DOWNLOAD = 'DOWNLOAD',
    DELETE = 'DELETE',
    ADDFILE = 'ADDFILE',
    ADDFOLDER = 'ADDFOLDER',
    UPLOAD = 'UPLOAD',
}

// Edit:
export interface EditAPIResponse {
    result: boolean
    message: string
}

export interface GetFileResponse {
    result: boolean
    message?: string
    data?: string
}

export interface RenameResponse {
    result: boolean
    message: string
}

export interface AddFileResponse {
    result: boolean
    message: string
}

export interface Move {
    path: string
    destination: string
}

export interface MoveResponse {
    result: boolean
    message: string
}

export interface UploadResponse {
    message: string
}

export interface Delete {
    path: string
}

export interface DeleteResponse {
    message: string
}

export interface Download {
    path: string
}

export interface DownloadResponse {
    message: string
}

// Authentication:
export interface AuthResponse {
    result: boolean
    message?: string
    token?: string
}

export interface ResetResponse {
    result: boolean
    message: string
}

// Settings:
export interface Connection {
    name: string
    host: string
    port: string
    user: string
    password: string
}

export interface GetConnectionResponse {
    message?: string
    data?: Connection
}

export interface SaveConnectionResponse {
    result: boolean
    message: string
}

export interface RemoteStructureResponse {
    result: boolean
    message: string
    data?: Node<FolderData>
}
