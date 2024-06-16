
import { create } from 'zustand'

type Store = {
  projectId: string,
  setProjectId: (e: string) => void
}

export const useGlobalStore = create<Store>()((set) => ({
  projectId: '',
  setProjectId: (e) => set(() => ({ projectId: e })),
}))

