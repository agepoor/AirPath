<script>
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

	let noteText = '';
	let notes = []; // Array to store notes as objects
	let editIndex = null; // Index of the note being edited

	// Function to add or update a note
	function saveNote() {
		if (noteText.trim() !== '') {
			const now = new Date().toISOString();
			if (editIndex !== null) {
				notes[editIndex].text = noteText; // Update the note text
				notes[editIndex].lastEditedAt = now; // Update last edit time
				editIndex = null; // Reset edit index
			} else {
				notes = [{ text: noteText, createdAt: now, lastEditedAt: now }, ...notes]; // Add new note
			}
			noteText = ''; // Clear the input field
		}
		// Sort notes by last edited time
		notes.sort((a, b) => new Date(b.lastEditedAt) - new Date(a.lastEditedAt));
	}

	// Function to edit a note
	function editNote(index) {
		noteText = notes[index].text;
		editIndex = index; // Set edit index
	}

	// Function to remove a note
	function removeNote(index) {
		notes = notes.filter((_, i) => i !== index);
	}

	let typeOrEdit = false;
	$: typeOrEdit = noteText !== '' || editIndex !== null;
</script>

<div class="notes">
	<div class="notes-list">
		<div class="note card">
			<form on:submit|preventDefault={saveNote}>
				<textarea
					bind:value={noteText}
					placeholder="Enter your note here"
					rows="4"
					spellcheck="false"
				></textarea>
				<button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
			</form>
		</div>
		{#each notes as { text, createdAt, lastEditedAt }, index}
			<div class="note card">
				<div class="note-date">
					<p>
						{new Date(createdAt).toLocaleString('nl-NL', {
							day: '2-digit',
							month: '2-digit',
							hour: '2-digit',
							minute: '2-digit'
						})}
					</p>
					<p>
						Laatst gewijzigd: {new Date(lastEditedAt).toLocaleString('nl-NL', {
							day: '2-digit',
							month: '2-digit',
							hour: '2-digit',
							minute: '2-digit'
						})}
					</p>
				</div>
				<p>{text}</p>
				<div class="note-actions">
					<button class="edit" on:click={() => editNote(index)} disabled={typeOrEdit}>
						<FontAwesomeIcon icon={faEdit} />
					</button>
					<button class="remove" on:click={() => removeNote(index)} disabled={typeOrEdit}>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- Style remains unchanged -->

<style>
	.notes {
		width: 700px;
		/* padding: 1rem;
		background-color: #f3f3f3;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
	}
	.notes-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.note.card {
		background-color: #fff;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 1rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}
	.note.card p {
		margin: 0;
		padding: 0.5rem 0;
	}
	.note.card form {
		display: flex;
		gap: 0.5rem;
	}
	.note.card textarea {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		resize: vertical; /* Allows vertical resizing */
	}
	.note.card button {
		background: var(--light-button);
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		/* background-color: #e6e6e6; Light gray for buttons */
		/* color: black; */
	}
	.note.card button:hover {
		background: var(--light-button-hover);
	}
	.note.card button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
	.note-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
	}
	.note-actions button {
		padding: 0.5rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		background: var(--light-button);
	}
	.note-actions button:hover {
		background: var(--light-button-hover);
	}
	.note-date {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
	}
	.note-date p {
		/* font-style: italic; */
		font-size: 0.7rem;
		color: #aaa;
	}
</style>
