import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


export const useStore = create(devtools(
    (set) => ({

        authUser: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null,
           
       setAuthUser: (user) => set({ authUser: user }),
       logout: () => set({ authUser: localStorage.removeItem('userInfo')}),
       
       balance:0,
       setBalance: (balance) => set({ balance }),
       
       
       
       
          
         
       })
));