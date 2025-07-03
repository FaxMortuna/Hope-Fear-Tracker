
        let currentRole = 'player';
        let hopeTokens = [true, true, false, false, false, false]; // 2 active by default
        let fearTokens = Array(12).fill(false); // 0 active by default
        fearTokens[0] = true; // First token active

        function initializeApp() {
            generateTokens();
            updateUI();
        }

        function generateTokens() {
            const hopeContainer = document.getElementById('hopeTokens');
            const fearContainer = document.getElementById('fearTokens');

            // Generate Hope tokens
            hopeContainer.innerHTML = '';
            for (let i = 0; i < 6; i++) {
                const token = document.createElement('div');
                token.className = 'token hope';
                token.innerHTML = '🔥';
                token.onclick = () => toggleHopeToken(i);
                hopeContainer.appendChild(token);
            }

            // Generate Fear tokens
            fearContainer.innerHTML = '';
            for (let i = 0; i < 12; i++) {
                const token = document.createElement('div');
                token.className = 'token fear';
                token.innerHTML = '💀';
                token.onclick = () => toggleFearToken(i);
                fearContainer.appendChild(token);
            }
        }

        function toggleRole() {
            const toggle = document.getElementById('toggleSwitch');
            const slider = toggle.querySelector('.toggle-slider');
            if (currentRole === 'player') {
                currentRole = 'gm';
                toggle.classList.add('gamemaster');
            } else {
                currentRole = 'player';
                toggle.classList.remove('gamemaster');
            }
            slider.textContent = '';
            updateUI();
        }

        function updateUI() {
            const roleToggle = document.getElementById('roleToggle');
            const hopeTracker = document.getElementById('hopeTracker');
            const fearTracker = document.getElementById('fearTracker');

            // Toggle immer sichtbar lassen, außer du willst ihn explizit verstecken
            roleToggle.style.display = 'flex';
            if (currentRole === 'player') {
                hopeTracker.classList.add('active');
                fearTracker.classList.remove('active');
                updateHopeTokens();
            } else {
                hopeTracker.classList.remove('active');
                fearTracker.classList.add('active');
                updateFearTokens();
            }
        }

        function updateHopeTokens() {
            const tokens = document.querySelectorAll('#hopeTokens .token');
            tokens.forEach((token, index) => {
                if (hopeTokens[index]) {
                    token.classList.add('active');
                } else {
                    token.classList.remove('active');
                }
            });
        }

        function updateFearTokens() {
            const tokens = document.querySelectorAll('#fearTokens .token');
            tokens.forEach((token, index) => {
                if (fearTokens[index]) {
                    token.classList.add('active');
                } else {
                    token.classList.remove('active');
                }
            });
        }

        function toggleHopeToken(index) {
            hopeTokens[index] = !hopeTokens[index];
            updateHopeTokens();
        }

        function toggleFearToken(index) {
            fearTokens[index] = !fearTokens[index];
            updateFearTokens();
        }

        function openSettings() {
            document.getElementById('settingsModal').classList.add('active');
        }

        function closeSettings() {
            document.getElementById('settingsModal').classList.remove('active');
        }

        function switchToPlayer() {
            currentRole = 'player';
            const toggle = document.getElementById('toggleSwitch');
            const slider = toggle.querySelector('.toggle-slider');
            toggle.classList.remove('gamemaster');
            slider.textContent = '';
            updateUI();
            closeSettings();
        }

        function switchToGM() {
            currentRole = 'gm';
            const toggle = document.getElementById('toggleSwitch');
            const slider = toggle.querySelector('.toggle-slider');
            toggle.classList.add('gamemaster');
            slider.textContent = '';
            updateUI();
            closeSettings();
        }

        function resetTokens() {
            hopeTokens = [true, true, false, false, false, false];
            fearTokens = Array(12).fill(false);
            fearTokens[0] = true;
            updateHopeTokens();
            updateFearTokens();
            closeSettings();
        }

        // Initialize the app when the page loads
        document.addEventListener('DOMContentLoaded', initializeApp);
