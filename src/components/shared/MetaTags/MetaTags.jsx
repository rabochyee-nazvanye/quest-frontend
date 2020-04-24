import React from 'react';
import { Helmet } from 'react-helmet';
import { func, shape, string, object, array } from 'prop-types';
import { CLIENT_URL } from '../../../settings'

const getDefault = {
    title: "Квестспейс",
    description: "Создавайте и проводите квесты онлайн",
    keywords: "квест",
    robots:"",
    canonicalUrl: CLIENT_URL
};

export const getPageMetadata = metaData => {
    if (metaData !== undefined) {
        return {
            title: metaData.title,
            description: metaData.description,
            keywords: metaData.keywords,
            robots: metaData.canonicalUrl,
            canonicalUrl: metaData.canonicalUrl,
        }
    } else {
        const defaultData = getDefault;
        return {
            title: defaultData.title,
            description: defaultData.description,
            keywords: defaultData.keywords,
            robots: defaultData.robots,
            canonicalUrl: defaultData.canonicalUrl
        };
    }
};

const MetaTags = props => {
    const { metaData } = props;
    const meta = getPageMetadata(metaData);
    return (
        <Helmet>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <meta name="keywords" content={meta.keywords} />
            <link rel="canonical" href={meta.canonicalUrl} />
        </Helmet>
    );
};

export default MetaTags;