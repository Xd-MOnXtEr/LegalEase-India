import { WordTokenizer } from 'natural';
const tokenizer = new WordTokenizer();

const generateResponse = (query: string, knowledgeBase: Record<string, string>) => {
  const lowerCaseQuery = query.toLowerCase();
  const tokens = tokenizer.tokenize(lowerCaseQuery);
  let bestMatch = '';
  let highestScore = 0;

  // Check for specific keywords related to criminal law
  if (lowerCaseQuery.includes('murder')) {
    return knowledgeBase['murder'];
  }
  if (lowerCaseQuery.includes('kidnapping')) {
    return knowledgeBase['kidnapping'];
  }
  if (lowerCaseQuery.includes('ransom')) {
    return knowledgeBase['ransom'];
  }
  if (lowerCaseQuery.includes('extortion')) {
    return knowledgeBase['extortion'];
  }
  if (lowerCaseQuery.includes('rape')) {
    return knowledgeBase['rape'];
  }
  if (lowerCaseQuery.includes('domestic violence')) {
    return knowledgeBase['domestic violence'];
  }

  for (const [keyword, response] of Object.entries(knowledgeBase)) {
    const keywordTokens = tokenizer.tokenize(keyword.toLowerCase());
    const score = tokens.filter(token => keywordTokens.includes(token)).length;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = response;
    }
  }

  return bestMatch || "I'm sorry, I don't have information on that topic. Please ask about specific areas of Indian law.";
};

export default generateResponse;
