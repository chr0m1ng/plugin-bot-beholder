import React from 'react';
import Proptypes from 'prop-types';

const PageHeaderComponent = ({ title, logo, easter_egg }) => (
    <div className="header">
        <div className="dt dt--fixed">
            <div className="dtc tl v-mid w-90">
                <h1 className="bp-fs-3 bp-c-city">{title}</h1>
            </div>
            <div className="dtc w-10">
                <div className="dt dt--fixed">
                    <div id="logo-area" className="dt-row tc">
                        {logo && (
                            <img
                                id="logo-img"
                                className="w-100 h-100"
                                src={logo}
                                alt="logo"
                            />
                        )}
                    </div>
                    <div id="easter-egg" className="dt-row">
                        {easter_egg && <span className="tr">{easter_egg}</span>}
                    </div>
                </div>
            </div>
        </div>
        <div className="dt dt--fixed">
            <div className="bp-divider-h"></div>
        </div>
    </div>
);

PageHeaderComponent.propTypes = {
    title: Proptypes.string,
    logo: Proptypes.string,
    easter_egg: Proptypes.string
};

export default PageHeaderComponent;
