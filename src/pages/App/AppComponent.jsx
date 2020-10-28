import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import PageHeader from 'components/PageHeader';
import PageTemplate from 'components/PageTemplate';
import { CommonProvider } from 'contexts/CommonContext';
import LogoSvg from 'static/images/logo.svg';
import Trace from 'components/Trace';

const AppComponent = ({
    title,
    configureBotTracing,
    filter,
    changeFilter,
    traces
}) => {
    return (
        <CommonProvider>
            <div id="main" className="App">
                <PageHeader
                    title={title}
                    logo={LogoSvg}
                    easter_egg="Who beholds the beholder?"
                />
                <PageTemplate title={title}>
                    <div id="tab-nav" className="bp-tabs-container">
                        <ul className="bp-tab-nav">
                            <li>
                                {/* eslint-disable-next-line */}
                                <a href="#" data-ref="tracing">
                                    Tracing
                                </a>
                            </li>
                        </ul>
                        <div
                            className="bp-tab-content fl w-100"
                            data-ref="tracing"
                        >
                            <div
                                className="bp-ff-nunito Tracing"
                                style={{ padding: '5px' }}
                            >
                                <div className="tracing-header">
                                    <button
                                        onClick={configureBotTracing}
                                        className="bp-btn bp-btn--bot bp-btn--small"
                                    >
                                        Ativar tracing no bot
                                    </button>
                                    <div className="filter-area">
                                        <FontAwesomeIcon icon={faFilter} />
                                        <div className="bp-input-wrapper">
                                            <label className="bp-label tl bp-c-cloud">
                                                Filtro por usuário
                                            </label>
                                            <input
                                                type="text"
                                                name="filter"
                                                placeholder="Ex.: 557391963704@wa.gw.msging.net"
                                                value={filter}
                                                onChange={changeFilter}
                                                className="bp-input bp-c-city"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {/* eslint-disable indent */}
                                    {traces
                                        ? traces
                                              .filter(
                                                  (trace) =>
                                                      !filter ||
                                                      trace.user_identity.includes(
                                                          filter
                                                      )
                                              )
                                              .map((trace) => (
                                                  <Trace
                                                      key={trace.id}
                                                      data={trace}
                                                  />
                                              ))
                                        : 'Nenhum tracing até o momento'}
                                </div>
                            </div>
                        </div>
                    </div>
                </PageTemplate>
            </div>
        </CommonProvider>
    );
};

AppComponent.propTypes = {
    title: PropTypes.string.isRequired,
    configureBotTracing: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    changeFilter: PropTypes.func.isRequired,
    traces: PropTypes.arrayOf(PropTypes.object)
};

export default AppComponent;
