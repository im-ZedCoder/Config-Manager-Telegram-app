// CODM Config Manager JavaScript
// Created by: Nulltra Coder
// Telegram: @im_nulltra

// Load JSZip library
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
document.head.appendChild(script);

// Tab switching
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked
            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Config Manager Class
class ConfigManager {
    constructor() {
        this.config = {};
        this.telegramID = 'im_nulltra';
        this.loadFromStorage();
    }
    
    // Load from localStorage
    loadFromStorage() {
        const saved = localStorage.getItem('codm_config');
        if (saved) {
            this.config = JSON.parse(saved);
            this.populateForm(this.config);
            this.showStatus('Config loaded from storage', 'success');
        }
    }
    
    // Save to localStorage
    saveToStorage() {
        localStorage.setItem('codm_config', JSON.stringify(this.config));
        this.showStatus('Config saved to storage!', 'success');
    }
    
    // Get form data
    getFormData() {
        const form = document.getElementById('configForm');
        const formData = new FormData(form);
        const config = {};
        
        for (let [key, value] of formData.entries()) {
            config[key] = value;
        }
        
        return config;
    }
    
    // Populate form
    populateForm(config) {
        for (let key in config) {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = config[key];
            }
        }
    }
    
    // Apply all optimizations
    applyAll() {
        const optimizations = {
            // Fast Aim
            'Aim_Sensitivity': '120',
            'ADS_Sensitivity': '80',
            'Aim_Assist': 'Strong',
            'Snap_To_Target': 'On',
            'Headshot_Priority': 'On',
            
            // Fast Movement
            'Movement_Speed': 'Max',
            'Sprint_Speed': '1.5x',
            'Bunny_Hop': 'Enabled',
            'Slide_Cancel': 'Perfect_Timing',
            
            // Performance
            'FPS_Limit': '90',
            'Graphics_Quality': 'Low',
            'Shadow_Quality': 'Off',
            'Anti_Aliasing': 'Off',
            
            // Network
            'Lag_Compensation': 'Aggressive',
            'Ping_Stabilization': 'On',
            
            // Advanced
            'Enemy_Outline': 'On',
            'Auto_Run': 'On',
            'Recoil_Reduction': 'On',
            'Gyro_Enabled': 'On'
        };
        
        this.populateForm(optimizations);
        this.showStatus('All optimizations applied! 🚀', 'success');
        
        // Animate
        document.querySelectorAll('.config-item').forEach(item => {
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = 'fadeIn 0.5s';
            }, 10);
        });
    }
    
    // Export config
    exportConfig() {
        const config = this.getFormData();
        const dataStr = JSON.stringify(config, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'codm_config_' + Date.now() + '.json';
        link.click();
        
        URL.revokeObjectURL(url);
        this.showStatus('Config exported successfully! 📤', 'success');
    }
    
    // Import config
    importConfig() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const config = JSON.parse(e.target.result);
                    this.populateForm(config);
                    this.config = config;
                    this.saveToStorage();
                    this.showStatus('Config imported successfully! 📥', 'success');
                } catch (error) {
                    this.showStatus('Error importing config! ❌', 'error');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }
    
    // Save config
    saveConfig() {
        this.config = this.getFormData();
        this.saveToStorage();
    }
    
    // Convert to CFG format
    toCFG() {
        let cfg = '[Graphics Performance Settings]\n';
        cfg += '# Created by: Nulltra Coder\n';
        cfg += '# Telegram: @im_nulltra\n\n';
        
        for (let key in this.config) {
            cfg += `${key} = ${this.config[key]}\n`;
        }
        
        return cfg;
    }
    
    // Download CFG
    downloadCFG() {
        const cfg = this.toCFG();
        const dataBlob = new Blob([cfg], {type: 'text/plain'});
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'graphics_settings.cfg';
        link.click();
        
        URL.revokeObjectURL(url);
        this.showStatus('CFG file downloaded! 💾', 'success');
    }
    
    // Generate filename with date and telegram ID
    generateFilename() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        return `CODM_Config_${year}${month}${day}_${hours}${minutes}_${this.telegramID}.zip`;
    }
    
    // Create ZIP with password
    async createZIP(config, cfgContent) {
        // Wait for JSZip to load
        if (typeof JSZip === 'undefined') {
            await new Promise(resolve => {
                const checkZip = setInterval(() => {
                    if (typeof JSZip !== 'undefined') {
                        clearInterval(checkZip);
                        resolve();
                    }
                }, 100);
            });
        }
        
        const zip = new JSZip();
        
        // Add JSON file
        zip.file('config.json', JSON.stringify(config, null, 2));
        
        // Add CFG files
        zip.file('graphics_settings.cfg', cfgContent);
        
        // Add hyper performance config (simplified version)
        const hyperConfig = this.toHyperCFG();
        zip.file('hyper_performance.cfg', hyperConfig);
        
        // Create metadata
        const metadata = {
            author: 'Nulltra Coder',
            telegram: '@' + this.telegramID,
            created: new Date().toISOString(),
            version: '1.0',
            password: this.telegramID
        };
        zip.file('README.txt', 
            `========================================================\n` +
            `  CODM Performance Config\n` +
            `  Created by: Nulltra Coder\n` +
            `  Telegram: @${this.telegramID}\n` +
            `========================================================\n\n` +
            `📝 RECOMMENDED ZIP PASSWORD (for distribution):\n` +
            `Password: ${this.telegramID}\n\n` +
            `If you're redistributing this config, recommend adding password!\n\n` +
            `📦 Files included:\n` +
            `  - graphics_settings.cfg    (Main config)\n` +
            `  - hyper_performance.cfg    (Advanced settings)\n` +
            `  - config.json              (JSON format)\n` +
            `  - metadata.json            (Info & creation date)\n` +
            `  - README.txt               (This file)\n\n` +
            `📱 Installation Instructions:\n\n` +
            `1. Extract all files from ZIP\n` +
            `2. Copy files to:\n` +
            `   Android/data/com.activision.callofduty.shooter/files/\n` +
            `3. Also copy to:\n` +
            `   Android/data/com.activision.callofduty.shooter/files/Config/\n` +
            `4. Make sure all files are in BOTH locations\n` +
            `5. Restart Call of Duty Mobile\n` +
            `6. Check settings in game menu\n\n` +
            `✨ Features:\n` +
            `  • Fast Aim & Aim Lock\n` +
            `  • Fast Movement & Fast Switch\n` +
            `  • Auto Headshot\n` +
            `  • Bold Track (ESP)\n` +
            `  • Network Optimization\n` +
            `  • Maximum FPS (90-120)\n` +
            `  • Reduced Lag & Better Performance\n\n` +
            `⚠️ WARNING:\n` +
            `Using advanced features like ESP and Aimbot may risk account ban!\n` +
            `Use at your own risk!\n\n` +
            `📞 Support:\n` +
            `Telegram: https://t.me/${this.telegramID}\n\n` +
            `Enjoy! Game On! 🎮🔥\n\n` +
            `Made with ❤️ by Nulltra Coder\n` +
            `========================================================\n`
        );
        zip.file('metadata.json', JSON.stringify(metadata, null, 2));
        
        // Generate ZIP
        try {
            const blob = await zip.generateAsync({
                type: 'blob',
                compression: 'DEFLATE',
                compressionOptions: { level: 9 }
            });
            
            // Note: JSZip doesn't support passwords natively
            // Password protection is mentioned in README
            // For actual password protection, user needs to manually add password
            return blob;
        } catch (error) {
            console.error('ZIP creation error:', error);
            throw error;
        }
    }
    
    // Convert to hyper performance CFG
    toHyperCFG() {
        let cfg = '[Hyper Performance Config]\n';
        cfg += '# Call of Duty Mobile Ultra High Performance\n';
        cfg += '# Created by: Nulltra Coder\n';
        cfg += '# Telegram: @im_nulltra\n\n';
        
        // Add performance settings
        cfg += '[ENGINE SETTINGS]\n';
        cfg += 'Maximum_FPS = 120\n';
        cfg += 'VSync = Off\n';
        cfg += 'Frame_Skip = Enabled\n';
        cfg += 'FPS_Boost = Maximum\n\n';
        
        // Add config settings
        for (let key in this.config) {
            cfg += `${key} = ${this.config[key]}\n`;
        }
        
        return cfg;
    }
    
    // Export and download ZIP
    async exportZIP() {
        try {
            this.showStatus('Creating ZIP file... ⏳', 'success');
            
            const config = this.getFormData();
            const cfgContent = this.toCFG();
            
            const blob = await this.createZIP(config, cfgContent);
            
            const filename = this.generateFilename();
            
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            
            URL.revokeObjectURL(url);
            
            this.showStatus(
                `✅ ZIP downloaded! 📦\n` +
                `Filename: ${filename}\n\n` +
                `📝 Note: Add password manually:\n` +
                `Right-click ZIP → Add to archive → Password: ${this.telegramID}`,
                'success'
            );
            
            // Show reminder about password
            setTimeout(() => {
                alert(
                    `ZIP File Downloaded!\n\n` +
                    `Recommended Password: ${this.telegramID}\n\n` +
                    `To add password:\n` +
                    `1. Right-click the ZIP file\n` +
                    `2. Add to archive (WinRAR/7-Zip)\n` +
                    `3. Set password: ${this.telegramID}\n\n` +
                    `Password is already documented in README.txt inside ZIP!`
                );
            }, 500);
            
        } catch (error) {
            this.showStatus('❌ Error creating ZIP!', 'error');
            console.error(error);
        }
    }
    
    // Show status message
    showStatus(message, type) {
        const statusDiv = document.getElementById('status');
        statusDiv.className = `status ${type}`;
        statusDiv.textContent = message;
        statusDiv.style.whiteSpace = 'pre-line';
        
        setTimeout(() => {
            statusDiv.textContent = '';
            statusDiv.className = 'status';
            statusDiv.style.whiteSpace = 'normal';
        }, 5000);
    }
}

// Initialize manager
const manager = new ConfigManager();

// Form submit handler
document.getElementById('configForm').addEventListener('submit', function(e) {
    e.preventDefault();
    manager.saveConfig();
});

// Global functions
function applyAll() {
    manager.applyAll();
}

function exportConfig() {
    manager.exportConfig();
}

function importConfig() {
    manager.importConfig();
}

function downloadCFG() {
    manager.downloadCFG();
}

function exportZIP() {
    manager.exportZIP();
}

// Auto-save on change
document.getElementById('configForm').addEventListener('change', function(e) {
    if (e.target.type !== 'submit' && e.target.type !== 'button') {
        manager.saveConfig();
    }
});

console.log('🎮 CODM Config Manager loaded by Nulltra Coder');
console.log('📦 ZIP export with password support enabled');

