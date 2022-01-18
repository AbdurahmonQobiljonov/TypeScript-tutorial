import {useState, useCallback} from "react";

export const useHttp = () => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const request = useCallback(async (url: string, method: string = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setLoading(true);

        try {
            const response:Response = await fetch(url, {method, body, headers});

            if (!response.ok){
                throw new Error(`Could not fetch ${url}, status ${response.status}`);
            }

            const data = await response.json();

            setLoading(false);
            return data;
        } catch (e:any) {
            setLoading(false);
            setError(e.message);
            throw e
        }

    }, [])

    const clearError:()=>void = useCallback(() => setError(''),[])

    return{error,loading,request,clearError}

}