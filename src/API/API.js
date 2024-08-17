import axios from 'axios';
import { notify_error } from '../notification/Notification';
import { Navigate } from 'react-router-dom';

const url = process.env.REACT_APP_BE_URL;

async function callAPI(method, endpoint, data) {
    const fullUrl = `${url}${endpoint}`;
    const jwt = localStorage.getItem('jwt') || '0';

    const headers = {
        'Authorization': `${jwt}`
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        headers['Content-Type'] = 'application/json';
    }

    try {
        const response = await axios({
            method: method,
            url: fullUrl,
            data: data,
            headers: headers
        });
        return response;
    } catch (error) {
        if (error.response?.status === 401) {
            if (localStorage.getItem('jwt')) {
                localStorage.removeItem('jwt');
                notify_error('Session expired. Please login again');
            }
            Navigate('/login');
            notify_error('Please login to continue');
            return { error: 'Unauthorized' };
        }
        if (error.response?.data?.error) {
            notify_error(error.response.data.error);
            return { error: error.response.data.error };
        }
        notify_error('An unexpected error occurred');
        return { error: 'Unexpected error' };
    }
}

export { callAPI };