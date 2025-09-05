import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../services/products';
import { Product } from '../types/Products';

type UseProductsReturn = {
    products: Product[];
    loading: boolean;
    error: { title: string; message: string } | null;
    fetchProducts: () => Promise<void>;
};

const useProducts = (): UseProductsReturn => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<{
        title: string;
        message: string;
    } | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getProducts();
            setProducts(response);
        } catch (err: any) {
            setError({
                title: 'Error fetching products',
                message: err.message || 'Unknown error',
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, error, fetchProducts };
};

export default useProducts;
