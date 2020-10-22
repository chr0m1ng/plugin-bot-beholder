import React, { useEffect, useState } from 'react';
import 'blip-toolkit/dist/blip-toolkit.css';
import { getApplication } from 'services/application-service';
import { getAllContactsAsync } from 'services/contact-service';
import { showToast, withLoading } from 'services/common-service';
import { PageHeader } from 'components/PageHeader';
import { CommonProvider } from 'contexts/CommonContext';
import { PageTemplate } from 'components/PageTemplate';
import BlipPortalToastTypes from 'constants/blip-portal-toast-types';
import Contact from 'components/Contact';

const AppComponent = () => {
    const [application, setApplication] = useState({});
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        withLoading(async () => {
            setApplication(await getApplication());
            setContacts(await getAllContactsAsync());
        });
    }, [application.shortName]);

    const title = `Sample Plugin - ${application.shortName}`;

    useEffect(() => {
        showToast({
            type: BlipPortalToastTypes.success,
            message: 'Success loaded'
        });
    }, []);

    return (
        <CommonProvider>
            <div id="main" className="App">
                <PageHeader title={title} />
                <PageTemplate title={title}>
                    <ul>
                        {contacts.map((c) => (
                            <li className="clickable" key={c.identity}>
                                <Contact identity={c.identity} />
                            </li>
                        ))}
                    </ul>
                </PageTemplate>
            </div>
        </CommonProvider>
    );
};

export default AppComponent;
