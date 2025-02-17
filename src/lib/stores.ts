import { writable } from "svelte/store";
import { browser } from "$app/environment";

const createTheme = () => {
    let defaultTheme = "light";
    if (browser) {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            localStorage.setItem("theme", storedTheme);
            document.documentElement.className = storedTheme;
            defaultTheme = storedTheme;

        }
        else {
            const preferredColorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            localStorage.setItem("theme", preferredColorScheme);
            document.documentElement.className = preferredColorScheme;
            defaultTheme = preferredColorScheme;
        }
    }

    const { subscribe, set, } = writable(defaultTheme);
    
    return {
        subscribe,
        set: (theme: string) => {
            set(theme);
            localStorage.setItem("theme", theme);
            if (browser) {
                document.documentElement.className = theme;
            }

        },
    };
};
export const EditorInstance = writable({});
export const EditorMarkdown = writable("");
export const EditorJSON = writable({});
export const Theme = createTheme();
export const CommandPaletteOpen = writable(false);