import { getCurrentSession } from './session'

export async function getHeaders(includeAuth: Boolean, contentType = 'application/json') {
    const headers = {
        "Content-Type": contentType,
        "Authorization": ""
    }

    if (!includeAuth) {
        return {
            "Content-Type": "application/json"
        }
    }
    let session = null
    try {
        session = await getCurrentSession();
    } catch (ex: any) {
        // error
        console.log('error', ex);
    }
    if (session) {
        let authheader = session.getIdToken().getJwtToken()
        headers['Authorization'] = authheader
    }
    return headers
}