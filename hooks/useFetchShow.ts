import axios from 'axios';
import { Show } from '@/app/models/Show';
import { useState, useEffect } from 'react';

const useFetchShow = (showName?: string) => {
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShow = async () => {
            try {
                setLoading(true);
                console.log("Starting...");
                const response = await axios.post("https://skyhighcloud.tech/light/routes/actions/shows.php", new URLSearchParams(showName ? {
                    func: "fetchShow",
                    showname: showName,
                } : {
                    func: "getShows",
                }), {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });

                console.log("Response Data:", response.data);

                if (response.data) {
                    setShow(response.data);
                } else {
                    console.log("Empty response");
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchShow();
    }, [showName]);

    return { show, loading, error };
};

export default useFetchShow;
