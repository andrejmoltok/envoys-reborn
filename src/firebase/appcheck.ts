'use client'

import React, { useEffect, createRef, useRef } from 'react';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { app } from '@/firebase/config';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  typeof window !== 'undefined' ? window.FIREBASE_APPCHECK_DEBUG_TOKEN = true : null;
}

const useAppCheck = () => {
    const appCheckInitRef = createRef();
    const appCheckRef = useRef<any>(appCheckInitRef);
    useEffect(() => {
        
        if (appCheckRef.current) {
            return;
        }
        
          
        const appCheck = initializeAppCheck(app,{
            provider: new ReCaptchaEnterpriseProvider(process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_KEY as string),
            isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
          })
        appCheckRef.current = appCheck;
    }, []);
}
export default useAppCheck;