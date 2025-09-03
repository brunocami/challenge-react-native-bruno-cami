import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../services/products';
import { Product } from '../types/Products';

type UseProductsReturn = {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
};

const useProducts = (): UseProductsReturn => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getProducts();
            setProducts(response);
        } catch (err: any) {
            setError(err.message || 'Error fetching products');
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
