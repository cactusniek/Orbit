import { atom } from 'jotai'

import { Node, Actions } from '../utils/interfaces'
import type { FolderData, Connection } from '../utils/interfaces'

export const projectNameAtom = atom<string>('')

export const folderTreeAtom = atom<Node<FolderData>>()

export const currentPathAtom = atom<string | null>('')
export const currentNodeAtom = atom<Node<FolderData>>()

export const fileContentAtom = atom<string>('')

export const isOnFileAtom = atom<boolean | null>()

export const currentActionAtom = atom<Actions | null>()

export const setIsSelectingAtom = atom<boolean | null>()
export const selectedPathsAtom = atom<string[]>([])

export const resultMessageAtom = atom<string>()

export const connectionAtom = atom<Connection>({
    name: '',
    host: '',
    port: '',
    user: '',
    password: '',
})

export const saveConnectionResultAtom = atom<boolean>()
export const saveConnectionMessageAtom = atom<string>()

export const remoteStructureAtom = atom<Node<FolderData>>()
export const remoteStructureResultAtom = atom<boolean>()
export const remoteStructureMessageAtom = atom<string>()

export const isSelectingRemotePathAtom = atom<boolean>(false)
export const remotePathAtom = atom<string | null>(null)
