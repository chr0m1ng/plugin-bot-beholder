import React from 'react';
import Proptypes from 'prop-types';

const PageHeaderComponent = ({ title, logo, easter_egg }) => (
    <div className="header">
        <div className="dt dt--fixed">
            <div className="dtc tl v-mid">
                <h1 className="bp-fs-3 bp-c-city">{title}</h1>
            </div>
            <div className="dtc">
                <div id="logo-area" className="dt dt--fixed tr">
                    <div className="dt-row">
                        {logo && (
                            <img
                                id="logo-img"
                                className="w-25 h-25"
                                src={logo}
                                alt="logo"
                            />
                        )}
                    </div>
                    <div className="dt-row">
                        {easter_egg && (
                            <span id="easter-egg" className="tr">
                                {easter_egg}
                            </span>
                        )}
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
