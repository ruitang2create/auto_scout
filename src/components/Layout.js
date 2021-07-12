import React from 'react';
import { Helmet } from 'react-helmet';

export default function Layout(props) {
    return (
        <div className="PageLayout">
            <Helmet>
                <meta charSet='utf-8' />
                <title>{props.title}</title>
                <meta name='description' content='An application that help you find auto models information' />
            </Helmet>
            {props.children}
        </div>
    );
};