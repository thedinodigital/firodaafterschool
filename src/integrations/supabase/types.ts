export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      enrolment_snapshots: {
        Row: {
          academic_year: string
          count: number
          id: string
          is_current: boolean
          notes: string | null
          updated_at: string
          updated_by: string | null
          year_group: Database["public"]["Enums"]["year_group"]
        }
        Insert: {
          academic_year: string
          count: number
          id?: string
          is_current?: boolean
          notes?: string | null
          updated_at?: string
          updated_by?: string | null
          year_group: Database["public"]["Enums"]["year_group"]
        }
        Update: {
          academic_year?: string
          count?: number
          id?: string
          is_current?: boolean
          notes?: string | null
          updated_at?: string
          updated_by?: string | null
          year_group?: Database["public"]["Enums"]["year_group"]
        }
        Relationships: []
      }
      fas_attendance_days: {
        Row: {
          arrived_at: string | null
          attendance_date: string
          child_id: string
          collected_at: string | null
          collected_by_id: string | null
          collected_by_name: string | null
          created_at: string
          id: string
          notes: string | null
        }
        Insert: {
          arrived_at?: string | null
          attendance_date: string
          child_id: string
          collected_at?: string | null
          collected_by_id?: string | null
          collected_by_name?: string | null
          created_at?: string
          id?: string
          notes?: string | null
        }
        Update: {
          arrived_at?: string | null
          attendance_date?: string
          child_id?: string
          collected_at?: string | null
          collected_by_id?: string | null
          collected_by_name?: string | null
          created_at?: string
          id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fas_attendance_days_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "fas_children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fas_attendance_days_collected_by_id_fkey"
            columns: ["collected_by_id"]
            isOneToOne: false
            referencedRelation: "fas_collectors"
            referencedColumns: ["id"]
          },
        ]
      }
      fas_billing_arrangements: {
        Row: {
          active: boolean
          amount_cents: number
          billing_type: string
          child_id: string
          created_at: string
          effective_from: string
          id: string
          notes: string | null
        }
        Insert: {
          active?: boolean
          amount_cents: number
          billing_type: string
          child_id: string
          created_at?: string
          effective_from?: string
          id?: string
          notes?: string | null
        }
        Update: {
          active?: boolean
          amount_cents?: number
          billing_type?: string
          child_id?: string
          created_at?: string
          effective_from?: string
          id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fas_billing_arrangements_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "fas_children"
            referencedColumns: ["id"]
          },
        ]
      }
      fas_children: {
        Row: {
          active: boolean
          allergies_and_medical: string | null
          created_at: string
          date_of_birth: string
          enrolled_at: string
          first_name: string
          id: string
          last_name: string
          notes: string | null
          school_year_group: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          allergies_and_medical?: string | null
          created_at?: string
          date_of_birth: string
          enrolled_at?: string
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          school_year_group: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          allergies_and_medical?: string | null
          created_at?: string
          date_of_birth?: string
          enrolled_at?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          school_year_group?: string
          updated_at?: string
        }
        Relationships: []
      }
      fas_collectors: {
        Row: {
          active: boolean
          child_id: string
          created_at: string
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          relationship: string
        }
        Insert: {
          active?: boolean
          child_id: string
          created_at?: string
          full_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          relationship: string
        }
        Update: {
          active?: boolean
          child_id?: string
          created_at?: string
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          relationship?: string
        }
        Relationships: [
          {
            foreignKeyName: "fas_collectors_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "fas_children"
            referencedColumns: ["id"]
          },
        ]
      }
      fas_guardians: {
        Row: {
          child_id: string
          created_at: string
          email: string | null
          full_name: string
          id: string
          is_billing_contact: boolean
          is_emergency_contact: boolean
          phone_primary: string
          phone_secondary: string | null
          relationship: string
        }
        Insert: {
          child_id: string
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          is_billing_contact?: boolean
          is_emergency_contact?: boolean
          phone_primary: string
          phone_secondary?: string | null
          relationship: string
        }
        Update: {
          child_id?: string
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          is_billing_contact?: boolean
          is_emergency_contact?: boolean
          phone_primary?: string
          phone_secondary?: string | null
          relationship?: string
        }
        Relationships: [
          {
            foreignKeyName: "fas_guardians_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "fas_children"
            referencedColumns: ["id"]
          },
        ]
      }
      fas_invoices: {
        Row: {
          amount_cents: number
          attendance_days: number
          billing_contact_email: string | null
          billing_contact_name: string
          child_id: string
          created_at: string
          id: string
          invoice_number: string
          issued_at: string | null
          notes: string | null
          paid_at: string | null
          paid_method: string | null
          period_end: string
          period_start: string
          status: string
          updated_at: string
        }
        Insert: {
          amount_cents: number
          attendance_days?: number
          billing_contact_email?: string | null
          billing_contact_name: string
          child_id: string
          created_at?: string
          id?: string
          invoice_number: string
          issued_at?: string | null
          notes?: string | null
          paid_at?: string | null
          paid_method?: string | null
          period_end: string
          period_start: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount_cents?: number
          attendance_days?: number
          billing_contact_email?: string | null
          billing_contact_name?: string
          child_id?: string
          created_at?: string
          id?: string
          invoice_number?: string
          issued_at?: string | null
          notes?: string | null
          paid_at?: string | null
          paid_method?: string | null
          period_end?: string
          period_start?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fas_invoices_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "fas_children"
            referencedColumns: ["id"]
          },
        ]
      }
      fas_ratio_breach_events: {
        Row: {
          children_present: number
          created_at: string
          duration_minutes: number | null
          id: string
          notes: string | null
          occurred_at: string
          occurred_on: string
          ratio_limit: number
          staff_present: number
        }
        Insert: {
          children_present: number
          created_at?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          occurred_at?: string
          occurred_on: string
          ratio_limit?: number
          staff_present: number
        }
        Update: {
          children_present?: number
          created_at?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          occurred_at?: string
          occurred_on?: string
          ratio_limit?: number
          staff_present?: number
        }
        Relationships: []
      }
      fas_settings: {
        Row: {
          bank_details: string | null
          closing_time: string
          id: number
          invoice_notes: string | null
          invoice_prefix: string
          max_ratio: number
          opening_time: string
          service_name: string
          tusla_registration: string | null
          updated_at: string
        }
        Insert: {
          bank_details?: string | null
          closing_time?: string
          id?: number
          invoice_notes?: string | null
          invoice_prefix?: string
          max_ratio?: number
          opening_time?: string
          service_name?: string
          tusla_registration?: string | null
          updated_at?: string
        }
        Update: {
          bank_details?: string | null
          closing_time?: string
          id?: number
          invoice_notes?: string | null
          invoice_prefix?: string
          max_ratio?: number
          opening_time?: string
          service_name?: string
          tusla_registration?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      fas_staff: {
        Row: {
          active: boolean
          created_at: string
          first_name: string
          garda_vetting_renewal_date: string | null
          id: string
          last_name: string
          role_title: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          first_name: string
          garda_vetting_renewal_date?: string | null
          id?: string
          last_name: string
          role_title: string
        }
        Update: {
          active?: boolean
          created_at?: string
          first_name?: string
          garda_vetting_renewal_date?: string | null
          id?: string
          last_name?: string
          role_title?: string
        }
        Relationships: []
      }
      fas_staff_shifts: {
        Row: {
          created_at: string
          end_at: string | null
          id: string
          shift_date: string
          staff_id: string
          start_at: string
        }
        Insert: {
          created_at?: string
          end_at?: string | null
          id?: string
          shift_date: string
          staff_id: string
          start_at: string
        }
        Update: {
          created_at?: string
          end_at?: string | null
          id?: string
          shift_date?: string
          staff_id?: string
          start_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fas_staff_shifts_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "fas_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      news_posts: {
        Row: {
          body: string
          category: string
          created_at: string
          date: string
          excerpt: string
          feature: boolean
          id: string
          illustration: string | null
          published: boolean
          slug: string
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          body: string
          category: string
          created_at?: string
          date: string
          excerpt: string
          feature?: boolean
          id?: string
          illustration?: string | null
          published?: boolean
          slug: string
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          body?: string
          category?: string
          created_at?: string
          date?: string
          excerpt?: string
          feature?: boolean
          id?: string
          illustration?: string | null
          published?: boolean
          slug?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      projection_scenarios: {
        Row: {
          adjustments: Json
          created_at: string
          description: string | null
          id: string
          is_baseline: boolean
          ji_intake: Json
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          adjustments?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_baseline?: boolean
          ji_intake?: Json
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          adjustments?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_baseline?: boolean
          ji_intake?: Json
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      staff_profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          full_name: string
          id: string
          role?: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
      staffing_thresholds: {
        Row: {
          appointment_min: number
          config_label: string
          id: number
          retention_min: number
          school_type: string
          total_teachers: number
        }
        Insert: {
          appointment_min: number
          config_label: string
          id?: number
          retention_min: number
          school_type?: string
          total_teachers: number
        }
        Update: {
          appointment_min?: number
          config_label?: string
          id?: number
          retention_min?: number
          school_type?: string
          total_teachers?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: { _uid: string }; Returns: boolean }
      is_fas_owner: { Args: { _uid: string }; Returns: boolean }
      is_staff: { Args: { _uid: string }; Returns: boolean }
    }
    Enums: {
      year_group:
        | "junior_infants"
        | "senior_infants"
        | "first"
        | "second"
        | "third"
        | "fourth"
        | "fifth"
        | "sixth"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      year_group: [
        "junior_infants",
        "senior_infants",
        "first",
        "second",
        "third",
        "fourth",
        "fifth",
        "sixth",
      ],
    },
  },
} as const
