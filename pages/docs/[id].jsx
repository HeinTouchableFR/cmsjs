import React from 'react';
import PropTypes from 'prop-types';
import Docs from 'container/Docs/Docs';
import parse from 'html-react-parser';
import InSection from 'container/Docs/InSection';
import { getPostData } from 'docs/lib/data';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import InSectionSingle from 'container/Docs/InSectionSingle';

export default function Index({ data }) {
    const intl = useIntl();

    return (
        <>
            <Docs
                menu={data.menu}
                backUrl={data.backUrl}
            >
                <h1>{data.name}</h1>
                <section>
                    {parse(data.contentHtml)}
                    {
                        data.nextStep && (
                        <>
                            {intl.formatMessage({
                                id: 'docs.nextStep', defaultMessage: 'Next step: ',
                            })}
                            {' '}
                            <Link href={`${process.env.SERVER}/docs/${data.nextStep.id}`}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a>
                                    {data.nextStep.label}
                                </a>
                            </Link>
                        </>
)
                    }
                </section>
                {(data.inSection === true) && (
                    <InSection
                        elements={data.menu}
                    />
                )}
                {(data.inSection === 'single') && (
                    <InSectionSingle
                        elements={data.menu}
                    />
                )}
            </Docs>
        </>
    );
}
Index.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        contentHtml: PropTypes.string.isRequired,
        menu: PropTypes.arrayOf(PropTypes.shape({
        })).isRequired,
        inSection: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
        ]),
        backUrl: PropTypes.string.isRequired,
        nextStep: PropTypes.shape({
            label: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        }),
    }).isRequired,
};

export async function getServerSideProps(context) {
    const { id } = context.params;
    const lang = context.locales.includes(context.locale.substr(0, 2)) ? context.locale.substr(0, 2) : 'en';
    const data = await getPostData(id, lang);

    return {
        props: {
            data,
        },
    };
}
