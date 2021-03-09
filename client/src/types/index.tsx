export enum LoadStatus {
  PENDING,
  LOADED,
  NOTLOADED
}

export interface RootState {
  callCenter: Record<string, any>
}
