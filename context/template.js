import React, {
    useState, useEffect, useContext, createContext,
} from 'react';
import { useSettings } from './settings';

const Templates = createContext({
    value: '{}',
    nav: '{}',
});

export function TemplatesProvider({ children }) {
    const { value: settings } = useSettings();
    const [value, setValue] = useState({
        templates: {
        },
    });
    const [nav, setNav] = useState({
    });

    useEffect(async () => {
        if (settings.settings) {
            const generalSettings = settings.settings.find((x) => x.id === 'general');
            const header = {
            };
            const footer = {
            };
            let dataNav = {
            };

            if (generalSettings && generalSettings.header) {
                const resHeader = await fetch(`${process.env.URL}/api/templates/${generalSettings.header}`);
                const dataHeader = await resHeader.json();
                if (dataHeader.success) {
                    header.template = dataHeader.data;
                    JSON.parse(header.template.content).forEach((layout) => {
                        layout.columns.forEach((column) => {
                            column.elements.forEach(async (element) => {
                                if (element.type === 'menu') {
                                    fetch(`${process.env.URL}/api/menus/${element.content.menu.value}`).then((res) => {
                                        res.json().then((data) => {
                                            dataNav = {
                                                ...dataNav,
                                                [element.id]: data.data,
                                            };
                                            setNav(dataNav);
                                        });
                                    });
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
                    JSON.parse(footer.template.content).forEach((layout) => {
                        layout.columns.forEach((column) => {
                            column.elements.forEach(async (element) => {
                                if (element.type === 'menu') {
                                    fetch(`${process.env.URL}/api/menus/${element.content.menu.value}`).then((res) => {
                                        res.json().then((data) => {
                                            dataNav = {
                                                ...dataNav,
                                                [element.id]: data.data,
                                            };
                                        });
                                    });
                                }
                            });
                        });
                    });
                }
            }
            setValue({
                templates: {
                    header, footer,
                },
            });

        }
    }, [settings]);

    return (
        <Templates.Provider
            value={{
                value,
                nav,
            }}
        >
            {children}
        </Templates.Provider>
    );
}

export const useTemplates = () => useContext(Templates);
