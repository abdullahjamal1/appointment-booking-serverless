import {
    Auth,
} from 'aws-amplify'

export function getCurrentSession(){
    return Auth.currentSession();
}

export async function signOut() {
    try {
        await Auth.signOut({ global: true });
        localStorage.clear();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}