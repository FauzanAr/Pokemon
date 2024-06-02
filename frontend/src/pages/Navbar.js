import React, { useState } from 'react';
import { Menu, MenuMenu, MenuItem, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function Navbar({ children }) {
    const [activeItem, setActiveItem] = useState('home');
    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <div>
            <Menu pointing secondary>
                <MenuItem
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/"
                />
                <MenuMenu position='right'>
                    <MenuItem
                        name='my-pokemon'
                        active={activeItem === 'my-pokemon'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/my-pokemon"
                    />
                </MenuMenu>
            </Menu>

            <Segment>
                <div className="main-content">
                    {children}
                </div>
            </Segment>
        </div>
    )
}

export default Navbar;