import React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import WalletIcon from '@mui/icons-material/Wallet';

const Tabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'profile', label: 'Profil', icon: <AccountBoxIcon /> },
        { id: 'listings', label: 'Twoje ogłoszenia', icon: <AccountBoxIcon /> },
        { id: 'settings', label: 'Ustawienia', icon: <SettingsIcon /> },
        { id: 'wallet', label: 'Portfel', icon: <WalletIcon /> },
        { id: 'followed', label: 'Obserwowane', icon: <WalletIcon /> },

    ];

    return (
        <div className="mb-4 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                {tabs.map((tab) => (
                    <li key={tab.id} className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === tab.id
                                ? 'text-purple-600 border-purple-600 hover:bg-gray-300'
                                : 'text-gray-500 hover:text-gray-600 hover:bg-gray-300 border-gray-100'
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                            role="tab"
                            aria-controls={tab.id}
                            aria-selected={activeTab === tab.id}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tabs;
