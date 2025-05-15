import { faker } from "@faker-js/faker";
import { db } from "@/server/db";

function makeAnagram(word: string) {
	const chars = word.split("");
	for (let i = chars.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[chars[i], chars[j]] = [chars[j], chars[i]];
	}
	const scrambled = chars.join("");

	if (scrambled === word) {
		return makeAnagram(word);
	}

	return scrambled;
}

export async function seedWords() {
	console.log("✏️ Seeding words...");

	const words = new Set<string>();

	console.log("⚙️ Generating word list...");
	while (words.size < 365) {
		const word = faker.word.sample();

		if (word.length > 4 && word.length < 10 && !word.includes("-")) {
			words.add(word.toLowerCase());
		}
	}

	console.log("💾 Inserting words into database...");
	await db.word.createMany({
		data: Array.from(words).map((word) => ({
			originalWord: word,
			anagram: makeAnagram(word),
		})),
	});

	console.log("✅ Seeding words complete");
}

seedWords();
