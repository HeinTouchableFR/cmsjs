import React, {
    useState, useEffect, useContext, createContext,
} from 'react';
import { useSettings } from './settings';

const Templates = createContext({
    value: '[]',
});

export function TemplatesProvider({ children }) {
    const { value: settings } = useSettings();
    const [templates, setTemplates] = useState([]);

    useEffect(async () => {
        if (settings.settings) {
            const generalSettings = settings.settings.find((x) => x.id === 'general');
            const header = {
            };
            const footer = {
            };

            if (generalSettings && generalSettings.header) {
                const resHeader = await fetch(`${process.env.URL}/api/templates/${generalSettings.header}`);
                const dataHeader = await resHeader.json();
                if (dataHeader.success) {
                    header.template = dataHeader.data;
                    header.nav = {
                    };
                    JSON.parse(header.template.content).forEach((layout) => {
                        layout.columns.forEach((column) => {
                            column.elements.forEach(async (element) => {
                                if (element.type === 'menu') {
                                    const res = await fetch(`${process.env.URL}/api/menus/${element.content.menu.value}`);
                                    const data = await res.json();
                                    header.nav = {
                                        ...header.nav,
                                        [element.id]: data.data,
                                    };
                                }
                            });
                        });
                    });
                }
            }

            if (generalSettings && generalSettings.footer) {
                const resFooter = await fetch(`${process.env.URL}/api/templates/${generalSettings.footer}`);
                const dataFooter = await resFooter.json();
                if (dataFooter.success) {
                    footer.template = dataFooter.data;
                    footer.nav = {
                    };
                    JSON.parse(footer.template.content).forEach((layout) => {
                        layout.columns.forEach((column) => {
                            column.elements.forEach(async (element) => {
                                if (element.type === 'menu') {
                                    const res = await fetch(`${process.env.URL}/api/menus/${element.content.menu.value}`);
                                    const data = await res.json();
                                    footer.nav = {
                                        ...footer.nav,
                                        [element.id]: data.data,
                                    };
                                }
                            });
                        });
                    });
                }
            }

            setTemplates({
                header, footer,
            });
        }
    }, [settings]);

    return (
        <Templates.Provider
            value={{
                templates,
            }}
        >
            {children}
        </Templates.Provider>
    );
}

export const useTemplates = () => useContext(Templates);
