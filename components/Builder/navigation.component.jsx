import React, {useEffect, useState} from "react";
import styles from './builder.module.scss'
import {Droppable, Draggable} from 'react-beautiful-dnd';
import {Tab} from 'semantic-ui-react'
import Component, {ComponentEditor} from "../Component/Component";
import useTranslation from '../../intl/useTranslation';

export default function Navigation({composants, currentItem, onElementValeurChange, setCurrentElement}) {
    const {t} = useTranslation();

    const [activeIndex, setActiveIndex] = useState(0)
    const handleTabChange = (e, { activeIndex }) => {
        setActiveIndex(activeIndex)
        if(activeIndex !== 0){
            setCurrentElement({ id: "empty"})
        }
    }

    useEffect(function () {
        if(currentItem.id){
            if(currentItem.id !== "empty"){
                setActiveIndex(2)
            }else{
                setActiveIndex(1)
            }
        }
    }, [currentItem])

    const panes = [
        {
            menuItem: t('settingsLabel'),
            render: () => <Tab.Pane attached={true}>Tab 1 Content</Tab.Pane>,
        },
        {
            menuItem: t('componentLabel'),
            render: () =>
                <Tab.Pane attached={true}>
                    <Droppable droppableId="composants">
                        {(provided, snapshot) => (
                            <div className={"dropable"} ref={provided.innerRef}>
                                {composants.map((item, index) => <Draggable
                                    key={item.type}
                                    draggableId={item.type}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef}
                                             {...provided.draggableProps}
                                             {...provided.dragHandleProps}>
                                            <Component balise={item.balise} label={item.label} color={item.color}
                                                       tooltip={item.tooltip}/>
                                        </div>
                                    )}
                                </Draggable>)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Tab.Pane>

        },
        currentItem.type && {
            menuItem: t('editLabel') + ' ' + t(currentItem.type),
            render: () =>
                <Tab.Pane attached={true}>
                    <ComponentEditor element={currentItem} onElementValeurChange={onElementValeurChange}/>
                </Tab.Pane>
        }
    ]

    return (<>
            <div className={styles.navigation}>
                <Tab panes={panes} activeIndex={activeIndex} onTabChange={handleTabChange}/>
                <div>
                    <button>test</button>
                </div>
            </div>
        </>
    )
}
