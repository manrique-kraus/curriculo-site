/**
 * Sistema de Histórico de Sessões - Currículo Manrique
 * Salva automaticamente o progresso localmente
 */

class SessionTracker {
    constructor() {
        this.historyFile = 'project-history.json';
        this.currentSession = {
            id: Date.now(),
            startTime: new Date().toISOString(),
            changes: [],
            checkpoints: []
        };
        this.init();
    }

    init() {
        this.loadHistory();
        this.startTracking();
        this.createCheckpoint('Sessão iniciada');
    }

    loadHistory() {
        try {
            const fs = require('fs');
            if (fs.existsSync(this.historyFile)) {
                const data = fs.readFileSync(this.historyFile, 'utf8');
                this.history = JSON.parse(data);
            } else {
                this.history = {
                    projectName: "Curriculo Manrique",
                    createdAt: new Date().toISOString(),
                    sessions: [],
                    checkpoints: [],
                    lastUpdate: null
                };
            }
        } catch (error) {
            console.log('Usando histórico em memória');
            this.history = {
                projectName: "Curriculo Manrique",
                createdAt: new Date().toISOString(),
                sessions: [],
                checkpoints: [],
                lastUpdate: null
            };
        }
    }

    saveHistory() {
        try {
            const fs = require('fs');
            this.history.lastUpdate = new Date().toISOString();
            fs.writeFileSync(this.historyFile, JSON.stringify(this.history, null, 2));
        } catch (error) {
            console.log('Histórico salvo em memória:', this.history);
        }
    }

    createCheckpoint(description) {
        const checkpoint = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            description: description,
            files: this.captureCurrentState(),
            sessionId: this.currentSession.id
        };

        this.currentSession.checkpoints.push(checkpoint);
        this.history.checkpoints.push(checkpoint);
        
        console.log(`✅ Checkpoint criado: ${description}`);
        this.saveHistory();
    }

    captureCurrentState() {
        const state = {
            timestamp: Date.now(),
            files: {}
        };

        // Capturar estado dos arquivos principais
        const filesToTrack = [
            'index.html',
            'src/css/style.css',
            'src/css/buttons.css',
            'src/css/responsive.css',
            'src/js/script.js'
        ];

        filesToTrack.forEach(file => {
            try {
                const fs = require('fs');
                if (fs.existsSync(file)) {
                    state.files[file] = {
                        content: fs.readFileSync(file, 'utf8'),
                        modified: fs.statSync(file).mtime
                    };
                }
            } catch (error) {
                state.files[file] = { error: error.message };
            }
        });

        return state;
    }

    recordChange(file, changeType, description) {
        const change = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            file: file,
            type: changeType,
            description: description,
            sessionId: this.currentSession.id
        };

        this.currentSession.changes.push(change);
        this.history.sessions.push(this.currentSession);
        
        console.log(`📝 Mudança registrada: ${changeType} em ${file} - ${description}`);
    }

    startTracking() {
        // Criar checkpoint automático a cada 5 minutos
        setInterval(() => {
            this.createCheckpoint('Auto-save');
        }, 300000);

        // Criar checkpoint ao sair da página
        window.addEventListener('beforeunload', () => {
            this.createCheckpoint('Sessão encerrada');
        });
    }

    getHistory() {
        return this.history;
    }

    getLastChanges(count = 10) {
        const allChanges = [];
        this.history.sessions.forEach(session => {
            allChanges.push(...session.changes);
        });
        return allChanges.slice(-count);
    }

    restoreCheckpoint(checkpointId) {
        const checkpoint = this.history.checkpoints.find(c => c.id === checkpointId);
        if (checkpoint) {
            console.log('Restaurando checkpoint:', checkpoint.description);
            return checkpoint;
        }
        return null;
    }

    showProgress() {
        const totalChanges = this.history.sessions.reduce((acc, session) => acc + session.changes.length, 0);
        const totalCheckpoints = this.history.checkpoints.length;
        
        console.log(`📊 Progresso do projeto:`);
        console.log(`   - Total de mudanças: ${totalChanges}`);
        console.log(`   - Checkpoints criados: ${totalCheckpoints}`);
        console.log(`   - Sessões registradas: ${this.history.sessions.length}`);
        console.log(`   - Última atualização: ${this.history.lastUpdate}`);
    }
}

// Instância global
window.sessionTracker = new SessionTracker();

// Atalhos úteis
window.showProgress = () => window.sessionTracker.showProgress();
window.saveCheckpoint = (desc) => window.sessionTracker.createCheckpoint(desc);
window.getHistory = () => window.sessionTracker.getHistory();

// Inicializar quando o DOM estiver pronto
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        window.sessionTracker.createCheckpoint('Página carregada');
    });
}
