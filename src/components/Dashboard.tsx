// src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setPriceData } from '../features/priceSlice';
import { fetchPriceData } from '../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const { priceData } = useSelector((state: RootState) => state.price);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchPriceData('BE');
                console.log('Data received from API:', data);

                if (data && data.unix_seconds && data.price && data.unix_seconds.length === data.price.length) {
                    const formattedPriceData = data.unix_seconds.map((time: number, index: number) => {
                        const date = new Date(time * 1000);
                        const computedPrice = ((data.price[index] / 1000) + 0.136) * 1.06;
                        return {
                            time: date.toLocaleTimeString(),
                            date: date.toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }),
                            price: computedPrice,
                        };
                    });

                    console.log('Formatted price data:', formattedPriceData);
                    dispatch(setPriceData(formattedPriceData));
                } else {
                    throw new Error('La structure des données reçues n’est pas conforme');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération ou du traitement des données :', error);
                setError('Impossible de charger les données. Veuillez réessayer plus tard.');
            }
        };

        fetchData();
    }, [dispatch]);

    // Extraire la date du premier élément pour l'afficher dans le titre
    const firstDataDate = priceData.length > 0 ? priceData[0].date : '';

    return (
        <div>
            <h1>Prix de l’électricité en Belgique pour {firstDataDate}</h1>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : priceData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={priceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="price" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    );
};

export default Dashboard;