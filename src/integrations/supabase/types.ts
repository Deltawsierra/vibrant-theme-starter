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
      ai_conversations: {
        Row: {
          created_at: string | null
          id: string
          session_id: string
          summary: string | null
          transcript: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          session_id: string
          summary?: string | null
          transcript?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          session_id?: string
          summary?: string | null
          transcript?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      calendar_events: {
        Row: {
          created_at: string | null
          event_id: string | null
          id: string
          recruiter_email: string
          status: string | null
          time: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          recruiter_email: string
          status?: string | null
          time?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          recruiter_email?: string
          status?: string | null
          time?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      generated_letters: {
        Row: {
          content: string
          created_at: string | null
          id: string
          requested_by: string | null
          type: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          requested_by?: string | null
          type: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          requested_by?: string | null
          type?: string
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content: Json
          id: string
          page_name: string
          title: string
          updated_at: string
        }
        Insert: {
          content: Json
          id?: string
          page_name: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          id?: string
          page_name?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_submissions: {
        Row: {
          ai_alignment_report: string | null
          created_at: string | null
          id: string
          job_description: string | null
          recruiter_email: string | null
        }
        Insert: {
          ai_alignment_report?: string | null
          created_at?: string | null
          id?: string
          job_description?: string | null
          recruiter_email?: string | null
        }
        Update: {
          ai_alignment_report?: string | null
          created_at?: string | null
          id?: string
          job_description?: string | null
          recruiter_email?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      recruiter_visits: {
        Row: {
          detected_company: string | null
          id: string
          ip: string | null
          is_recruiter: boolean | null
          notes: string | null
          timestamp: string | null
          user_agent: string | null
        }
        Insert: {
          detected_company?: string | null
          id?: string
          ip?: string | null
          is_recruiter?: boolean | null
          notes?: string | null
          timestamp?: string | null
          user_agent?: string | null
        }
        Update: {
          detected_company?: string | null
          id?: string
          ip?: string | null
          is_recruiter?: boolean | null
          notes?: string | null
          timestamp?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      resume_vectors: {
        Row: {
          chunk_text: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          chunk_text: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          chunk_text?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      story_chapters: {
        Row: {
          chapter_number: number
          content: string
          created_at: string
          id: string
          images: Json | null
          metadata: Json | null
          title: string
        }
        Insert: {
          chapter_number: number
          content: string
          created_at?: string
          id?: string
          images?: Json | null
          metadata?: Json | null
          title: string
        }
        Update: {
          chapter_number?: number
          content?: string
          created_at?: string
          id?: string
          images?: Json | null
          metadata?: Json | null
          title?: string
        }
        Relationships: []
      }
      story_progress: {
        Row: {
          completed_chapters: number[] | null
          completion_percentage: number | null
          current_chapter: number
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_chapters?: number[] | null
          completion_percentage?: number | null
          current_chapter?: number
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_chapters?: number[] | null
          completion_percentage?: number | null
          current_chapter?: number
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          data: Json | null
          game_type: string
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          data?: Json | null
          game_type: string
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          data?: Json | null
          game_type?: string
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_collectibles: {
        Row: {
          collectible_id: string
          found_at: string
          id: string
          theme: string
          user_id: string
        }
        Insert: {
          collectible_id: string
          found_at?: string
          id?: string
          theme: string
          user_id: string
        }
        Update: {
          collectible_id?: string
          found_at?: string
          id?: string
          theme?: string
          user_id?: string
        }
        Relationships: []
      }
      user_scores: {
        Row: {
          created_at: string
          game_type: string
          ghosts_eaten: number | null
          id: string
          level_reached: number | null
          pellets_eaten: number | null
          score: number
          session_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          game_type?: string
          ghosts_eaten?: number | null
          id?: string
          level_reached?: number | null
          pellets_eaten?: number | null
          score?: number
          session_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          game_type?: string
          ghosts_eaten?: number | null
          id?: string
          level_reached?: number | null
          pellets_eaten?: number | null
          score?: number
          session_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      world_progress: {
        Row: {
          discovered_locations: string[] | null
          id: string
          progress_nodes: Json | null
          unlocked_objects: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          discovered_locations?: string[] | null
          id?: string
          progress_nodes?: Json | null
          unlocked_objects?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          discovered_locations?: string[] | null
          id?: string
          progress_nodes?: Json | null
          unlocked_objects?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
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
