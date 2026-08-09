(function() {
  const people = [
    { id: 'p1', name: 'Marina Duarte', color: '#8b5cf6', status: 'online' },
    { id: 'p2', name: 'Rafael Souza', color: '#e8c48a', status: 'online' },
    { id: 'p3', name: 'Bianca Alves', color: '#34d399', status: 'away' },
    { id: 'p4', name: 'Diego Farias', color: '#f0708a', status: 'online' }
  ];

  function initials(name) {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }

  let tasks = [
    { id: cryptoId(), title: 'Configurar autenticação JWT no backend', owner: 'p2', prio: 'alta', due: daysFromNow(-1), status: 'todo' },
    { id: cryptoId(), title: 'Desenhar wireframes do dashboard', owner: 'p3', prio: 'media', due: daysFromNow(2), status: 'todo' },
    { id: cryptoId(), title: 'Escrever testes do módulo de tarefas', owner: 'p1', prio: 'baixa', due: daysFromNow(5), status: 'todo' },
    { id: cryptoId(), title: 'Integrar WebSocket para atualizações em tempo real', owner: 'p4', prio: 'alta', due: daysFromNow(1), status: 'doing' },
    { id: cryptoId(), title: 'Revisar copy da landing page', owner: 'p3', prio: 'media', due: daysFromNow(3), status: 'doing' },
    { id: cryptoId(), title: 'Configurar ambiente de staging', owner: 'p2', prio: 'baixa', due: daysFromNow(-2), status: 'done' },
    { id: cryptoId(), title: 'Reunião de kickoff com o cliente', owner: 'p1', prio: 'media', due: daysFromNow(-4), status: 'done' }
  ];

  function cryptoId() {
    return 'id-' + Math.random().toString(36).slice(2, 10);
  }

  function daysFromNow(n) {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  }

  function fmtDate(iso) {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }

  function isOverdue(iso, status) {
    return status !== 'done' && new Date(iso + 'T00:00:00') < new Date(new Date().toDateString());
  }

  const cardsCols = {
    todo: document.getElementById('cards-todo'),
    doing: document.getElementById('cards-doing'),
    done: document.getElementById('cards-done')
  };
  const counts = {
    todo: document.getElementById('count-todo'),
    doing: document.getElementById('count-doing'),
    done: document.getElementById('count-done')
  };

  function personOf(id) {
    return people.find(p => p.id === id);
  }

  function render() {
    ['todo', 'doing', 'done'].forEach(s => {
      cardsCols[s].innerHTML = '';
    });
    let overdueCount = 0;
    tasks.forEach(t => {
      const p = personOf(t.owner);
      const overdue = isOverdue(t.due, t.status);
      if (overdue) overdueCount++;
      const card = document.createElement('div');
      card.className = 'card';
      card.draggable = true;
      card.dataset.id = t.id;
      card.innerHTML = `
        <button class="del-btn" title="Remover">✕</button>
        <div class="card-top">
          <span class="prio ${t.prio}">${t.prio}</span>
        </div>
        <div class="card-title">${escapeHtml(t.title)}</div>
        <div class="card-bottom">
          <span class="card-due ${overdue ? 'overdue' : ''}">${overdue ? '⚠ ' : '📅 '}${fmtDate(t.due)}</span>
          <span class="card-avatar" style="background:${p.color}" title="${p.name}">${initials(p.name)}</span>
        </div>`;
      card.addEventListener('dragstart', e => {
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', t.id);
      });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
      card.querySelector('.del-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        tasks = tasks.filter(x => x.id !== t.id);
        render();
      });
      cardsCols[t.status].appendChild(card);
    });
    ['todo', 'doing', 'done'].forEach(s => {
      counts[s].textContent = tasks.filter(t => t.status === s).length;
    });
    renderStats(overdueCount);
    renderOwnerOptions();
  }

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function renderStats(overdueCount) {
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'done').length;
    const pct = total ? Math.round(done / total * 100) : 0;
    const row = document.getElementById('statsRow');
    row.innerHTML = `
      <div class="stat-card"><div class="stat-num">${total}</div><div class="stat-label">Tarefas totais</div></div>
      <div class="stat-card"><div class="stat-num">${tasks.filter(t => t.status === 'doing').length}</div><div class="stat-label">Em andamento</div></div>
      <div class="stat-card"><div class="stat-num" style="color:${overdueCount ? 'var(--danger)' : 'var(--text)'}">${overdueCount}</div><div class="stat-label">Atrasadas</div></div>
      <div class="stat-card"><div class="stat-num" style="color:var(--ok)">${pct}%</div><div class="stat-label">Concluído</div></div>
    `;
  }

  function renderOwnerOptions() {
    const sel = document.getElementById('inpOwner');
    if (sel.options.length) return;
    people.forEach(p => {
      const o = document.createElement('option');
      o.value = p.id;
      o.textContent = p.name;
      sel.appendChild(o);
    });
  }

  function renderTopAvatars() {
    const wrap = document.getElementById('topAvatars');
    wrap.innerHTML = people.map(p =>
      `<div class="av" style="background:${p.color}" title="${p.name}">${initials(p.name)}</div>`
    ).join('');
  }

  function renderTeam() {
    const wrap = document.getElementById('teamList');
    wrap.innerHTML = people.map(p => {
      const load = tasks.filter(t => t.owner === p.id && t.status !== 'done').length;
      return `<div class="team-row">
        <div class="team-person">
          <span class="card-avatar" style="background:${p.color};width:24px;height:24px;">${initials(p.name)}</span>
          ${p.name}
          <span class="status-chip ${p.status}"></span>
        </div>
        <span class="team-load">${load} tarefa${load === 1 ? '' : 's'}</span>
      </div>`;
    }).join('');
  }

  // drag & drop columns
  document.querySelectorAll('.column').forEach(col => {
    col.addEventListener('dragover', e => {
      e.preventDefault();
      col.classList.add('drag-over');
    });
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
    col.addEventListener('drop', e => {
      e.preventDefault();
      col.classList.remove('drag-over');
      const id = e.dataTransfer.getData('text/plain');
      const t = tasks.find(x => x.id === id);
      if (t) {
        const newStatus = col.dataset.status;
        if (t.status !== newStatus) {
          t.status = newStatus;
          render();
          renderTeam();
          pushFeed(`✅ "${trim(t.title)}" movida para ${statusLabel(newStatus)}`);
        }
      }
    });
  });

  function statusLabel(s) {
    return s === 'todo' ? 'A fazer' : s === 'doing' ? 'Em andamento' : 'Concluído';
  }

  function trim(s) {
    return s.length > 34 ? s.slice(0, 34) + '…' : s;
  }

  // modal
  const overlay = document.getElementById('overlay');
  let pendingStatus = 'todo';

  document.getElementById('openModalBtn').addEventListener('click', () => {
    pendingStatus = 'todo';
    openModal();
  });

  document.querySelectorAll('.add-card-btn').forEach(b => {
    b.addEventListener('click', () => {
      pendingStatus = b.dataset.status;
      openModal();
    });
  });

  document.getElementById('cancelBtn').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  function openModal() {
    document.getElementById('inpTitle').value = '';
    document.getElementById('inpDue').value = daysFromNow(3);
    document.getElementById('inpPrio').value = 'media';
    overlay.classList.add('open');
    document.getElementById('inpTitle').focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
  }

  document.getElementById('saveBtn').addEventListener('click', () => {
    const title = document.getElementById('inpTitle').value.trim();
    if (!title) {
      document.getElementById('inpTitle').focus();
      return;
    }
    let owner = document.getElementById('inpOwner').value;
    const prio = document.getElementById('inpPrio').value;
    const due = document.getElementById('inpDue').value || daysFromNow(3);

    const autoAssignOn = !document.querySelector('.toggle[data-rule="assign"]').classList.contains('off');
    if (autoAssignOn) {
      owner = leastLoadedPerson();
    }

    const t = { id: cryptoId(), title, owner, prio, due, status: pendingStatus };
    tasks.push(t);
    closeModal();
    render();
    renderTeam();
    pushFeed(`🆕 Nova tarefa criada: "${trim(title)}"`);
    if (autoAssignOn) {
      pushFeed(`🤖 Atribuída automaticamente a ${personOf(owner).name} (menor carga)`);
      showToast(`Automação: tarefa atribuída a ${personOf(owner).name}`);
    }
  });

  function leastLoadedPerson() {
    let best = people[0],
      bestLoad = Infinity;
    people.forEach(p => {
      const load = tasks.filter(t => t.owner === p.id && t.status !== 'done').length;
      if (load < bestLoad) { bestLoad = load;
        best = p; }
    });
    return best.id;
  }

  // automation feed (simulated)
  const feed = document.getElementById('feed');

  function pushFeed(text) {
    const item = document.createElement('div');
    item.className = 'feed-item';
    const now = new Date();
    item.innerHTML = `<span class="feed-time">${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span><span>${text}</span>`;
    feed.prepend(item);
    while (feed.children.length > 20) feed.removeChild(feed.lastChild);
  }

  function showToast(text) {
    const wrap = document.getElementById('toastWrap');
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `🤖 <span>${text}</span>`;
    wrap.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transition = '.3s';
      setTimeout(() => t.remove(), 300);
    }, 3200);
  }

  // toggles
  document.querySelectorAll('.toggle').forEach(tg => {
    tg.addEventListener('click', () => {
      tg.classList.toggle('off');
      const rule = tg.dataset.rule;
      const on = !tg.classList.contains('off');
      pushFeed(`⚙️ Regra "${rule}" ${on ? 'ativada' : 'desativada'}`);
    });
  });

  // simulated overdue-check automation
  function checkOverdue() {
    const overdueOn = !document.querySelector('.toggle[data-rule="overdue"]').classList.contains('off');
    if (!overdueOn) return;
    const overdue = tasks.filter(t => isOverdue(t.due, t.status));
    if (overdue.length) {
      const t = overdue[Math.floor(Math.random() * overdue.length)];
      pushFeed(`⏰ Prazo vencido: "${trim(t.title)}" — notificando ${personOf(t.owner).name}`);
    }
  }

  const seedEvents = [
    '🔌 WebSocket conectado ao servidor',
    '📡 Sincronizando estado do quadro...',
    '🤖 Motor de automação inicializado'
  ];

  renderTopAvatars();
  renderTeam();
  render();
  seedEvents.forEach(e => pushFeed(e));
  setTimeout(() => pushFeed('✅ Board sincronizado com sucesso'), 500);

  setInterval(checkOverdue, 9000);
})();