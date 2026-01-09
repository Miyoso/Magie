'use client';

import React, { useState, useEffect } from 'react';
import { Leaf, Sparkles, FlaskConical, Scroll, Ghost, Trophy, Zap, BookOpen, AlertTriangle, Target } from 'lucide-react';

export default function TokenTracker() {
    // Données de base
    const defaultCourses = [
        { id: 1, title: 'ALCHIMIE - BOTANIQUE', icon: 'leaf', current: 18, max: 30, status: 'En cours' },
        // MODIFICATION ICI : J'ai enlevé "priority: true" et changé le statut en "En cours"
        { id: 2, title: 'SORTS', icon: 'sparkles', current: 19, max: 40, status: 'En cours' },
        { id: 3, title: 'POTIONS', icon: 'flask', current: 11, max: 20, status: 'En cours' },
        { id: 4, title: 'HISTOIRE DE LA MAGIE', icon: 'scroll', current: 13, max: 20, status: 'En cours' },
        { id: 5, title: 'CRÉATURES MAGIQUES', icon: 'ghost', current: 12, max: 20, status: 'En cours' },
        { id: 6, title: 'CLUB', icon: 'trophy', current: 8, max: 10, status: 'En cours' },
        { id: 7, title: 'DIVERS', icon: 'zap', current: 21, max: 40, status: 'En cours' },
    ];

    const [courses, setCourses] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem('poudlard-tracker-v1');
        if (savedData) {
            setCourses(JSON.parse(savedData));
        } else {
            setCourses(defaultCourses);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('poudlard-tracker-v1', JSON.stringify(courses));
        }
    }, [courses, isLoaded]);

    const getIcon = (name) => {
        const className = "w-5 h-5";
        switch(name) {
            case 'leaf': return <Leaf className={`${className} text-emerald-400`} />;
            case 'sparkles': return <Sparkles className={`${className} text-cyan-300`} />;
            case 'flask': return <FlaskConical className={`${className} text-blue-400`} />;
            case 'scroll': return <Scroll className={`${className} text-slate-300`} />;
            case 'ghost': return <Ghost className={`${className} text-indigo-300`} />;
            case 'trophy': return <Trophy className={`${className} text-sky-400`} />;
            case 'zap': return <Zap className={`${className} text-violet-400`} />;
            default: return <Zap className={className} />;
        }
    };

    const totalPoints = courses.reduce((acc, course) => acc + (course.current || 0), 0);
    const maxPoints = courses.reduce((acc, course) => acc + (course.max || 0), 0);
    const completedCourses = courses.filter(c => c.current >= c.max).length;
    const highPriorityCount = courses.filter(c => c.priority).length;

    const updatePoints = (id, amount) => {
        setCourses(courses.map(course => {
            if (course.id === id) {
                const newPoints = Math.min(Math.max(course.current + amount, 0), course.max);
                return { ...course, current: newPoints };
            }
            return course;
        }));
    };

    const resetAll = () => {
        if(confirm("Veux-tu vraiment tout remettre à ZÉRO ?")) {
            // Remise à zéro tout en gardant la structure propre (sans priorité)
            const zeroCourses = defaultCourses.map(course => ({
                ...course,
                current: 0
            }));
            setCourses(zeroCourses);
        }
    };

    if (!isLoaded) return <div className="min-h-screen bg-[#0f1219] text-blue-400 flex items-center justify-center font-serif">Chargement de la magie...</div>;

    return (
        <div className="min-h-screen bg-[#0f1219] text-slate-200 p-6 selection:bg-blue-900 selection:text-white">
            <header className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-serif text-blue-400 tracking-wider">SUIVI DES JETONS</h1>
                    <p className="text-xs text-slate-500 mt-1">Gérez votre progression académique</p>
                </div>
                <button onClick={resetAll} className="border border-red-900 text-red-500 hover:bg-red-900/20 px-4 py-1 rounded text-xs transition-colors">
                    Réinitialiser à 0
                </button>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <StatCard icon={<Target className="text-blue-400 mb-2" />} value={`${totalPoints}/${maxPoints}`} label="Points Totaux" />
                <StatCard icon={<Trophy className="text-sky-400 mb-2" />} value={`${completedCourses}/7`} label="Cours Complétés" />
                <StatCard icon={<BookOpen className="text-indigo-400 mb-2" />} value="7" label="Total Cours" />
                
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                    <h2 className="text-2xl font-serif text-blue-500/90 tracking-widest uppercase">Première Année</h2>
                    <span className="text-blue-400 font-bold">{totalPoints} / {maxPoints}</span>
                </div>
                <div className="h-2 bg-[#1e2330] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-700 to-cyan-400 transition-all duration-500" style={{ width: `${(totalPoints / maxPoints) * 100}%` }}></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {courses.map(course => (
                    <div key={course.id} className="bg-[#161b25] border border-slate-800/50 rounded-lg p-5 hover:border-blue-500/50 transition-colors shadow-lg shadow-black/40">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="mt-1">{getIcon(course.icon)}</div>
                            <div className="w-full">
                                <div className="flex justify-between">
                                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">{course.title}</h3>
                                    <span className="text-blue-400 font-serif text-lg">{course.current} <span className="text-xs text-slate-500">/ {course.max}</span></span>
                                </div>
                                <div className="h-2 bg-[#0f1219] rounded-full overflow-hidden border border-slate-800 mt-2">
                                    <div className="h-full bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-400 transition-all duration-300" style={{ width: `${(course.current / course.max) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <p className="text-[10px] text-slate-500">
                                {course.current >= course.max ? <span className="text-cyan-400 font-bold shadow-cyan-500/20 drop-shadow-sm">Terminé !</span> : `Reste: ${course.max - course.current}`}
                            </p>
                            <div className="flex gap-1">
                                <ControlButton onClick={() => updatePoints(course.id, -1)}>-</ControlButton>
                                <ControlButton onClick={() => updatePoints(course.id, 1)}>+</ControlButton>
                                <ControlButton onClick={() => updatePoints(course.id, 5)}>+5</ControlButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StatCard({ icon, value, label }) {
    return (
        <div className="bg-[#161b25] border border-slate-800 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            {icon}
            <div className="text-xl text-slate-200 font-serif">{value}</div>
            <div className="text-[10px] text-slate-500 uppercase">{label}</div>
        </div>
    );
}

function ControlButton({ children, onClick }) {
    return (
        <button onClick={onClick} className="w-8 h-8 flex items-center justify-center bg-[#0f1219] border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-700 rounded transition-all active:scale-95 text-xs font-bold">
            {children}
        </button>
    );
}