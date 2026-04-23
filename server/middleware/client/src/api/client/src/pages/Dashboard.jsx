import React, { useContext, useEffect, useState } from 'react';
import TradingChart from '../components/TradingChart';
import API from '../api/axios';

const Dashboard = () => {
    const [stats, setStats] = useState({ balance: 0, profit: 0 });

    useEffect(() => {
        const fetchUserData = async () => {
            const { data } = await API.get('/users/profile');
            setStats({ balance: data.balance, profit: data.profit || 0 });
        };
        fetchUserData();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-emerald-400">@wxl_e Trading Terminal</h1>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <p className="text-sm text-slate-400">Virtual Balance</p>
                    <p className="text-2xl font-mono">${stats.balance.toLocaleString()}</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-4 border border-slate-800">
                    <TradingChart symbol="BINANCE:BTCUSDT" />
                </div>
                
                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                    <h3 className="text-lg font-semibold mb-4">Quick Trade</h3>
                    <div className="space-y-4">
                        <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-bold transition">
                            BUY BTC
                        </button>
                        <button className="w-full py-3 bg-rose-500 hover:bg-rose-600 rounded-lg font-bold transition">
                            SELL BTC
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
