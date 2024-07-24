// walletStore.js
import {create} from 'zustand';

const useWalletStore = create((set) => ({
  balance: 0,
  setBalance: (newBalance) => set({ balance: newBalance }),
  increaseBalance: (amount) => set((state) => ({ balance: state.balance + amount })),
  decreaseBalance: (amount) => set((state) => ({ balance: state.balance - amount })),
}));

export default useWalletStore;
