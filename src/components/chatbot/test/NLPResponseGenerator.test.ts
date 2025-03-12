import generateResponse from '../NLPResponseGenerator';
import legalKnowledgeBase from '../LegalKnowledgeBase';

describe('NLPResponseGenerator', () => {
  it('should return the correct response for murder', () => {
    const query = 'What is murder?';
    const response = generateResponse(query, legalKnowledgeBase);
    expect(response).toContain('Murder is defined under Section 300 of the Indian Penal Code (IPC)');
  });

  it('should return the correct response for kidnapping', () => {
    const query = 'Tell me about kidnapping';
    const response = generateResponse(query, legalKnowledgeBase);
    expect(response).toContain('Kidnapping is defined under Sections 359-374 of the IPC');
  });

  it('should return the correct response for ransom', () => {
    const query = 'What is ransom?';
    const response = generateResponse(query, legalKnowledgeBase);
    expect(response).toContain('Ransom is the payment demanded for the release of a kidnapped person');
  });

  it('should return the correct response for extortion', () => {
    const query = 'Explain extortion';
    const response = generateResponse(query, legalKnowledgeBase);
    expect(response).toContain('Extortion is defined under Section 383 of the IPC');
  });

  it('should return the correct response for rape', () => {
    const query = 'What are the laws regarding rape?';
    const response = generateResponse(query, legalKnowledgeBase);
    expect(response).toContain('Rape is defined under Section 375 of the IPC');
  });

  it('should return the correct response for domestic violence', () => {
    const query = 'Tell me about domestic violence';
    const response = generateResponse(query, legalKnowledgeBase);
    expect(response).toContain('Domestic violence is addressed under the Protection of Women from Domestic Violence Act, 2005');
  });

  it('should return a default message for unknown queries', () => {
    const query = 'What is something unrelated?';
    const response = generateResponse(query, legalKnowledgeBase);
    expect(response).toBe("I'm sorry, I don't have information on that topic. Please ask about specific areas of Indian law.");
  });
});
