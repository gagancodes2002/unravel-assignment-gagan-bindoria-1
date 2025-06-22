'use client'
import Link from 'next/link'
import { lazy, Usable, use, useMemo, useState } from 'react'
import { useGetRoomById } from '../hooks/useGetRoomById'
import RoomMediaSection from '../_components/RoomMediaSection'
import {
    AirVent,
    ArrowLeft,
    Bath,
    Bed,
    BellRing,
    CheckCircle,
    User,
    UserRound,
    Wifi,
} from 'lucide-react'
import React from 'react'
import { Variant } from '../schema/rooms.types'
import clsx from 'clsx'
import RoomView from '../_components/RoomView'
import { PageErrorBoundary } from '@/app/shared/ui/error/PageErrorBoundary'



type Params = {
    Id: string
}

interface RoomPageProps {
    params: Promise<Params>
}

export default function ({ params }: RoomPageProps) {

    console.log("PARAMS: ", params)

    return (
        <PageErrorBoundary
            pageName='Room View'
        >
            <RoomView
                params={params}
            />
        </PageErrorBoundary>
    )
}