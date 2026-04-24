class NoteItem extends HTMLElement {
  set noteData(note) {
    this.render(note);
  }

  render(note) {
    this.innerHTML = `
      <div class="note-card">
        <div class="note-content">
          <h3>${note.title}</h3>
          <p>${note.body}</p>
        </div>
        
        <div class="footer">
          <div class="date-wrapper">
            <span class="material-symbols-outlined" style="font-size: 14px;">calendar_today</span>
            <span class="date">${new Date(note.createdAt).toLocaleDateString('id-ID', { 
              day: '2-digit', 
              month: 'short', 
              year: 'numeric' 
            })}</span>
          </div>
          
          <div class="actions">
            <button class="delete-btn" data-id="${note.id}" title="Hapus Catatan">
              <span class="material-symbols-outlined">delete_outline</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.querySelector('.delete-btn').addEventListener('click', () => {
      // Efek visual sebelum benar-benar terhapus
      this.style.opacity = '0.5';
      this.style.transform = 'scale(0.9)';
      
      this.dispatchEvent(
        new CustomEvent('delete-note', {
          detail: { id: note.id },
          bubbles: true,
          composed: true
        })
      );
    });
  }
}

customElements.define('note-item', NoteItem);