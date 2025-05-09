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
          user_id: string
          status: string
          price_id: string | null
          quantity: number | null
          cancel_at_period_end: boolean | null
          created: string | null
          current_period_start: string | null
          current_period_end: string | null
          ended_at: string | null
          cancel_at: string | null
          canceled_at: string | null
          trial_start: string | null
          trial_end: string | null
        }
        Insert: {
          id: string
          user_id: string
          status: string
          price_id?: string | null
          quantity?: number | null
          cancel_at_period_end?: boolean | null
          created?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          ended_at?: string | null
          cancel_at?: string | null
          canceled_at?: string | null
          trial_start?: string | null
          trial_end?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          price_id?: string | null
          quantity?: number | null
          cancel_at_period_end?: boolean | null
          created?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          ended_at?: string | null
          cancel_at?: string | null
          canceled_at?: string | null
          trial_start?: string | null
          trial_end?: string | null
        }
      }
      webhook_events: {
        Row: {
          id: string
          event_id: string
          event_type: string
          created_at: string
          payload: Json
        }
        Insert: {
          id: string
          event_id: string
          event_type: string
          created_at?: string
          payload: Json
        }
        Update: {
          id?: string
          event_id?: string
          event_type?: string
          created_at?: string
          payload?: Json
        }
      }
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
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
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
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
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

export const Constants = {
  public: {
    Enums: {},
  },
} as const
