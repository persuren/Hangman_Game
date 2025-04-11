export async function getRandomWord() {
    try {
      const res = await fetch('https://random-word-api.herokuapp.com/word?number=1');
      const data = await res.json();
      return data[0].toLowerCase();
    } catch (error) {
      console.error("API'den kelime alınamadı. Yerel kelime kullanılacak.", error);
      // fallback kelimeler
      const fallbackWords = ["javascript", "python", "css", "html"];
      return fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
    }
  }
