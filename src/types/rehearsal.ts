export interface Scenario {
  id: string;
  label: string;
  title: string;
  description: string;
  question: string;
  difficulty_min: number;
  difficulty_max: number;
}

export interface RehearsalSession {
  id: string;
  user_id: string;
  scenario_id: string;
  context?: string;
  goal?: string;
  difficulty: number;
  status: SessionStatus;
  started_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export type SessionStatus = "ready" | "listening" | "speaking" | "processing" | "responding" | "paused" | "completed";

export interface RehearsalTurn {
  id: string;
  session_id: string;
  turn_number: number;
  role: "user" | "ai";
  content: string;
  created_at: string;
}

export interface RehearsalSetup {
  scenario_id: string;
  context: string;
  goal: string;
  difficulty: number;
}
