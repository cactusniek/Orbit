import React, { useRef, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { remoteStructureAtom, remoteStructureResultAtom, remoteStructureMessageAtom, isSelectingRemotePathAtom, remotePathAtom } from '../utils/atoms'

import type { Connection } from '../utils/interfaces'

import { settingsFunctions } from '../utils/functions/SettingsFunctions'

export default function RemoteStructure() {
    const [remoteStructure, setRemoteStructure] = useAtom(remoteStructureAtom)
    const [remoteStructureResult, setRemoteStructureResult] = useAtom(remoteStructureResultAtom)
    const [remoteStructureMessage, setRemoteStructureMessage] = useAtom(remoteStructureMessageAtom)

    const [isSelectingRemotePath, setIsSelectingRemotePath] = useAtom(isSelectingRemotePathAtom)
    const [remotePath, setRemotePath] = useAtom(remotePathAtom)

    async function getRemoteStructure(e: any) {
        e.preventDefault()

        const remoteStructureObject = await settingsFunctions.remoteStructure()

        setRemoteStructure(remoteStructureObject.data)
        setRemoteStructureResult(remoteStructureObject.result)
        setRemoteStructureMessage(remoteStructureObject.message)
    }

    async function renderTree() {}

    return (
        <div id="container-button" className="flex w-[21.25rem] flex-col gap-[1rem] transition-all duration-[900ms]">
            <form onSubmit={getRemoteStructure} id="container-inputs" className="flex flex-col items-center gap-[1.875rem]">
                <button type="submit" className="flex-start flex w-[21.25rem] cursor-pointer rounded-md bg-[#7F7EFF] px-[2.5rem] py-3 font-medium transition-[900ms] hover:bg-[#5D5CC9]">
                    Get Structure!
                </button>

                <div id="message" className={`text-sm ${remoteStructureResult ? 'text-[#4ade80]' : 'text-[#ff8082]'}`}>
                    {remoteStructureMessage}
                </div>
            </form>

            <div className="container-tree"></div>
        </div>
    )
}
