/**
 * Kestari Open House — Typing Game Engine
 * Solo mode, co-op room (same-browser BroadcastChannel), bot partner,
 * and a local all-time leaderboard.
 */
'use strict';

(function () {
    /* ----------------------------------------------------------------------
       1. Challenge texts
       ---------------------------------------------------------------------- */
    const CHALLENGE_TEXTS = [
        'Transformasi digital telah mengubah cara organisasi mengelola administrasi. Dokumen yang sebelumnya disimpan dalam bentuk fisik kini dapat dikelola melalui penyimpanan berbasis cloud. Penggunaan Google Drive, Google Docs, dan Google Sheets membantu meningkatkan efisiensi kolaborasi antaranggota. Namun, kemudahan teknologi juga harus diimbangi dengan pengelolaan akses, penamaan file, struktur folder, serta pencadangan data secara berkala. Digitalisasi bukan sekadar memindahkan dokumen ke komputer, melainkan membangun sistem kerja yang lebih efektif, aman, dan berkelanjutan.',
        'Pada hari Senin, 9 November 2026, HIMATIK menyelenggarakan rapat koordinasi untuk membahas persiapan kegiatan Booth Kestari HIMATIK. Rapat dimulai pukul 15.30 WIB dan dihadiri oleh perwakilan setiap biro serta departemen. Beberapa agenda yang dibahas meliputi pembagian tugas, kebutuhan perlengkapan, penyusunan anggaran, publikasi kegiatan, dan evaluasi teknis. Seluruh hasil pembahasan dicatat dalam notulensi agar setiap keputusan dapat ditindaklanjuti secara tepat oleh pihak yang bertanggung jawab.',
        'Dalam pelaksanaan program kerja, koordinasi antarbagian sering kali melibatkan banyak informasi yang harus disampaikan secara tepat. Perubahan jadwal, pergantian lokasi, pembaruan susunan acara, hingga penyesuaian anggaran harus dikomunikasikan kepada pihak terkait tanpa penundaan. Tanpa pencatatan yang tertib, informasi penting berisiko terlewat dan menimbulkan kesalahpahaman. Oleh sebab itu, setiap anggota organisasi perlu membangun kebiasaan bekerja secara terstruktur, transparan, dan bertanggung jawab.',
        'Tertib administrasi menghasilkan keterbukaan, akuntabilitas, dan kesinambungan kerja kepengurusan. Surat resmi merupakan instrumen komunikasi diplomatis utama antara himpunan dengan pihak fakultas, mitra kerja sama, maupun organisasi eksternal. Setiap penomoran surat keluar, pencatatan surat masuk, serta pembubuhan tanda tangan dan stempel resmi harus mengacu pada pedoman tata persuratan yang baku agar kredibilitas organisasi tetap terjaga.',
        'Mencatat setiap keputusan rapat dengan cermat adalah kunci sukses tindak lanjut program kerja. Notulensi yang tersusun rapi tidak hanya merangkum dinamika diskusi, tetapi juga memuat rincian pembagian tugas, batas waktu pengerjaan, dan indikator keberhasilan setiap divisi. Ketika evaluasi akhir dilaksanakan, arsip notulensi menjadi rujukan valid untuk menilai performa program kerja secara objektif dan merumuskan perbaikan di masa depan.',
        'Pengelolaan arsip digital dan fisik yang sistematis mempermudah koordinasi lintas departemen. Dokumen penting seperti sertifikat kegiatan, berkas kepengurusan, dan nota pertanggungjawaban keuangan harus dikategorikan sesuai kode klasifikasi berkas. Dengan direktori penyimpanan terpusat dan hak akses yang teratur, setiap pengurus dapat menemukan kembali informasi lampau secara cepat tanpa kehilangan jejak rekam jejak organisasi.',
        'Ketelitian dalam menyusun proposal dan laporan pertanggungjawaban mencerminkan profesionalitas suatu organisasi. Setiap rancangan anggaran biaya yang diajukan wajib disertai estimasi realistis, rincian kebutuhan teknis, serta proyeksi manfaat yang jelas bagi mahasiswa. Setelah kegiatan terlaksana, bendahara dan sekretaris bekerja sama menyusun laporan keuangan transparan yang dilengkapi bukti transaksi sah sebagai wujud integritas.',
        'Rapi administrasinya, lancar kegiatannya, dan terpercaya seluruh langkah organisasinya. Budaya disiplin administrasi berawal dari hal mendasar, seperti menjaga kebersihan ruang sekretariat, mengelola inventaris barang, hingga memperbarui papan agenda kegiatan secara berkala. Ketika lingkungan kerja tertata rapi, semangat kolaborasi antaranggota akan meningkat dan pelaksanaan setiap amanah program kerja berjalan optimal.',
        'Notulensi yang terstruktur menjadi panduan utama dalam mengevaluasi hasil kinerja bersama. Setiap masukan dari peserta rapat, catatan kendala teknis, serta kesepakatan bersama harus didokumentasikan tanpa memihak. Notula yang baik mempermudah ketua pelaksana dalam mengontrol perkembangan kerja divisi serta memastikan semua target tercapai sesuai jadwal yang telah ditentukan.',
        'Surat resmi adalah jembatan komunikasi diplomatis antara himpunan dengan pihak eksternal. Kesalahan kecil dalam penulisan nama instansi, nomor surat, atau lampiran dokumen dapat berdampak pada kelancaran perizinan kegiatan. Oleh karena itu, verifikasi bertingkat sebelum surat dikirimkan menjadi standar operasional yang wajib dipatuhi oleh seluruh jajaran kesekretariatan.',
        'Menjaga jejak sejarah organisasi melalui arsip dokumentasi yang rapi dan berkelanjutan adalah tanggung jawab moral pengurus. Laporan akhir tahun bukan sekadar formalitas menjelang suksesi kepengurusan, melainkan warisan pengetahuan bagi generasi penerus. Melalui arsip yang lengkap, kepengurusan berikutnya dapat belajar dari pencapaian maupun kendala terdahulu untuk menciptakan inovasi gerakan yang lebih baik.',
        'Disiplin dalam persuratan adalah pondasi utama terwujudnya tata kelola himpunan yang solid dan mandiri. Alur pengajuan perizinan gedung, permohonan delegasi lomba, hingga proposal kerja sama membutuhkan surat pengantar resmi yang rapi dan terverifikasi. Keterlambatan distribusi surat dapat menghambat jalannya agenda, sehingga kecepatan dan ketepatan biro kesekretariatan sangat menentukan keberhasilan acara.'
    ];

    /* ----------------------------------------------------------------------
       2. Constants & Firebase RTDB Setup
       ---------------------------------------------------------------------- */
    const DEFAULT_DURATION = 30; // seconds
    let selectedDuration = 30; // 30 | 60
    const STORAGE_KEY = 'kestari_leaderboard_scores_v2';
    const LEGACY_STORAGE_KEY = 'kestari_leaderboard_scores';
    const MAX_SCORES = 20;
    const ROOM_PREFIX = 'kestari-room-';
    const ROOM_CODE_LENGTH = 4;

    const FIREBASE_CONFIG = {
        apiKey: "AIzaSyBgpcxje2A3LL9K_wv84aZlfzs_Ez3y9n0",
        authDomain: "booth-kestari.firebaseapp.com",
        databaseURL: "https://booth-kestari-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "booth-kestari",
        storageBucket: "booth-kestari.firebasestorage.app",
        messagingSenderId: "40532923023",
        appId: "1:40532923023:web:d23ebfce177e0b0a0c56fa",
        measurementId: "G-R8F3ZVHJ1R"
    };

    let rtdb = null;
    let cloudScores = [];
    let isCloudConnected = false;
    let currentFirebaseRoomRef = null;
    let currentRoundId = 0;

    try {
        if (typeof firebase !== 'undefined' && firebase.initializeApp) {
            if (!firebase.apps || !firebase.apps.length) {
                firebase.initializeApp(FIREBASE_CONFIG);
            }
            rtdb = firebase.database();
        }
    } catch (e) {
        console.warn('Firebase RTDB init notice:', e);
    }

    /* ----------------------------------------------------------------------
       3. DOM references
       ---------------------------------------------------------------------- */
    const states = {
        modeSelect: document.getElementById('game-mode-select'),
        nameInput: document.getElementById('game-name-input'),
        lobby: document.getElementById('game-lobby'),
        countdown: document.getElementById('game-countdown'),
        playing: document.getElementById('game-playing'),
        results: document.getElementById('game-results')
    };

    const btnSolo = document.getElementById('btn-solo');
    const btnCoop = document.getElementById('btn-coop');
    const playerNameInput = document.getElementById('player-name');
    const nameCounter = document.getElementById('name-counter');
    const playerClassInput = document.getElementById('player-class');
    const classCounter = document.getElementById('class-counter');
    const btnBackMode = document.getElementById('btn-back-mode');
    const btnStartGame = document.getElementById('btn-start-game');
    const nameTitle = document.getElementById('name-title');
    const nameSubtitle = document.getElementById('name-subtitle');
    const roomJoinGroup = document.getElementById('room-join-group');
    const roomCodeInput = document.getElementById('room-code-input');

    const lobbyCard = document.querySelector('#game-lobby .lobby-card');
    const lobbyRoomCode = document.getElementById('lobby-room-code');
    const lobbyYouAvatar = document.getElementById('lobby-you-avatar');
    const lobbyYouName = document.getElementById('lobby-you-name');
    const lobbyYouRole = document.getElementById('lobby-you-role');
    const lobbyPartnerRow = document.getElementById('lobby-partner-row');
    const lobbyPartnerAvatar = document.getElementById('lobby-partner-avatar');
    const lobbyPartnerName = document.getElementById('lobby-partner-name');
    const lobbyPartnerRole = document.getElementById('lobby-partner-role');
    const lobbyPartnerStatus = document.getElementById('lobby-partner-status');
    const lobbyHint = document.getElementById('lobby-hint');
    const btnLobbyBack = document.getElementById('btn-lobby-back');
    const btnPlayBot = document.getElementById('btn-play-bot');
    const btnStartCoop = document.getElementById('btn-start-coop');
    const btnCopyCode = document.getElementById('btn-copy-code');

    const countdownNumber = document.getElementById('countdown-number');
    const countdownLabel = document.getElementById('countdown-label');

    const gameTimer = document.getElementById('game-timer');
    const timerValue = document.getElementById('timer-value');
    const liveWpm = document.getElementById('live-wpm');
    const liveAccuracy = document.getElementById('live-accuracy');
    const gameModeLabel = document.getElementById('game-mode-label');
    const gameRoomLabel = document.getElementById('game-room-label');
    const gameRoomCode = document.getElementById('game-room-code');
    const textDisplayWrapper = document.getElementById('text-display-wrapper');
    const textDisplay = document.getElementById('text-display');
    const typingInput = document.getElementById('typing-input');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const progressLabel = document.getElementById('progress-label');
    const gameAnnouncer = document.getElementById('game-announcer');
    const charsTypedText = document.getElementById('chars-typed');
    const coopStats = document.getElementById('coop-stats');
    const coopYouName = document.getElementById('coop-you-name');
    const coopYouClass = document.getElementById('coop-you-class');
    const coopPartnerName = document.getElementById('coop-partner-name');
    const coopPartnerClass = document.getElementById('coop-partner-class');
    const coopYouWpm = document.getElementById('coop-you-wpm');
    const coopPartnerWpm = document.getElementById('coop-partner-wpm');
    const coopYouProg = document.getElementById('coop-you-prog');
    const coopPartnerProg = document.getElementById('coop-partner-prog');
    const vsLeadBadge = document.getElementById('vs-lead-badge');

    const versusOutcome = document.getElementById('versus-outcome');
    const versusOutcomeBadge = document.getElementById('versus-outcome-badge');
    const versusOutcomeSubtitle = document.getElementById('versus-outcome-subtitle');
    const versusComparison = document.getElementById('versus-comparison');
    const vsCardYou = document.getElementById('vs-card-you');
    const vsCardPartner = document.getElementById('vs-card-partner');
    const vsYouName = document.getElementById('vs-you-name');
    const vsYouClass = document.getElementById('vs-you-class');
    const vsYouWpm = document.getElementById('vs-you-wpm');
    const vsYouAcc = document.getElementById('vs-you-acc');
    const vsYouScore = document.getElementById('vs-you-score');
    const vsPartnerName = document.getElementById('vs-partner-name');
    const vsPartnerClass = document.getElementById('vs-partner-class');
    const vsPartnerWpm = document.getElementById('vs-partner-wpm');
    const vsPartnerAcc = document.getElementById('vs-partner-acc');
    const vsPartnerScore = document.getElementById('vs-partner-score');
    const resultsMain = document.getElementById('results-main');

    const resultsTitle = document.getElementById('results-title');
    const resultsPlayerName = document.getElementById('results-player-name');
    const resultWpm = document.getElementById('result-wpm');
    const resultAccuracy = document.getElementById('result-accuracy');
    const resultAccuracyCard = document.getElementById('result-accuracy-card');
    const resultCorrect = document.getElementById('result-correct');
    const resultWrong = document.getElementById('result-wrong');
    const resultTime = document.getElementById('result-time');
    const resultMessage = document.getElementById('result-message');
    const resultsTeamDetail = document.getElementById('results-team-detail');
    const resultsSaved = document.querySelector('.results-saved');
    const btnPlayAgain = document.getElementById('btn-play-again');
    const btnToLeaderboard = document.getElementById('btn-to-leaderboard');
    const btnBackHome = document.getElementById('btn-back-home');

    const leaderboardTable = document.getElementById('leaderboard-table');
    const leaderboardBody = document.getElementById('leaderboard-body');
    const leaderboardEmpty = document.getElementById('leaderboard-empty');
    const periodFilterBtns = Array.from(document.querySelectorAll('#period-filter .filter-btn'));
    const modeFilterBtns = Array.from(document.querySelectorAll('#mode-filter .filter-btn'));
    const durationFilterBtns = Array.from(document.querySelectorAll('#duration-filter .filter-btn'));

    const durationOptBtns = Array.from(document.querySelectorAll('.duration-opt-btn'));
    const durationGuestHint = document.getElementById('duration-guest-hint');
    const lobbyDurationBar = document.getElementById('lobby-duration-bar');
    const lobbyDurationToggle = document.getElementById('lobby-duration-toggle');
    const lobbyDurBtns = Array.from(document.querySelectorAll('.lobby-dur-btn'));
    const lobbyDurationGuestText = document.getElementById('lobby-duration-guest-text');
    const noBackspaceHint = document.getElementById('no-backspace-hint');

    /* ----------------------------------------------------------------------
       4. State
       ---------------------------------------------------------------------- */
    let currentMode = 'solo'; // solo | versus
    let currentPlayerName = '';
    let currentPlayerClass = '';
    let currentText = '';
    let lastTextIndex = -1;

    let gameRole = 'solo'; // solo | host | guest | bot
    let partnerType = 'none'; // none | bot | remote
    let partnerName = '';
    let partnerClass = '';
    let partnerConnected = false;
    let roomCode = '';
    let roomChannel = null;
    let joinTimeout = null;
    let pendingFinalizeTimer = null;

    let isGameRunning = false;
    let startedAt = 0;
    let timeLeft = selectedDuration;
    let tickInterval = null;
    let countdownInterval = null;
    let botInterval = null;

    let lastTypedValue = '';
    let noBackspaceTimer = null;

    let botPosition = 0;
    let botWpm = 0;
    let botAccuracy = 96;
    let partnerPosition = 0;
    let partnerLive = { wpm: 0, accuracy: 0, correct: 0, wrong: 0 };
    let partnerFinal = null;
    let ownFinal = null;
    let roundFinalized = false;
    let lastBroadcastAt = 0;
    let announcedSeconds = [];
    let announcedProgress = [];

    let currentPeriodFilter = 'all';
    let currentModeFilter = 'solo';
    let currentDurationFilter = 'all'; // all | 30 | 60

    /* ----------------------------------------------------------------------
       5. Helpers
       ---------------------------------------------------------------------- */
    function toast(message, type = 'success') {
        if (typeof window.showToast === 'function') {
            window.showToast(message, type);
        }
    }

    function pad2(value) {
        return String(value).padStart(2, '0');
    }

    function cleanName(value) {
        return String(value || '')
            .replace(/[\u0000-\u001F\u007F]/g, '')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 20);
    }

    function cleanClass(value) {
        return String(value || '')
            .replace(/[\u0000-\u001F\u007F]/g, '')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 30);
    }

    function getInitial(value) {
        const name = cleanName(value);
        return name ? name.charAt(0).toUpperCase() : '?';
    }

    function announce(message) {
        if (!gameAnnouncer || !message) return;
        gameAnnouncer.textContent = message;
    }

    function localDateKey(value) {
        const date = value instanceof Date ? value : new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
    }

    function formatScore(value) {
        return Number(value || 0).toLocaleString('id-ID');
    }

    function formatScoreTime(dateValue) {
        if (!dateValue) return '';
        try {
            const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
            if (Number.isNaN(date.getTime())) return '';
            return date.toLocaleTimeString('id-ID', {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).replace(':', '.') + ' WIB';
        } catch (e) {
            const d = new Date(dateValue);
            return String(d.getHours()).padStart(2, '0') + '.' + String(d.getMinutes()).padStart(2, '0') + ' WIB';
        }
    }

    function getRandomText(duration = selectedDuration) {
        let index = 0;
        if (CHALLENGE_TEXTS.length > 1) {
            do {
                index = Math.floor(Math.random() * CHALLENGE_TEXTS.length);
            } while (index === lastTextIndex);
        }
        lastTextIndex = index;
        let text = CHALLENGE_TEXTS[index];
        if (duration >= 60 && text.length < 520) {
            const nextIndex = (index + 1) % CHALLENGE_TEXTS.length;
            text = text + ' ' + CHALLENGE_TEXTS[nextIndex];
        }
        return text;
    }

    function generateRoomCode() {
        const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < ROOM_CODE_LENGTH; i += 1) {
            code += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        return code;
    }

    /* ----------------------------------------------------------------------
       6. State transitions
       ---------------------------------------------------------------------- */
    function switchState(stateKey) {
        Object.keys(states).forEach((key) => {
            const element = states[key];
            if (!element) return;
            element.classList.toggle('active', key === stateKey);
        });
    }

    function stopGameTimers() {
        if (tickInterval) {
            clearInterval(tickInterval);
            tickInterval = null;
        }
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        if (botInterval) {
            clearInterval(botInterval);
            botInterval = null;
        }
        if (pendingFinalizeTimer) {
            clearTimeout(pendingFinalizeTimer);
            pendingFinalizeTimer = null;
        }
    }

    function resetRoundState() {
        stopGameTimers();
        isGameRunning = false;
        roundFinalized = false;
        ownFinal = null;
        partnerFinal = null;
        partnerPosition = 0;
        partnerLive = { wpm: 0, accuracy: 0, correct: 0, wrong: 0 };
        botPosition = 0;
        timeLeft = selectedDuration;
        lastBroadcastAt = 0;
        announcedSeconds = [];
        announcedProgress = [];
        lastTypedValue = '';
    }

    function closeRoom(notify = true) {
        if (joinTimeout) {
            clearTimeout(joinTimeout);
            joinTimeout = null;
        }

        if (currentFirebaseRoomRef) {
            try {
                currentFirebaseRoomRef.off();
                if (gameRole === 'host') {
                    currentFirebaseRoomRef.remove();
                } else if (gameRole === 'guest') {
                    currentFirebaseRoomRef.child('guest').remove();
                    currentFirebaseRoomRef.child('status').set('waiting');
                }
            } catch (error) {
                // Ignore.
            }
            currentFirebaseRoomRef = null;
        }

        if (roomChannel) {
            try {
                if (notify && partnerConnected) {
                    roomChannel.postMessage({
                        type: gameRole === 'host' ? 'close' : 'leave',
                        name: currentPlayerName
                    });
                }
            } catch (error) {
                // Channel may already be closed.
            }
            roomChannel.close();
            roomChannel = null;
        }

        partnerConnected = false;
        partnerType = 'none';
        partnerName = '';
        partnerClass = '';
        partnerFinal = null;
        currentRoundId = 0;
        if (gameRole !== 'solo') gameRole = 'solo';
    }

    /* ----------------------------------------------------------------------
       7. Mode & name input
       ---------------------------------------------------------------------- */
    function checkFormValidity() {
        const name = cleanName(playerNameInput ? playerNameInput.value : '');
        const prodi = cleanClass(playerClassInput ? playerClassInput.value : '');
        const isValid = name.length >= 2 && prodi.length >= 2;
        if (btnStartGame) btnStartGame.disabled = !isValid;
        return isValid;
    }

    function openNameInput(mode) {
        closeRoom(true);
        resetRoundState();
        currentMode = mode; // 'solo' | 'versus'

        if (roomJoinGroup) roomJoinGroup.hidden = mode !== 'versus';
        if (nameTitle) {
            nameTitle.textContent = mode === 'versus'
                ? 'Siapa yang akan duel 1 vs 1?'
                : 'Siapa nama dan kelasmu?';
        }
        if (nameSubtitle) {
            nameSubtitle.textContent = mode === 'versus'
                ? 'Isi nama dan kelas/prodi (wajib) sebelum bertanding.'
                : 'Nama dan kelas ini akan tercatat di leaderboard.';
        }
        if (roomCodeInput) roomCodeInput.value = '';

        if (durationGuestHint) durationGuestHint.hidden = true;
        durationOptBtns.forEach(btn => {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        });
        updateDurationUI();

        checkFormValidity();
        switchState('nameInput');
        window.setTimeout(() => {
            if (playerNameInput) playerNameInput.focus({ preventScroll: true });
        }, 80);
    }

    if (btnSolo) {
        btnSolo.addEventListener('click', () => openNameInput('solo'));
    }

    if (btnCoop) {
        btnCoop.addEventListener('click', () => openNameInput('versus'));
    }

    if (btnBackMode) {
        btnBackMode.addEventListener('click', () => {
            closeRoom(true);
            resetRoundState();
            switchState('modeSelect');
        });
    }

    if (playerNameInput) {
        playerNameInput.addEventListener('input', () => {
            if (nameCounter) nameCounter.textContent = String(playerNameInput.value.length);
            checkFormValidity();
        });

        playerNameInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (playerClassInput && cleanClass(playerClassInput.value).length < 2) {
                    playerClassInput.focus({ preventScroll: true });
                } else if (checkFormValidity() && btnStartGame) {
                    btnStartGame.click();
                }
            }
        });
    }

    if (playerClassInput) {
        playerClassInput.addEventListener('input', () => {
            if (classCounter) classCounter.textContent = String(playerClassInput.value.length);
            checkFormValidity();
        });

        playerClassInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (playerNameInput && cleanName(playerNameInput.value).length < 2) {
                    playerNameInput.focus({ preventScroll: true });
                } else if (checkFormValidity() && btnStartGame) {
                    btnStartGame.click();
                }
            }
        });
    }

    if (roomCodeInput) {
        roomCodeInput.addEventListener('input', () => {
            roomCodeInput.value = roomCodeInput.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, '')
                .slice(0, ROOM_CODE_LENGTH);

            const isGuestCode = roomCodeInput.value.trim().length > 0;
            if (durationGuestHint) durationGuestHint.hidden = !isGuestCode;
            durationOptBtns.forEach(btn => {
                btn.style.opacity = isGuestCode ? '0.45' : '1';
                btn.style.pointerEvents = isGuestCode ? 'none' : 'auto';
            });
        });

        roomCodeInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && checkFormValidity() && btnStartGame) {
                event.preventDefault();
                btnStartGame.click();
            }
        });
    }

    function updateDurationUI() {
        durationOptBtns.forEach(btn => {
            const isActive = Number(btn.dataset.duration) === selectedDuration;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-checked', String(isActive));
        });
        lobbyDurBtns.forEach(btn => {
            btn.classList.toggle('active', Number(btn.dataset.duration) === selectedDuration);
        });
        if (lobbyDurationGuestText) {
            lobbyDurationGuestText.textContent = selectedDuration === 60 ? '1 Menit' : '30 Detik';
        }
        if (timerValue) {
            timerValue.textContent = String(selectedDuration);
        }
    }

    durationOptBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            selectedDuration = Number(btn.dataset.duration) || 30;
            updateDurationUI();
        });
    });

    if (btnStartGame) {
        btnStartGame.addEventListener('click', () => {
            const name = cleanName(playerNameInput ? playerNameInput.value : '');
            const prodi = cleanClass(playerClassInput ? playerClassInput.value : '');
            if (name.length < 2) {
                toast('Nama panggilan minimal 2 karakter.', 'error');
                if (playerNameInput) playerNameInput.focus({ preventScroll: true });
                return;
            }
            if (prodi.length < 2) {
                toast('Kelas / Prodi wajib diisi (minimal 2 karakter).', 'error');
                if (playerClassInput) playerClassInput.focus({ preventScroll: true });
                return;
            }

            currentPlayerName = name;
            currentPlayerClass = prodi;

            if (currentMode === 'solo') {
                startSoloRound();
                return;
            }

            const code = roomCodeInput ? roomCodeInput.value.trim().toUpperCase() : '';
            if (code) {
                joinRoom(code);
            } else {
                createRoom();
            }
        });
    }

    /* ----------------------------------------------------------------------
       8. 1 vs 1 Rooms (Firebase RTDB multi-device + BroadcastChannel fallback)
       ---------------------------------------------------------------------- */
    function createRoom() {
        closeRoom(false);
        resetRoundState();

        roomCode = generateRoomCode();
        gameRole = 'host';
        partnerType = 'none';
        partnerConnected = false;
        partnerName = '';
        partnerClass = '';

        // 1. Firebase RTDB room (multi-device)
        if (rtdb) {
            try {
                const roomRef = rtdb.ref('rooms/' + roomCode);
                currentFirebaseRoomRef = roomRef;
                currentText = getRandomText(selectedDuration);
                roomRef.set({
                    status: 'waiting',
                    text: currentText,
                    duration: selectedDuration,
                    host: {
                        name: currentPlayerName,
                        class: currentPlayerClass,
                        ready: true
                    },
                    guest: null,
                    createdAt: Date.now()
                });
                roomRef.onDisconnect().remove();
                roomRef.on('value', handleFirebaseRoomSnapshot);
            } catch (err) {
                console.warn('Firebase createRoom warning:', err);
            }
        }

        // 2. BroadcastChannel fallback (same browser)
        if (typeof BroadcastChannel !== 'undefined') {
            roomChannel = new BroadcastChannel(ROOM_PREFIX + roomCode);
            roomChannel.addEventListener('message', handleHostMessage);
        }

        updateLobbyUI();
        switchState('lobby');
        toast(`Room ${roomCode} dibuat. Bagikan kodenya ke lawan!`, 'success');
    }

    function joinRoom(code) {
        if (!/^[A-Z0-9]{4}$/.test(code)) {
            toast('Kode room harus 4 karakter.', 'error');
            return;
        }

        closeRoom(false);
        resetRoundState();

        roomCode = code;
        gameRole = 'guest';
        partnerType = 'remote';
        partnerConnected = false;
        partnerName = '';
        partnerClass = '';

        // 1. Firebase RTDB room
        if (rtdb) {
            try {
                const roomRef = rtdb.ref('rooms/' + roomCode);
                currentFirebaseRoomRef = roomRef;

                roomRef.once('value').then((snap) => {
                    const data = snap.val();
                    if (!data || data.status === 'finished') {
                        toast('Room tidak ditemukan atau sudah selesai.', 'error');
                        closeRoom(false);
                        switchState('nameInput');
                        return;
                    }

                    if (data.guest && data.guest.name && data.guest.name !== currentPlayerName) {
                        toast('Room sudah penuh (maksimal 2 pemain).', 'error');
                        closeRoom(false);
                        switchState('nameInput');
                        return;
                    }

                    if (joinTimeout) {
                        clearTimeout(joinTimeout);
                        joinTimeout = null;
                    }

                    partnerName = cleanName(data.host?.name) || 'Host';
                    partnerClass = cleanClass(data.host?.class) || '';
                    partnerConnected = true;
                    partnerType = 'remote';

                    if (data.text) {
                        currentText = data.text;
                    }
                    if (data.duration) {
                        selectedDuration = Number(data.duration) || 30;
                    }

                    roomRef.child('guest').set({
                        name: currentPlayerName,
                        class: currentPlayerClass,
                        ready: true
                    });
                    roomRef.child('guest').onDisconnect().remove();
                    roomRef.update({ status: 'ready' });

                    roomRef.on('value', handleFirebaseRoomSnapshot);

                    updateLobbyUI();
                    switchState('lobby');
                    toast(`Terhubung dengan ${partnerName}!`, 'success');
                }).catch((err) => {
                    console.warn('Firebase joinRoom warning:', err);
                });
            } catch (err) {
                console.warn('Firebase joinRoom error:', err);
            }
        }

        // 2. BroadcastChannel fallback
        if (typeof BroadcastChannel !== 'undefined') {
            roomChannel = new BroadcastChannel(ROOM_PREFIX + roomCode);
            roomChannel.addEventListener('message', handleGuestMessage);
            roomChannel.postMessage({ type: 'join', name: currentPlayerName, class: currentPlayerClass });
        }

        updateLobbyUI();
        switchState('lobby');

        joinTimeout = window.setTimeout(() => {
            joinTimeout = null;
            if (partnerConnected || isGameRunning) return;
            toast('Room tidak ditemukan. Periksa kembali kodenya.', 'error');
            closeRoom(false);
            switchState('nameInput');
            window.setTimeout(() => {
                if (roomCodeInput) roomCodeInput.focus({ preventScroll: true });
            }, 80);
        }, 3500);
    }

    function handleFirebaseRoomSnapshot(snapshot) {
        const data = snapshot.val();
        if (!data) {
            if (partnerConnected && !roundFinalized) {
                toast('Room ditutup oleh lawan.', 'info');
                closeRoom(false);
                resetRoundState();
                switchState('modeSelect');
            }
            return;
        }

        // Host observes guest connecting or leaving
        if (gameRole === 'host') {
            if (data.guest && data.guest.name) {
                const wasConnected = partnerConnected;
                partnerName = cleanName(data.guest.name) || 'Guest';
                partnerClass = cleanClass(data.guest.class) || '';
                partnerConnected = true;
                partnerType = 'remote';
                updateLobbyUI();
                if (!wasConnected) {
                    toast(`${partnerName} (${partnerClass || '-'}) bergabung ke room!`, 'success');
                }
            } else if (!data.guest && partnerConnected && !isGameRunning && !roundFinalized) {
                partnerConnected = false;
                partnerType = 'none';
                partnerName = '';
                partnerClass = '';
                updateLobbyUI();
                toast('Lawan keluar dari room.', 'info');
            }
        } else if (gameRole === 'guest') {
            if (data.host && data.host.name) {
                partnerName = cleanName(data.host.name) || 'Host';
                partnerClass = cleanClass(data.host.class) || '';
                partnerConnected = true;
                partnerType = 'remote';
                updateLobbyUI();
            }
        }

        // Sync duration from room
        if (data.duration && Number(data.duration) !== selectedDuration) {
            selectedDuration = Number(data.duration) || 30;
            updateDurationUI();
        }

        // Countdown start triggered by Host
        if (data.status === 'starting' && data.roundId && data.roundId !== currentRoundId) {
            currentRoundId = data.roundId;
            if (data.duration) selectedDuration = Number(data.duration) || 30;
            if (data.text) currentText = data.text;
            startCoopRound(currentText, gameRole);
        }

        // Return to lobby for next round when Host clicks "Main Lagi" (guest only)
        if (gameRole === 'guest' && data.status === 'ready' && !isGameRunning && states.results && states.results.classList.contains('active')) {
            resetRoundState();
            updateLobbyUI();
            switchState('lobby');
            toast('Kembali ke lobby untuk ronde berikutnya!', 'info');
        }

        // Live progress update during 1 vs 1 duel
        if (isGameRunning && data.progress) {
            const partnerProg = gameRole === 'host' ? data.progress.guest : data.progress.host;
            if (partnerProg) {
                applyPartnerProgress(partnerProg);
            }
        }

        // Partner finished match
        if (data.finish) {
            const remoteFinal = gameRole === 'host' ? data.finish.guest : data.finish.host;
            if (remoteFinal && !partnerFinal) {
                partnerFinal = normalizeRemoteStats(remoteFinal);
                if (ownFinal && !roundFinalized) {
                    finalizeRound();
                }
            }
        }
    }

    function handleHostMessage(event) {
        const data = event.data || {};

        if (data.type === 'join') {
            if (partnerConnected) {
                try {
                    roomChannel.postMessage({ type: 'busy', hostName: currentPlayerName });
                } catch (error) {
                    // Ignore closed channel.
                }
                return;
            }

            partnerName = cleanName(data.name) || 'Partner';
            partnerConnected = true;
            partnerType = 'remote';
            updateLobbyUI();
            try {
                roomChannel.postMessage({ type: 'state', hostName: currentPlayerName, roomCode });
            } catch (error) {
                // Ignore.
            }
            toast(`${partnerName} bergabung ke room!`, 'success');
            return;
        }

        if (data.type === 'leave') {
            partnerConnected = false;
            partnerType = 'none';
            partnerName = '';
            partnerFinal = null;
            updateLobbyUI();
            toast('Partner keluar dari room.', 'info');
            return;
        }

        if (data.type === 'progress') {
            if (!isGameRunning) return;
            applyPartnerProgress(data);
            return;
        }

        if (data.type === 'finish') {
            partnerFinal = normalizeRemoteStats(data.stats);
            if (ownFinal && !roundFinalized) finalizeRound();
        }
    }

    function handleGuestMessage(event) {
        const data = event.data || {};

        if (data.type === 'state') {
            if (joinTimeout) {
                clearTimeout(joinTimeout);
                joinTimeout = null;
            }
            partnerConnected = true;
            partnerName = cleanName(data.hostName) || 'Host';
            updateLobbyUI();
            toast(`Terhubung dengan ${partnerName}!`, 'success');
            return;
        }

        if (data.type === 'busy') {
            toast('Room sedang dipakai. Coba kode lain.', 'error');
            closeRoom(false);
            switchState('nameInput');
            return;
        }

        if (data.type === 'duration') {
            if (data.duration) {
                selectedDuration = Number(data.duration) || 30;
                updateDurationUI();
            }
            return;
        }

        if (data.type === 'start') {
            if (joinTimeout) {
                clearTimeout(joinTimeout);
                joinTimeout = null;
            }
            if (data.duration) selectedDuration = Number(data.duration) || 30;
            partnerConnected = true;
            partnerName = cleanName(data.hostName) || partnerName || 'Host';
            partnerType = 'remote';
            gameRole = 'guest';
            resetRoundState();
            startCountdown(() => beginPlaying(data.text), 'Mabar dimulai...');
            return;
        }

        if (data.type === 'progress') {
            if (!isGameRunning) return;
            applyPartnerProgress(data);
            return;
        }

        if (data.type === 'finish') {
            partnerFinal = normalizeRemoteStats(data.stats);
            if (ownFinal && !roundFinalized) finalizeRound();
            return;
        }

        if (data.type === 'close') {
            toast('Host menutup room.', 'info');
            closeRoom(false);
            resetRoundState();
            switchState('modeSelect');
        }
    }

    function normalizeRemoteStats(stats) {
        if (!stats || typeof stats !== 'object') return null;
        return {
            wpm: Math.max(0, Math.round(Number(stats.wpm) || 0)),
            accuracy: Math.max(0, Math.min(100, Math.round(Number(stats.accuracy) || 0))),
            correct: Math.max(0, Math.round(Number(stats.correct) || 0)),
            wrong: Math.max(0, Math.round(Number(stats.wrong) || 0)),
            typedLength: Math.max(0, Math.round(Number(stats.typedLength) || 0)),
            duration: Math.max(1, Math.round(Number(stats.duration) || selectedDuration))
        };
    }

    function updateLobbyUI() {
        const isGuest = gameRole === 'guest';

        if (lobbyRoomCode) lobbyRoomCode.textContent = roomCode || '----';
        if (lobbyYouAvatar) lobbyYouAvatar.textContent = getInitial(currentPlayerName);
        if (lobbyYouName) lobbyYouName.textContent = currentPlayerName || 'Kamu';
        if (lobbyYouRole) lobbyYouRole.textContent = isGuest ? 'Guest · Siap' : 'Host · Siap';

        if (lobbyPartnerRow) {
            lobbyPartnerRow.classList.toggle('is-waiting', !partnerConnected);
        }
        if (lobbyPartnerAvatar) {
            lobbyPartnerAvatar.textContent = partnerConnected ? getInitial(partnerName) : '?';
        }
        if (lobbyPartnerName) {
            lobbyPartnerName.textContent = partnerConnected
                ? partnerName
                : (isGuest ? 'Mencari host...' : 'Menunggu...');
        }
        if (lobbyPartnerRole) lobbyPartnerRole.textContent = isGuest ? 'Host' : 'Partner';
        if (lobbyPartnerStatus) {
            lobbyPartnerStatus.textContent = partnerConnected ? 'Siap' : 'Menunggu';
            lobbyPartnerStatus.className = `player-status ${partnerConnected ? 'connected' : 'waiting'}`;
        }

        if (lobbyHint) {
            if (isGuest) {
                lobbyHint.textContent = partnerConnected
                    ? 'Host akan memulai permainan. Siapkan jarimu!'
                    : 'Menghubungkan ke room...';
            } else if (partnerConnected) {
                lobbyHint.textContent = `${partnerName} sudah bergabung. Klik "Mulai Mabar" untuk memulai.`;
            } else {
                lobbyHint.textContent = 'Bagikan kode room ke partner, atau langsung main bersama Bot Kestari.';
            }
        }

        if (lobbyDurationToggle && lobbyDurationGuestText) {
            lobbyDurationToggle.hidden = isGuest;
            lobbyDurationGuestText.hidden = !isGuest;
            lobbyDurationGuestText.textContent = selectedDuration === 60 ? '1 Menit' : '30 Detik';
        }
        updateDurationUI();

        if (btnStartCoop) {
            btnStartCoop.disabled = isGuest || !partnerConnected || partnerType !== 'remote';
            btnStartCoop.hidden = isGuest;
        }
        if (btnPlayBot) btnPlayBot.hidden = isGuest;
        if (lobbyCard) lobbyCard.classList.toggle('is-guest', isGuest);
    }

    lobbyDurBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (gameRole !== 'host') return;
            selectedDuration = Number(btn.dataset.duration) || 30;
            updateDurationUI();
            if (currentFirebaseRoomRef) {
                try {
                    currentFirebaseRoomRef.update({ duration: selectedDuration });
                } catch (e) {}
            }
            if (roomChannel) {
                try {
                    roomChannel.postMessage({ type: 'duration', duration: selectedDuration });
                } catch (e) {}
            }
        });
    });

    function copyRoomCode() {
        if (!roomCode) return;

        const onSuccess = () => toast('Kode room disalin!', 'success');
        const onFailure = () => toast('Gagal menyalin. Salin kode secara manual.', 'error');

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(roomCode).then(onSuccess).catch(onFallback);
        } else {
            onFallback();
        }

        function onFallback() {
            try {
                const helper = document.createElement('textarea');
                helper.value = roomCode;
                helper.setAttribute('readonly', '');
                helper.style.position = 'fixed';
                helper.style.opacity = '0';
                document.body.appendChild(helper);
                helper.select();
                const copied = document.execCommand('copy');
                document.body.removeChild(helper);
                if (copied) onSuccess();
                else onFailure();
            } catch (error) {
                onFailure();
            }
        }
    }

    if (btnCopyCode) btnCopyCode.addEventListener('click', copyRoomCode);

    if (btnLobbyBack) {
        btnLobbyBack.addEventListener('click', () => {
            closeRoom(true);
            resetRoundState();
            switchState('nameInput');
            window.setTimeout(() => {
                if (roomCodeInput) roomCodeInput.focus({ preventScroll: true });
            }, 80);
        });
    }

    if (btnPlayBot) {
        btnPlayBot.addEventListener('click', () => {
            closeRoom(true);
            roomCode = '';
            partnerName = 'Bot Kestari';
            partnerType = 'bot';
            partnerConnected = true;
            startCoopRound(getRandomText(selectedDuration), 'bot');
            toast('Bot Kestari siap jadi partner!', 'success');
        });
    }

    if (btnStartCoop) {
        btnStartCoop.addEventListener('click', () => {
            if (gameRole !== 'host' || !partnerConnected || partnerType !== 'remote') return;
            const text = getRandomText(selectedDuration);
            const roundId = Date.now();
            currentRoundId = roundId;
            if (currentFirebaseRoomRef) {
                try {
                    currentFirebaseRoomRef.update({
                        status: 'starting',
                        roundId,
                        text,
                        duration: selectedDuration,
                        progress: null,
                        finish: null
                    });
                } catch (error) {
                    // Ignore.
                }
            }
            if (roomChannel) {
                try {
                    roomChannel.postMessage({
                        type: 'start',
                        roundId,
                        text,
                        hostName: currentPlayerName,
                        duration: selectedDuration
                    });
                } catch (error) {
                    // Ignore.
                }
            }
            startCoopRound(text, 'host');
        });
    }

    function startCoopRound(text, role) {
        currentMode = 'coop';
        gameRole = role;
        resetRoundState();
        startCountdown(() => beginPlaying(text), 'Mabar dimulai...');
    }

    /* ----------------------------------------------------------------------
       9. Countdown & round start
       ---------------------------------------------------------------------- */
    function startSoloRound() {
        closeRoom(false);
        currentMode = 'solo';
        gameRole = 'solo';
        partnerType = 'none';
        partnerName = '';
        resetRoundState();
        startCountdown(() => beginPlaying(getRandomText(selectedDuration)), 'Bersiap...');
    }

    function startCountdown(onComplete, label) {
        stopGameTimers();
        switchState('countdown');
        if (countdownLabel) countdownLabel.textContent = label || 'Bersiap...';

        let count = 3;
        if (countdownNumber) {
            countdownNumber.textContent = String(count);
            restartCountdownAnimation();
        }

        countdownInterval = window.setInterval(() => {
            count -= 1;
            if (count > 0) {
                if (countdownNumber) {
                    countdownNumber.textContent = String(count);
                    restartCountdownAnimation();
                }
                return;
            }

            clearInterval(countdownInterval);
            countdownInterval = null;
            onComplete();
        }, 1000);
    }

    function restartCountdownAnimation() {
        if (!countdownNumber) return;
        countdownNumber.style.animation = 'none';
        void countdownNumber.offsetWidth;
        countdownNumber.style.animation = '';
    }

    function beginPlaying(text) {
        resetRoundState();
        currentText = text || getRandomText(selectedDuration);
        isGameRunning = true;
        timeLeft = selectedDuration;
        startedAt = Date.now();
        lastTypedValue = '';

        partnerPosition = 0;
        partnerLive = { wpm: 0, accuracy: 0, correct: 0, wrong: 0 };

        if (partnerType === 'bot') {
            botPosition = 0;
            botWpm = 42 + Math.random() * 38;
            botAccuracy = 90 + Math.random() * 8;
        }

        const isVersus = currentMode === 'versus' || currentMode === 'coop';
        if (timerValue) timerValue.textContent = String(selectedDuration);
        if (gameTimer) gameTimer.classList.remove('warning');
        if (liveWpm) liveWpm.textContent = '0';
        if (liveAccuracy) liveAccuracy.textContent = '100';
        if (progressBar) progressBar.style.width = '0%';
        if (progressBar) progressBar.setAttribute('aria-valuenow', '0');
        if (progressText) progressText.textContent = '0%';
        if (progressLabel) progressLabel.textContent = isVersus ? 'Progress Kamu' : 'Progress';
        if (charsTypedText) charsTypedText.textContent = '0 karakter diketik';
        if (gameModeLabel) gameModeLabel.textContent = isVersus ? '1 VS 1' : 'SOLO';
        if (gameRoomLabel) gameRoomLabel.hidden = !isVersus || partnerType === 'bot';
        if (gameRoomCode) gameRoomCode.textContent = roomCode || '----';
        if (coopStats) coopStats.hidden = !isVersus;
        if (coopYouName) coopYouName.textContent = currentPlayerName || 'Kamu';
        if (coopYouClass) coopYouClass.textContent = currentPlayerClass || '-';
        if (coopPartnerName) coopPartnerName.textContent = partnerName || 'Bot Kestari';
        if (coopPartnerClass) coopPartnerClass.textContent = partnerClass || (partnerType === 'bot' ? 'Bot AI' : 'Lawan');
        if (coopYouWpm) coopYouWpm.textContent = '0';
        if (coopPartnerWpm) coopPartnerWpm.textContent = '0';
        if (coopYouProg) coopYouProg.textContent = '0%';
        if (coopPartnerProg) coopPartnerProg.textContent = '0%';
        if (vsLeadBadge) {
            vsLeadBadge.textContent = '⚔️ VS';
            vsLeadBadge.style.color = '';
        }

        if (typingInput) {
            typingInput.value = '';
            typingInput.disabled = false;
            typingInput.maxLength = currentText.length;
        }
        if (textDisplayWrapper) textDisplayWrapper.classList.remove('unfocused');

        renderTextDisplay('');
        switchState('playing');

        requestAnimationFrame(() => {
            if (typingInput) typingInput.focus({ preventScroll: true });
        });

        tickInterval = window.setInterval(tick, 200);

        if (partnerType === 'bot') startBot();
    }

    /* ----------------------------------------------------------------------
       10. Live game
       ---------------------------------------------------------------------- */
    function tick() {
        if (!isGameRunning) return;

        const elapsed = (Date.now() - startedAt) / 1000;
        const remaining = Math.max(0, selectedDuration - elapsed);
        timeLeft = remaining;

        if (timerValue) timerValue.textContent = String(Math.ceil(remaining));
        if (gameTimer) gameTimer.classList.toggle('warning', remaining <= 10);

        const seconds = Math.ceil(remaining);
        if ([10, 5, 3, 2, 1].includes(seconds) && !announcedSeconds.includes(seconds)) {
            announcedSeconds.push(seconds);
            announce(`${seconds} detik tersisa.`);
        }

        if (remaining <= 0) finishGame();
    }

    function getOwnStats() {
        const typed = typingInput ? typingInput.value : '';
        let correct = 0;
        let wrong = 0;

        for (let i = 0; i < typed.length; i += 1) {
            if (i < currentText.length && typed[i] === currentText[i]) {
                correct += 1;
            } else {
                wrong += 1;
            }
        }

        const elapsed = Math.max(1, (Date.now() - startedAt) / 1000);
        const wpm = Math.round((correct / 5) / (elapsed / 60));
        const accuracy = typed.length > 0
            ? Math.round((correct / typed.length) * 100)
            : 100;

        return {
            typed,
            typedLength: typed.length,
            correct,
            wrong,
            wpm,
            accuracy,
            elapsed
        };
    }

    function getFinalStats() {
        const typed = typingInput ? typingInput.value : '';
        let correct = 0;
        let wrong = 0;

        for (let i = 0; i < typed.length; i += 1) {
            if (i < currentText.length && typed[i] === currentText[i]) {
                correct += 1;
            } else {
                wrong += 1;
            }
        }

        const duration = Math.min(
            selectedDuration,
            Math.max(1, Math.round((Date.now() - startedAt) / 1000))
        );
        const wpm = Math.round((correct / 5) / (duration / 60));
        const accuracy = typed.length > 0
            ? Math.round((correct / typed.length) * 100)
            : 100;

        return {
            correct,
            wrong,
            typedLength: typed.length,
            wpm,
            accuracy,
            duration
        };
    }

    function renderTextDisplay(typed) {
        if (!textDisplay) return;

        const input = typed || '';
        const isVersus = currentMode === 'versus' || currentMode === 'coop';
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < currentText.length; i += 1) {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = currentText[i];

            if (i < input.length) {
                span.classList.add(input[i] === currentText[i] ? 'correct' : 'incorrect');
            } else if (i === input.length) {
                span.classList.add('current');
            } else if (isVersus && i < partnerPosition) {
                span.classList.add('partner');
            }

            fragment.appendChild(span);
        }

        textDisplay.replaceChildren(fragment);
    }

    function updateGameUI(stats) {
        if (liveWpm) liveWpm.textContent = String(stats.wpm);
        if (liveAccuracy) liveAccuracy.textContent = String(stats.accuracy);

        const denominator = currentText.length || 1;
        const isVersus = currentMode === 'versus' || currentMode === 'coop';
        const ownProgress = Math.max(0, Math.min(100, Math.round((stats.typedLength / denominator) * 100)));
        const partnerProg = Math.max(0, Math.min(100, Math.round((partnerPosition / denominator) * 100)));

        if (progressBar) progressBar.style.width = `${ownProgress}%`;
        if (progressBar) progressBar.setAttribute('aria-valuenow', String(ownProgress));
        if (progressText) progressText.textContent = `${ownProgress}%`;
        if (charsTypedText) charsTypedText.textContent = `${stats.typedLength} karakter diketik`;
        if (coopYouWpm) coopYouWpm.textContent = String(stats.wpm);
        if (coopPartnerWpm) coopPartnerWpm.textContent = String(Math.round(partnerLive.wpm || 0));

        if (coopYouProg) coopYouProg.textContent = `${ownProgress}%`;
        if (coopPartnerProg) coopPartnerProg.textContent = `${partnerProg}%`;

        if (vsLeadBadge && isVersus) {
            if (ownProgress > partnerProg + 3) {
                vsLeadBadge.textContent = '🔥 Kamu Unggul';
                vsLeadBadge.style.color = '#059669';
            } else if (partnerProg > ownProgress + 3) {
                vsLeadBadge.textContent = '⚠️ Lawan Unggul';
                vsLeadBadge.style.color = '#dc2626';
            } else {
                vsLeadBadge.textContent = '⚔️ VS';
                vsLeadBadge.style.color = '';
            }
        }

        const milestone = ownProgress >= 100 ? 100 : ownProgress >= 75 ? 75 : ownProgress >= 50 ? 50 : ownProgress >= 25 ? 25 : 0;
        if (milestone && !announcedProgress.includes(milestone)) {
            announcedProgress.push(milestone);
            announce(`Progress ${milestone} persen.`);
        }
    }

    function applyPartnerProgress(data) {
        partnerPosition = Math.max(0, Math.min(currentText.length, Math.round(Number(data.pos) || 0)));
        partnerLive = {
            wpm: Math.max(0, Math.round(Number(data.wpm) || 0)),
            accuracy: Math.max(0, Math.min(100, Math.round(Number(data.accuracy) || 0))),
            correct: Math.max(0, Math.round(Number(data.correct) || 0)),
            wrong: Math.max(0, Math.round(Number(data.wrong) || 0))
        };

        if (!isGameRunning) return;
        renderTextDisplay(typingInput ? typingInput.value : '');
        updateGameUI(getOwnStats());
    }

    function broadcastProgress(stats) {
        if (partnerType !== 'remote') return;
        const now = Date.now();
        if (now - lastBroadcastAt < 100) return;
        lastBroadcastAt = now;

        const payload = {
            pos: stats.typedLength,
            wpm: stats.wpm,
            accuracy: stats.accuracy,
            correct: stats.correct,
            wrong: stats.wrong
        };

        if (currentFirebaseRoomRef) {
            try {
                const roleKey = gameRole === 'host' ? 'host' : 'guest';
                currentFirebaseRoomRef.child('progress/' + roleKey).set(payload);
            } catch (error) {
                // Ignore.
            }
        }

        if (roomChannel) {
            try {
                roomChannel.postMessage({
                    type: 'progress',
                    ...payload
                });
            } catch (error) {
                // Ignore closed channel.
            }
        }
    }

    function startBot() {
        if (botInterval) clearInterval(botInterval);
        let lastTick = Date.now();

        botInterval = window.setInterval(() => {
            if (!isGameRunning) return;

            const now = Date.now();
            const deltaSeconds = Math.max(0, (now - lastTick) / 1000);
            lastTick = now;

            const elapsed = Math.max(1, (now - startedAt) / 1000);
            const speedVariation = 0.65 + Math.random() * 0.7;
            const charsPerSecond = (botWpm * 5) / 60;

            botPosition = Math.min(
                currentText.length,
                botPosition + charsPerSecond * deltaSeconds * speedVariation
            );

            const wpm = Math.round((botPosition / 5) / (elapsed / 60));
            const correct = Math.floor(botPosition * (botAccuracy / 100));
            const wrong = Math.max(0, Math.round(botPosition) - correct);

            partnerLive = {
                wpm,
                accuracy: Math.round(botAccuracy),
                correct,
                wrong
            };

            if (currentMode === 'coop') {
                renderTextDisplay(typingInput ? typingInput.value : '');
                updateGameUI(getOwnStats());
            }
        }, 180);
    }

    /* ----------------------------------------------------------------------
       11. Typing input (No Backspace / Delete allowed - continue to the end!)
       ---------------------------------------------------------------------- */
    function showNoBackspaceNotice() {
        if (!noBackspaceHint) return;
        noBackspaceHint.classList.add('shake');
        clearTimeout(noBackspaceTimer);
        noBackspaceTimer = setTimeout(() => {
            if (noBackspaceHint) noBackspaceHint.classList.remove('shake');
        }, 450);
    }

    if (typingInput) {
        typingInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                return;
            }

            // Disallow Backspace & Delete
            if (event.key === 'Backspace' || event.key === 'Delete') {
                event.preventDefault();
                showNoBackspaceNotice();
                return;
            }

            // Disallow undo (Ctrl+Z), cut (Ctrl+X), select all (Ctrl+A)
            if ((event.ctrlKey || event.metaKey) && ['z', 'Z', 'x', 'X', 'a', 'A'].includes(event.key)) {
                event.preventDefault();
                return;
            }

            // Disallow moving cursor backwards with arrow keys / home / page up
            if (['ArrowLeft', 'ArrowUp', 'Home', 'PageUp'].includes(event.key)) {
                event.preventDefault();
                return;
            }
        });

        typingInput.addEventListener('beforeinput', (event) => {
            if (event.inputType && (
                event.inputType.startsWith('delete') ||
                event.inputType === 'historyUndo' ||
                event.inputType === 'historyRedo'
            )) {
                event.preventDefault();
                showNoBackspaceNotice();
                return;
            }
        });

        typingInput.addEventListener('paste', (event) => {
            event.preventDefault();
        });

        // Keep cursor strictly at the end on any mouse click, selection or touch
        ['click', 'select', 'mouseup', 'keyup', 'touchend'].forEach((evt) => {
            typingInput.addEventListener(evt, () => {
                if (!isGameRunning) return;
                const len = typingInput.value.length;
                if (typingInput.selectionStart !== len || typingInput.selectionEnd !== len) {
                    typingInput.setSelectionRange(len, len);
                }
            });
        });

        typingInput.addEventListener('input', () => {
            if (!isGameRunning) return;

            // Guard: never allow typed text to decrease in length
            if (typingInput.value.length < lastTypedValue.length) {
                typingInput.value = lastTypedValue;
                typingInput.setSelectionRange(lastTypedValue.length, lastTypedValue.length);
                showNoBackspaceNotice();
                return;
            }

            // Clamp to currentText max length
            if (typingInput.value.length > currentText.length) {
                typingInput.value = typingInput.value.slice(0, currentText.length);
            }

            lastTypedValue = typingInput.value;

            const stats = getOwnStats();
            renderTextDisplay(stats.typed);
            updateGameUI(stats);
            broadcastProgress(stats);

            // Finish when player reaches the end of the text (even with mistakes, as requested)
            if (stats.typedLength >= currentText.length) {
                finishGame();
            }
        });

        typingInput.addEventListener('blur', () => {
            if (isGameRunning && textDisplayWrapper) {
                textDisplayWrapper.classList.add('unfocused');
            }
        });

        typingInput.addEventListener('focus', () => {
            if (textDisplayWrapper) textDisplayWrapper.classList.remove('unfocused');
        });
    }

    if (textDisplayWrapper) {
        textDisplayWrapper.addEventListener('click', () => {
            if (typingInput && isGameRunning) {
                typingInput.focus({ preventScroll: true });
            }
        });
    }

    /* ----------------------------------------------------------------------
       12. Finish & results
       ---------------------------------------------------------------------- */
    function getPartnerStats(duration) {
        if (partnerType === 'bot') {
            const pos = Math.min(currentText.length, Math.round(botPosition));
            const accuracy = Math.round(botAccuracy);
            const correct = Math.min(pos, Math.round(pos * (accuracy / 100)));
            const wrong = Math.max(0, pos - correct);
            const wpm = Math.round((correct / 5) / (duration / 60));
            return { wpm, accuracy, correct, wrong, typedLength: pos, duration };
        }

        if (partnerFinal) return partnerFinal;

        const pos = Math.min(currentText.length, Math.round(partnerPosition));
        const accuracy = partnerLive.accuracy || (pos > 0 ? 100 : 0);
        const correct = partnerLive.correct || Math.round(pos * (accuracy / 100));
        const wrong = partnerLive.wrong || Math.max(0, pos - correct);
        const wpm = partnerLive.wpm || Math.round((correct / 5) / (duration / 60));

        return {
            wpm: Math.max(0, Math.round(wpm)),
            accuracy: Math.max(0, Math.min(100, Math.round(accuracy))),
            correct,
            wrong,
            typedLength: pos,
            duration
        };
    }

    function finishGame() {
        if (!isGameRunning) return;

        isGameRunning = false;
        stopGameTimers();
        if (typingInput) typingInput.disabled = true;

        ownFinal = getFinalStats();

        if (currentMode !== 'coop') {
            finalizeRound();
            return;
        }

        if (partnerType === 'remote') {
            if (currentFirebaseRoomRef) {
                try {
                    const roleKey = gameRole === 'host' ? 'host' : 'guest';
                    currentFirebaseRoomRef.child('finish/' + roleKey).set(ownFinal);
                } catch (error) {
                    // Ignore.
                }
            }
            if (roomChannel) {
                try {
                    roomChannel.postMessage({ type: 'finish', stats: ownFinal });
                } catch (error) {
                    // Ignore.
                }
            }
        }

        if (partnerType === 'remote' && !partnerFinal) {
            pendingFinalizeTimer = window.setTimeout(() => {
                pendingFinalizeTimer = null;
                finalizeRound();
            }, 600);
            return;
        }

        finalizeRound();
    }

    function finalizeRound() {
        if (roundFinalized) return;
        roundFinalized = true;

        if (pendingFinalizeTimer) {
            clearTimeout(pendingFinalizeTimer);
            pendingFinalizeTimer = null;
        }

        if (currentFirebaseRoomRef) {
            try {
                currentFirebaseRoomRef.update({ status: 'finished' });
            } catch (error) {
                // Ignore.
            }
        }

        const own = ownFinal || getFinalStats();
        const isVersus = currentMode === 'versus' || currentMode === 'coop';
        const partner = isVersus ? getPartnerStats(own.duration) : null;

        let entry;
        if (isVersus) {
            const ownScore = Math.round(own.wpm * (own.accuracy / 100) * 100);
            const pWpm = partner ? partner.wpm : 0;
            const pAcc = partner ? partner.accuracy : 100;
            const partnerScore = Math.round(pWpm * (pAcc / 100) * 100);

            let outcome = 'draw';
            if (ownScore > partnerScore) {
                outcome = 'win';
            } else if (ownScore < partnerScore) {
                outcome = 'lose';
            } else {
                if (own.accuracy > pAcc) outcome = 'win';
                else if (own.accuracy < pAcc) outcome = 'lose';
                else if (own.wpm > pWpm) outcome = 'win';
                else if (own.wpm < pWpm) outcome = 'lose';
            }

            entry = {
                id: `score_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
                playerName: currentPlayerName || 'Anonim',
                playerClass: currentPlayerClass || '-',
                partnerName: partnerName || (partnerType === 'bot' ? 'Bot Kestari' : 'Lawan'),
                partnerClass: partnerClass || (partnerType === 'bot' ? 'Bot AI' : '-'),
                mode: 'versus',
                outcome,
                wpm: own.wpm,
                accuracy: own.accuracy,
                score: ownScore,
                partnerWpm: pWpm,
                partnerAccuracy: pAcc,
                partnerScore,
                charsCorrect: own.correct,
                charsWrong: own.wrong,
                duration: own.duration,
                createdAt: new Date().toISOString()
            };
        } else {
            const score = Math.round(own.wpm * (own.accuracy / 100) * 100);

            entry = {
                id: `score_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
                playerName: currentPlayerName || 'Anonim',
                playerClass: currentPlayerClass || '-',
                partnerName: null,
                partnerClass: null,
                mode: 'solo',
                wpm: own.wpm,
                accuracy: own.accuracy,
                score,
                charsCorrect: own.correct,
                charsWrong: own.wrong,
                duration: own.duration,
                createdAt: new Date().toISOString()
            };
        }

        saveScore(entry);
        switchState('results');
        renderResultsView(entry, own, partner);
        if (resultsTitle) resultsTitle.focus({ preventScroll: true });

        if (isVersus) {
            toast(
                entry.outcome === 'win'
                    ? 'Selamat! Kamu memenangkan duel 1 vs 1!'
                    : entry.outcome === 'lose'
                        ? 'Duel selesai! Skor kamu tercatat di Leaderboard.'
                        : 'Hasil seri! Skor tercatat di Leaderboard.',
                'success'
            );
        } else {
            toast('Skor kamu berhasil dicatat di Leaderboard!', 'success');
        }

        renderLeaderboard(currentPeriodFilter, currentModeFilter);
    }

    function renderResultsView(entry, own, partner) {
        const isVersus = entry.mode === 'versus' || entry.mode === 'coop';

        if (versusOutcome) {
            versusOutcome.hidden = !isVersus;
            if (isVersus && versusOutcomeBadge) {
                if (entry.outcome === 'win') {
                    versusOutcomeBadge.textContent = '🏆 KAMU MENANG! (VICTORY)';
                    versusOutcomeBadge.className = 'versus-outcome-badge win';
                    if (versusOutcomeSubtitle) {
                        versusOutcomeSubtitle.textContent = `Hebat! Kamu unggul atas ${entry.partnerName} (${entry.partnerClass || '-'}) dalam duel ini!`;
                    }
                } else if (entry.outcome === 'lose') {
                    versusOutcomeBadge.textContent = '🥈 KAMU KALAH (DEFEAT)';
                    versusOutcomeBadge.className = 'versus-outcome-badge lose';
                    if (versusOutcomeSubtitle) {
                        versusOutcomeSubtitle.textContent = `${entry.partnerName} (${entry.partnerClass || '-'}) lebih unggul dalam duel kali ini. Tetap semangat!`;
                    }
                } else {
                    versusOutcomeBadge.textContent = '🤝 HASIL SERI (DRAW)';
                    versusOutcomeBadge.className = 'versus-outcome-badge draw';
                    if (versusOutcomeSubtitle) {
                        versusOutcomeSubtitle.textContent = `Skor dan akurasimu seimbang dengan ${entry.partnerName}!`;
                    }
                }
            }
        }

        if (versusComparison) {
            versusComparison.hidden = !isVersus;
            if (isVersus) {
                if (vsYouName) vsYouName.textContent = entry.playerName;
                if (vsYouClass) vsYouClass.textContent = entry.playerClass || '-';
                if (vsYouWpm) vsYouWpm.textContent = String(entry.wpm);
                if (vsYouAcc) vsYouAcc.textContent = String(entry.accuracy);
                if (vsYouScore) vsYouScore.textContent = formatScore(entry.score);

                if (vsPartnerName) vsPartnerName.textContent = entry.partnerName;
                if (vsPartnerClass) vsPartnerClass.textContent = entry.partnerClass || '-';
                if (vsPartnerWpm) vsPartnerWpm.textContent = String(entry.partnerWpm || 0);
                if (vsPartnerAcc) vsPartnerAcc.textContent = String(entry.partnerAccuracy || 0);
                if (vsPartnerScore) vsPartnerScore.textContent = formatScore(entry.partnerScore || 0);

                if (vsCardYou) vsCardYou.classList.toggle('winner', entry.outcome === 'win');
                if (vsCardPartner) vsCardPartner.classList.toggle('winner', entry.outcome === 'lose');
            }
        }

        if (resultsTitle) {
            resultsTitle.textContent = isVersus ? 'Hasil Duel 1 vs 1!' : 'Hasil Kamu!';
        }

        if (resultsPlayerName) {
            const roomSuffix = roomCode ? ` · Room ${roomCode}` : '';
            resultsPlayerName.textContent = isVersus
                ? `${entry.playerName} (${entry.playerClass}) vs ${entry.partnerName} (${entry.partnerClass})${roomSuffix}`
                : `Pemain: ${entry.playerName} (${entry.playerClass || '-'})`;
        }

        animateNumber(resultWpm, entry.wpm, 1100);
        animateNumber(resultAccuracy, entry.accuracy, 1100);

        if (resultCorrect) resultCorrect.textContent = String(entry.charsCorrect);
        if (resultWrong) resultWrong.textContent = String(entry.charsWrong);
        if (resultTime) resultTime.textContent = String(entry.duration);

        if (resultAccuracyCard) {
            resultAccuracyCard.classList.remove('is-medium', 'is-low');
            if (entry.accuracy < 70) {
                resultAccuracyCard.classList.add('is-low');
            } else if (entry.accuracy < 90) {
                resultAccuracyCard.classList.add('is-medium');
            }
        }

        if (resultMessage) {
            resultMessage.textContent = getMotivationMessage(entry.wpm, entry.accuracy);
        }

        if (resultsTeamDetail) {
            resultsTeamDetail.hidden = true;
            resultsTeamDetail.textContent = '';
        }

        if (resultsSaved) {
            resultsSaved.textContent = 'Skor tersimpan di leaderboard booth ini.';
        }

        if (btnPlayAgain) {
            btnPlayAgain.textContent = '🔄 Main Lagi';
        }
    }

    function getMotivationMessage(wpm, accuracy) {
        if (wpm >= 70 && accuracy >= 95) {
            return '🔥 Admin Mode: Activated! Kamu cocok di Kestari!';
        }
        if (wpm >= 50 && accuracy >= 90) {
            return '💪 Kamu punya potensi jadi bagian Kestari!';
        }
        if (wpm >= 50 && accuracy < 90) {
            return '⚡ Lumayan cepat, tapi cek lagi ketelitiannya!';
        }
        if (wpm < 50 && accuracy >= 90) {
            return '🎯 Teliti banget! Tinggal naikin kecepatannya.';
        }
        return '👍 Semangat! Latihan lagi dan coba pecahkan rekormu.';
    }

    function animateNumber(element, endValue, duration) {
        if (!element) return;

        const target = Math.max(0, Math.round(Number(endValue) || 0));
        const startTime = performance.now();

        function update(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const eased = 1 - (1 - progress) * (1 - progress);
            element.textContent = String(Math.floor(target * eased));

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = String(target);
            }
        }

        requestAnimationFrame(update);
    }

    /* ----------------------------------------------------------------------
       13. Result buttons
       ---------------------------------------------------------------------- */
    if (btnPlayAgain) {
        btnPlayAgain.addEventListener('click', () => {
            if (currentMode === 'solo') {
                startSoloRound();
                return;
            }

            if (partnerType === 'bot') {
                startCoopRound(getRandomText(selectedDuration), 'bot');
                return;
            }

            // In 1 vs 1 duel: return back to Lobby so Host can start next duel when ready
            if (partnerConnected) {
                resetRoundState();
                if (currentFirebaseRoomRef) {
                    try {
                        currentFirebaseRoomRef.update({
                            status: 'ready',
                            progress: null,
                            finish: null
                        });
                    } catch (error) {
                        // Ignore.
                    }
                }
                updateLobbyUI();
                switchState('lobby');
                if (gameRole === 'guest') {
                    toast('Kembali ke lobby. Menunggu Host memulai duel...', 'info');
                }
                return;
            }

            closeRoom(true);
            resetRoundState();
            switchState('modeSelect');
        });
    }

    if (btnToLeaderboard) {
        btnToLeaderboard.addEventListener('click', () => {
            currentModeFilter = (currentMode === 'versus' || currentMode === 'coop') ? 'versus' : 'solo';
            modeFilterBtns.forEach((button) => {
                const bMode = button.dataset.mode === 'coop' ? 'versus' : button.dataset.mode;
                const isActive = bMode === currentModeFilter;
                button.classList.toggle('active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });
            renderLeaderboard(currentPeriodFilter, currentModeFilter);

            const section = document.getElementById('leaderboard');
            if (section) {
                const navHeight = document.getElementById('navbar')?.offsetHeight || 64;
                const top = section.getBoundingClientRect().top + window.pageYOffset - navHeight - 4;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    }

    if (btnBackHome) {
        btnBackHome.addEventListener('click', () => {
            closeRoom(true);
            resetRoundState();
            switchState('modeSelect');
            const section = document.getElementById('game');
            if (section) {
                const navHeight = document.getElementById('navbar')?.offsetHeight || 64;
                const top = section.getBoundingClientRect().top + window.pageYOffset - navHeight - 4;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    }

    /* ----------------------------------------------------------------------
       14. Leaderboard storage
       ---------------------------------------------------------------------- */
    function normalizeScoreEntry(item) {
        if (!item || typeof item !== 'object') return null;

        const mode = item.mode === 'versus' || item.mode === 'coop' ? 'versus' : 'solo';
        return {
            id: item.id || `score_${Math.random().toString(36).slice(2, 10)}`,
            playerName: cleanName(item.playerName || item.player_name || 'Anonim') || 'Anonim',
            playerClass: cleanClass(item.playerClass || item.player_class || ''),
            partnerName: cleanName(item.partnerName || item.partner_name || '') || null,
            partnerClass: cleanClass(item.partnerClass || item.partner_class || ''),
            mode,
            outcome: item.outcome || (item.partnerName ? 'win' : null),
            wpm: Math.max(0, Math.round(Number(item.wpm) || 0)),
            accuracy: Math.max(0, Math.min(100, Math.round(Number(item.accuracy) || 0))),
            score: Math.max(0, Math.round(Number(item.score) || 0)),
            partnerWpm: Math.max(0, Math.round(Number(item.partnerWpm) || 0)),
            partnerAccuracy: Math.max(0, Math.min(100, Math.round(Number(item.partnerAccuracy) || 0))),
            partnerScore: Math.max(0, Math.round(Number(item.partnerScore) || 0)),
            charsCorrect: Math.max(0, Math.round(Number(item.charsCorrect ?? item.chars_correct) || 0)),
            charsWrong: Math.max(0, Math.round(Number(item.charsWrong ?? item.chars_wrong) || 0)),
            duration: Math.max(1, Math.round(Number(item.duration) || DEFAULT_DURATION)),
            createdAt: item.createdAt || item.created_at || new Date().toISOString()
        };
    }

    function readScores() {
        if (isCloudConnected) {
            return cloudScores.slice();
        }

        try {
            let raw = localStorage.getItem(STORAGE_KEY);
            let scores = raw ? JSON.parse(raw) : null;

            if (!scores) {
                const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
                scores = legacyRaw ? JSON.parse(legacyRaw) : [];
                if (Array.isArray(scores) && scores.length > 0) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
                }
            }

            if (!Array.isArray(scores)) return [];
            return scores.map(normalizeScoreEntry).filter(Boolean);
        } catch (error) {
            return [];
        }
    }

    function sortScores(a, b) {
        if (b.score !== a.score) return b.score - a.score;
        if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
        return new Date(b.createdAt) - new Date(a.createdAt);
    }

    function saveScore(entry) {
        const localList = readScores().filter((s) => s.id !== entry.id);
        localList.push(entry);
        localList.sort(sortScores);

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(localList.slice(0, 100)));
        } catch (error) {
            // Ignore storage warning.
        }

        if (rtdb) {
            try {
                rtdb.ref('leaderboard').push(entry);
            } catch (err) {
                console.warn('Firebase push score warning:', err);
            }
        }
    }

    /* ----------------------------------------------------------------------
       15. Leaderboard rendering
       ---------------------------------------------------------------------- */
    function renderLeaderboard(period = currentPeriodFilter, mode = currentModeFilter, duration = currentDurationFilter) {
        if (!leaderboardBody) return;

        const targetMode = mode === 'coop' ? 'versus' : mode;
        let scores = readScores().filter((entry) => {
            const entryMode = entry.mode === 'coop' ? 'versus' : entry.mode;
            return entryMode === targetMode;
        });

        if (period === 'today') {
            const today = localDateKey(new Date());
            scores = scores.filter((entry) => localDateKey(entry.createdAt) === today);
        }

        if (duration === '30') {
            scores = scores.filter((entry) => (entry.duration || 30) <= 35);
        } else if (duration === '60') {
            scores = scores.filter((entry) => (entry.duration || 30) > 35);
        }

        scores.sort(sortScores);
        scores = scores.slice(0, MAX_SCORES);

        if (scores.length === 0) {
            if (leaderboardBody) leaderboardBody.replaceChildren();
            if (leaderboardTable) leaderboardTable.hidden = true;
            if (leaderboardEmpty) leaderboardEmpty.hidden = false;
            return;
        }

        if (leaderboardTable) leaderboardTable.hidden = false;
        if (leaderboardEmpty) leaderboardEmpty.hidden = true;

        const fragment = document.createDocumentFragment();

        scores.forEach((entry, index) => {
            const rank = index + 1;
            const row = document.createElement('div');
            row.className = 'leaderboard-row';
            if (rank <= 3) row.classList.add('top-three');
            if (rank === 1) row.classList.add('rank-1');

            const rankElement = document.createElement('span');
            rankElement.className = 'lb-rank';
            if (rank === 1) rankElement.textContent = '🥇';
            else if (rank === 2) rankElement.textContent = '🥈';
            else if (rank === 3) rankElement.textContent = '🥉';
            else rankElement.textContent = String(rank);

            const nameElement = document.createElement('div');
            nameElement.className = 'lb-name';

            const stack = document.createElement('div');
            stack.className = 'lb-player-stack';

            const playerRow = document.createElement('div');
            playerRow.className = 'lb-player-row';

            if (targetMode === 'versus') {
                const crown = document.createElement('span');
                crown.className = 'lb-crown';
                crown.textContent = entry.outcome === 'win' ? '👑' : entry.outcome === 'lose' ? '⚔️' : '🤝';
                playerRow.appendChild(crown);
            }

            const nameStrong = document.createElement('strong');
            nameStrong.className = 'lb-name-primary';
            nameStrong.textContent = entry.playerName;
            playerRow.appendChild(nameStrong);

            if (entry.playerClass && entry.playerClass !== '-') {
                const classPill = document.createElement('span');
                classPill.className = 'lb-class-pill';
                classPill.textContent = entry.playerClass;
                playerRow.appendChild(classPill);
            }

            const durTag = document.createElement('span');
            durTag.className = 'lb-duration-tag';
            durTag.textContent = (entry.duration || 30) > 35 ? '1m' : '30s';
            playerRow.appendChild(durTag);

            if (targetMode === 'versus') {
                const vsBadge = document.createElement('span');
                vsBadge.className = `lb-mode lb-vs-badge ${entry.outcome || 'duel'}`;
                vsBadge.textContent = entry.outcome === 'win' ? 'MENANG' : entry.outcome === 'lose' ? 'KALAH' : '1 VS 1';
                playerRow.appendChild(vsBadge);
            }

            stack.appendChild(playerRow);

            if (targetMode === 'versus' && entry.partnerName) {
                const matchInfo = document.createElement('div');
                matchInfo.className = 'lb-vs-match-info';
                const pClass = entry.partnerClass && entry.partnerClass !== '-' ? ` (${entry.partnerClass})` : '';
                matchInfo.textContent = `vs ${entry.partnerName}${pClass}`;
                stack.appendChild(matchInfo);
            }

            // Tampilkan jam selesai (WIB) di bawah info pemain
            const timeStr = formatScoreTime(entry.createdAt);
            if (timeStr) {
                const subRow = document.createElement('div');
                subRow.className = 'lb-sub-row';
                const timeSpan = document.createElement('span');
                timeSpan.className = 'lb-time';
                timeSpan.textContent = timeStr;
                subRow.appendChild(timeSpan);
                stack.appendChild(subRow);
            }

            nameElement.appendChild(stack);

            const wpmElement = document.createElement('span');
            wpmElement.className = 'lb-wpm';
            wpmElement.textContent = String(entry.wpm);

            const accuracyElement = document.createElement('span');
            accuracyElement.className = 'lb-accuracy';
            accuracyElement.textContent = `${entry.accuracy}%`;

            const scoreElement = document.createElement('span');
            scoreElement.className = 'lb-score';
            scoreElement.textContent = formatScore(entry.score);

            row.append(rankElement, nameElement, wpmElement, accuracyElement, scoreElement);
            fragment.appendChild(row);
        });

        leaderboardBody.replaceChildren(fragment);
    }

    /* ----------------------------------------------------------------------
       16. Leaderboard filters
       ---------------------------------------------------------------------- */
    periodFilterBtns.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.classList.contains('active')));
        button.addEventListener('click', () => {
            periodFilterBtns.forEach((item) => {
                item.classList.remove('active');
                item.setAttribute('aria-pressed', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
            currentPeriodFilter = button.dataset.period || 'all';
            renderLeaderboard(currentPeriodFilter, currentModeFilter, currentDurationFilter);
        });
    });

    modeFilterBtns.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.classList.contains('active')));
        button.addEventListener('click', () => {
            if (button.disabled) return;
            modeFilterBtns.forEach((item) => {
                item.classList.remove('active');
                item.setAttribute('aria-pressed', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
            currentModeFilter = button.dataset.mode || 'solo';
            renderLeaderboard(currentPeriodFilter, currentModeFilter, currentDurationFilter);
        });
    });

    durationFilterBtns.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.classList.contains('active')));
        button.addEventListener('click', () => {
            durationFilterBtns.forEach((item) => {
                item.classList.remove('active');
                item.setAttribute('aria-pressed', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
            currentDurationFilter = button.dataset.duration || 'all';
            renderLeaderboard(currentPeriodFilter, currentModeFilter, currentDurationFilter);
        });
    });

    /* ----------------------------------------------------------------------
       17. Admin / Panitia reset helper & Init
       ---------------------------------------------------------------------- */
    function clearLeaderboardScores() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(LEGACY_STORAGE_KEY);
        } catch (e) {
            // ignore
        }
        cloudScores = [];

        if (rtdb) {
            try {
                rtdb.ref('leaderboard').remove();
            } catch (err) {
                console.warn('Firebase clear leaderboard warning:', err);
            }
        }

        renderLeaderboard(currentPeriodFilter, currentModeFilter);
        toast('Leaderboard berhasil dibersihkan! (0 skor)', 'success');
    }

    // Expose to window for manual console execution: clearKestariLeaderboard()
    window.clearKestariLeaderboard = clearLeaderboardScores;

    // Panitia reset shortcut: click "🏆 Leaderboard" title 5 times
    const lbTitle = document.querySelector('#leaderboard .section-title');
    if (lbTitle) {
        let clickCount = 0;
        let clickTimer = null;
        lbTitle.addEventListener('click', () => {
            clickCount += 1;
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 2000);

            if (clickCount >= 5) {
                clickCount = 0;
                if (window.confirm('⚠️ Reset Leaderboard?\n\nApakah panitia yakin ingin menghapus semua skor leaderboard di perangkat dan cloud?')) {
                    clearLeaderboardScores();
                }
            }
        });
    }

    // Realtime Cloud Leaderboard Listener (Sync across physical devices!)
    if (rtdb) {
        try {
            rtdb.ref('leaderboard').on('value', (snapshot) => {
                isCloudConnected = true;
                const data = snapshot.val();
                if (data && typeof data === 'object') {
                    cloudScores = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key]
                    })).map(normalizeScoreEntry).filter(Boolean);
                    cloudScores.sort(sortScores);
                    try {
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudScores.slice(0, 100)));
                    } catch (e) {}
                } else {
                    cloudScores = [];
                    // When database is reset/empty in cloud, clear localStorage on this device too!
                    try {
                        localStorage.removeItem(STORAGE_KEY);
                        localStorage.removeItem(LEGACY_STORAGE_KEY);
                    } catch (e) {}
                }
                renderLeaderboard(currentPeriodFilter, currentModeFilter);
            }, (err) => {
                console.warn('Firebase leaderboard sync listener:', err.message);
            });
        } catch (err) {
            console.warn('Firebase listener error:', err);
        }
    }

    renderLeaderboard('all', 'solo', 'all');

    document.addEventListener('DOMContentLoaded', () => {
        renderLeaderboard(currentPeriodFilter, currentModeFilter);
    });

    window.addEventListener('beforeunload', () => {
        closeRoom(true);
    });
})();
