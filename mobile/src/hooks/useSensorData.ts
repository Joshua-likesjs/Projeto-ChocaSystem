import React, { useState, useEffect } from 'react';
import { getFirebaseDatabase } from '../services/firebase';
import { ref, onValue } from 'firebase/database';
import { SensorData } from '../types';

export const useSensorData = () => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const db = getFirebaseDatabase();
    const sensorRef = ref(db, '/incubator/sensorData');

    const unsubscribe = onValue(
      sensorRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setSensorData(data);
        } else {
          setSensorData(null);
        }
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error('Erro ao buscar dados dos sensores:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { sensorData, loading, error };
};