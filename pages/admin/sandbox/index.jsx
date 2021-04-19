import React, {useState} from 'react';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Tab from 'components/Tab/Tab';

export default function Index() {

    const [activeIndex, setActiveIndex] = useState(0);
    const handleTabChange = (index) => {
        setActiveIndex(index);
    };

    const panes = [
        {
            label: 'Tab 1',
            render: () => <Tab.Pane>Test 1</Tab.Pane>,
        },
        {
            label: 'Tab 2',
            render: () => <Tab.Pane>Test 2</Tab.Pane>,
        },
    ];

    return (
        <>
            <DarkModeButton />
            <div className='sandbox-container'>
                <Tab panes={panes} activeIndex={activeIndex} onTabChange={handleTabChange} />
            </div>
        </>
    );
}
/*

 */
