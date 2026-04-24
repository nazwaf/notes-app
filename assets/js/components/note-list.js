import { toggleArchive, deleteNote } from '../main.js';

class NoteList extends HTMLElement {
  renderNotes(notes) {
    if (notes.length === 0) {
      this.innerHTML = `
        <div class="empty-state-wrapper">
          <div class="header-logo" style="justify-content: center; color: var(--primary); margin-bottom: 1rem;">
            <span class="material-symbols-outlined empty-state-icon">sticky_note_2</span>
            <span class="brand-name" style="font-size: 1.8rem;">Daftar Catatan</span>
          </div>
          <p style="font-size: 1.1rem; max-width: 400px; margin: 0 auto 1.5rem auto;">
            Halo! ayo mulai kelola ide dan tugas harian kamu di bawah ini.
          </p>
        </div>
      `;
      return;
    }

    this.innerHTML = `
      <div class="note-grid">
        ${notes.map(note => `
          <div class="note-card fade-in">
            <div class="note-content">
              <h3>${note.title}</h3>
              <p>${note.body}</p>
            </div>
            
            <div class="footer">
              <div class="date-wrapper">
                <span class="material-symbols-outlined" style="font-size: 14px;">calendar_today</span>
                <span class="date">${new Date(note.createdAt).toLocaleDateString('id-ID', { 
                  day: '2-digit', month: 'short' 
                })}</span>
              </div>
              
              <div class="actions">
                <button class="archive-btn" 
                        data-id="${note.id}" 
                        data-archived="${note.archived}" 
                        title="${note.archived ? 'Pindahkan ke Dashboard' : 'Arsipkan'}">
                  <span class="material-symbols-outlined">
                    ${note.archived ? 'unarchive' : 'archive'}
                  </span>
                </button>
                <button class="delete-btn" data-id="${note.id}" title="Hapus Permanen">
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    this.addEventListeners();
  }

  addEventListeners() {
    this.querySelectorAll('.archive-btn').forEach(btn =>
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const isArchived = btn.dataset.archived === 'true';
        
        // Animasi feedback kecil
        btn.style.transform = 'scale(1.2)';
        await toggleArchive(id, isArchived);
      })
    );

    this.querySelectorAll('.delete-btn').forEach(btn =>
      btn.addEventListener('click', async () => {
        if (confirm('Apakah kamu yakin ingin menghapus catatan ini?')) {
          const id = btn.dataset.id;
          const card = btn.closest('.note-card');
          
          // Efek visual sebelum hapus
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(async () => {
            await deleteNote(id);
          }, 300);
        }
      })
    );
  }
}

customElements.define('note-list', NoteList);