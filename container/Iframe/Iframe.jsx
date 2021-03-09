import { React, useState } from 'react'
import { createPortal } from 'react-dom'
import { CacheProvider, css } from '@emotion/react'
import createCache from '@emotion/cache'
import weakMemoize from '@emotion/weak-memoize'

const memoizedCreateCacheWithContainer = weakMemoize(
    (container) => {
        const newCache = createCache({
            container,
            key: 'with-emotion'
        })
        return newCache
    }
)

export const Iframe = ({children, ...props}) => {
    const [contentRef, setContentRef] = useState(null)
    const doc = contentRef?.contentWindow?.document
    const mountNode = doc?.body
    const insertionTarget = doc?.head

    return (
        <iframe {...props} ref={setContentRef}>
            {mountNode &&
            insertionTarget &&
            createPortal(
                <CacheProvider
                    value={memoizedCreateCacheWithContainer(
                        insertionTarget
                    )}
                >
                    {children}
                </CacheProvider>,
                mountNode
            )}
        </iframe>
    )
}
