import { getDefaultStore } from 'jotai'

import { saveConnectionResultAtom, saveConnectionMessageAtom, remoteStructureAtom, remoteStructureResultAtom, remoteStructureMessageAtom } from '../atoms'

import { settingsAPI } from '../API'

import type { Connection, GetConnectionResponse, SaveConnectionResponse, RemoteStructureResponse } from '../interfaces'

export class settingsFunctions {
    public static async getConnection(): Promise<Connection> {
        try {
            const getConnectionObject: GetConnectionResponse = await settingsAPI.getConnection()

            return getConnectionObject.data
        } catch (err) {
            return err
        }
    }

    public static async saveConnection(connection: Connection): Promise<SaveConnectionResponse> {
        const store = getDefaultStore()

        try {
            const saveConnectionObject: SaveConnectionResponse = await settingsAPI.saveConnection(connection)

            return saveConnectionObject
        } catch (err) {
            store.set(saveConnectionResultAtom, Boolean(false))
            store.set(saveConnectionMessageAtom, String(err))
        }
    }

    public static async remoteStructure(): Promise<RemoteStructureResponse> {
        const store = getDefaultStore()

        try {
            const remoteStructureObject: RemoteStructureResponse = await settingsAPI.remoteStructure()

            return remoteStructureObject
        } catch (err) {
            store.set(remoteStructureResultAtom, Boolean(false))
            store.set(remoteStructureMessageAtom, String(err))
        }
    }
}
