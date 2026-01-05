const inputField = document.getElementById('inputField');
        const display = document.getElementById('display');
        const STORAGE_KEY = 'journalEntries';

        function loadEntries() {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    const entries = JSON.parse(stored);
                    entries.forEach(entry => {
                        addEntryToDisplay(entry.time, entry.text);
                    });
                } catch (e) {
                    console.error('Error loading entries:', e);
                }
            }
        }

        // Get current time in HH:MM format
        function getCurrentTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        }

       
        function addEntryToDisplay(time, text) {
            const entry = document.createElement('div');
            entry.className = 'entry';
            entry.innerHTML = `<span class="timestamp">[${time}]</span><span class="separator"> :: </span><span class="content">${escapeHtml(text)}</span>`;
            display.appendChild(entry);
            display.scrollTop = display.scrollHeight;
        }

        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        
        function saveEntry(time, text) {
            let entries = [];
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    entries = JSON.parse(stored);
                } catch (e) {
                    console.error('Error parsing entries:', e);
                }
            }
            entries.push({ time, text });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        }

        
        function clearAll() {
            localStorage.removeItem(STORAGE_KEY);
            display.innerHTML = `<div class="welcome">
                > Welcome to your digital consciousness archive<br>
                > Type your thoughts, press Enter to log them<br>
                > Use 'clear' command to wipe the slate clean<br>
                <div class="command-info">== SESSION CLEARED ==</div>
            </div>`;
            display.scrollTop = display.scrollHeight;
        }

        
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const text = inputField.value.trim();

                if (text === '') {
                    inputField.value = '';
                    return;
                }

               
                if (text.toLowerCase() === 'clear') {
                    clearAll();
                    inputField.value = '';
                    return;
                }

                
                const time = getCurrentTime();
                addEntryToDisplay(time, text);
                saveEntry(time, text);
                inputField.value = '';
            }
        });

        
        window.addEventListener('load', () => {
            loadEntries();
            inputField.focus();
        });

      
        document.addEventListener('click', () => {
            inputField.focus();
        });