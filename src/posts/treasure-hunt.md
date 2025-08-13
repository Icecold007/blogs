---
title: Treasure-Hunt
description: first post
date: '2025-08-13'
categories:
  - Overview
  - Game's Core Logic
  - Frontend
  - Backend
  - Conclusion
published: true
---

## Crafting a Full-Stack Treasure Hunt with SvelteKit and Supabase

After a long slumber, I was eager to build something truly interactive, a project that involved state, security and a dynamic user experience. I was given the opportunity to build a digital Treasure Hunt application by a student forum in my university.This led me to create a digital Treasure Hunt application.

**The concept was simple:** players receive a clue, solve it to find a location and enter a code to get the next clue. The challenge was building a robust system to manage this game loop securely. That’s when I turned to the powerful duo of **SvelteKit** and **Supabase**. SvelteKit provides a seamless full-stack framework, while Supabase offers a simple yet powerful database backend.

---

### Designing the Game's Core Logic

Before writing any code, I needed to establish the rules. How could I ensure players followed the clues in order and didn't just guess the final answer? The solution was a three-code validation system.

1. **Team Code**: A unique code for each team. This is the primary identifier for tracking a team's progress through the hunt.
2. **Location Code**: The "answer" to a given clue. This code confirms that a team has successfully solved the puzzle.
3. **Clue Code**: The secret ingredient. This code is given with a _new clue_ and must be submitted with the _next answer_. This brilliantly ensures that a team can't skip ahead, as they need the code from Clue A to unlock Clue B.

With this logic, every submission would require a valid combination of who you are (`Team Code`), where you are (`Location Code`), and where you just came from (`Clue Code`).

---

### The Frontend: An Interactive Svelte Interface

For the user interface, I wanted a clean form that could intelligently react to the user's submission. SvelteKit makes this incredibly straightforward.

The UI consists of a single form and a display area. This display area either shows the next clue on a successful submission or an error message if the codes are incorrect.

Here’s a look at the Svelte component:

```svelte
<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 p-8 text-white">
	<h1 class="mb-8 text-center text-3xl font-bold text-[#45b2a9]">Treasure Hunt</h1>

	{#if form?.message}
		<div
			class="mb-4 rounded p-3 text-center text-lg font-bold"
			class:bg-green-600={form?.success}
			class:bg-red-500={!form?.success}
		>
			{form.message}
		</div>
	{/if}

	{#if form?.success && form?.nextClue}
		<div class="my-6 rounded-md bg-gray-700 p-4 text-center">
			<h3 class="mb-2 text-xl font-bold text-[#45b2a9]">Next Clue:</h3>
			<p class="text-lg whitespace-pre-wrap">{form.nextClue}</p>
			<h3 class="text-#45b2a9 mb-2 text-xl font-bold">Please Remember This!!</h3>
		</div>
	{:else if !form?.success || (form?.success && !form?.nextClue)}
		<form method="POST" use:enhance class="mx-auto mt-8 max-w-md ...">
			<input type="text" name="teamcode" placeholder="Team Code" required ... />
			<input type="text" name="locationcode" placeholder="Location Code" required ... />
			<input type="text" name="cluescode" placeholder="Clue Code" required ... />
			<button type="submit" ...>Submit</button>
		</form>
	{/if}
</div>
```

---

### The key features here are:

`use:enhance`: This is SvelteKit’s tool for progressive enhancement. It takes a standard HTML form and gives it modern, app-like behavior, preventing a full-page reload on submission.

`export let form`: This prop receives the data returned from our backend action.

`Conditional Blocks`: The UI dynamically changes based on the contents of the form object. If `form.success` is true, it shows the next clue. Otherwise, it displays an error, and the form remains visible.

---

### The Backend: SvelteKit Actions & Supabase Validation

This is where the magic happens. When the user submits the form, SvelteKit runs a form action securely on the server. This action contains the entire validation logic.

Here’s a look at the Typescript component:

```typescript
import { supabase } from '$lib/supabase';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const teamcode = String(formData.get('teamcode') || '')
			.trim()
			.toUpperCase();
		const locationcode = String(formData.get('locationcode') || '')
			.trim()
			.toUpperCase();
		const cluescode = String(formData.get('cluescode') || '')
			.trim()
			.toUpperCase();

		const { data, error } = await supabase.from('treasure').select('*').ilike('teamcode', teamcode);

		if (error || !data || data.length === 0) {
			return { success: false, message: 'Invalid team code.' };
		}

		const teamData = data[0];

		const isLocationCorrect = String(teamData.locationcode).trim().toUpperCase() === locationcode;
		const isClueCorrect = String(teamData.cluescode).trim().toUpperCase() === cluescode;

		if (isLocationCorrect && isClueCorrect) {
			return {
				success: true,
				message: 'Correct! You have unlocked the next clue.',
				nextClue: teamData.riddleanswer
			};
		} else {
			return { success: false, message: 'Incorrect details. Please try again.' };
		}
	}
};
```

---

## Conclusion

With SvelteKit's form actions and Supabase's simple API, building a secure, full-stack application like this is remarkably streamlined. The entire game loop—from user input to server validation and back to a UI update—is handled elegantly within the SvelteKit framework. It was the perfect toolset to bring this interactive treasure hunt to life!

---
