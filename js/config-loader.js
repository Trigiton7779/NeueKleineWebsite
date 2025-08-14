/**
 * ConfigLoader - Lädt data/config.json und füllt die Seite mit Inhalten.
 * Verbesserungen:
 * - Robuste Fehlerbehandlung / Fallbacks
 * - Einfache, einmalige Initialisierung (kein doppelter DOMContentLoaded-Handler)
 * - document.title und meta description korrekt setzen
 * - Unterstützung für interests, skills oder personal.hobbies
 * - Vermeidung dynamischer Tailwind-Klassen-Strings; stattdessen vordefinierte Klassensets
 * - Bessere Behandlung von <a>-Elementen (mailto / externe Links)
 */

class ConfigLoader {
  constructor() {
    this.config = {};
    this.loaded = false;

    // Vordefinierte Farbklassensets für Tailwind - keine dynamische String-Konstruktion
    this.colorSets = [
      {
        name: 'blue',
        wrapper: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
        text: 'text-blue-300'
      },
      {
        name: 'green',
        wrapper: 'from-green-500/20 to-green-600/20 border-green-500/30',
        text: 'text-green-300'
      },
      {
        name: 'purple',
        wrapper: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
        text: 'text-purple-300'
      },
      {
        name: 'yellow',
        wrapper: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
        text: 'text-yellow-300'
      },
      {
        name: 'pink',
        wrapper: 'from-pink-500/20 to-pink-600/20 border-pink-500/30',
        text: 'text-pink-300'
      },
      {
        name: 'indigo',
        wrapper: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30',
        text: 'text-indigo-300'
      },
      {
        name: 'cyan',
        wrapper: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
        text: 'text-cyan-300'
      },
      {
        name: 'red',
        wrapper: 'from-red-500/20 to-red-600/20 border-red-500/30',
        text: 'text-red-300'
      }
    ];
  }

  async loadConfig() {
    try {
      const configUrl = new URL('data/config.json', document.baseURI);
      const response = await fetch(configUrl, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.config = await response.json();
      this.loaded = true;
      console.info('Konfiguration geladen.');
      return this.config;
    } catch (error) {
      console.warn('Konfiguration konnte nicht geladen werden. Verwende lokale Fallbacks.', error);
      this.config = this.config || {};
      this.loaded = false;
      return null;
    }
  }

  // Ersetzt alle Elemente mit data-config Attribut durch die entsprechenden Werte
  replacePlaceholders() {
    if (!this.config) return;

    const elements = document.querySelectorAll('[data-config]');
    elements.forEach(element => {
      const configPath = element.getAttribute('data-config');
      const value = this.getNestedValue(this.config, configPath);

      if (value === undefined || value === null) {
        // Keine Konfiguration gefunden -> leave default content
        return;
      }

      // Spezielle Behandlung für Form-Elemente
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.value = value;
        return;
      }

      // Anchor-Logik: E-Mail, URLs oder generischer Text
      if (element.tagName === 'A') {
        const strVal = String(value);
        if (strVal.includes('@') && (configPath.toLowerCase().includes('email') || strVal.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))) {
          element.href = `mailto:${strVal}`;
          element.textContent = strVal;
          return;
        }
        if (strVal.startsWith('http://') || strVal.startsWith('https://')) {
          element.href = strVal;
          element.target = '_blank';
          element.rel = 'noopener noreferrer';
          // Wenn kein Textinhalt vorgesehen, setze die URL als Text
          if (!element.textContent.trim()) element.textContent = strVal;
          return;
        }
        // Sonst einfachen Text setzen
        element.textContent = strVal;
        return;
      }

      // Default: Textinhalt ersetzen
      element.textContent = value;
    });

    // Arrays (Skills/Interests) handhaben
    this.handleArrays();

