import { useState } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import generateResponse from './NLPResponseGenerator';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

const legalKnowledgeBase = {
  "fundamental rights": "Under the Indian Constitution, fundamental rights include Right to Equality (Articles 14-18), Right to Freedom (Articles 19-22), Right against Exploitation (Articles 23-24), Right to Freedom of Religion (Articles 25-28), Cultural and Educational Rights (Articles 29-30), and Right to Constitutional Remedies (Article 32).",
  "right to equality": "Right to Equality (Articles 14-18) guarantees equality before law, prohibition of discrimination, equality of opportunity in public employment, abolition of untouchability, and abolition of titles.",
  "article 14": "Article 14 of the Indian Constitution guarantees equality before the law and equal protection of the laws to all persons within the territory of India.",
  "right to freedom": "Right to Freedom (Articles 19-22) includes freedom of speech and expression, assembly, association, movement, residence, and profession, subject to reasonable restrictions.",
  
  "rti": "The Right to Information Act, 2005 empowers Indian citizens to request information from any public authority. The application fee is ₹10, and you should receive a response within 30 days. For BPL cardholders, no fee is required. You can file applications online or physically to the Public Information Officer of the relevant department.",
  "file rti": "To file an RTI: 1) Identify the department holding the information, 2) Write an application addressed to the PIO (Public Information Officer), 3) Pay the fee of ₹10 (fee exempted for BPL cardholders), 4) Submit in person, by post, or online through rtionline.gov.in. You should receive a response within 30 days.",
  
  "divorce": "In India, divorce can be obtained under the Hindu Marriage Act, Special Marriage Act, Muslim Personal Law, or other personal laws depending on your religion. Grounds include cruelty, desertion (2+ years), conversion to another religion, mental disorder, communicable disease, presumption of death, and mutual consent. Mutual consent divorce typically takes 6-18 months.",
  "divorce process": "The divorce process in India generally involves: 1) Filing a petition in family court, 2) Court issues notice to the spouse, 3) Appearance and response by the spouse, 4) Mediation attempts, 5) Evidence presentation if contested, 6) Final arguments, 7) Court judgment. For mutual consent divorces, there's a mandatory 6-month cooling period between first and second motion.",
  "marriage registration": "Marriage registration in India can be done under either the Hindu Marriage Act or the Special Marriage Act. Documents required typically include: proof of age, residence proof, photographs, and marriage invitation card (if applicable). The process involves submitting an application to the local Sub-Registrar's office with the required documents and fee.",
  "adoption": "Adoption in India is governed by the Hindu Adoption and Maintenance Act (for Hindus) and the Juvenile Justice Act (secular law applicable to all). Prospective parents must register with the Central Adoption Resource Authority (CARA) and follow their procedure. Inter-country adoptions are also regulated by CARA in compliance with the Hague Convention.",
  
  "property": "Property disputes in India are addressed through civil courts. For effective resolution, maintain proper documentation including sale deeds, gift deeds, property tax receipts, mutation records, and inheritance documents. Issues like boundary disputes, title disputes, and ancestral property disputes are common and may require separate lawsuit proceedings.",
  "property inheritance": "Property inheritance in India is governed by personal laws based on religion. For Hindus, the Hindu Succession Act applies, with amendments in 2005 giving equal rights to daughters in ancestral property. Muslims follow Sharia law with different rules for Sunni and Shia communities. Christians and Parsis follow the Indian Succession Act.",
  "tenant rights": "Tenant rights in India are governed by state-specific Rent Control Acts. Generally, tenants have rights to: 1) Proper rent receipts, 2) Notice before eviction, 3) Essential services like water and electricity, 4) Privacy from landlord's intrusion, 5) Protection from arbitrary rent increases as per state laws, 6) Refund of security deposit upon vacating.",
  "land acquisition": "Land acquisition in India is governed by the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013. It requires social impact assessment, consent from affected families (70-80% depending on purpose), fair compensation (2-4 times market value in rural areas, 2 times in urban areas), and rehabilitation provisions.",
  
  "murder": "Murder is defined under Section 300 of the Indian Penal Code (IPC) as the unlawful killing of a person with intent to cause death or with knowledge that the act is likely to cause death. It is punishable under Section 302 with death or life imprisonment and a fine.",
  "kidnapping": "Kidnapping is covered under Sections 359 to 369 of the IPC. It involves taking or enticing a person away from their lawful guardianship without consent. Kidnapping from India and kidnapping from lawful guardianship are the two types recognized.",
  "extortion": "Extortion is defined under Section 383 of the IPC as intentionally putting a person in fear of injury to induce them to deliver property or valuable security. It is punishable under Section 384 with imprisonment up to three years, or with fine, or both.",
  "nsa act": "The National Security Act (NSA) of 1980 allows for preventive detention of individuals who pose a threat to national security, public order, or the maintenance of essential supplies and services. It permits detention without charge for up to 12 months, with periodic reviews every three months by an advisory board.",
  "fir": "To file an FIR (First Information Report): 1) Visit the police station with jurisdiction over the incident area, 2) Report the incident verbally or in writing to the officer in charge, 3) The officer must register your complaint for cognizable offenses, 4) Read the FIR before signing to ensure accuracy, 5) Collect a free copy of the FIR. If police refuse to register, you can approach the Superintendent of Police or file a complaint with the magistrate under CrPC Section 156(3).",
  "bail": "Bail in India is categorized as: 1) Regular Bail - applied when the accused is in judicial custody, 2) Anticipatory Bail - sought before arrest under CrPC Section 438, 3) Interim Bail - temporary bail until the regular bail hearing. Offenses are classified as bailable (granted as a right) and non-bailable (discretion of the court). Conditions for bail typically include surrendering passport, regular court appearances, and not tampering with evidence.",
  "section 498a": "Section 498A of the Indian Penal Code deals with matrimonial cruelty. It criminalizes harassment of a woman by her husband or his relatives. The offense is non-bailable, cognizable, and non-compoundable (case cannot be withdrawn). Supreme Court has issued guidelines to prevent misuse, including establishing family welfare committees to examine complaints before arrests.",
  
  "consumer rights": "Under the Consumer Protection Act, 2019, Indian consumers have the right to: 1) Safety, 2) Information, 3) Choice, 4) Redressal, 5) Consumer education, 6) Protection from unfair trade practices. Complaints can be filed at District, State, or National Consumer Disputes Redressal Commission depending on the claim amount.",
  "consumer complaint": "To file a consumer complaint: 1) Approach the business first with your grievance, 2) If unresolved, file a formal complaint with the appropriate Consumer Commission (District/State/National based on claim amount), 3) Include details of the complaint, supporting documents, and relief sought, 4) Pay the nominal fee, 5) Alternative online filing is available at edaakhil.nic.in.",
  "e-commerce rights": "For e-commerce purchases in India, consumers have rights under the Consumer Protection (E-Commerce) Rules, 2020, including: 1) Clear information about sellers, products, and prices, 2) Cancellation rights, 3) Refund policies, 4) Grievance redressal mechanism, 5) Protection from unfair trade practices like fake reviews. Platforms cannot manipulate prices or misrepresent quality.",
  
  "employment": "Employment in India is governed by various laws including the Industrial Disputes Act, Factories Act, Payment of Wages Act, and more recently, the Code on Wages, 2019. These laws cover minimum wages, working hours (typically 48 hours/week), overtime payment, leave entitlement, termination procedures, and social security benefits.",
  "maternity benefits": "Under the Maternity Benefit (Amendment) Act, 2017, working women in India are entitled to: 1) 26 weeks of paid maternity leave for the first two children (12 weeks for third child onwards), 2) 12 weeks for adoptive and commissioning mothers, 3) Work-from-home options post-leave, 4) Crèche facilities in establishments with 50+ employees, 5) No termination during pregnancy/maternity leave.",
  "sexual harassment": "Workplace sexual harassment in India is addressed by the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. Every organization with 10+ employees must have an Internal Complaints Committee. Complaints should be filed within 3 months of the incident. Employers must provide a safe working environment and display the consequences of sexual harassment prominently.",
  
  "legal aid": "Free legal aid in India is available through Legal Services Authorities at National, State, District, and Taluk levels under the Legal Services Authorities Act, 1987. Eligible beneficiaries include women, children, persons with disabilities, victims of trafficking, industrial workmen, SC/ST members, natural disaster victims, and persons with annual income below specified limits. Contact your nearest Legal Services Authority or visit nalsa.gov.in.",
  "pro bono lawyer": "For pro bono legal assistance in India: 1) Contact your State or District Legal Services Authority, 2) Approach NGOs like Human Rights Law Network or iProBono, 3) Check with the Supreme Court Legal Services Committee or High Court Legal Services Committees, 4) Use the Department of Justice's Tele-Law service (14141), 5) Visit the nearest legal aid clinic at law schools.",
  
  "cyber crime": "To report cybercrimes in India: 1) File a complaint on the National Cyber Crime Reporting Portal (cybercrime.gov.in), 2) Call the Cyber Crime Helpline (1930), 3) Visit the nearest Cyber Crime Police Station, 4) For financial fraud, report within 24 hours for better chance of recovering funds. Common cybercrimes include phishing, identity theft, online harassment, data breach, and financial fraud.",
  "online harassment": "For online harassment in India: 1) Preserve evidence (screenshots, URLs, messages), 2) Report to the platform, 3) File complaint on cybercrime.gov.in or call 1930, 4) File an FIR at local police station mentioning IPC Sections 354A, 354D, 507, 509 and IT Act Sections 66E, 67, 67A as applicable. For immediate assistance against objectionable content, use National Cybercrime Reporting Portal's 'Report & Remove' feature.",
  "data privacy": "Data privacy in India is currently governed by the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. The Digital Personal Data Protection Act, 2023 will provide a more comprehensive framework once fully implemented, giving individuals rights over their personal data and imposing obligations on data processors.",
  
  "citizenship": "Indian citizenship can be acquired by birth, descent, registration, or naturalization under the Citizenship Act, 1955. For citizenship by registration, one must have resided in India for 7 years. For naturalization, the requirement is 12 years of residence with no more than 12 months absence during the final year. The Citizenship Amendment Act, 2019 created a pathway for certain religious minorities from Afghanistan, Bangladesh, and Pakistan.",
  "oci card": "Overseas Citizen of India (OCI) card provides: 1) Multiple-entry, multi-purpose lifelong visa to India, 2) Exemption from foreigner registration, 3) Parity with NRIs in economic, financial, and educational fields (except property and agricultural land purchases), 4) No voting rights or government jobs. Eligible applicants include former Indian citizens, their descendants up to the 4th generation, and spouses of Indian citizens/OCIs.",
  "visa types": "Common Indian visa types include: Tourist visa (up to 10 years), e-Tourist visa (1-5 years), Business visa (up to 5 years), Employment visa (duration of contract), Student visa (duration of course), Medical visa (up to 1 year), Conference visa (event duration), and Research visa (up to 5 years). Each has specific documentation requirements and restrictions.",
  
  "will": "A legally valid will in India requires: 1) Testator must be of sound mind and at least 21 years old, 2) Signed by the testator, 3) Attested by two or more witnesses who have seen the testator sign, 4) Witnesses should not be beneficiaries. Registration of wills is optional but recommended. For Muslims, will-making is governed by Islamic law limiting bequests to one-third of property to non-heirs.",
  "probate": "Probate is a court certificate validating a will. In India, it's mandatory in the presidency towns of Kolkata, Mumbai, and Chennai. The process involves: 1) Filing petition in the High Court or District Court with jurisdiction, 2) Submitting original will, death certificate, and other supporting documents, 3) Court issues notice to family members and publishes citation in newspaper, 4) After addressing any objections, the court grants probate.",
  
  "habeas corpus": "Habeas Corpus is a constitutional remedy under Article 32 and 226 of the Indian Constitution. It's a writ directing a person detaining another to produce the detainee before the court to examine the legality of detention. It safeguards personal liberty against unlawful detention by both state and private individuals.",
  "pil": "Public Interest Litigation (PIL) in India allows any public-spirited person to approach the Supreme Court (Article 32) or High Courts (Article 226) for protection of public interest. PILs address issues affecting public at large, particularly marginalized sections. The court can take suo moto cognizance and has relaxed traditional locus standi requirements for PILs.",
  
  "hello": "Hello! I'm your AI legal assistant. How can I help you with legal information today?",
  "hi": "Hi there! How can I assist you with legal matters today?",
  "how are you": "I'm functioning well, thank you! I'm here to provide legal information based on Indian law. What can I help you with?",
  "thank you": "You're welcome! If you have more legal questions in the future, feel free to ask.",
  "thanks": "You're welcome! Happy to help with any more legal questions.",
  "bye": "Goodbye! If you have more legal questions later, feel free to return.",
  
  "new laws": "Some notable recent Indian laws include: The Digital Personal Data Protection Act, 2023; The Bharatiya Nyaya Sanhita, 2023 (replacing IPC); The Bharatiya Nagarik Suraksha Sanhita, 2023 (replacing CrPC); The Bharatiya Sakshya Adhiniyam, 2023 (replacing Indian Evidence Act); and The Telecommunications Act, 2023.",
  
  "data protection act": "The Digital Personal Data Protection Act, 2023 was enacted on August 11, 2023. It establishes a framework for processing digital personal data, protecting individuals' privacy while enabling lawful data processing. Key features include: consent-based data processing, purpose limitation, data minimization, accuracy requirements, storage limitation, and security measures. It also establishes a Data Protection Board of India.",
  
  "criminal law reform": "In 2023, India overhauled its criminal justice system by replacing colonial-era laws with three new codes: 1) Bharatiya Nyaya Sanhita (replacing IPC) - introduces community service as punishment, defines terrorism, and includes new provisions for mob lynching; 2) Bharatiya Nagarik Suraksha Sanhita (replacing CrPC) - mandates electronic FIRs and introduces zero FIR concept; 3) Bharatiya Sakshya Adhiniyam (replacing Indian Evidence Act) - modernizes evidence collection including electronic and digital evidence.",
  
  "telecommunications act": "The Telecommunications Act, 2023 replaces the 138-year-old Indian Telegraph Act. It simplifies licensing, recognizes spectrum as a valuable resource, creates a non-auction pathway for satellite broadband, establishes a Digital Bharat Nidhi (fund for rural connectivity), includes right of way provisions, and enhances user protection with stringent KYC requirements.",
  
  "mediation act": "The Mediation Act, 2023 promotes mediation as an alternative dispute resolution mechanism. It mandates pre-litigation mediation in certain cases, establishes the Mediation Council of India as a regulatory body, provides for enforcement of mediated settlement agreements, and includes online mediation provisions.",
  
  "insolvency bankruptcy code amendment": "The Insolvency and Bankruptcy Code (Amendment) Act, 2023 improves the insolvency resolution framework by allowing admission or withdrawal of insolvency applications with approval from 90% of creditors, streamlining the Corporate Insolvency Resolution Process, and addressing delays in admission of applications.",
  
  "waqf amendment bill": "The Waqf (Amendment) Bill, 2024 proposes significant changes to the Waqf Act, 1995, including renaming the 'Waqf Board' to 'Bharat Waqf Board', establishing a Central Waqf Council with broader representation, and requiring documentary evidence for property registration as waqf property. The bill is currently under parliamentary consideration."
};

