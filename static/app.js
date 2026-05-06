// ─── State ──────────────────────────────────────────────────────────
let accounts = [];
let activeAccountId = null;
let authToken = localStorage.getItem('dashboard_token') || '';
let currentUser = { username: '', role: '' };

// ─── API Helpers ────────────────────────────────────────────────────
async function api(method, path, body = null) {
    const opts = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken ? `Bearer ${authToken}` : '',
        },
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(path, opts);
    if (res.status === 401) {
        authToken = '';
        localStorage.removeItem('dashboard_token');
        showLoginScreen();
        throw new Error('未登录或会话已过期');
    }
    if (res.status === 403) {
        throw new Error('权限不足');
    }
    if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(err.detail || err.message || 'Request failed');
    }
    return res.json();
}

// ─── Toast ──────────────────────────────────────────────────────────
function toast(msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 3000);
}

// ─── Modal Helpers ──────────────────────────────────────────────────
function showModal(id) { document.getElementById(id).classList.add('show'); }
function hideModal(id) { document.getElementById(id).classList.remove('show'); }

function showAddAccountModal() {
    showModal('addAccountModal');
    document.getElementById('sessionCookieInput').focus();
}

// ─── Auth ───────────────────────────────────────────────────────────
function showLoginScreen() {
    document.getElementById('loadingScreen').style.display = 'none';
    document.getElementById('appContainer').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
    setTimeout(() => document.getElementById('loginUsername')?.focus(), 100);
}

function showApp(options = {}) {
    document.getElementById('loadingScreen').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appContainer').style.display = 'flex';
    if (options.updateUserInfo === false) {
        renderSidebarUserLoading();
    } else {
        updateSidebarUserInfo();
    }
}

function renderAccountLoading(message = '账户加载中...') {
    document.getElementById('mainContent').innerHTML = `
        <div class="account-loading">
            <div class="spinner"></div>
            <span>${message}</span>
        </div>`;
}

function renderSidebarUserLoading() {
    document.getElementById('sidebarUserInfo').innerHTML = `
        <div class="sidebar-user-loading">
            <div class="spinner"></div>
            <span>验证中...</span>
        </div>`;
    document.getElementById('userMgmtBtn').style.display = 'none';
}

function updateSidebarUserInfo() {
    const info = document.getElementById('sidebarUserInfo');
    if (!currentUser.username) {
        renderSidebarUserLoading();
        return;
    }
    const roleBadge = currentUser.role === 'admin'
        ? '<span style="font-size:10px;background:var(--accent);color:white;padding:2px 6px;border-radius:4px;margin-left:4px">ADMIN</span>'
        : '<span style="font-size:10px;background:var(--bg-card);color:var(--text-secondary);padding:2px 6px;border-radius:4px;margin-left:4px">USER</span>';
    info.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 4px">
            <span style="font-size:12px;color:var(--text-secondary)">👤 ${currentUser.username}${roleBadge}</span>
            <button class="btn btn-sm" onclick="logout()" style="padding:4px 8px;font-size:11px;color:var(--text-muted)">退出</button>
        </div>`;
    // Show/hide user management button
    document.getElementById('userMgmtBtn').style.display = currentUser.role === 'admin' ? 'flex' : 'none';
}

async function doLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const btn = document.getElementById('loginBtn');
    const error = document.getElementById('loginError');
    error.textContent = '';

    if (!username || !password) {
        error.textContent = '请输入用户名和密码';
        return;
    }

    btn.textContent = '登录中...';
    btn.disabled = true;

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (!res.ok) {
            error.textContent = data.detail || '登录失败';
            return;
        }
        authToken = data.token;
        currentUser = { username: data.username, role: data.role };
        localStorage.setItem('dashboard_token', authToken);
        showApp();
        renderAccountLoading();
        loadAccounts();
        toast(`欢迎, ${data.username}`, 'success');
    } catch (e) {
        error.textContent = '网络错误';
    } finally {
        btn.textContent = '登录';
        btn.disabled = false;
    }
}

function logout() {
    authToken = '';
    localStorage.removeItem('dashboard_token');
    currentUser = { username: '', role: '' };
    activeAccountId = null;
    depositLoaded = {};
    txLoaded = {};
    showLoginScreen();
}

async function checkAuth() {
    if (!authToken) { showLoginScreen(); return; }
    showApp({ updateUserInfo: false });
    renderAccountLoading();
    try {
        const data = await api('GET', '/api/auth/check');
        currentUser = { username: data.username, role: data.role };
        updateSidebarUserInfo();
        loadAccounts();
    } catch {
        showLoginScreen();
    }
}

// ─── User Management (Admin) ────────────────────────────────────────
async function showUserManagement() {
    showModal('userMgmtModal');
    await refreshUserList();
}

async function refreshUserList() {
    const container = document.getElementById('userList');
    try {
        const users = await api('GET', '/api/users');
        container.innerHTML = users.map(u => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:1px solid var(--border);border-radius:var(--radius);margin-bottom:6px;background:var(--bg-card)">
                <div>
                    <span style="font-weight:600;font-size:13px">${u.username}</span>
                    <span style="font-size:10px;margin-left:8px;padding:2px 6px;border-radius:4px;background:${u.role === 'admin' ? 'var(--accent)' : 'var(--bg-glass)'};color:${u.role === 'admin' ? 'white' : 'var(--text-secondary)'}">${u.role.toUpperCase()}</span>
                </div>
                <div style="display:flex;gap:6px">
                    <button class="btn btn-sm" onclick="promptResetPassword('${u.username}')" title="重置密码">🔑</button>
                    ${u.username !== 'admin' ? `<button class="btn btn-danger btn-sm" onclick="deleteUser('${u.username}')" title="删除">✕</button>` : ''}
                </div>
            </div>
        `).join('');
    } catch (e) {
        container.innerHTML = `<div style="color:var(--danger);font-size:13px">${e.message}</div>`;
    }
}

async function createUser() {
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newUserPassword').value;
    const role = document.getElementById('newUserRole').value;

    if (!username || !password) return toast('请填写用户名和密码', 'error');

    try {
        await api('POST', '/api/users', { username, password, role });
        toast(`用户 ${username} 已创建`, 'success');
        document.getElementById('newUsername').value = '';
        document.getElementById('newUserPassword').value = '';
        await refreshUserList();
    } catch (e) {
        toast(e.message, 'error');
    }
}

async function deleteUser(username) {
    if (!confirm(`确定要删除用户 ${username} 吗？`)) return;
    try {
        await api('DELETE', `/api/users/${username}`);
        toast(`用户 ${username} 已删除`, 'success');
        await refreshUserList();
    } catch (e) {
        toast(e.message, 'error');
    }
}

async function promptResetPassword(username) {
    const newPwd = prompt(`重置 ${username} 的密码:`);
    if (!newPwd) return;
    try {
        await api('PUT', `/api/users/${username}/password`, { password: newPwd });
        toast(`${username} 密码已重置`, 'success');
    } catch (e) {
        toast(e.message, 'error');
    }
}

// ─── Account Management ─────────────────────────────────────────────
async function addAccount() {
    const cookieInput = document.getElementById('sessionCookieInput').value.trim();
    const label = document.getElementById('accountLabel').value.trim();
    const proxy = document.getElementById('accountProxy').value.trim();
    if (!cookieInput) return toast('请输入 session cookie', 'error');

    if (proxy && !/^(socks5h?|https?):\/\/.+/.test(proxy)) {
        return toast('代理格式不正确', 'error');
    }

    const btn = document.getElementById('addAccountBtn');
    btn.textContent = '验证中...';
    btn.disabled = true;

    try {
        await api('POST', '/api/accounts', { session_cookie: cookieInput, label, proxy });
        toast('账户添加成功', 'success');
        hideModal('addAccountModal');
        document.getElementById('sessionCookieInput').value = '';
        document.getElementById('accountLabel').value = '';
        document.getElementById('accountProxy').value = '';
        await loadAccounts();
    } catch (e) {
        toast(e.message, 'error');
    } finally {
        btn.textContent = '添加';
        btn.disabled = false;
    }
}

async function loadAccounts() {
    try {
        accounts = await api('GET', '/api/accounts');
        if (accounts.length > 0 && !activeAccountId) {
            activeAccountId = accounts[0].id;
            renderAccountList();
            checkAllSessions();
            selectAccount(accounts[0].id, { renderList: false });
        } else if (accounts.length === 0) {
            activeAccountId = null;
            renderAccountList();
            document.getElementById('mainContent').innerHTML = `
                <div class="empty-state">
                    <div class="icon">💳</div>
                    <h3>开始使用</h3>
                    <p>添加 ether.fi Cash 账户以管理您的虚拟信用卡。</p>
                    <button class="btn btn-primary" onclick="showAddAccountModal()">添加账户</button>
                </div>`;
        } else {
            renderAccountList();
            checkAllSessions();
        }
    } catch (e) { /* auth errors handled in api() */ }
}

