/**
 * Zentrale Konfigurationsdatei-Loader
 * Lädt Daten aus config.json und ersetzt Platzhalter in HTML
 */

class ConfigLoader {
    constructor() {
        this.config = null;
        this.loaded = false;
    }

    async loadConfig() {
        try {
            const response = await fetch('./data/config.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.config = await response.json();
            this.loaded = true;
            console.log('Konfiguration geladen:', this.config);
            return this.config;
        } catch (error) {
            console.error('Fehler beim Laden der Konfiguration:', error);
            this.loaded = false;
            return null;
        }
    }

    // Ersetzt Platzhalter im Format {{section.key}}
    replacePlaceholders() {
        if (!this.loaded || !this.config) {
            console.warn('Konfiguration nicht geladen');
            return;
        }

        // Alle Elemente mit data-config Attribut finden
        const elements = document.querySelectorAll('[data-config]');
        
        elements.forEach(element => {
            const configPath = element.getAttribute('data-config');
            const value = this.getNestedValue(this.config, configPath);
            
            if (value !== undefined && value !== null) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.value = value;
                } else if (element.tagName === 'A' && configPath.includes('email')) {
                    element.href = `mailto:${value}`;
                    element.textContent = value;
                } else if (element.tagName === 'A' && configPath.includes('.social.')) {
                    element.href = value;
                } else {
                    element.textContent = value;
                }
            }
        });

        // Spezielle Arrays handhaben (Skills)
        this.handleArrays();
        
        // Metadaten setzen
        this.setMetadata();
    }

    // Verschachtelte Objektwerte abrufen (z.B. "personal.name")
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    }

    // Arrays handhaben (z.B. Skills-Liste)
    handleArrays() {
        const skillsContainer = document.getElementById('skills-container');
        if (skillsContainer && this.config.skills) {
            skillsContainer.innerHTML = '';
            
            const colors = [
                'blue', 'green', 'purple', 'yellow', 
                'pink', 'indigo', 'cyan', 'red'
            ];

            this.config.skills.forEach((skill, index) => {
                const color = colors[index % colors.length];
                const skillElement = document.createElement('div');
                skillElement.className = `bg-gradient-to-r from-${color}-500/20 to-${color}-600/20 border border-${color}-500/30 rounded-lg px-3 py-2 text-center`;
                skillElement.innerHTML = `<span class="text-${color}-300 font-medium">${skill}</span>`;
                skillsContainer.appendChild(skillElement);
            });
        }
    }

    // Meta-Tags und Titel setzen
    setMetadata() {
        if (this.config.site) {
            // Titel aktualisieren falls gewünscht
            const titleElements = document.querySelectorAll('[data-title]');
            titleElements.forEach(element => {
                if (element.tagName === 'TITLE') {
                    element.textContent = `${this.config.site.title} - ${this.config.personal.name}`;
                }
            });
        }
    }

    // Öffentliche Methode zum Abrufen der Konfiguration
    getConfig() {
        return this.config;
    }

    // Initialisierung
    async init() {
        await this.loadConfig();
        if (this.loaded) {
            this.replacePlaceholders();
        }
    }
}

// Globale Instanz erstellen
const configLoader = new ConfigLoader();

// Automatisch laden wenn DOM bereit ist
document.addEventListener('DOMContentLoaded', async () => {
    await configLoader.init();
});

// Für den Fall, dass das Script nach dem DOMContentLoaded geladen wird
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await configLoader.init();
    });
} else {
    // DOM bereits geladen
    configLoader.init();
}