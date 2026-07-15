'use server';

import { protectedFetch } from "../core/server";



export const submitApplication=async(applicationData)=>{
    return protectedFetch('/api/applications',applicationData);
    

}