function renderAccountList() {
    document.getElementById('accountList').innerHTML = accounts.map(a => {
        const hasCustomLabel = a.label && a.label !== a.email && a.label !== a.name;
        const displayName = a.label || a.name || a.email;
        // Preserve existing session status text if available
        const existingEl = document.getElementById(`session-${a.id}`);
        const sessionHtml = existingEl ? existingEl.innerHTML : '⏳ 检查中...';
        const proxyIcon = a.proxy ? ' 🌐' : '';
        return `
        <div class="account-item ${a.id === activeAccountId ? 'active' : ''}"
             onclick="selectAccount('${a.id}')">
            <div class="account-name-row">
                <span class="account-name" id="acctName-${a.id}">${displayName}${proxyIcon}</span>
                <button class="btn-rename" onclick="event.stopPropagation(); showEditAccountModal('${a.id}')" title="编辑账户">✏️</button>
            </div>
            ${hasCustomLabel ? `<div class="account-email">${a.email}</div>` : ''}
            <div class="account-session" id="session-${a.id}">${sessionHtml}</div>
        </div>`;
    }).join('');
}

function checkAllSessions() {
    accounts.forEach(a => loadSessionStatus(a.id));
}

function showEditAccountModal(accountId) {
    const acct = accounts.find(a => a.id === accountId);
    if (!acct) return;

    let modal = document.getElementById('editAccountModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'editAccountModal';
        modal.className = 'modal-overlay';
        modal.addEventListener('click', e => { if (e.target === modal) hideModal('editAccountModal'); });
        document.body.appendChild(modal);
    }

    const cookieStr = acct.cookie_name && acct.cookie_value
        ? `${acct.cookie_name}=${acct.cookie_value}` : '';

    modal.innerHTML = `
        <div class="modal" style="max-width:480px">
            <h2>✏️ 编辑账户</h2>
            <div class="form-group">
                <label>备注</label>
                <input type="text" id="editLabel" value="${acct.label || ''}" placeholder="e.g. 主账户">
            </div>
            <div class="form-group">
                <label>Session Cookie</label>
                <textarea id="editCookie" placeholder="session_{userId}={sessionValue}" rows="2">${cookieStr}</textarea>
            </div>
            <div class="form-group">
                <label>代理 <span style="color:var(--text-muted);font-weight:400">(可选，支持 socks5/socks5h/http)</span></label>
                <input type="text" id="editProxy" value="${acct.proxy || ''}" placeholder="e.g. socks5://127.0.0.1:1080">
                <div style="font-size:11px;color:var(--text-muted);margin-top:4px">
                    格式: socks5://host:port · socks5h://user:pass@host:port · http://host:port
                </div>
            </div>
            <div class="form-group" style="margin-bottom:0">
                <label style="color:var(--text-muted)">邮箱</label>
                <div style="font-size:13px;padding:8px 0">${acct.email || '—'}</div>
            </div>
            <div class="form-actions">
                <button class="btn" onclick="hideModal('editAccountModal')">取消</button>
                <button class="btn btn-primary" id="saveEditBtn" onclick="saveEditAccount('${accountId}')">保存</button>
            </div>
        </div>`;
    showModal('editAccountModal');
    document.getElementById('editLabel').focus();
}

async function saveEditAccount(accountId) {
    const btn = document.getElementById('saveEditBtn');
    btn.textContent = '保存中...'; btn.disabled = true;

    const label = document.getElementById('editLabel').value.trim();
    const cookie = document.getElementById('editCookie').value.trim();
    const proxy = document.getElementById('editProxy').value.trim();

    // Validate proxy format if provided
    if (proxy && !/^(socks5h?|https?):\/\/.+/.test(proxy)) {
        toast('代理格式不正确，应为 socks5://host:port 等', 'error');
        btn.textContent = '保存'; btn.disabled = false;
        return;
    }

    try {
        await api('PATCH', `/api/accounts/${accountId}`, { label, cookie, proxy });
        toast('账户已更新', 'success');
        hideModal('editAccountModal');
        // Reload to pick up any changes (especially cookie/id changes)
        await loadAccounts();
    } catch (e) {
        toast(e.message, 'error');
        btn.textContent = '保存'; btn.disabled = false;
    }
}

let _sessionTimers = {};

async function loadSessionStatus(accountId) {
    try {
        const data = await api('GET', `/api/accounts/${accountId}/session-status`);
        updateSessionDisplay(accountId, data);
    } catch (e) {
        const el = document.getElementById(`session-${accountId}`);
        if (el) el.innerHTML = '<span style="color:var(--danger)">⚠️ 检查失败</span>';
    }
}

function updateSessionDisplay(accountId, data) {
    const el = document.getElementById(`session-${accountId}`);
    if (!el) return;

    if (!data.alive) {
        el.innerHTML = '<span style="color:var(--danger)">🔴 会话已失效</span>';
        return;
    }

    if (!data.cookie_expires) {
        el.innerHTML = '<span style="color:var(--success)">🟢 会话有效</span>';
        return;
    }

    // Calculate remaining time
    const expiresAt = data.cookie_expires * 1000;
    const renderCountdown = () => {
        const now = Date.now();
        const remaining = expiresAt - now;
        if (remaining <= 0) {
            el.innerHTML = '<span style="color:var(--danger)">🔴 会话已过期</span>';
            return;
        }
        const days = Math.floor(remaining / 86400000);
        const hours = Math.floor((remaining % 86400000) / 3600000);
        const mins = Math.floor((remaining % 3600000) / 60000);
        let text, color;
        if (days > 7) {
            text = `${days}天${hours}小时`;
            color = 'var(--success)';
        } else if (days >= 1) {
            text = `${days}天${hours}小时`;
            color = '#f59e0b';
        } else {
            text = `${hours}时${mins}分`;
            color = 'var(--danger)';
        }
        el.innerHTML = `<span style="color:${color}">⏱ 剩余 ${text}</span>`;
    };
    renderCountdown();
    // Clear previous timer
    if (_sessionTimers[accountId]) clearInterval(_sessionTimers[accountId]);
    _sessionTimers[accountId] = setInterval(renderCountdown, 60000);
}

async function selectAccount(accountId, options = {}) {
    activeAccountId = accountId;
    depositLoaded = {};
    withdrawLoaded = {};
    txLoaded = {};
    if (options.renderList !== false) renderAccountList();
    renderAccountLoading();
    const main = document.getElementById('mainContent');

    try {
        const [summary, cards, slots] = await Promise.all([
            api('GET', `/api/accounts/${accountId}/summary`),
            api('GET', `/api/accounts/${accountId}/cards`),
            api('GET', `/api/accounts/${accountId}/card-slots`),
        ]);
        // Cache cards for tx detail lookup
        cards.forEach(c => { _cardsCache[c.id] = c; });
        renderDashboard(accountId, summary, cards, slots);
        _updateSlotCountdowns();
    } catch (e) {
        main.innerHTML = `<div class="empty-state"><div class="icon">⚠️</div><h3>加载失败</h3><p>${e.message}</p>
            <button class="btn btn-danger" onclick="deleteAccount('${accountId}')">删除此账户</button></div>`;
    }
}

async function deleteAccount(accountId) {
    if (!confirm('确定要删除此账户吗？')) return;
    try {
        await api('DELETE', `/api/accounts/${accountId}`);
        toast('账户已删除', 'success');
        if (activeAccountId === accountId) activeAccountId = null;
        await loadAccounts();
    } catch (e) { toast(e.message, 'error'); }
}

