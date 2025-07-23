import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Singleton pattern for client-side Supabase client
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          role: "admin" | "manager" | "technician" | "sales_rep"
          full_name: string | null
          phone: string | null
          department: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: "admin" | "manager" | "technician" | "sales_rep"
          full_name?: string | null
          phone?: string | null
          department?: string | null
        }
        Update: {
          role?: "admin" | "manager" | "technician" | "sales_rep"
          full_name?: string | null
          phone?: string | null
          department?: string | null
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          company: string | null
          address: string | null
          source_id: string | null
          status: "new" | "contacted" | "qualified" | "converted" | "lost"
          assigned_to: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
      }
      customers: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          company: string | null
          address: string | null
          tax_id: string | null
          created_from_lead: string | null
          created_at: string
          updated_at: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          customer_id: string
          project_type_id: string | null
          status: "draft" | "active" | "completed" | "cancelled"
          manager_id: string | null
          start_date: string | null
          end_date: string | null
          budget: number | null
          description: string | null
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