    // Metadaten setzen
    this.setMetadata();
  }

  // Unterstützt "personal.name" oder "site.title" etc.
  getNestedValue(obj, path) {
    if (!obj || !path) return undefined;
    return path.split('.').reduce((current, key) => {
      return current && Object.prototype.hasOwnProperty.call(current, key) ? current[key] : undefined;
    }, obj);
  }

  // Rendert Interessen/Skills in vordefinierte Container
  handleArrays() {
    // Mögliche Quellen: config.skills, config.interests, config.personal.hobbies (String oder Array)
    const sources = [];

    if (Array.isArray(this.config.skills)) sources.push(...this.config.skills);
    if (Array.isArray(this.config.interests)) sources.push(...this.config.interests);
    if (this.config.personal && this.config.personal.hobbies) {
      if (Array.isArray(this.config.personal.hobbies)) {
        sources.push(...this.config.personal.hobbies);
      } else if (typeof this.config.personal.hobbies === 'string') {
        // Falls als Komma-getrennter String gespeichert
        const split = this.config.personal.hobbies.split(',').map(s => s.trim()).filter(Boolean);
        sources.push(...split);
      }
    }

    // Ziel-Container kann 'skills-container' oder 'interests-container' heißen
    const container = document.getElementById('skills-container') || document.getElementById('interests-container');
    if (!container) return;
    container.innerHTML = '';

    if (!sources.length) {
      // Optional: Platzhaltertext
      const placeholder = document.createElement('div');
      placeholder.className = 'text-gray-400';
      placeholder.textContent = 'Keine Einträge vorhanden.';
      container.appendChild(placeholder);
      return;
    }

    sources.forEach((item, index) => {
      const colorSet = this.colorSets[index % this.colorSets.length];
      const skillElement = document.createElement('div');

      // Verwende die vordefinierten Klassen
      skillElement.className = `bg-gradient-to-r ${colorSet.wrapper} border rounded-lg px-3 py-2 text-center`;

      const span = document.createElement('span');
      span.className = `${colorSet.text} font-medium`;
      span.textContent = item;
      skillElement.appendChild(span);

      container.appendChild(skillElement);
    });
  }

  // Setzt document.title und meta description, falls vorhanden
  setMetadata() {
    if (!this.config.site) return;

    const siteTitle = this.config.site.title || '';
    const personalName = this.config.personal ? this.config.personal.name : '';
    if (siteTitle || personalName) {
      document.title = `${siteTitle}${personalName ? ' - ' + personalName : ''}`;
    }

    const desc = this.config.site.description || '';
    if (desc) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = desc;
    }
  }

  getConfig() {
    return this.config;
  }

  // Stellt sicher, dass Elemente mit role="button" auch per Space-Taste ausgelöst werden
  ensureKeyboardBehavior() {
    try {
      const btns = document.querySelectorAll('a[role="button"]');
      btns.forEach(el => {
        // Anchor ist bereits fokussierbar, aber tabindex setzen falls nötig
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');

        // Space sollte die gleiche Aktion wie Enter/Click auslösen für role="button"
        el.addEventListener('keydown', (e) => {
          const key = e.key || e.keyCode;
          if (key === ' ' || key === 'Spacebar' || key === 32) {
            e.preventDefault();
            el.click();
          }
        });
      });
    } catch (err) {
      // Nicht kritisch; nur Debug-Info
      console.warn('Fehler bei ensureKeyboardBehavior:', err);
    }
  }

  // Init: lade Config und aktualisiere UI; falls fetch fehlschlägt, benutze vorhandene statische Inhalte als Fallback
  async init() {
    await this.loadConfig();
    // Selbst wenn loadConfig fehlschlägt (z. B. file://), versuchen wir, vorhandene statische Inhalte nicht zu überschreiben.
    if (this.loaded) {
      this.replacePlaceholders();
    } else {
      // Versuche trotzdem, teilweise Werte zu setzen, falls config teilweise geladen wurde
      if (Object.keys(this.config).length) {
        this.replacePlaceholders();
      } else {
        console.info('Kein config-Objekt verfügbar - Seite bleibt mit statischem Inhalt.');
      }
    }

    // Keyboard-Fallback / Accessibility-Verhalten sicherstellen
    this.ensureKeyboardBehavior();
  }
}

// Globale Instanz
const configLoader = new ConfigLoader();
// Einfache, einmalige Initialisierung
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => configLoader.init());
} else {
  configLoader.init();
}

// Für Debugging im Browser verfügbar machen
window.configLoader = configLoader;
