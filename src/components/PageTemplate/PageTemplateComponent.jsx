import React from 'react';
import PropTypes from 'prop-types';

const PageTemplateComponent = ({ children }) => {
    return (
        <>
            <div className="bp-card bp-card--left-arrow page-template">
                {children}
            </div>
        </>
    );
};

PageTemplateComponent.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default PageTemplateComponent;
