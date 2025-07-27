import React, {useEffect, useState} from 'react';
import './App.css';
import SettingsPanel from './SettingsPanel';

const App: React.FC = () => {
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        // 让油猴菜单能通过window方法控制面板显示
        window.toggleSettingsPanel = (flag?: boolean) => {
            setShowSettings(prev => typeof flag === 'boolean' ? flag : !prev);
        };
        return () => {
            delete window.toggleSettingsPanel;
        };
    }, []);

    return (
        <div className="App">
            {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
        </div>
    );
};

export default App;
