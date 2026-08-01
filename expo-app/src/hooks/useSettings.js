import { useState, useEffect, useCallback } from 'react';
import { getSettings, saveSetting } from '../utils/storage';

export function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings().then(s => {
      setSettings(s);
      setLoading(false);
    });
  }, []);

  const update = useCallback(async (key, value) => {
    await saveSetting(key, value);
    setSettings(prev => prev ? { ...prev, [key]: value } : prev);
  }, []);

  return { settings, loading, update };
}
