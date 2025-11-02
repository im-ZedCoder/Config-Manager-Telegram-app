// CODM Config Manager for Telegram Web App
// Created by: Nulltra Coder
// Telegram: @im_nulltra

// Initialize Telegram Web App
let tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Set theme colors
tg.setHeaderColor('#764ba2');
tg.setBackgroundColor('#1a1a1a');

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
    
    // Load config from storage
    loadConfig();
});

// Config Manager
class TelegramConfigManager {
    constructor() {
        this.config = {};
        this.telegramID = 'im_nulltra';
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
    
    // Load from localStorage
    loadConfig() {
        const saved = localStorage.getItem('codm_config');
        if (saved) {
            this.config = JSON.parse(saved);
            this.populateForm(this.config);
        }
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
    
    // Save to localStorage
    saveToStorage() {
        this.config = this.getFormData();
        localStorage.setItem('codm_config', JSON.stringify(this.config));
        showStatus('✅ Saved!', 'success');
    }
    
    // Apply all optimizations
    applyAll() {
        const optimizations = {
            'Aim_Sensitivity': '120',
            'ADS_Sensitivity': '80',
            'Aim_Assist': 'Strong',
            'Headshot_Priority': 'On',
            'Movement_Speed': 'Max',
            'Sprint_Speed': '1.5x',
            'Bunny_Hop': 'Enabled',
            'FPS_Limit': '90',
            'Graphics_Quality': 'Low',
            'Shadow_Quality': 'Off',
            'Lag_Compensation': 'Aggressive',
            'Ping_Stabilization': 'On'
        };
        
        this.populateForm(optimizations);
        showStatus('🚀 All optimizations applied!', 'success');
    }
    
    // Download config as JSON
    downloadConfig() {
        const config = this.getFormData();
        const dataStr = JSON.stringify(config, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        
        const now = new Date();
        const timestamp = now.toISOString().split('T')[0] + '_' + 
                         String(now.getHours()).padStart(2, '0') + 
                         String(now.getMinutes()).padStart(2, '0');
        
        link.download = `CODM_Config_${timestamp}_${this.telegramID}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        showStatus('📤 Config downloaded!', 'success');
    }
}

// Initialize manager
const manager = new TelegramConfigManager();

// Global functions
function applyAll() {
    manager.applyAll();
}

function downloadConfig() {
    manager.downloadConfig();
}

function loadConfig() {
    manager.loadConfig();
}

// Auto-save on change
document.getElementById('configForm').addEventListener('change', function(e) {
    if (e.target.type !== 'submit' && e.target.type !== 'button') {
        manager.saveToStorage();
    }
});

// Show status
function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.className = `status ${type}`;
    statusDiv.textContent = message;
    
    setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.className = 'status';
    }, 3000);
}

// Initialize Telegram WebApp
console.log('🎮 CODM Config Manager for Telegram loaded');
console.log('Developer: Nulltra Coder - @im_nulltra');

