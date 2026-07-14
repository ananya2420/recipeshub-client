"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, AlertTriangle, Receipt } from 'lucide-react';

const styles = {
  container: 'flex min-h-screen bg-gray-50',
  sidebar: 'w-72 border-r border-gray-200 bg-white p-6',
  sidebarHeading: 'text-xl font-bold mb-6 text-green-700',
  navLink: 'flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-green-50 transition-all',
  navLinkActive: 'flex items-center gap-3 rounded-lg px-4 py-3 text-green-900 bg-green-50 border border-green-200 transition-all',
  navText: 'font-medium',
  mainContent: 'flex-1 p-8',
  headerTitle: 'text-3xl font-bold text-gray-900',
  headerSubtitle: 'text-gray-500 mt-1',
  statsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8',
  card: 'bg-white p-6 rounded-xl border border-green-100 shadow-sm text-center hover:border-green-200 transition-all',
  cardValue: 'text-3xl font-bold text-green-600 mt-2',
  cardLabel: 'text-gray-500 font-medium text-sm mt-1',
  quickActionsContainer: 'bg-white p-6 rounded-xl border border-green-100 shadow-sm mt-8',
  actionButton: 'px-4 py-2 border border-gray-200 rounded-lg text-green-700 hover:bg-green-50 hover:border-green-300 font-medium text-sm transition-all'
};



const StatCard = ({ title, count, emoji }) => (
  <div className={styles.card}>
    <div className="text-3xl">{emoji}</div>
    <div className={styles.cardValue}>{count}</div>
    <div className={styles.cardLabel}>{title}</div>
  </div>
);

const QuickActions = () => (
  <div className={styles.quickActionsContainer}>
    <h3 className="font-bold text-lg mb-4 text-gray-900">Quick Actions</h3>
    <div className="flex flex-wrap gap-4">
      {['Manage Users', 'Manage Recipes', 'Review Reports', 'Transactions'].map((action) => (
        <button key={action} className={styles.actionButton}>
          {action}
        </button>
      ))}
    </div>
  </div>
);

export default function AdminDashboard() {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
   
      <main className={styles.mainContent}>
        <header>
          <h2 className={styles.headerTitle}>Admin Overview 🛡️</h2>
          <p className={styles.headerSubtitle}>Platform statistics and management</p>
        </header>

        <section className={styles.statsGrid}>
          <StatCard title="Total Users" count="13" emoji="👥" />
          <StatCard title="Total Recipes" count="11" emoji="📋" />
          <StatCard title="Premium Members" count="7" emoji="👑" />
          <StatCard title="Pending Reports" count="6" emoji="🚨" />
        </section>

        <QuickActions />
      </main>
    </div>
  );
}