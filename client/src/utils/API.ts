import { parse } from 'flatted'

import { Node } from './interfaces'
import type {
    AuthResponse,
    ResetResponse,
    GetConnectionResponse,
    Connection,
    SaveConnectionResponse,
    RemoteStructureResponse,
    FolderData,
    EditAPIResponse,
    RenameResponse,
    GetFileResponse,
    Move,
    MoveResponse,
    UploadResponse,
    Delete,
    DeleteResponse,
    Download,
    DownloadResponse,
} from './interfaces'

class APIBase {
    public static baseUrl: string = 'http://localhost:8000'

    public static async fetchData(endpoint: string, method: string, body?: any): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}` + `${endpoint}`, {
                method: method,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: body ? JSON.stringify(body) : undefined,
            })

            return response.text()
        } catch (err) {
            console.error('API fetch error: ', err)
            return 'Something went wrong. If it keeps happening, contact the admin.'
        }
    }
}

export class authAPI {
    public static async Register(email: string, password: string): Promise<AuthResponse> {
        const body: any = { email: email, password: password }

        try {
            let response = await APIBase.fetchData('/auth/register', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error('API fetch error: ', err)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async Login(email: string, password: string): Promise<AuthResponse> {
        const body: any = { email: email, password: password }

        try {
            let response = await APIBase.fetchData('/auth/login', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error('API fetch error: ', err)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async Forgot(email: string): Promise<ResetResponse> {
        const body: any = { email: email }

        try {
            let response = await APIBase.fetchData('/auth/forgot', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error('API fetch error: ', err)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async Reset(token: string, password: string): Promise<ResetResponse> {
        const body: any = { token: token, password: password }

        try {
            let response = await APIBase.fetchData('/auth/reset', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error('API fetch error: ', err)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }
}

export class settingsAPI {
    public static async getConnection(): Promise<GetConnectionResponse> {
        try {
            let response = await APIBase.fetchData('/settings/getConnection', 'POST')

            console.log(response)

            return JSON.parse(response)
        } catch (err) {
            console.error('API fetch error: ', err)
            return { message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async saveConnection(connection: Connection): Promise<SaveConnectionResponse> {
        const body: any = { connection: connection }

        console.log(connection)

        try {
            let response = await APIBase.fetchData('/settings/saveConnection', 'POST', body)

            console.log(response)

            return JSON.parse(response)
        } catch (err) {
            console.error('API fetch error: ', err)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async remoteStructure(): Promise<RemoteStructureResponse> {
        try {
            let response = await APIBase.fetchData('/edit/remoteStructure', 'POST')

            response = parse(response)

            return response
        } catch (err) {
            console.error('API fetch error: ', err)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }
}

export class editAPI {
    public static async folderTree(projectName: string): Promise<Node<FolderData>> {
        const body: any = { projectName: projectName }

        try {
            let response = await APIBase.fetchData('/edit/folderTree', 'POST', body)

            console.log(response)

            response = parse(response)

            return response
        } catch (err) {
            console.error('API fetch error: ', err)
            return err
        }
    }

    public static async getFile(path: string): Promise<GetFileResponse> {
        const body: any = { path: path }

        try {
            let response = await APIBase.fetchData('/edit/getFile', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error('API fetch error: ', err)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async saveFile(path: string, editedContent: string): Promise<EditAPIResponse> {
        const body: any = { path: path, content: editedContent }

        try {
            let response = await APIBase.fetchData('/edit/saveFile', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error('API fetch error: ', err)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async Rename(path: string, newName: string): Promise<RenameResponse> {
        const body: any = { path: path, newName: newName }

        try {
            let response = await APIBase.fetchData('/edit/Rename', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error(`Route: ${this.Rename.name} API fetch error: ${err}`)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async addFile(path: string, fileName: string): Promise<EditAPIResponse> {
        const body: any = { path: path, name: fileName }

        try {
            let response = await APIBase.fetchData('/edit/addFile', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error(`Route: ${this.addFile.name} API fetch error: ${err}`)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async addFolder(path: string): Promise<EditAPIResponse> {
        const body: any = { path: path }

        try {
            let response = await APIBase.fetchData('/edit/addFolder', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error(`Route: ${this.addFolder.name} API fetch error: ${err}`)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async Move(paths: Move[]): Promise<MoveResponse> {
        const body: any = { paths: paths }

        try {
            let response = await APIBase.fetchData('/edit/Move', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error(`Route: ${this.Move.name} API fetch error: ${err}`)
            return { result: false, message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async Upload(form: FormData): Promise<UploadResponse> {
        const body: any = { form }

        try {
            let response = await APIBase.fetchData('/edit/Upload', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error(`Route: ${this.Upload.name} API fetch error: ${err}`)
            return { message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async Delete(paths: string[]): Promise<DeleteResponse> {
        const body: any = { paths: paths }

        try {
            let response = await APIBase.fetchData('/edit/Delete', 'POST', body)

            return JSON.parse(response)
        } catch (err) {
            console.error(`Route: ${this.Delete.name} API fetch error: ${err}`)
            return { message: 'Something went wrong. If it keeps happening, contact the admin.' }
        }
    }

    public static async Download(paths: string[]): Promise<void> {
        console.log(paths)
        const response = await fetch(`${APIBase.baseUrl}/edit/Download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/zip',
            },
            body: JSON.stringify({ paths }),
            credentials: 'include',
        })

        if (!response.ok) throw new Error(`Download failed: ${response.status}`)

        const blob = await response.blob()
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = 'download.zip'
        a.click()

        URL.revokeObjectURL(url)
    }
}
