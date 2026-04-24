class NoteForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="form-container">
        <form id="add-note-form" class="fade-in">
          <div class="form-header">
            <span class="material-symbols-outlined">edit_square</span>
            <h2>Buat Catatan Baru</h2>
          </div>

          <div class="form-group">
            <label for="note-title">Judul</label>
            <input 
              type="text" 
              id="note-title" 
              placeholder="Masukkan judul catatan..." 
              required 
              minlength="3"
            />
          </div>

          <div class="form-group">
            <label for="note-body">Isi Catatan</label>
            <textarea 
              id="note-body" 
              placeholder="Apa yang kamu pikirkan hari ini?" 
              rows="5" 
              required
            ></textarea>
          </div>

          <button type="submit" class="submit-btn">
            <span class="material-symbols-outlined">add_circle</span>
            Simpan ke Dashboard
          </button>
        </form>
      </section>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = this.querySelector('#add-note-form');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = this.querySelector('#note-title').value.trim();
      const body = this.querySelector('#note-body').value.trim();

      // Dispatch event ke parent (main.js biasanya yang menangkap ini)
      this.dispatchEvent(new CustomEvent('note-added', {
        detail: { 
          id: `notes-${Math.random().toString(36).substr(2, 9)}`,
          title, 
          body,
          createdAt: new Date().toISOString(),
          archived: false 
        },
        bubbles: true,
        composed: true
      }));

      // Efek visual sukses sederhana sebelum reset
      const btn = this.querySelector('.submit-btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Tersimpan!';
      btn.style.background = '#4caf50';

      setTimeout(() => {
        form.reset();
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 1500);
    });
  }
}

customElements.define('note-form', NoteForm);