// ─── Dashboard Render ───────────────────────────────────────────────
function renderDashboard(accountId, summary, cards, slots = null) {
    document.getElementById('mainContent').innerHTML = `
        <div class="section">
            <div class="section-title" style="justify-content:space-between">
                <span>📊 ${summary.name || summary.email}</span>
                <button class="btn btn-danger btn-sm" onclick="deleteAccount('${accountId}')">删除账户</button>
            </div>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">💰 账户余额</div>
                    <div class="stat-value">$${fmt(summary.total_balance || 0)}</div>
                    <div class="stat-sub">${(summary.balances || []).map(b => `<div class="balance-token"><img src="${b.icon}" width="14" height="14" style="vertical-align:-2px;border-radius:50%;margin-right:2px" onerror="this.style.display='none'">${b.symbol} ${b.amount} ($${fmt(b.usd_value)})</div>`).join('') || '无余额'}</div>
                </div>
                <div class="stat-card vault-limit-card">
                    <div class="stat-label-row">
                        <span class="stat-label">📊 消费限额</span>
                        <button class="btn btn-sm btn-edit-limit" onclick="showVaultLimitModal('${accountId}', ${summary.daily_limit}, ${summary.monthly_limit})" title="修改账户限额">✏️</button>
                    </div>
                    <div class="vault-limits-compact">
                        <div class="vault-limit-item">
                            <div class="vault-limit-head">
                                <span class="vault-limit-type">日</span>
                                <span class="vault-limit-nums">$${fmt(summary.daily_used)}/$${fmt(summary.daily_limit)}</span>
                            </div>
                            <div class="vault-limit-bar"><div class="vault-limit-fill" style="width:${Math.min(100, summary.daily_limit > 0 ? (summary.daily_used / summary.daily_limit * 100) : 0)}%"></div></div>
                        </div>
                        <div class="vault-limit-item">
                            <div class="vault-limit-head">
                                <span class="vault-limit-type">月</span>
                                <span class="vault-limit-nums">$${fmt(summary.monthly_used)}/$${fmt(summary.monthly_limit)}</span>
                            </div>
                            <div class="vault-limit-bar"><div class="vault-limit-fill vault-limit-fill-monthly" style="width:${Math.min(100, summary.monthly_limit > 0 ? (summary.monthly_used / summary.monthly_limit * 100) : 0)}%"></div></div>
                        </div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">💳 卡片</div>
                    <div class="stat-value" id="cardCount">${cards.length}</div>
                    <div class="stat-sub" id="cardStatsSub">${cards.filter(c=>c.status==='ACTIVE').length} 活跃 · ${cards.filter(c=>c.status==='FROZEN').length} 冻结</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">📬 账单地址</div>
                    <div class="billing-addr">
                        <div>${summary.billing_line1 || '未设置'}</div>
                        <div>${summary.billing_line2 || ''}</div>
                        <div>${summary.billing_line3 || ''}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tabs">
            <button class="tab active" onclick="switchTab('cards',this)">💳 卡片管理</button>
            <button class="tab" onclick="switchTab('deposit',this)"><span class="tab-icon tab-icon-deposit">↗</span>充值入金</button>
            <button class="tab" onclick="switchTab('withdraw',this)"><span class="tab-icon">↗</span>提现</button>
            <button class="tab" onclick="switchTab('transactions',this)">📜 消费记录</button>
        </div>
        <div id="tab-cards" class="tab-content active">
            <div class="cards-grid" id="cardsGrid">
                ${cards.map(c => renderCardHTML(accountId, c)).join('')}
                ${generateSlotsHTML(accountId, slots)}
            </div>
        </div>
        <div id="tab-deposit" class="tab-content"><div class="loading"><div class="spinner"></div>加载中...</div></div>
        <div id="tab-withdraw" class="tab-content"><div class="loading"><div class="spinner"></div>加载中...</div></div>
        <div id="tab-transactions" class="tab-content"><div class="loading"><div class="spinner"></div>加载中...</div></div>
    `;
}

function switchTab(tabId, el) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    document.getElementById(`tab-${tabId}`).classList.add('active');
    if (tabId === 'deposit') loadDeposit(activeAccountId);
    if (tabId === 'withdraw') loadWithdraw(activeAccountId);
    if (tabId === 'transactions') loadTransactions(activeAccountId);
}

function renderCardHTML(accountId, card) {
    const frozen = card.status === 'FROZEN';
    const limit = card.dailySpendingLimit;
    const limitDisplay = limit !== null && limit !== undefined
        ? `$${fmt(limit)}`
        : '无限制';
    const pan = card.pan ? card.pan.replace(/(.{4})/g,'$1 ').trim() : `•••• •••• •••• ${card.last4}`;
    const exp = card.exp || '••/••';
    const cvc = card.cvc ? `CVC ${card.cvc}` : 'CVC •••';
    const expParts = (card.exp || '').split('/');
    const expMonth = expParts[0] || '••';
    const expYear = expParts[1] || '••';
    const rawPan = (card.pan || card.last4 || '').replace(/\s/g, '');
    return `
        <div class="credit-card ${frozen?'frozen':''}" id="card-${card.id}">
            <div class="card-top">
                <span class="card-type">${card.cardType}</span>
                <span class="card-top-right">
                    <button class="btn-copy-card" onclick="event.stopPropagation(); copyText('${rawPan} ${expMonth} ${expYear} ${card.cvc || ''}')" title="复制卡信息">📋</button>
                    <span class="card-status ${frozen?'frozen':'active'}">${card.status}</span>
                </span>
            </div>
            <div class="card-number" onclick="copyText('${rawPan}')" title="点击复制卡号">
                ${pan}
            </div>
            <div class="card-number card-detail-row">
                <span class="clickable" onclick="copyText('${expMonth} ${expYear}')" title="点击复制过期时间">EXP  ${exp}</span>
                <span class="clickable" onclick="copyText('${card.cvc || ''}')" title="点击复制CVC">CVC  ${card.cvc || '•••'}</span>
            </div>
            <div class="card-holder-row">
                <span class="card-holder">${card.cardName}</span>
                <span class="card-limit-pill clickable" onclick="showEditLimitModal('${accountId}','${card.id}', ${limit !== null && limit !== undefined ? limit : 'null'})" title="点击修改日限额">
                    每日限额 <strong id="limitVal-${card.id}">${limitDisplay}</strong>
                </span>
            </div>
            <div class="card-actions">
                <button class="btn btn-sm ${frozen?'btn-success':'btn-warning'}" onclick="toggleFreeze('${accountId}','${card.id}',${frozen})" id="freezeBtn-${card.id}">
                    ${frozen?'🔥 解冻':'❄️ 冻结'}
                </button>
                <button class="btn btn-sm" onclick="showCardTransactions('${accountId}','${card.id}')">📜 消费记录</button>
                <button class="btn btn-sm btn-danger" onclick="deleteCardConfirm('${accountId}','${card.id}','${card.last4}')" title="删除卡片">🗑</button>
            </div>
        </div>`;
}


async function toggleFreeze(accountId, cardId, frozen) {
    const btn = document.getElementById(`freezeBtn-${cardId}`);
    btn.textContent = frozen ? '解冻中...' : '冻结中...'; btn.disabled = true;
    try {
        await api('POST', `/api/accounts/${accountId}/cards/${cardId}/${frozen?'unfreeze':'freeze'}`);
        toast(frozen ? '卡已解冻' : '卡已冻结', 'success');
        await reloadCards(accountId);
    } catch (e) {
        toast(e.message, 'error');
        btn.textContent = frozen ? '🔥 解冻' : '❄️ 冻结'; btn.disabled = false;
    }
}

async function reloadCards(accountId) {
    try {
        const [cards, slots] = await Promise.all([
            api('GET', `/api/accounts/${accountId}/cards`),
            api('GET', `/api/accounts/${accountId}/card-slots`),
        ]);
        const grid = document.getElementById('cardsGrid');
        if (grid) {
            grid.innerHTML = cards.map(c => renderCardHTML(accountId, c)).join('') + generateSlotsHTML(accountId, slots);
            _updateSlotCountdowns();
        }
        // Update card stats
        const countEl = document.getElementById('cardCount');
        const subEl = document.getElementById('cardStatsSub');
        if (countEl) countEl.textContent = cards.length;
        if (subEl) subEl.textContent = `${cards.filter(c=>c.status==='ACTIVE').length} 活跃 · ${cards.filter(c=>c.status==='FROZEN').length} 冻结`;
    } catch (e) { console.error('reloadCards failed:', e); }
}
function generateSlotsHTML(accountId, slots) {
    if (!slots) return '';
    const max = slots.maxVirtual;
    const active = slots.activeCards;
    const emptyCount = max - active;
    const coolDown = slots.virtualCoolDown;
    const nextDate = slots.nextCreateDate;

    let html = '';
    for (let i = 0; i < emptyCount; i++) {
        const isCoolDown = i < coolDown;
        if (isCoolDown && nextDate) {
            const target = new Date(nextDate).getTime();
            html += `
                <div class="card-slot-empty credit-card">
                    <div class="slot-empty-inner slot-cooldown">
                        <div class="slot-icon">⏳</div>
                        <div class="slot-label">冷却中</div>
                        <div class="slot-countdown" data-target="${target}"></div>
                    </div>
                </div>`;
        } else {
            html += `
                <div class="card-slot-empty credit-card">
                    <div class="slot-empty-inner slot-available" onclick="createCard('${accountId}')">
                        <div class="slot-icon">＋</div>
                        <div class="slot-label">创建卡片</div>
                    </div>
                </div>`;
        }
    }
    return html;
}

let _slotCountdownTimer = null;
function _updateSlotCountdowns() {
    if (_slotCountdownTimer) clearInterval(_slotCountdownTimer);
    const tick = () => {
        document.querySelectorAll('.slot-countdown[data-target]').forEach(el => {
            const target = parseInt(el.dataset.target);
            const diff = target - Date.now();
            if (diff <= 0) {
                el.textContent = '可创建';
                return;
            }
            const days = Math.floor(diff / 86400000);
            const hours = Math.floor((diff % 86400000) / 3600000);
            const mins = Math.floor((diff % 3600000) / 60000);
            if (days > 0) {
                el.textContent = `${days}天${hours}小时`;
            } else {
                el.textContent = `${hours}时${mins}分`;
            }
        });
    };
    tick();
    _slotCountdownTimer = setInterval(tick, 60000);
}

async function createCard(accountId) {
    if (!confirm('确定要创建一张新的虚拟卡片吗？')) return;
    try {
        toast('创建中...', 'info');
        await api('POST', `/api/accounts/${accountId}/cards/create`);
        toast('卡片创建成功', 'success');
        await reloadCards(accountId);
    } catch (e) {
        toast(e.message, 'error');
    }
}

