import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import { loadString, removeKey, saveString } from '../utils/storage';
import { STORAGE_KEYS, VALID_EMAIL } from '../constants/auth';
import type { User } from '../types/User';
import { login } from '../services/auth';
import { Alert } from 'react-native';

type AuthStatus = 'loading' | 'unauth' | 'auth';

interface State {
    status: AuthStatus;
    user?: User;
}

type Action =
    | { type: 'RESTORE'; user?: User }
    | { type: 'SIGN_IN'; user: User }
    | { type: 'SIGN_OUT' }
    | { type: 'UPDATE_USER'; patch: Partial<User> };

// Reducer para manejar el estado de autenticacion
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'RESTORE':
            return action.user
                ? { status: 'auth', user: action.user }
                : { status: 'unauth' };
        case 'SIGN_IN':
            return { status: 'auth', user: action.user };
        case 'SIGN_OUT':
            return { status: 'unauth' };
        case 'UPDATE_USER':
            return state.user
                ? { ...state, user: { ...state.user, ...action.patch } }
                : state;
        default:
            return state;
    }
}

type AuthContextProps = {
    status: AuthStatus;
    user?: User;
    isAuthenticated: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    updateUser: (patch: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, { status: 'loading' });

    // Validar usuario al iniciar la app
    useEffect(() => {
        (async () => {
            const storedUser = await loadString(STORAGE_KEYS.user);
            const { email } = JSON.parse(storedUser || '{}');
            const ok = email === VALID_EMAIL;
            dispatch({
                type: 'RESTORE',
                user: ok ? { id: '1', email } : undefined,
            });
        })();
    }, []);

    const signIn: AuthContextProps['signIn'] = React.useCallback(
        async (email, password) => {
            const res = await login({ email, password });
            if (res?.code === 200) {
                await saveString(
                    STORAGE_KEYS.user as string,
                    JSON.stringify(res.data),
                );
                dispatch({
                    type: 'SIGN_IN',
                    user: { id: '1', email: email.trim().toLowerCase() },
                });
                return;
            }
            if (res?.code === 404) {
                Alert.alert(
                    'Usuario incorrecto',
                    'Revisá el email y la contraseña.',
                );
                throw new Error('Invalid credentials');
            }
            Alert.alert('Error', 'Ocurrió un error inesperado.');
            throw new Error('Unexpected error');
        },
        [],
    );

    const signOut: AuthContextProps['signOut'] = React.useCallback(async () => {
        await removeKey(STORAGE_KEYS.user);
        dispatch({ type: 'SIGN_OUT' });
    }, []);

    const updateUser: AuthContextProps['updateUser'] = patch =>
        dispatch({ type: 'UPDATE_USER', patch });

    // Memoizo las propiedades del contexto para evitar re-renders
    const value = useMemo<AuthContextProps>(
        () => ({
            status: state.status,
            user: state.user,
            isAuthenticated: state.status === 'auth',
            signIn,
            signOut,
            updateUser,
        }),
        [state, signIn, signOut],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export function useAuth(): AuthContextProps {
    const AuthContextProps = useContext(AuthContext);
    if (!AuthContextProps)
        throw new Error('useAuth must be used within <AuthProvider>');
    return AuthContextProps;
}
