import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePagination = (totalItems, itemsPerPage = 32) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const pageParam = parseInt(searchParams.get('page'), 10) || 1
    const [currentPage, setCurrentPage] = useState(pageParam)
    const startIndex = (currentPage - 1) * itemsPerPage

    useEffect(() => {
        setSearchParams({ page: currentPage })
    }, [currentPage])

    useEffect(() => {
        if (pageParam !== currentPage) {
            setCurrentPage(pageParam)
        }
    }, [searchParams])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currentPage])



    return {
        currentPage,
        setCurrentPage,
        startIndex,
        itemsPerPage,
    };
};