async function deleteCardConfirm(accountId, cardId, last4) {
    if (!confirm(`确定删除卡片 **** ${last4} 吗？\n\n⚠️ 删除后需等待 30 天才能创建新卡片！`)) return;
    try {
        await api('DELETE', `/api/accounts/${accountId}/cards/${cardId}`);
        toast('卡片已删除', 'success');
        await reloadCards(accountId);
    } catch (e) {
        toast(e.message, 'error');
    }
}

// ─── Deposit & Transactions ─────────────────────────────────────────
let depositData = {}; // per-account cache
let depositLoaded = {}, txLoaded = {};

async function loadDeposit(accountId) {
    if (depositLoaded[accountId]) return;
    const c = document.getElementById('tab-deposit');
    try {
        const info = await api('GET', `/api/accounts/${accountId}/deposit`);
        depositData[accountId] = info;
        depositLoaded[accountId] = true;
        renderDepositUI(accountId, info);
    } catch (e) { c.innerHTML = `<div class="empty-state"><p>${e.message}</p></div>`; }
}

function getTokenIconUrl(token) {
    if (token.icon_svg) return `/icons/token_${token.icon_svg.replace('/app/cash/images/tokens/', '').replace('/', '_')}`;
    if (token.icon_png) return `/icons/token_${token.icon_png.replace('/app/cash/images/tokens/', '').replace('/', '_')}`;
    return '';
}

function renderDepositUI(accountId, info) {
    const c = document.getElementById('tab-deposit');
    const tokenItems = info.tokens.map(t => {
        const icon = getTokenIconUrl(t);
        return `<div class="dropdown-item" onclick="selectToken('${accountId}', '${t.symbol}')">
            <img class="dropdown-icon" src="${icon}" alt="${t.symbol}" onerror="this.style.display='none'">
            <span>${t.symbol}</span>
        </div>`;
    }).join('');

    c.innerHTML = `
        <div class="deposit-flow">
            <div class="deposit-step">
                <label class="deposit-label">选择代币 (Token)</label>
                <div class="custom-dropdown" id="tokenDropdown">
                    <div class="dropdown-trigger" onclick="toggleDropdown('tokenDropdown')">
                        <div class="dropdown-selected" id="tokenSelected">
                            <span style="color:var(--text-muted)">选择代币</span>
                        </div>
                        <span class="dropdown-arrow">▾</span>
                    </div>
                    <div class="dropdown-menu" id="tokenMenu">${tokenItems}</div>
                </div>
            </div>

            <div class="deposit-step" id="networkStep" style="display:none">
                <label class="deposit-label">选择网络 (Network)</label>
                <div id="networkList" class="network-list"></div>
            </div>

            <div class="deposit-result" id="depositResult" style="display:none">
                <div class="qr-container" id="depositQR"></div>
                <div class="deposit-addr-label" id="depositAddrLabel"></div>
                <div class="deposit-addr-box" id="depositAddrBox" onclick="copyDepositAddress()">
                    <span id="depositAddrText"></span>
                    <span class="copy-icon">📋</span>
                </div>
                <div class="deposit-warning" id="depositWarning"></div>
            </div>
        </div>`;
}

function toggleDropdown(id) {
    const dd = document.getElementById(id);
    dd.classList.toggle('open');
    // Close on outside click
    if (dd.classList.contains('open')) {
        setTimeout(() => {
            const handler = (e) => {
                if (!dd.contains(e.target)) { dd.classList.remove('open'); document.removeEventListener('click', handler); }
            };
            document.addEventListener('click', handler);
        }, 0);
    }
}

function selectToken(accountId, symbol) {
    const info = depositData[accountId];
    const token = info.tokens.find(t => t.symbol === symbol);
    if (!token) return;

    // Update trigger display
    const icon = getTokenIconUrl(token);
    document.getElementById('tokenSelected').innerHTML = `
        <img class="dropdown-icon" src="${icon}" alt="${symbol}" onerror="this.style.display='none'">
        <span>${symbol}</span>`;
    document.getElementById('tokenDropdown').classList.remove('open');

    // Show networks
    const networkStep = document.getElementById('networkStep');
    document.getElementById('depositResult').style.display = 'none';
    networkStep.style.display = 'block';

    const networkList = document.getElementById('networkList');
    networkList.innerHTML = token.networks.map(n => `
        <div class="network-option" onclick="onNetworkSelect('${accountId}', '${symbol}', ${n.chain_id}, this)">
            <img class="network-icon-img" src="/icons/chain_${n.chain_id}.jpg" alt="${n.chain_name}"
                 onerror="this.outerHTML='<span class=\\'network-icon-fallback\\'>🔗</span>'">
            <span class="network-name">${n.chain_name}</span>
        </div>
    `).join('');
}

function onNetworkSelect(accountId, symbol, chainId, el) {
    document.querySelectorAll('.network-option').forEach(n => n.classList.remove('active'));
    el.classList.add('active');

    const info = depositData[accountId];
    const token = info.tokens.find(t => t.symbol === symbol);
    const network = token.networks.find(n => n.chain_id === chainId);
    const depositAddress = info.safe_address;
    const tokenIcon = getTokenIconUrl(token);

    const resultDiv = document.getElementById('depositResult');
    resultDiv.style.display = 'block';

    // Generate QR code
    const qrContainer = document.getElementById('depositQR');
    qrContainer.innerHTML = '';
    try {
        const qr = qrcode(0, 'M');
        qr.addData(depositAddress);
        qr.make();
        qrContainer.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 4, scalable: true });
        const svg = qrContainer.querySelector('svg');
        if (svg) {
            svg.style.width = '200px';
            svg.style.height = '200px';
            svg.style.background = 'white';
            svg.style.borderRadius = '12px';
            svg.style.padding = '12px';
        }
    } catch (e) {
        qrContainer.innerHTML = `<div style="color:var(--text-muted);font-size:12px">QR 生成失败</div>`;
    }

    document.getElementById('depositAddrLabel').innerHTML = `
        <img class="deposit-label-icon" src="${tokenIcon}" alt="${symbol}" onerror="this.style.display='none'">
        ${symbol} 充值地址 (${network.chain_name})`;
    document.getElementById('depositAddrText').textContent = depositAddress;
    document.getElementById('depositWarning').innerHTML = `
        <div class="warning-icon">⚠️</div>
        <div>
            <div style="font-weight:600;margin-bottom:4px">注意</div>
            <div>请仅通过 <strong>${network.chain_name}</strong> 网络转入 <strong>${symbol}</strong>。发送其他资产或使用其他网络可能导致资金丢失。</div>
        </div>
    `;

    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function copyDepositAddress() {
    const addr = document.getElementById('depositAddrText')?.textContent;
    if (addr) navigator.clipboard.writeText(addr).then(() => toast('充值地址已复制', 'success'));
}

let _txCache = {}; // id -> tx object
let _cardsCache = {}; // card_id -> card object
let _allTxs = []; // all transactions for current account
let _currentCardFilter = null; // null = all, string = card_id

async function loadTransactions(accountId, cardId) {
    const c = document.getElementById('tab-transactions');
    // If data not loaded yet, fetch
    if (!txLoaded[accountId]) {
        try {
            const txs = await api('GET', `/api/accounts/${accountId}/transactions?limit=50`);
            txLoaded[accountId] = true;
            _allTxs = txs;
            txs.forEach(tx => { _txCache[tx.id] = tx; });
        } catch (e) { c.innerHTML = `<div class="empty-state"><p>${e.message}</p></div>`; return; }
    }
    _currentCardFilter = cardId || null;
    renderTransactionList(c, _allTxs, _currentCardFilter);
}

