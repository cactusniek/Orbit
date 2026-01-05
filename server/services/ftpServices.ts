import fs from 'fs-extra'
import path from 'path'

import { Client } from "basic-ftp"
import { Connection, ftpDirectories } from '../global/interfaces'

import { Results } from '../global/interfaces'
import { Variables } from '../global/variables'

export class ftpServices {

    private static client = new Client()

    public static async RemoteStructure (connection: Connection) {

        const directories: ftpDirectories = {
            paths: []
        }

        ftpServices.client.ftp.verbose = true

        console.log(connection)

        try {
            await ftpServices.client.access({
                host: connection.host,
                user: connection.user,
                password: connection.password,
                port: Number(connection.port),
                secure: false,
                secureOptions: {
                    rejectUnauthorized: false // should be true when live
                }
            }) 

            const files = await ftpServices.client.list()

            for (const file of files) {
                if (file.type === 2 && !file.name.startsWith('.')) {
                    directories.paths.push(file.name)
                }
            }

            console.log(files)

            ftpServices.client.close()

            return { success: true, function: this.RemoteStructure.name, data: directories, message: "Remote folder structure retrieved", logMessage: "Remote folder structure retrieved" }
        } catch (err) {
            console.log(err)
            return { success: false, function: this.RemoteStructure.name, message: "Could not find or access remote server", logMessage: err.message }
        }
    }

    public static async DownloadProject (connection: Connection, remoteDir: string, projectPath: string) {
        try {
            await ftpServices.client.access({
                host: connection.host,
                user: connection.user,
                password: connection.password,
                port: Number(connection.port),
                secure: true,
                secureOptions: {
                    rejectUnauthorized: false // should be true when live
                }
            }) 
    
            const result = await ftpServices.RecursiveDownload(remoteDir, projectPath)

            ftpServices.client.close()

            if (!result.success) {
                return { success: false, function: this.DownloadProject.name, data: result.result, logMessage: result.result }
            } else {
                return { success: true, function: this.DownloadProject.name, data: result.result, logMessage: result.result }
            }
        } catch (err) {
            return { success: false, function: this.DownloadProject.name, logMessage: err.message }
        }
    }
    
    private static async RecursiveDownload (remoteDir: string, projectPath: string) {

        const results: Results = {
            success: [],
            failed: []
        }

        const allowedExtensions = Variables.allowedExtensions

        const files = await ftpServices.client.list(remoteDir)

        for (const file of files) {
            const remoteFilePath = `${remoteDir}/${file.name}`

            const localFilePath = path.join(projectPath, file.name)
    
            if (file.type === 2) {     
                await fs.mkdir(localFilePath, { recursive: true })
                
                await ftpServices.RecursiveDownload(remoteFilePath, localFilePath)
            } else { 
                const filePath: string = file.name
                const fileExtension: string = filePath.slice(((filePath.lastIndexOf(".") - 1) >>> 0) + 2)

                if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                    await ftpServices.client.downloadTo(localFilePath, remoteFilePath)
                    results.success.push(`Success to download: ${filePath} to ${projectPath}`)
                } else {
                    results.failed.push(`Failed to upload: ${filePath} to ${projectPath}`)
                }
            }
        }

        return { success: true, result: results }
    }

    public static async PublishProject (connection: Connection, selectedProject: string, remoteDir: string) {
        try {
            await ftpServices.client.access({
                host: connection.host,
                user: connection.user,
                password: connection.password,
                port: Number(connection.port),
                secure: true,
                secureOptions: {
                    rejectUnauthorized: false // should be true when live
                }
            }) 

            await ftpServices.client.uploadFromDir(selectedProject, remoteDir)

            ftpServices.client.close()

            return { success: true, function: this.PublishProject.name, message: "Project published to remote location" }
        } catch (err) {
            return { success: false, function: this.PublishProject.name, message: err.msg }
        }
    }

}