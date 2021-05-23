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
            const header = {
            };
            const footer = {
            };
            let dataNav = {
            };

            if (settings && settings.settings.find((x) => x.data === 'header')) {
                if (settings.settings.find((x) => x.data === 'header').template) {
                    header.template = settings.settings.find((x) => x.data === 'header').template;
                    JSON.parse(header.template.content).forEach((layout) => {
                        layout.columns.forEach((column) => {
                            column.elements.forEach(async (element) => {
                                if (element.type === 'menu') {
                                    fetch(`${process.env.URL}/api/menus/${element.content.menu}`).then((res) => {
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

            if (settings && settings.settings.find((x) => x.data === 'footer')) {
                if (settings.settings.find((x) => x.data === 'footer').template) {
                    footer.template = settings.settings.find((x) => x.data === 'footer').template;
                    JSON.parse(footer.template.content).forEach((layout) => {
                        layout.columns.forEach((column) => {
                            column.elements.forEach(async (element) => {
                                if (element.type === 'menu') {
                                    fetch(`${process.env.URL}/api/menus/${element.content.menu}`).then((res) => {
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