function renderTransactionList(container, txs, cardFilter) {
    // Build filter bar
    const cardIds = [...new Set(txs.filter(t => t.card_last4).map(t => t.card_id))];
    let filterHtml = '<div class="tx-filter-bar">';
    filterHtml += `<button class="tx-filter-pill ${!cardFilter ? 'active' : ''}" onclick="filterTransactions(null)">全部</button>`;
    cardIds.forEach(cid => {
        const card = _cardsCache[cid];
        const label = card ? `•••• ${card.last4 || ''}` : `•••• ${txs.find(t => t.card_id === cid)?.card_last4 || ''}`;
        filterHtml += `<button class="tx-filter-pill ${cardFilter === cid ? 'active' : ''}" onclick="filterTransactions('${cid}')">${label}</button>`;
    });
    filterHtml += '</div>';

    // Filter
    const filtered = cardFilter ? txs.filter(t => t.card_id === cardFilter) : txs;
    if (!filtered.length) {
        container.innerHTML = filterHtml + '<div class="empty-state"><p>暂无消费记录</p></div>';
        return;
    }

    // Group by date
    const groups = {};
    filtered.forEach(tx => {
        const d = new Date(tx.timestamp);
        const key = d.toLocaleDateString('zh-CN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
        if (!groups[key]) groups[key] = [];
        groups[key].push(tx);
    });

    let html = filterHtml + '<div class="tx-list">';
    for (const [date, items] of Object.entries(groups)) {
        html += `<div class="tx-date-group">${date}</div>`;
        items.forEach(tx => { html += renderTxRow(tx); });
    }
    html += '</div>';
    container.innerHTML = html;
}

function filterTransactions(cardId) {
    _currentCardFilter = cardId;
    const c = document.getElementById('tab-transactions');
    renderTransactionList(c, _allTxs, cardId);
}

function showCardTransactions(accountId, cardId) {
    // Switch to transactions tab and filter by card
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    const txTab = document.querySelector('.tab:last-child');
    if (txTab) txTab.classList.add('active');
    document.getElementById('tab-transactions').classList.add('active');
    loadTransactions(accountId, cardId);
}

function renderTxRow(tx) {
    const et = tx.eventType || '';
    const clickAttr = `onclick="showTxDetail('${tx.id}')"`;

    if (et === 'rain_transaction') {
        const merchant = (tx.merchantData?.merchant_name || 'Unknown').trim();
        const txAmount = tx.transactionAmount || 0;
        const txCurrency = tx.transactionCurrency || '';
        const billAmount = tx.billAmount || 0;
        const billCurrency = tx.billCurrency || 'USD';
        const cashback = tx.cashbackAmountUsd || 0;
        const status = tx.status || tx.userStatus || '';
        const hasCashback = cashback > 0;
        const isFailed = status === 'FAILED' || status === 'DECLINED';
        const isPending = status === 'PENDING';
        const statusClass = isFailed ? 'failed' : isPending ? 'pending' : 'completed';
        const statusLabel = isFailed ? '失败 ⓘ' : isPending ? '处理中' : '';

        return `
        <div class="tx-row" ${clickAttr}>
            <div class="tx-icon">💳</div>
            <div class="tx-info">
                <div class="tx-merchant">${merchant}</div>
                ${hasCashback ? '<div class="tx-cashback-label">返现</div>' : ''}
            </div>
            <div class="tx-amounts">
                <div class="tx-original ${isFailed ? 'strikethrough' : ''}">− ${txCurrency === 'USD' ? '' : getCurrencySymbol(txCurrency)}${fmt(txAmount)} ${txCurrency}</div>
                <div class="tx-usd">− $${fmt(billAmount)} ${billCurrency}</div>
                ${hasCashback ? `<div class="tx-cashback-amount">+ $${fmt(cashback)} USD</div>` : ''}
                ${statusLabel ? `<div class="tx-status-label ${statusClass}">${statusLabel}</div>` : ''}
            </div>
            <div class="tx-chevron">›</div>
        </div>`;
    }

    if (et.includes('withdrawal') || et === 'completed_withdrawal') {
        const tokens = tx.sourceTokens || [{}];
        const t = tokens[0];
        const amountUSD = parseFloat(t.amountUSD || 0);
        const symbol = t.symbol || '';

        return `
        <div class="tx-row" ${clickAttr}>
            <div class="tx-icon">↗</div>
            <div class="tx-info">
                <div class="tx-merchant">${symbol}</div>
                <div class="tx-sub">${fmt(amountUSD)}</div>
            </div>
            <div class="tx-amounts">
                <div class="tx-original">$${fmt(amountUSD)}</div>
            </div>
            <div class="tx-chevron">›</div>
        </div>`;
    }

    if (et.includes('topup')) {
        const s = tx.sourceToken || {};
        const amountUSD = parseFloat(s.amountUSD || 0);
        const symbol = s.symbol || '';

        return `
        <div class="tx-row" ${clickAttr}>
            <div class="tx-icon" style="transform:rotate(180deg)">↗</div>
            <div class="tx-info">
                <div class="tx-merchant">${symbol}</div>
                <div class="tx-sub">${fmt(amountUSD)}</div>
            </div>
            <div class="tx-amounts">
                <div class="tx-original" style="color:var(--success)">$${fmt(amountUSD)}</div>
            </div>
            <div class="tx-chevron">›</div>
        </div>`;
    }

    return `
    <div class="tx-row">
        <div class="tx-icon">•</div>
        <div class="tx-info"><div class="tx-merchant">${et}</div></div>
        <div class="tx-amounts"><div class="tx-original">—</div></div>
    </div>`;
}

function shortAddr(addr) {
    if (!addr || addr.length < 12) return addr || '';
    return addr.slice(0, 6) + '...' + addr.slice(-4);
}

function showTxDetail(txId) {
    const tx = _txCache[txId];
    if (!tx) return;

    const et = tx.eventType || '';
    const d = new Date(tx.timestamp);
    const dateStr = d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
        + ' ' + d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    let content = '';

    if (et === 'rain_transaction') {
        const merchant = (tx.merchantData?.merchant_name || 'Unknown').trim();
        const mcc = tx.merchantData?.mcc_category || '';
        const merchantCity = (tx.merchantData?.merchant_city || '').trim();
        const merchantCountry = tx.merchantData?.merchant_country || '';
        const location = [merchantCity, merchantCountry].filter(Boolean).join(', ');
        const cardLast4 = tx.card_last4 || '';
        const cardHolder = tx.cardholderName || '';
        const txAmount = tx.transactionAmount || 0;
        const txCurrency = tx.transactionCurrency || '';
        const billAmount = tx.billAmount || 0;
        const billCurrency = tx.billCurrency || 'USD';
        const cashback = tx.cashbackAmountUsd || 0;
        const status = tx.status || tx.userStatus || '';
        const statusClass = (status === 'FAILED' || status === 'DECLINED') ? 'failed' : status === 'PENDING' ? 'pending' : 'completed';
        // Find explorer URL from lifecycle events
        const explorer = tx.lifecycleEvents?.find(e => e.explorerUrl)?.explorerUrl || '';

        content = `
            <div class="txd-header">
                <div class="txd-icon">💳</div>
                <div class="txd-summary">
                    <div class="txd-amount">$${fmt(billAmount)} ${billCurrency}</div>
                    <div class="txd-token">${getCurrencySymbol(txCurrency)}${fmt(txAmount)} ${txCurrency}</div>
                    <div class="txd-status ${statusClass}">${status}</div>
                </div>
                <div class="txd-type-label">卡<br>消费</div>
            </div>
            <div class="txd-divider"></div>
            <div class="txd-date">${dateStr}</div>
            ${cardLast4 ? (() => {
                const cachedCard = _cardsCache[tx.card_id];
                const fullPan = cachedCard?.pan ? cachedCard.pan.replace(/(.{4})/g,'$1 ').trim() : `•••• ${cardLast4}`;
                return `<div class="txd-detail-row"><div class="txd-detail-label">消费卡片</div><div class="txd-detail-value">${fullPan}${cardHolder ? `<br><span style="font-size:12px;color:var(--text-muted)">${cardHolder}</span>` : ''}</div></div>`;
            })() : ''}
            <div class="txd-detail-row">
                <div class="txd-detail-label">商户</div>
                <div class="txd-detail-value">${merchant}</div>
            </div>
            ${location ? `<div class="txd-detail-row"><div class="txd-detail-label">位置</div><div class="txd-detail-value">${location}</div></div>` : ''}
            ${mcc ? `<div class="txd-detail-row"><div class="txd-detail-label">类别</div><div class="txd-detail-value">${mcc}</div></div>` : ''}
            <div class="txd-detail-row">
                <div class="txd-detail-label">原始金额</div>
                <div class="txd-detail-value">${getCurrencySymbol(txCurrency)}${fmt(txAmount)} ${txCurrency}</div>
            </div>
            <div class="txd-detail-row">
                <div class="txd-detail-label">结算金额</div>
                <div class="txd-detail-value">$${fmt(billAmount)} ${billCurrency}</div>
            </div>
            ${cashback > 0 ? `
            <div class="txd-detail-row">
                <div class="txd-detail-label">返现</div>
                <div class="txd-detail-value" style="color:var(--success)">+ $${fmt(cashback)} USD</div>
            </div>` : ''}
            ${explorer ? `<a class="txd-explorer-btn" href="${explorer}" target="_blank">查看链上交易 <span>↗</span></a>` : ''}
        `;
    } else if (et.includes('withdrawal') || et === 'completed_withdrawal') {
        const tokens = tx.sourceTokens || [{}];
        const t = tokens[0];
        const amountUSD = parseFloat(t.amountUSD || 0);
        const symbol = t.symbol || '';
        const from = tx.safeAddress || '';
        const to = tx.recipient || '';
        const explorer = tx.explorerUrl || '';

        content = `
            <div class="txd-header">
                <div class="txd-icon">↗</div>
                <div class="txd-summary">
                    <div class="txd-amount">$${fmt(amountUSD)} USD</div>
                    <div class="txd-token">${fmt(amountUSD)} ${symbol}</div>
                    <div class="txd-status completed">已完成</div>
                </div>
                <div class="txd-type-label">转出<br>资金</div>
            </div>
            <div class="txd-divider"></div>
            <div class="txd-date">${dateStr}</div>
            <div class="txd-detail-row">
                <div class="txd-detail-label">发送</div>
                <div class="txd-detail-value">${fmt(amountUSD)} ${symbol}<br><span class="txd-addr">来自: ${shortAddr(from)} <span class="txd-copy" onclick="event.stopPropagation();copyText('${from}')">📋</span></span></div>
            </div>
            <div class="txd-detail-row-amount">$${fmt(amountUSD)}</div>
            <div class="txd-detail-row">
                <div class="txd-detail-label">接收</div>
                <div class="txd-detail-value">${fmt(amountUSD)} ${symbol}<br><span class="txd-addr">发至: ${shortAddr(to)} <span class="txd-copy" onclick="event.stopPropagation();copyText('${to}')">📋</span></span></div>
            </div>
            <div class="txd-detail-row-amount">$${fmt(amountUSD)}</div>
            ${explorer ? `<a class="txd-explorer-btn" href="${explorer}" target="_blank">查看链上交易 <span>↗</span></a>` : ''}
        `;
    } else if (et.includes('topup')) {
        const s = tx.sourceToken || {};
        const amountUSD = parseFloat(s.amountUSD || 0);
        const symbol = s.symbol || '';

        content = `
            <div class="txd-header">
                <div class="txd-icon" style="transform:rotate(180deg)">↗</div>
                <div class="txd-summary">
                    <div class="txd-amount" style="color:var(--success)">$${fmt(amountUSD)} USD</div>
                    <div class="txd-token">${fmt(amountUSD)} ${symbol}</div>
                    <div class="txd-status completed">已完成</div>
                </div>
                <div class="txd-type-label">充值</div>
            </div>
            <div class="txd-divider"></div>
            <div class="txd-date">${dateStr}</div>
            <div class="txd-detail-row">
                <div class="txd-detail-label">金额</div>
                <div class="txd-detail-value">$${fmt(amountUSD)} ${symbol}</div>
            </div>
        `;
    }

    // Create modal
    let modal = document.getElementById('txDetailModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'txDetailModal';
        modal.className = 'modal-overlay';
        modal.addEventListener('click', e => { if (e.target === modal) hideTxDetail(); });
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div class="modal txd-modal">
            <h3 class="txd-title">交易详情</h3>
            ${content}
            <button class="btn" onclick="hideTxDetail()" style="width:100%;margin-top:16px">关闭</button>
        </div>`;
    modal.classList.add('show');
}

function hideTxDetail() {
    const modal = document.getElementById('txDetailModal');
    if (modal) modal.classList.remove('show');
}

function getCurrencySymbol(code) {
    const map = { EGP: 'E£', GBP: '£', EUR: '€', JPY: '¥', CNY: '¥', KRW: '₩', INR: '₹', BRL: 'R$', TRY: '₺', THB: '฿' };
    return map[code] || '';
}

// ─── Spending Limit Management ─────────────────────────────────────
function showEditLimitModal(accountId, cardId, currentLimit) {
    // Create or show the modal
    let modal = document.getElementById('editLimitModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'editLimitModal';
        modal.className = 'modal-overlay';
        modal.addEventListener('click', e => { if (e.target === modal) hideModal('editLimitModal'); });
        document.body.appendChild(modal);
    }

    const currentVal = currentLimit !== null && currentLimit !== undefined ? currentLimit : '';
    modal.innerHTML = `
        <div class="modal">
            <h3 class="modal-title">✏️ 修改卡片日限额</h3>
            <p class="edit-limit-desc">设置此卡片的每日消费限额 (USD)。金额必须大于 0。</p>
            <div class="edit-limit-form">
                <label class="edit-limit-label">日限额 (USD)</label>
                <div class="edit-limit-input-row">
                    <span class="edit-limit-currency">$</span>
                    <input type="number" id="newLimitInput" class="edit-limit-input" 
                           value="${currentVal}" placeholder="例如: 5000" 
                           step="0.01" min="1">
                </div>
                <div class="edit-limit-presets">
                    <button class="btn btn-sm preset-btn" onclick="document.getElementById('newLimitInput').value='50'">$50</button>
                    <button class="btn btn-sm preset-btn" onclick="document.getElementById('newLimitInput').value='100'">$100</button>
                    <button class="btn btn-sm preset-btn" onclick="document.getElementById('newLimitInput').value='500'">$500</button>
                    <button class="btn btn-sm preset-btn" onclick="document.getElementById('newLimitInput').value='1000'">$1,000</button>
                    <button class="btn btn-sm preset-btn" onclick="document.getElementById('newLimitInput').value='2000'">$2,000</button>
                    <button class="btn btn-sm preset-btn" onclick="document.getElementById('newLimitInput').value='5000'">$5,000</button>
                </div>
            </div>
            <div style="display:flex;gap:8px;margin-top:16px">
                <button class="btn btn-primary" id="confirmLimitBtn" onclick="updateCardLimit('${accountId}','${cardId}')" style="flex:1">
                    确认修改
                </button>
                <button class="btn" onclick="hideModal('editLimitModal')" style="flex:1">
                    取消
                </button>
            </div>
            <div id="limitError" style="color:var(--danger);font-size:12px;margin-top:8px;text-align:center"></div>
        </div>
    `;
    showModal('editLimitModal');
    setTimeout(() => document.getElementById('newLimitInput')?.focus(), 100);
}

async function updateCardLimit(accountId, cardId) {
    const input = document.getElementById('newLimitInput');
    const btn = document.getElementById('confirmLimitBtn');
    const errDiv = document.getElementById('limitError');
    errDiv.textContent = '';

    const rawVal = input.value.trim();
    if (rawVal === '') {
        errDiv.textContent = '请输入限额金额，不能留空';
        return;
    }
    const dailyLimit = parseFloat(rawVal);
    if (isNaN(dailyLimit) || dailyLimit <= 0) {
        errDiv.textContent = '限额必须大于 0';
        return;
    }

    btn.textContent = '更新中...';
    btn.disabled = true;

    try {
        await api('PUT', `/api/accounts/${accountId}/cards/${cardId}/spending-limit`, { dailyLimit });
        toast('日限额已更新', 'success');
        hideModal('editLimitModal');
        // Surgically update card limit display
        const limitEl = document.getElementById(`limitVal-${cardId}`);
        if (limitEl) limitEl.textContent = `$${fmt(dailyLimit)}`;
        // Update the edit button's onclick with new value
        const editBtn = limitEl?.closest('.card-limit-row')?.querySelector('.btn-edit-limit');
        if (editBtn) editBtn.setAttribute('onclick', `showEditLimitModal('${accountId}','${cardId}', ${dailyLimit})`);
    } catch (e) {
        errDiv.textContent = e.message || '更新失败';
    } finally {
        btn.textContent = '确认修改';
        btn.disabled = false;
    }
}

// ─── Vault Spending Limit Management (OTP Flow) ────────────────────
let _vaultStep = 'limits'; // 'limits' or 'otp'
let _pendingVaultDaily = 0;
let _pendingVaultMonthly = 0;

function showVaultLimitModal(accountId, currentDaily, currentMonthly) {
    let modal = document.getElementById('vaultLimitModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'vaultLimitModal';
        modal.className = 'modal-overlay';
        modal.addEventListener('click', e => { if (e.target === modal) hideModal('vaultLimitModal'); });
        document.body.appendChild(modal);
    }
    _vaultStep = 'limits';
    renderVaultStep1(modal, accountId, currentDaily, currentMonthly);
    showModal('vaultLimitModal');
    setTimeout(() => document.getElementById('vaultDailyInput')?.focus(), 100);
}

function renderVaultStep1(modal, accountId, currentDaily, currentMonthly) {
    modal.innerHTML = `
        <div class="modal" style="max-width:480px">
            <h3 class="modal-title">🏦 修改账户消费限额</h3>
            <p class="edit-limit-desc">修改 Vault 级别的每日和每月消费限额 (USD)。日限额不可超过月限额。</p>
            <div class="edit-limit-form">
                <label class="edit-limit-label">每日限额 (USD)</label>
                <div class="edit-limit-input-row">
                    <span class="edit-limit-currency">$</span>
                    <input type="number" id="vaultDailyInput" class="edit-limit-input" 
                           value="${currentDaily}" placeholder="例如: 5000" step="1" min="1">
                </div>
                <div class="edit-limit-presets">
                    <button class="btn btn-sm preset-btn" onclick="document.getElementById('vaultDailyInput').value='500'">$500</button>
                    <button class="btn btn-sm preset-btn" onclick="document.getElementById('vaultDailyInput').value='1000'">$1K</button>
                    <button class="btn btn-sm preset-btn" onclick="document.getElementById('vaultDailyInput').value='2000'">$2K</button>
                    <button class="btn btn-sm preset-btn" onclick="document.getElementById('vaultDailyInput').value='5000'">$5K</button>
                </div>
                <label class="edit-limit-label" style="margin-top:12px">每月限额 (USD)</label>
                <div class="edit-limit-input-row">
                    <span class="edit-limit-currency">$</span>
                    <input type="number" id="vaultMonthlyInput" class="edit-limit-input" 
                           value="${currentMonthly}" placeholder="例如: 20000" step="1" min="1">
                </div>
                <div class="edit-limit-presets">
                    <button class="btn btn-sm preset-btn" onclick="document.getElementById('vaultMonthlyInput').value='5000'">$5K</button>
                    <button class="btn btn-sm preset-btn" onclick="document.getElementById('vaultMonthlyInput').value='10000'">$10K</button>
                    <button class="btn btn-sm preset-btn" onclick="document.getElementById('vaultMonthlyInput').value='20000'">$20K</button>
                    <button class="btn btn-sm preset-btn" onclick="document.getElementById('vaultMonthlyInput').value='50000'">$50K</button>
                </div>
            </div>
            <div style="display:flex;gap:8px;margin-top:16px">
                <button class="btn btn-primary" id="vaultLimitBtn" onclick="handleVaultStep1('${accountId}')" style="flex:1">
                    📧 发送验证码
                </button>
                <button class="btn" onclick="hideModal('vaultLimitModal')" style="flex:1">
                    取消
                </button>
            </div>
            <div id="vaultLimitError" style="color:var(--danger);font-size:12px;margin-top:8px;text-align:center"></div>
        </div>
    `;
}

async function handleVaultStep1(accountId) {
    const errDiv = document.getElementById('vaultLimitError');
    const btn = document.getElementById('vaultLimitBtn');
    errDiv.textContent = '';

    const dailyVal = parseFloat(document.getElementById('vaultDailyInput').value.trim());
    const monthlyVal = parseFloat(document.getElementById('vaultMonthlyInput').value.trim());

    if (!dailyVal || dailyVal <= 0 || !monthlyVal || monthlyVal <= 0) {
        errDiv.textContent = '请输入有效的限额 (必须大于 0)';
        return;
    }
    if (dailyVal > monthlyVal) {
        errDiv.textContent = '日限额不能超过月限额';
        return;
    }

    btn.textContent = '📧 发送中...';
    btn.disabled = true;
    try {
        const res = await api('POST', `/api/accounts/${accountId}/vault/spending-limit-challenge`, {
            dailyLimit: dailyVal, monthlyLimit: monthlyVal
        });
        // Store pending values for optimistic UI update after OTP
        _pendingVaultDaily = dailyVal;
        _pendingVaultMonthly = monthlyVal;
        // Move to step 2: OTP input
        _vaultStep = 'otp';
        const modal = document.getElementById('vaultLimitModal');
        renderVaultStep2(modal, accountId, dailyVal, monthlyVal);
    } catch (e) {
        errDiv.textContent = e.message || '发送验证码失败';
        btn.textContent = '📧 发送验证码';
        btn.disabled = false;
    }
}

function renderVaultStep2(modal, accountId, dailyVal, monthlyVal) {
    modal.innerHTML = `
        <div class="modal" style="max-width:420px">
            <h3 class="modal-title">📧 邮箱验证</h3>
            <div class="vault-otp-info">
                <p>📬 验证码已发送至您的注册邮箱</p>
                <p style="font-size:12px;color:var(--text-muted);margin-top:6px">
                    修改限额: 日 $${fmt(dailyVal)} / 月 $${fmt(monthlyVal)}
                </p>
            </div>
            <div class="edit-limit-form" style="margin-top:16px">
                <label class="edit-limit-label">输入6位验证码</label>
                <div class="otp-input-row">
                    ${[0,1,2,3,4,5].map(i => `<input type="text" maxlength="1" class="otp-digit" id="otpDigit${i}" 
                        oninput="handleOtpInput(${i})" onkeydown="handleOtpKeydown(event, ${i})" 
                        onpaste="handleOtpPaste(event)" autocomplete="off">`).join('')}
                </div>
            </div>
            <div style="display:flex;gap:8px;margin-top:16px">
                <button class="btn btn-primary" id="vaultOtpBtn" onclick="handleVaultStep2('${accountId}')" style="flex:1" disabled>
                    ✅ 确认修改
                </button>
                <button class="btn" onclick="hideModal('vaultLimitModal')" style="flex:1">
                    取消
                </button>
            </div>
            <div style="text-align:center;margin-top:8px">
                <button class="btn btn-sm" onclick="handleVaultResendOtp('${accountId}', ${dailyVal}, ${monthlyVal})" id="resendOtpBtn" style="font-size:11px;color:var(--text-muted)">
                    重新发送验证码
                </button>
            </div>
            <div id="vaultLimitError" style="color:var(--danger);font-size:12px;margin-top:8px;text-align:center"></div>
            <div id="vaultLimitInfo" style="color:var(--success);font-size:12px;margin-top:4px;text-align:center"></div>
        </div>
    `;
    setTimeout(() => document.getElementById('otpDigit0')?.focus(), 100);
}

// OTP input helpers
function handleOtpInput(index) {
    const el = document.getElementById(`otpDigit${index}`);
    if (el.value && index < 5) {
        document.getElementById(`otpDigit${index + 1}`)?.focus();
    }
    checkOtpComplete();
}

function handleOtpKeydown(event, index) {
    if (event.key === 'Backspace' && !event.target.value && index > 0) {
        document.getElementById(`otpDigit${index - 1}`)?.focus();
    }
}

function handleOtpPaste(event) {
    event.preventDefault();
    const paste = (event.clipboardData || window.clipboardData).getData('text').trim();
    if (/^\d{6}$/.test(paste)) {
        for (let i = 0; i < 6; i++) {
            document.getElementById(`otpDigit${i}`).value = paste[i];
        }
        document.getElementById('otpDigit5')?.focus();
        checkOtpComplete();
    }
}

function checkOtpComplete() {
    let code = '';
    for (let i = 0; i < 6; i++) code += (document.getElementById(`otpDigit${i}`)?.value || '');
    const btn = document.getElementById('vaultOtpBtn');
    if (btn) btn.disabled = code.length !== 6;
}

function getOtpCode() {
    let code = '';
    for (let i = 0; i < 6; i++) code += (document.getElementById(`otpDigit${i}`)?.value || '');
    return code;
}

async function handleVaultResendOtp(accountId, dailyVal, monthlyVal) {
    const resendBtn = document.getElementById('resendOtpBtn');
    const infoDiv = document.getElementById('vaultLimitInfo');
    const errDiv = document.getElementById('vaultLimitError');
    resendBtn.disabled = true;
    resendBtn.textContent = '发送中...';
    errDiv.textContent = '';
    try {
        await api('POST', `/api/accounts/${accountId}/vault/spending-limit-challenge`, {
            dailyLimit: dailyVal, monthlyLimit: monthlyVal
        });
        infoDiv.textContent = '✅ 验证码已重新发送';
    } catch (e) {
        errDiv.textContent = e.message || '重新发送失败';
    } finally {
        resendBtn.disabled = false;
        resendBtn.textContent = '重新发送验证码';
    }
}

async function handleVaultStep2(accountId) {
    const errDiv = document.getElementById('vaultLimitError');
    const infoDiv = document.getElementById('vaultLimitInfo');
    const btn = document.getElementById('vaultOtpBtn');
    errDiv.textContent = '';
    infoDiv.textContent = '';

    const otpCode = getOtpCode();
    if (otpCode.length !== 6) {
        errDiv.textContent = '请输入完整的6位验证码';
        return;
    }

    btn.textContent = '⏳ 验证并执行中...';
    btn.disabled = true;

    try {
        await api('POST', `/api/accounts/${accountId}/vault/verify-otp-and-execute`, { otpCode });
        toast('🎉 账户限额已更新', 'success');
        hideModal('vaultLimitModal');
        // Optimistic UI update using the values the user submitted
        const limitCard = document.querySelector('.vault-limit-card');
        if (limitCard) {
            const nums = limitCard.querySelectorAll('.vault-limit-nums');
            // Keep the current "used" values, only update the "limit" part
            if (nums[0]) {
                const curDaily = nums[0].textContent.split('/')[0];
                nums[0].textContent = `${curDaily}/$${fmt(_pendingVaultDaily)}`;
            }
            if (nums[1]) {
                const curMonthly = nums[1].textContent.split('/')[0];
                nums[1].textContent = `${curMonthly}/$${fmt(_pendingVaultMonthly)}`;
            }
            // Update progress bar widths
            const fills = limitCard.querySelectorAll('.vault-limit-fill');
            const parseDollar = s => parseFloat((s || '').replace(/[$,]/g, '')) || 0;
            if (fills[0] && nums[0]) {
                const usedVal = parseDollar(nums[0].textContent.split('/')[0]);
                fills[0].style.width = `${Math.min(100, _pendingVaultDaily > 0 ? (usedVal / _pendingVaultDaily * 100) : 0)}%`;
            }
            if (fills[1] && nums[1]) {
                const usedVal = parseDollar(nums[1].textContent.split('/')[0]);
                fills[1].style.width = `${Math.min(100, _pendingVaultMonthly > 0 ? (usedVal / _pendingVaultMonthly * 100) : 0)}%`;
            }
            // Update the edit button onclick with new values
            const editBtn = limitCard.querySelector('.btn-edit-limit');
            if (editBtn) editBtn.setAttribute('onclick', `showVaultLimitModal('${accountId}', ${_pendingVaultDaily}, ${_pendingVaultMonthly})`);
        }
    } catch (e) {
        errDiv.textContent = e.message || '验证失败';
        btn.textContent = '✅ 确认修改';
        btn.disabled = false;
    }
}

// ─── Utilities ──────────────────────────────────────────────────────
function copyText(text) { navigator.clipboard.writeText(text).then(()=>toast('已复制','info')); }
function fmt(n) { return (n||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}); }

// ─── Withdraw ───────────────────────────────────────────────────────
let withdrawLoaded = {};

async function loadWithdraw(accountId) {
    if (withdrawLoaded[accountId]) return;
    const c = document.getElementById('tab-withdraw');
    try {
        const summary = await api('GET', `/api/accounts/${accountId}/summary`);
        const balances = summary.balances || [];

        if (balances.length === 0) {
            c.innerHTML = '<div class="empty-state">当前账户无可提现资产</div>';
            withdrawLoaded[accountId] = true;
            return;
        }

        window._wdBalances = balances;

        const tokenItems = balances.map((b, i) =>
            `<div class="dropdown-item" onclick="selectWithdrawToken(${i})">
                <img class="dropdown-icon" src="${b.icon}" alt="${b.symbol}" onerror="this.style.display='none'">
                <span>${b.symbol} — ${b.amount} ($${fmt(b.usd_value)})</span>
            </div>`
        ).join('');

        c.innerHTML = `
            <div class="deposit-flow">
                <div class="deposit-step">
                    <label class="deposit-label">选择代币 (Token)</label>
                    <div class="custom-dropdown" id="wdTokenDropdown">
                        <div class="dropdown-trigger" onclick="toggleDropdown('wdTokenDropdown')">
                            <div class="dropdown-selected" id="wdTokenSelected">
                                <img class="dropdown-icon" src="${balances[0].icon}" alt="${balances[0].symbol}" onerror="this.style.display='none'">
                                <span>${balances[0].symbol} — ${balances[0].amount} ($${fmt(balances[0].usd_value)})</span>
                            </div>
                            <span class="dropdown-arrow">▾</span>
                        </div>
                        <div class="dropdown-menu" id="wdTokenMenu">${tokenItems}</div>
                    </div>
                </div>

                <div class="deposit-step">
                    <label class="deposit-label">提现数量</label>
                    <div style="display:flex;gap:8px;align-items:center">
                        <input type="number" id="w-amount" class="form-control" placeholder="0.00" step="any" min="0" style="flex:1">
                        <button class="btn btn-sm" onclick="fillMaxWithdraw()">MAX</button>
                    </div>
                    <small id="w-balance-hint" style="color:var(--text-muted);margin-top:6px;display:block">可用: ${balances[0].amount} ${balances[0].symbol}</small>
                </div>

                <div class="deposit-step">
                    <label class="deposit-label">目标地址 (OP Mainnet)</label>
                    <input type="text" id="w-recipient" class="form-control" placeholder="0x...">
                    <small style="color:#00d4aa;margin-top:6px;display:block">ⓘ 请确保地址在 OP Mainnet 网络上</small>
                </div>

                <input type="hidden" id="w-token" value="0">

                <button class="btn btn-primary" id="w-submit-btn" style="width:100%;margin-top:8px" onclick="submitWithdrawal('${accountId}')">📤 发起提现</button>

                <div id="w-otp-section" style="display:none;margin-top:16px">
                    <div class="vault-otp-info">📧 OTP 验证码已发送到注册邮箱</div>
                    <div class="deposit-step" style="margin-top:12px">
                        <label class="deposit-label">邮箱 OTP 验证码</label>
                        <input type="text" id="w-otp-code" class="form-control" placeholder="6位验证码" maxlength="6">
                    </div>
                    <button class="btn btn-primary" id="w-otp-btn" style="width:100%;margin-top:8px" onclick="verifyWithdrawalOTP('${accountId}')">✅ 验证并提现</button>
                </div>
                <div id="w-result" style="margin-top:12px"></div>
            </div>
        `;

        withdrawLoaded[accountId] = true;
    } catch (e) {
        c.innerHTML = `<div class="empty-state" style="color:var(--error)">加载失败: ${e.message}</div>`;
    }
}

function selectWithdrawToken(idx) {
    const balances = window._wdBalances || [];
    const b = balances[idx];
    if (!b) return;
    document.getElementById('w-token').value = idx;
    document.getElementById('wdTokenSelected').innerHTML = `
        <img class="dropdown-icon" src="${b.icon}" alt="${b.symbol}" onerror="this.style.display='none'">
        <span>${b.symbol} — ${b.amount} ($${fmt(b.usd_value)})</span>`;
    document.getElementById('wdTokenDropdown').classList.remove('open');
    document.getElementById('w-balance-hint').textContent = `可用: ${b.amount} ${b.symbol}`;
}

function updateWithdrawHint(balances) {
    const idx = parseInt(document.getElementById('w-token').value);
    const b = balances[idx];
    if (b) {
        document.getElementById('w-balance-hint').textContent = `可用: ${b.amount} ${b.symbol} ≈ $${fmt(b.usd_value)}`;
    }
}

function fillMaxWithdraw() {
    const balances = window._wdBalances || [];
    const idx = parseInt(document.getElementById('w-token').value);
    const b = balances[idx];
    if (b) document.getElementById('w-amount').value = b.amount;
    // Trigger input event to update button
    document.getElementById('w-amount').dispatchEvent(new Event('input'));
}

let _withdrawBalances = null;

async function submitWithdrawal(accountId) {
    const btn = document.getElementById('w-submit-btn');
    const resultDiv = document.getElementById('w-result');
    const tokenSelect = document.getElementById('w-token');
    const amountInput = document.getElementById('w-amount');
    const recipientInput = document.getElementById('w-recipient');

    const amount = parseFloat(amountInput.value);
    if (!amount || amount <= 0) { toast('请输入有效的提现数量', 'error'); return; }
    const recipient = recipientInput.value.trim();
    if (!recipient || !recipient.startsWith('0x') || recipient.length !== 42) {
        toast('请输入有效的目标钱包地址 (0x...)', 'error'); return;
    }

    // Get the selected token's details from the summary
    const summary = await api('GET', `/api/accounts/${accountId}/summary`);
    const balances = summary.balances || [];
    const idx = parseInt(tokenSelect.value);
    const token = balances[idx];
    if (!token) { toast('未找到选中的资产', 'error'); return; }

    // Convert human amount to raw using decimals from balance data
    const decimals = token.decimals || 18;
    const rawAmount = BigInt(Math.floor(amount * (10 ** decimals))).toString();

    btn.textContent = '发起中...'; btn.disabled = true;
    resultDiv.innerHTML = '';

    try {
        // Step 1: Get challenge + send OTP
        const resp = await api('POST', `/api/accounts/${accountId}/withdrawal/challenge`, {
            token: token.address,
            amount: rawAmount,
            recipient: recipient,
        });

        toast(resp.message || 'OTP 已发送', 'success');
        document.getElementById('w-otp-section').style.display = 'block';
        btn.style.display = 'none';
    } catch (e) {
        resultDiv.innerHTML = `<div style="color:var(--error)">❌ ${e.message}</div>`;
        toast(e.message, 'error');
    } finally {
        btn.textContent = '📤 发起提现'; btn.disabled = false;
    }
}

async function verifyWithdrawalOTP(accountId) {
    const btn = document.getElementById('w-otp-btn');
    const resultDiv = document.getElementById('w-result');
    const otpCode = document.getElementById('w-otp-code').value.trim();

    if (!otpCode || otpCode.length !== 6) {
        toast('请输入6位OTP验证码', 'error'); return;
    }

    btn.textContent = '验证并签名中...'; btn.disabled = true;

    try {
        const resp = await api('POST', `/api/accounts/${accountId}/withdrawal/verify-and-execute`, {
            otpCode: otpCode,
        });

        resultDiv.innerHTML = `<div style="color:var(--success);padding:12px;background:rgba(16,185,129,0.1);border-radius:8px">✅ 提现成功！交易已提交到链上处理。</div>`;
        toast('提现成功!', 'success');

        // Reset form
        document.getElementById('w-otp-section').style.display = 'none';
        document.getElementById('w-submit-btn').style.display = '';
        document.getElementById('w-amount').value = '';
        document.getElementById('w-recipient').value = '';
        document.getElementById('w-otp-code').value = '';

        // Refresh balances in-place
        withdrawLoaded = {};
        try {
            const summary = await api('GET', `/api/accounts/${accountId}/summary`);
            const balEl = document.querySelector('.stat-value');
            if (balEl) balEl.textContent = `$${fmt(summary.total_balance || 0)}`;
        } catch (_) {}
    } catch (e) {
        resultDiv.innerHTML = `<div style="color:var(--error)">❌ ${e.message}</div>`;
        toast(e.message, 'error');
    } finally {
        btn.textContent = '✅ 验证并提现'; btn.disabled = false;
    }
}

// ─── Init ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', checkAuth);

document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) hideModal(m.id); });
});

document.getElementById('loginPassword').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
document.getElementById('loginUsername').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('loginPassword').focus(); });
