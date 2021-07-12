import React from 'react';
import { Helmet } from 'react-helmet';

export default function Layout(props) {
    return (
        <div className="PageLayout">
            <Helmet>
                <meta charSet='utf-8' />
                <title>{props.title}</title>
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                ></link>
                <meta name='description' content='An application that help you find auto models information' />
            </Helmet>
            {props.children}
        </div>
    );
};