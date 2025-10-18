import { createContext } from "react";

export const Context = createContext()



return(
    <NoteContext.Provider value={{}}>
        {children}
    </NoteContext.Provider>
)