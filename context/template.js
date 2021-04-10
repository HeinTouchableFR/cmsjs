import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const Templates = createContext({
    value: '[]',
});

export function TemplatesProvider({ children }) {
    const [templates, setTemplates] = useState([]);

    useEffect(async () => {
        const templates = [];
        templates.header = {};
        templates.header.nav = [];
        await axios
            .get(process.env.URL + '/api/templates/header')
            .then((res) => {
                templates.header.template = res.data.data;
            })
            .catch(() => {});

        JSON.parse(templates['header']['template'].content).forEach((layout) => {
            layout.columns.forEach((column) => {
                column.elements.forEach(async (element) => {
                    if (element.type === 'menu') {
                        axios.get(`${process.env.URL}/api/menus/${element.content.menu.value}`).then((data) => {
                            templates.header.nav[`${element.id}`] = data.data.data;
                            setTemplates(templates);
                        });
                    }
                });
            });
        });
        templates['footer'] = {};

        setTemplates({ ...templates });
    }, []);

    return <Templates.Provider value={{ templates }}>{children}</Templates.Provider>;
}

export const useTemplates = () => {
    return useContext(Templates);
};
