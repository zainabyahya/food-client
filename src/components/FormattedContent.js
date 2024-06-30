import React from 'react';

const FormattedContent = ({ content }) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} className='text-end' />;
};

export default FormattedContent;
