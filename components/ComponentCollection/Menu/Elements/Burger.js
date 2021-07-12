const Burger = {
    display: 'none',
    position: 'relative',
    marginLeft: 'auto',
    height: '37px',
    zIndex: 51,
    '@media (max-width: 768px)': {
        display: 'block',
    },
    span: {
        position: 'relative',
        content: '\'\'',
        width: '20px',
        height: '2px',
        display: 'block',
        transition: 'transform .4s, background .2s',
        background: 'currentColor',
        '&:before': {
            position: 'absolute',
            content: '\'\'',
            width: '20px',
            height: '2px',
            background: 'currentColor',
            display: 'block',
            transition: 'transform .4s, background .2s',
            transformOrigin: '0 50%',
            top: '-6px',
        },
        '&:after': {
            position: 'absolute',
            content: '\'\'',
            width: '20px',
            height: '2px',
            background: 'currentColor',
            display: 'block',
            transition: 'transform .4s, background .2s',
            bottom: '-6px',
            transformOrigin: '0 50%',
        },
    },
    '&.active': {
        span: {
            background: 'transparent',
            '&:before': {
                transform: 'translateY(-2px) rotate(45deg)',
            },
            '&:after': {
                transform: 'rotate(-45deg)',
            },
        },
    },
};

const handleOpenNav = (entry) => {
    entry.target.firstChild.classList.toggle('active');
    entry.target.lastChild.classList.toggle('active');
};

export { Burger,
    handleOpenNav };
