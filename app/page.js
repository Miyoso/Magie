'use client';

import React, { useState, useEffect } from 'react';
import { Leaf, Sparkles, FlaskConical, Scroll, Ghost, Trophy, Zap, BookOpen, Target, Star } from 'lucide-react';

export default function TokenTracker() {
    // Données de base (Nettoyées de toute propriété "priority")
    const defaultCourses = [
        { id: 1, title: 'ALCHIMIE - BOTANIQUE', icon: 'leaf', current: 18, max: 30 },
        { id: 2, title: 'SORTS', icon: 'sparkles', current: 19, max: 40 },
        { id: 3, title: 'POTIONS', icon: 'flask', current: 11, max: 20 },
        { id: 4, title: 'HISTOIRE DE LA MAGIE', icon: 'scroll', current: 13, max: 20 },
        { id: 5, title: 'CRÉATURES MAGIQUES', icon: 'ghost', current: 12, max: 20 },
        { id: 6, title: 'CLUB', icon: 'trophy', current: 8, max: 10 },
        { id: 7, title: 'DIVERS', icon: 'zap', current: 21, max: 40 },
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
        const className = "w-6 h-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]";
        switch(name) {
            case 'leaf': return <Leaf className={`${className} text-emerald-400`} />;
            case 'sparkles': return <Sparkles className={`${className} text-cyan-300`} />;
            case 'flask': return <FlaskConical className={`${className} text-blue-400`} />;
            case 'scroll': return <Scroll className={`${className} text-indigo-200`} />;
            case 'ghost': return <Ghost className={`${className} text-violet-300`} />;
            case 'trophy': return <Trophy className={`${className} text-sky-400`} />;
            case 'zap': return <Zap className={`${className} text-purple-400`} />;
            default: return <Zap className={className} />;
        }
    };

    const totalPoints = courses.reduce((acc, course) => acc + (course.current || 0), 0);
    const maxPoints = courses.reduce((acc, course) => acc + (course.max || 0), 0);
    const completedCourses = courses.filter(c => c.current >= c.max).length;

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
            const zeroCourses = defaultCourses.map(course => ({
                ...course,
                current: 0
            }));
            setCourses(zeroCourses);
        }
    };

    if (!isLoaded) return <div className="min-h-screen bg-[#0f1219] flex items-center justify-center font-serif text-cyan-500 animate-pulse">Incantation en cours...</div>;

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0c12] to-black text-slate-200 p-6 font-sans selection:bg-cyan-500/30 selection:text-cyan-100">

            {/* Effet de lumière d'ambiance en haut */}
            <div className="fixed top-0 left-0 w-full h-[500px] bg-blue-500/5 blur-[120px] pointer-events-none rounded-full mix-blend-screen"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* HEADER */}
                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-100 to-white tracking-widest drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                            SUIVI DES JETONS
                        </h1>
                        <p className="text-sm text-cyan-200/60 mt-2 font-serif tracking-wide flex items-center gap-2">
                            <Sparkles className="w-3 h-3" /> Académie de Magie - Année 1
                        </p>
                    </div>
                    <button
                        onClick={resetAll}
                        className="group relative px-5 py-2 overflow-hidden rounded-full bg-red-500/10 text-red-400 border border-red-500/20 hover:border-red-500/50 hover:bg-red-500/20 transition-all duration-300 text-xs font-semibold tracking-wider uppercase"
                    >
                        <span className="relative z-10 group-hover:text-red-200 transition-colors">Réinitialiser</span>
                        <div className="absolute inset-0 bg-red-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </header>

                {/* STATS CARDS - Mise à jour : 3 colonnes au lieu de 4 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    <StatCard icon={<Target className="text-cyan-400" />} value={`${totalPoints}/${maxPoints}`} label="Points Totaux" />
                    <StatCard icon={<Trophy className="text-sky-400" />} value={`${completedCourses}/7`} label="Cours Complétés" />
                    <StatCard icon={<BookOpen className="text-indigo-400" />} value="7" label="Total Cours" />
                    {/* La carte Haute Priorité a été supprimée */}
                </div>

                {/* PROGRESSION GLOBALE */}
                <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 to-transparent border border-white/5 backdrop-blur-sm relative overflow-hidden">
                    <div className="flex justify-between items-end mb-3 relative z-10">
                        <h2 className="text-2xl font-serif text-blue-100 tracking-widest uppercase flex items-center gap-3">
                            <span className="w-1 h-6 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]"></span>
                            Première Année
                        </h2>
                        <span className="text-2xl font-bold text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                            {Math.round((totalPoints / maxPoints) * 100)}%
                        </span>
                    </div>
                    {/* Barre Globale Glowy */}
                    <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                        <div
                            className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-white shadow-[0_0_15px_rgba(6,182,212,0.6)] relative"
                            style={{ width: `${(totalPoints / maxPoints) * 100}%`, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
                        >
                             <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-white blur-[2px]"></div>
                        </div>
                    </div>
                </div>

                {/* GRILLE DES COURS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {courses.map(course => (
                        <div key={course.id} className="group relative bg-[#13161f]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 hover:border-cyan-500/30 hover:bg-[#1a1f2e]/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:-translate-y-1">

                            {/* Header Carte */}
                            <div className="flex items-start gap-4 mb-5">
                                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-cyan-500/10 transition-colors border border-white/5 group-hover:border-cyan-500/20 shadow-lg">
                                    {getIcon(course.icon)}
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest group-hover:text-cyan-200 transition-colors">{course.title}</h3>
                                        <div className="text-right">
                                            <span className="text-xl font-serif text-cyan-400 font-bold drop-shadow-sm">{course.current}</span>
                                            <span className="text-xs text-slate-600 ml-1">/ {course.max}</span>
                                        </div>
                                    </div>

                                    {/* Barre de progression individuelle */}
                                    <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-white/5 mt-3 relative">
                                        <div
                                            className={`h-full bg-gradient-to-r transition-all duration-500 relative
                                                ${course.current >= course.max 
                                                    ? 'from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' 
                                                    : 'from-blue-900 via-blue-600 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]'}
                                            `}
                                            style={{ width: `${(course.current / course.max) * 100}%` }}
                                        >
                                            <div className="absolute right-0 top-0 h-full w-1 bg-white/50 blur-[1px]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Carte / Contrôles */}
                            <div className="flex justify-between items-center mt-2 pt-4 border-t border-white/5">
                                <p className="text-[10px] font-medium tracking-wide">
                                    {course.current >= course.max
                                        ? <span className="text-emerald-400 flex items-center gap-1"><Sparkles className="w-3 h-3" /> COMPLÉTÉ</span>
                                        : <span className="text-slate-500">Reste: <span className="text-slate-300">{course.max - course.current}</span> pts</span>}
                                </p>
                                <div className="flex gap-2">
                                    <ControlButton onClick={() => updatePoints(course.id, -1)}>-</ControlButton>
                                    <ControlButton onClick={() => updatePoints(course.id, 1)}>+</ControlButton>
                                    <ControlButton onClick={() => updatePoints(course.id, 5)} special>+5</ControlButton>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, value, label }) {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors duration-300 group shadow-lg">
            <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{icon}</div>
            <div className="text-2xl text-slate-100 font-serif tracking-widest drop-shadow-sm">{value}</div>
            <div className="text-[10px] text-cyan-200/50 uppercase tracking-widest font-semibold mt-1">{label}</div>
        </div>
    );
}

function ControlButton({ children, onClick, special }) {
    return (
        <button
            onClick={onClick}
            className={`
                h-8 min-w-[32px] px-2 flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-200 active:scale-95
                ${special 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30'}
            `}
        >
            {children}
        </button>
    );
}