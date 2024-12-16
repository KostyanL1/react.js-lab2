import { useState, useEffect } from 'react';

export function usePermission(permissionName) {
    const [hasPermission, setHasPermission] = useState(null); // null = unknown, true = granted, false = denied
    const [isChecking, setIsChecking] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.permissions) {
            setError('Permissions API is not supported in this browser.');
            setIsChecking(false);
            return;
        }

        const checkPermission = async () => {
            try {
                const permissionStatus = await navigator.permissions.query({ name: permissionName });
                setHasPermission(permissionStatus.state === 'granted');

                const handleChange = () => {
                    setHasPermission(permissionStatus.state === 'granted');
                };

                permissionStatus.addEventListener('change', handleChange);

                return () => {
                    permissionStatus.removeEventListener('change', handleChange);
                };
            } catch (err) {
                setError(err.message);
            } finally {
                setIsChecking(false);
            }
        };

        checkPermission();
    }, [permissionName]);

    return { hasPermission, isChecking, error };
}
