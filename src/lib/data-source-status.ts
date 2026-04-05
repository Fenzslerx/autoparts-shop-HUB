export type RuntimeDataSourceState = {
  source: 'supabase' | 'd1' | 'local'
  warning?: string
}

let runtimeDataSourceState: RuntimeDataSourceState = {
  source: 'local',
}

export function setRuntimeDataSourceState(state: RuntimeDataSourceState) {
  runtimeDataSourceState = state
}

export function getRuntimeDataSourceState(): RuntimeDataSourceState {
  return runtimeDataSourceState
}
