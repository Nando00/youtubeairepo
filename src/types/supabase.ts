export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          avatar_url: string | null
          user_id: string
          token_identifier: string
          subscription: string | null
          credits: string | null
          image: string | null
          created_at: string
          updated_at: string | null
          email: string | null
          name: string | null
          full_name: string | null
        }
        Insert: {
          id: string
          avatar_url?: string | null
          user_id: string
          token_identifier: string
          subscription?: string | null
          credits?: string | null
          image?: string | null
          created_at?: string
          updated_at?: string | null
          email?: string | null
          name?: string | null
          full_name?: string | null
        }
        Update: {
          id?: string
          avatar_url?: string | null
          user_id?: string
          token_identifier?: string
          subscription?: string | null
          credits?: string | null
          image?: string | null
          created_at?: string
          updated_at?: string | null
          email?: string | null
          name?: string | null
          full_name?: string | null
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string | null
          stripe_id: string | null
          price_id: string | null
          stripe_price_id: string | null
          currency: string | null
          interval: string | null
          status: string | null
          current_period_start: number | null
          current_period_end: number | null
          cancel_at_period_end: boolean | null
          amount: number | null
          started_at: number | null
          ends_at: number | null
          ended_at: number | null
          canceled_at: number | null
          customer_cancellation_reason: string | null
          customer_cancellation_comment: string | null
          metadata: Json | null
          custom_field_data: Json | null
          customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          stripe_id?: string | null
          price_id?: string | null
          stripe_price_id?: string | null
          currency?: string | null
          interval?: string | null
          status?: string | null
          current_period_start?: number | null
          current_period_end?: number | null
          cancel_at_period_end?: boolean | null
          amount?: number | null
          started_at?: number | null
          ends_at?: number | null
          ended_at?: number | null
          canceled_at?: number | null
          customer_cancellation_reason?: string | null
          customer_cancellation_comment?: string | null
          metadata?: Json | null
          custom_field_data?: Json | null
          customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          stripe_id?: string | null
          price_id?: string | null
          stripe_price_id?: string | null
          currency?: string | null
          interval?: string | null
          status?: string | null
          current_period_start?: number | null
          current_period_end?: number | null
          cancel_at_period_end?: boolean | null
          amount?: number | null
          started_at?: number | null
          ends_at?: number | null
          ended_at?: number | null
          canceled_at?: number | null
          customer_cancellation_reason?: string | null
          customer_cancellation_comment?: string | null
          metadata?: Json | null
          custom_field_data?: Json | null
          customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      webhook_events: {
        Row: {
          id: string
          event_type: string
          type: string
          stripe_event_id: string | null
          data: Json | null
          created_at: string
          modified_at: string
        }
        Insert: {
          id?: string
          event_type: string
          type: string
          stripe_event_id?: string | null
          data?: Json | null
          created_at?: string
          modified_at?: string
        }
        Update: {
          id?: string
          event_type?: string
          type?: string
          stripe_event_id?: string | null
          data?: Json | null
          created_at?: string
          modified_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      begin_transaction: {
        Args: Record<PropertyKey, never>
        Returns: void
      }
      commit_transaction: {
        Args: Record<PropertyKey, never>
        Returns: void
      }
      rollback_transaction: {
        Args: Record<PropertyKey, never>
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
