'use server'

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function getMemories() {
  try {
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
        console.error('Supabase error fetching memories:', error);
        return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Server error fetching memories:', error);
    return { success: false, error: 'Failed to fetch memories' };
  }
}

export async function createMemory(formData: FormData) {
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const description = formData.get('description') as string;

    if (!title || !date) {
        return { success: false, error: 'Title and Date are required' };
    }

    try {
        const { data, error } = await supabase
            .from('memories')
            .insert([
                {
                    title,
                    description,
                    date,
                }
            ])
            .select()
            .single();

        if (error) {
             console.error('Supabase error creating memory:', error);
             return { success: false, error: error.message };
        }

        revalidatePath('/');
        return { success: true, data };

    } catch (error) {
        console.error('Server error creating memory:', error);
        return { success: false, error: 'Failed to create memory' };
    }
}
