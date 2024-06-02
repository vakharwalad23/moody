"use server"

import { revalidatePath } from 'next/cache'

export const revalidate = (paths: string[]) => paths.forEach((p) => revalidatePath(p))