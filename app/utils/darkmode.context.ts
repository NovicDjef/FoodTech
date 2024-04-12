import { Context, createContext } from "react"

type DarkmodeContextValue = {
    isDarkMode: boolean;
    useDeviceSettings: boolean;
    setIsDarkMode:(prev:boolean) =>void;
    setUseDeviceSettings:(prev:boolean) =>void;
}

const DarkMode: Context<DarkmodeContextValue> = createContext<DarkmodeContextValue>({
    isDarkMode:false,
    setIsDarkMode: () => {},
    setUseDeviceSettings: () => {},
    useDeviceSettings:false 
})

export default DarkMode