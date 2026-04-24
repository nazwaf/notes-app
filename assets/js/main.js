import './components/header-bar.js';
import './components/note-form.js';
import './components/note-list.js';
// Jika file CSS kamu berada di folder yang sama atau berbeda, pastikan path ini benar
import '../css/style.css'; 

const BASE_URL = 'https://notes-api.dicoding.dev/v2';
let allNotes = [];
let noteList;
let noteForm;

// --- Loading Overlay Setup ---
const loadingEl = document.createElement('div');
loadingEl.className = 'loading-overlay';
loadingEl.innerHTML = `
  <div class="spinner"></div>
  <p style="font-family: sans-serif; margin-top: 10px;">Mohon tunggu...</p>
`;
document.body.appendChild(loadingEl);

function showLoading() {
  loadingEl.style.display = 'flex';
  loadingEl.style.opacity = '1';
}

// Fungsi hideLoading dibuat async agar bisa memberikan jeda minimal 500ms
async function hideLoading() {
  await new Promise(resolve => setTimeout(resolve, 500)); // Delay minimal agar tidak berkedip
  loadingEl.style.opacity = '0';
  setTimeout(() => {
    loadingEl.style.display = 'none';
  }, 300);
}

// --- Main Application Logic ---
window.addEventListener('DOMContentLoaded', () => {
  noteList = document.querySelector('note-list');
  noteForm = document.querySelector('note-form');
  
  // Load catatan pertama kali
  fetchNotes(); 

  // Listener untuk custom event dari note-form.js
  document.addEventListener('note-added', (e) => addNote(e.detail));

  // Listener Klik Global (Perbaikan untuk tombol Navigasi)
  document.addEventListener('click', (e) => {
    // Menggunakan .closest agar ikon di dalam tombol tidak menghalangi klik
    const dashboardBtn = e.target.closest('#show-dashboard');
    const archivedBtn = e.target.closest('#show-archived');

    if (dashboardBtn) {
      fetchNotes();
      setActiveButton('show-dashboard');
      if (noteForm) noteForm.classList.remove('hidden'); // Tampilkan form
    }

    if (archivedBtn) {
      fetchArchivedNotes();
      setActiveButton('show-archived');
      if (noteForm) noteForm.classList.add('hidden'); // Sembunyikan form
    }
  });

  // Fitur Pencarian Real-time
  document.addEventListener('input', (e) => {
    if (e.target.id === 'search-input') {
      const keyword = e.target.value.toLowerCase();
      const filtered = allNotes.filter(
        n =>
          n.title.toLowerCase().includes(keyword) ||
          n.body.toLowerCase().includes(keyword)
      );
      noteList.renderNotes(filtered);
    }
  });
});

function setActiveButton(id) {
  document.querySelectorAll('.btn-nav').forEach((btn) => {
    btn.classList.remove('active');
  });
  
  const activeBtn = document.getElementById(id);
  if (activeBtn) activeBtn.classList.add('active');
}

// --- API Functions ---

async function fetchNotes() {
  showLoading();
  try {
    const res = await fetch(`${BASE_URL}/notes`);
    const result = await res.json();
    if (result.status === 'success') {
      allNotes = result.data.filter((n) => !n.archived);
      noteList.renderNotes(allNotes);
    }
  } catch (err) {
    console.error('Gagal memuat catatan:', err);
  } finally {
    await hideLoading();
  }
}

async function fetchArchivedNotes() {
  showLoading();
  try {
    const res = await fetch(`${BASE_URL}/notes/archived`);
    const result = await res.json();
    if (result.status === 'success') {
      allNotes = result.data;
      noteList.renderNotes(allNotes);
    }
  } catch (err) {
    console.error('Gagal memuat arsip:', err);
  } finally {
    await hideLoading();
  }
}

async function addNote(note) {
  showLoading();
  try {
    // Filter hanya title dan body untuk menghindari error "id is not allowed"
    const { title, body } = note; 
    
    const res = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });

    const result = await res.json();
    if (result.status === 'success') {
      fetchNotes();
      setActiveButton('show-dashboard');
      if (noteForm) noteForm.classList.remove('hidden');
    } else {
      throw new Error(result.message);
    }
  } catch (err) {
    alert("Gagal menambah catatan: " + err.message);
  } finally {
    await hideLoading();
  }
}

async function toggleArchive(id, isArchived) {
  showLoading();
  try {
    const action = isArchived ? 'unarchive' : 'archive';
    const res = await fetch(`${BASE_URL}/notes/${id}/${action}`, { method: 'POST' });
    const result = await res.json();

    if (result.status === 'success') {
      const isDashboardActive = document.querySelector('#show-dashboard').classList.contains('active');
      isDashboardActive ? fetchNotes() : fetchArchivedNotes();
    } else {
      throw new Error(result.message);
    }
  } catch (err) {
    alert(err.message);
  } finally {
    await hideLoading();
  }
}

async function deleteNote(id) {
  showLoading();
  try {
    const res = await fetch(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.status === 'success') {
      const isDashboardActive = document.querySelector('#show-dashboard').classList.contains('active');
      isDashboardActive ? fetchNotes() : fetchArchivedNotes();
    } else {
      throw new Error(result.message);
    }
  } catch (err) {
    alert(err.message);
  } finally {
    await hideLoading();
  }
}

export { toggleArchive, deleteNote };