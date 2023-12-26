'use client'

import React from 'react';
import { useUser } from "@clerk/nextjs";

export default function Profile() {

    const { isLoaded, user } = useUser();

    return (
        <>
            Character name: {user?.fullName}
        </>
    )
}