'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigate(page: string) {
  redirect(page);
}