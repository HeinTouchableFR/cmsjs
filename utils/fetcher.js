import {
    useCallback, useState,
} from 'react';

const fetcher = async (URL, init, method = 'GET', data = null) => {
    const params = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        ...init,
    };

    if (data) {
        params.body = JSON.stringify(data);
    }

    const response = await fetch(URL, params);

    if (response.status === 204) {
        return null;
    }

    const responseData = await response.json();

    if (response.ok) {
        return responseData;
    }
    throw responseData;
};

export function useFetcher(URL, method = 'POST', callback = null) {
    const [errors, setErrors] = useState({
    });
    const [loading, setLoading] = useState(false);
    const load = useCallback(async (data = null, init = {
    }) => {
        setLoading(true);
        try {
            const response = await fetcher(URL, init, method, data);
            setLoading(false);
            if (callback) {
                callback(response.data);
            }
        } catch (e) {
            setLoading(false);
            setErrors(e.errors);
        }
    }, [URL, method, callback]);

    return {
        loading,
        errors,
        load,
    };
}

export default fetcher;