interface ChatMessage {
  content: string;
  sender: 'user' | 'bot';
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: "Hello! I'm your AI legal assistant. How can I help you with legal information based on Indian law today?",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { content: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and show loading
    setInput('');
    setIsLoading(true);
    
    try {
      // Process the query with our knowledge base and Gemini API
      const response = await generateResponse(input, legalKnowledgeBase);
      const botMessage = { content: response, sender: 'bot' as const };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage = { 
        content: "I'm sorry, I encountered an error while processing your question. Please try again later.", 
        sender: 'bot' as const 
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error("Error generating response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        content: "Hello! I'm your AI legal assistant. How can I help you with legal information based on Indian law today?",
        sender: 'bot'
      }
    ]);
    toast.success("Chat history cleared");
  };

  return (
    <Card className="w-full border border-justice-200 shadow-sm overflow-hidden">
      <div className="bg-justice-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">LegalEase AI Assistant</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearChat} 
          className="text-white hover:text-white/80 hover:bg-justice-700"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Clear Chat
        </Button>
      </div>
      
      <CardContent className="p-0">
        <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              content={message.content} 
              sender={message.sender} 
              index={index} 
            />
          ))}
          
          {isLoading && <TypingIndicator />}
        </div>
        
        <div className="p-4 border-t border-gray-200 flex gap-2">
          <Input
            placeholder="Ask a legal question based on Indian law..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!input.trim() || isLoading}
            className="bg-justice-600 hover:bg-justice-700"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
