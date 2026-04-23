import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', username: '', code: '' });
    const [step, setStep] = useState(1); // 1: Info, 2: Verification
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering && step === 1) {
                await API.post('/auth/send-code', { email: formData.email });
                setStep(2); // Move to verification code entry
            } else if (isRegistering && step === 2) {
                const { data } = await API.post('/auth/register', formData);
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                const { data } = await API.post('/auth/login', formData);
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            }
        } catch (err) {
            alert(err.response?.data?.message || "Authentication error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="text-emerald-500" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">@wxl_e Academy</h2>
                    <p className="text-slate-400 mt-2">Master the art of professional trading</p>
                </div>

                <form onSubmit={handleAuth} className="space-y-5">
                    {step === 1 ? (
                        <>
                            {isRegistering && (
                                <input 
                                    type="text" placeholder="Username" 
                                    className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                />
                            )}
                            <input 
                                type="email" placeholder="Email Address" 
                                className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                            <input 
                                type="password" placeholder="Password" 
                                className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4">
                            <p className="text-emerald-400 text-sm mb-2 font-medium">Verification code sent to your email!</p>
                            <input 
                                type="text" placeholder="6-Digit Code" 
                                className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-3 text-white text-center text-2xl tracking-[10px] focus:ring-2 focus:ring-emerald-500 outline-none"
                                onChange={(e) => setFormData({...formData, code: e.target.value})}
                            />
                        </div>
                    )}

                    <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                        {isRegistering ? (step === 1 ? 'Get Started' : 'Verify & Launch') : 'Sign In'}
                        <ArrowRight size={20} />
                    </button>
                </form>

                <p className="text-center mt-6 text-slate-500 text-sm">
                    {isRegistering ? "Already a trader?" : "New to the platform?"} 
                    <button 
                        onClick={() => { setIsRegistering(!isRegistering); setStep(1); }}
                        className="text-emerald-500 ml-2 font-semibold hover:underline"
                    >
                        {isRegistering ? 'Login here' : 'Create account'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
