import React, {
    useEffect, useState,
} from 'react';
import styles from 'components/Tab/Tab.module.scss';
import PropTypes from 'prop-types';
import Pane from './Pane';

export default function Tab({panes, activeIndex, onTabChange}) {
    const [tabIndex, setTabIndex] = useState(activeIndex || 0);

    const handleTabChange = (index) => {
        setTabIndex(index);
        if (onTabChange) {
            onTabChange(index);
        }
    };

    useEffect(() => {
        setTabIndex(activeIndex);
    }, [activeIndex]);

    return (
        <>
            <div className={styles.ui}>
                <div className={styles.header}>
                    {panes && panes.map((item, index) => (item !== undefined
                        && (
                            <span
                                role='button'
                                tabIndex={-1}
                                onClick={() => handleTabChange(index)}
                                onKeyDown={() => handleTabChange(index)}
                                className={`${styles.item} ${tabIndex === index && styles.active}`}
                                key={item.label}
                            >
                                {item.label}
                            </span>
                        )
                    ))}
                </div>
                {/* eslint-disable-next-line react/no-array-index-key */}
                {panes && panes.map((pane, index) => <div key={`pane-${index}`} className={`${styles.pane} ${index === tabIndex && styles.active}`}>{pane && pane.render()}</div>)}
            </div>
        </>

    );
}

Tab.Pane = Pane;

Tab.propTypes = {
    panes: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        render: PropTypes.func.isRequired,
    })).isRequired,
    activeIndex: PropTypes.number,
    onTabChange: PropTypes.func,
};

Tab.defaultProps = {
    activeIndex: 0,
    onTabChange: () => {
    },
};
