import React from 'react';

const FormattedContent = ({ content }) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default FormattedContent;
