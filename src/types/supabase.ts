// This file can be auto-generated by Supabase CLI in a local setup:
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts
// For WebContainer, we'll define it manually for now or omit if not strictly needed for basic queries.
// For simplicity, we'll use a basic version.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      managed_top_broadcasters: {
        Row: {
          id: string
          username: string
          priority: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          username: string
          priority?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          username?: string
          priority?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// You can extend this with other tables/types as your Supabase schema grows.
