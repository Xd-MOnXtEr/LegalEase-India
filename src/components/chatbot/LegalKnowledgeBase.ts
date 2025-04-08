
const legalKnowledgeBase = {
  // Existing legal knowledge base for Indian law
  "fundamental rights": "Under the Indian Constitution, fundamental rights include Right to Equality (Articles 14-18), Right to Freedom (Articles 19-22), Right against Exploitation (Articles 23-24), Right to Freedom of Religion (Articles 25-28), Cultural and Educational Rights (Articles 29-30), and Right to Constitutional Remedies (Article 32).",
  "right to equality": "Right to Equality (Articles 14-18) guarantees equality before law, prohibition of discrimination, equality of opportunity in public employment, abolition of untouchability, and abolition of titles.",
  "article 14": "Article 14 of the Indian Constitution guarantees equality before the law and equal protection of the laws to all persons within the territory of India.",
  "right to freedom": "Right to Freedom (Articles 19-22) includes freedom of speech and expression, assembly, association, movement, residence, and profession, subject to reasonable restrictions.",
  
  // RTI
  "rti": "The Right to Information Act, 2005 empowers Indian citizens to request information from any public authority. The application fee is ₹10, and you should receive a response within 30 days. For BPL cardholders, no fee is required. You can file applications online or physically to the Public Information Officer of the relevant department.",
  "right to information act": "The Right to Information Act, 2005 empowers Indian citizens to request information from any public authority. The application fee is ₹10, and you should receive a response within 30 days. For BPL cardholders, no fee is required. You can file applications online or physically to the Public Information Officer of the relevant department.",
  "file rti": "To file an RTI: 1) Identify the department holding the information, 2) Write an application addressed to the PIO (Public Information Officer), 3) Pay the fee of ₹10 (fee exempted for BPL cardholders), 4) Submit in person, by post, or online through rtionline.gov.in. You should receive a response within 30 days.",
  
  // Family Law
  "divorce": "In India, divorce can be obtained under the Hindu Marriage Act, Special Marriage Act, Muslim Personal Law, or other personal laws depending on your religion. Grounds include cruelty, desertion (2+ years), conversion to another religion, mental disorder, communicable disease, presumption of death, and mutual consent. Mutual consent divorce typically takes 6-18 months.",
  "divorce process": "The divorce process in India generally involves: 1) Filing a petition in family court, 2) Court issues notice to the spouse, 3) Appearance and response by the spouse, 4) Mediation attempts, 5) Evidence presentation if contested, 6) Final arguments, 7) Court judgment. For mutual consent divorces, there's a mandatory 6-month cooling period between first and second motion.",
  "marriage registration": "Marriage registration in India can be done under either the Hindu Marriage Act or the Special Marriage Act. Documents required typically include: proof of age, residence proof, photographs, and marriage invitation card (if applicable). The process involves submitting an application to the local Sub-Registrar's office with the required documents and fee.",
  "adoption": "Adoption in India is governed by the Hindu Adoption and Maintenance Act (for Hindus) and the Juvenile Justice Act (secular law applicable to all). Prospective parents must register with the Central Adoption Resource Authority (CARA) and follow their procedure. Inter-country adoptions are also regulated by CARA in compliance with the Hague Convention.",
  
  // Property Law
  "property": "Property disputes in India are addressed through civil courts. For effective resolution, maintain proper documentation including sale deeds, gift deeds, property tax receipts, mutation records, and inheritance documents. Issues like boundary disputes, title disputes, and ancestral property disputes are common and may require separate lawsuit proceedings.",
  "property inheritance": "Property inheritance in India is governed by personal laws based on religion. For Hindus, the Hindu Succession Act applies, with amendments in 2005 giving equal rights to daughters in ancestral property. Muslims follow Sharia law with different rules for Sunni and Shia communities. Christians and Parsis follow the Indian Succession Act.",
  "tenant rights": "Tenant rights in India are governed by state-specific Rent Control Acts. Generally, tenants have rights to: 1) Proper rent receipts, 2) Notice before eviction, 3) Essential services like water and electricity, 4) Privacy from landlord's intrusion, 5) Protection from arbitrary rent increases as per state laws, 6) Refund of security deposit upon vacating.",
  "land acquisition": "Land acquisition in India is governed by the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013. It requires social impact assessment, consent from affected families (70-80% depending on purpose), fair compensation (2-4 times market value in rural areas, 2 times in urban areas), and rehabilitation provisions.",
  
  // Criminal Law (UPDATED FROM IPC TO BNS)
  "murder": "Murder is defined under Section 103 of the Bharatiya Nyaya Sanhita (BNS) as the intentional killing of another person. It is a non-bailable offense and can lead to severe penalties, including life imprisonment or the death penalty. Previously covered under Section 300 of the IPC, the BNS has updated provisions with some changes to the definition and punishment.",
  "kidnapping": "Kidnapping is defined under Sections 136-144 of the Bharatiya Nyaya Sanhita (BNS). It involves taking or enticing a person away without their consent. The BNS has updated the provisions previously found in Sections 359-374 of the IPC, with enhanced penalties and clearer definitions for different types of kidnapping.",
  "ransom": "Ransom is the payment demanded for the release of a kidnapped person. Under the Bharatiya Nyaya Sanhita (BNS), kidnapping for ransom is a serious offense with severe penalties including imprisonment and fine. Section 140 of BNS specifically deals with kidnapping for ransom, previously covered under Sections 364A of the IPC.",
  "extortion": "Extortion is defined under Section 137 of the Bharatiya Nyaya Sanhita (BNS). It involves obtaining property or money through coercion or threats. This updates the previous Section 383 of the IPC, with modernized language and potentially enhanced penalties based on the severity of the offense.",
  "rape": "Rape is defined under Section 63 of the Bharatiya Nyaya Sanhita (BNS). It is a serious offense with severe penalties, including life imprisonment. The BNS maintains and enhances the protections previously provided under Section 375 of the IPC, with updated provisions addressing different forms of sexual violence and consent standards.",
  "assault": "Assault is defined under Section 125 of the Bharatiya Nyaya Sanhita (BNS) as an act that causes another person to apprehend the infliction of immediate, unlawful force. This updates the previous Section 351 of the IPC, maintaining the core definition while potentially enhancing penalties.",
  "theft": "Theft is defined under Section 303 of the Bharatiya Nyaya Sanhita (BNS) as the act of dishonestly taking movable property out of the possession of another person without consent. It updates the previous Section 378 of the IPC and remains a non-bailable offense with penalties based on the value of property stolen and circumstances.",
  "fraud": "Fraud is defined under Section 318 of the Bharatiya Nyaya Sanhita (BNS). It involves deception to secure unfair or unlawful gain. This provision updates and expands upon the previous Section 17 of the IPC, with more comprehensive coverage of modern fraudulent practices and appropriate penalties.",
  "domestic violence": "Domestic violence continues to be primarily addressed under the Protection of Women from Domestic Violence Act, 2005. However, the Bharatiya Nyaya Sanhita (BNS) provides additional protections and remedies through various sections that address violence within domestic relationships, enhancing the previous protections under the IPC.",
  
  // Additional Legal Concepts
  "legal aid": "Free legal aid in India is available through Legal Services Authorities at National, State, District, and Taluk levels under the Legal Services Authorities Act, 1987. Eligible beneficiaries include women, children, persons with disabilities, victims of trafficking, industrial workmen, SC/ST members, natural disaster victims, and persons with annual income below specified limits. Contact your nearest Legal Services Authority or visit nalsa.gov.in.",
  "pro bono lawyer": "For pro bono legal assistance in India: 1) Contact your State or District Legal Services Authority, 2) Approach NGOs like Human Rights Law Network or iProBono, 3) Check with the Supreme Court Legal Services Committee or High Court Legal Services Committees, 4) Use the Department of Justice's Tele-Law service (14141), 5) Visit the nearest legal aid clinic at law schools.",
  
  // Useful legal terms
  "habeas corpus": "Habeas Corpus is a constitutional remedy under Article 32 and 226 of the Indian Constitution. It's a writ directing a person detaining another to produce the detainee before the court to examine the legality of detention. It safeguards personal liberty against unlawful detention by both state and private individuals.",
  "pil": "Public Interest Litigation (PIL) in India allows any public-spirited person to approach the Supreme Court (Article 32) or High Courts (Article 226) for protection of public interest. PILs address issues affecting public at large, particularly marginalized sections. The court can take suo moto cognizance and has relaxed traditional locus standi requirements for PILs.",
  
  // Expanded Legal Cases and Issues
  "case law": "Case law refers to the law established by the outcome of former court cases. In India, landmark judgments by the Supreme Court and High Courts shape the interpretation of laws and the Constitution. Examples include the Kesavananda Bharati case (1973) which established the Basic Structure doctrine, and the Maneka Gandhi case (1978) which expanded the interpretation of Article 21.",
  "constitutional law": "Constitutional law in India governs the interpretation and implementation of the Constitution. It includes the study of fundamental rights, directive principles, and the structure of government. Key cases include Minerva Mills v. Union of India (1980) which reinforced the supremacy of the Constitution.",
  
  // Cyber Law
  "cyber crime": "To report cybercrimes in India: 1) File a complaint on the National Cyber Crime Reporting Portal (cybercrime.gov.in), 2) Call the Cyber Crime Helpline (1930), 3) Visit the nearest Cyber Crime Police Station, 4) For financial fraud, report within 24 hours for better chance of recovering funds. Common cybercrimes include phishing, identity theft, online harassment, data breach, and financial fraud.",
  "online harassment": "For online harassment in India: 1) Preserve evidence (screenshots, URLs, messages), 2) Report to the platform, 3) File complaint on cybercrime.gov.in or call 1930, 4) File an FIR at local police station mentioning relevant sections from Bharatiya Nyaya Sanhita and IT Act Sections 66E, 67, 67A as applicable. For immediate assistance against objectionable content, use National Cybercrime Reporting Portal's 'Report & Remove' feature.",
  "data privacy": "Data privacy in India is currently governed by the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. The Digital Personal Data Protection Act, 2023 provides a more comprehensive framework, giving individuals rights over their personal data and imposing obligations on data processors.",
  
  // Citizenship & Immigration
  "citizenship": "Indian citizenship can be acquired by birth, descent, registration, or naturalization under the Citizenship Act, 1955. For citizenship by registration, one must have resided in India for 7 years. For naturalization, the requirement is 12 years of residence with no more than 12 months absence during the final year. The Citizenship Amendment Act, 2019 created a pathway for certain religious minorities from Afghanistan, Bangladesh, and Pakistan.",
  "oci card": "Overseas Citizen of India (OCI) card provides: 1) Multiple-entry, multi-purpose lifelong visa to India, 2) Exemption from foreigner registration, 3) Parity with NRIs in economic, financial, and educational fields (except property and agricultural land purchases), 4) No voting rights or government jobs. Eligible applicants include former Indian citizens, their descendants up to the 4th generation, and spouses of Indian citizens/OCIs.",
  "visa types": "Common Indian visa types include: Tourist visa (up to 10 years), e-Tourist visa (1-5 years), Business visa (up to 5 years), Employment visa (duration of contract), Student visa (duration of course), Medical visa (up to 1 year), Conference visa (event duration), and Research visa (up to 5 years). Each has specific documentation requirements and restrictions.",
  
  // Wills & Succession
  "will": "A legally valid will in India requires: 1) Testator must be of sound mind and at least 21 years old, 2) Signed by the testator, 3) Attested by two or more witnesses who have seen the testator sign, 4) Witnesses should not be beneficiaries. Registration of wills is optional but recommended. For Muslims, will-making is governed by Islamic law limiting bequests to one-third of property to non-heirs.",
  "probate": "Probate is a court certificate validating a will. In India, it's mandatory in the presidency towns of Kolkata, Mumbai, and Chennai. The process involves: 1) Filing petition in the High Court or District Court with jurisdiction, 2) Submitting original will, death certificate, and other supporting documents, 3) Court issues notice to family members and publishes citation in newspaper, 4) After addressing any objections, the court grants probate.",
  
  // Consumer Rights
  "consumer rights": "Under the Consumer Protection Act, 2019, Indian consumers have the right to: 1) Safety, 2) Information, 3) Choice, 4) Redressal, 5) Consumer education, 6) Protection from unfair trade practices. Complaints can be filed at District, State, or National Consumer Disputes Redressal Commission depending on the claim amount.",
  "consumer complaint": "To file a consumer complaint: 1) Approach the business first with your grievance, 2) If unresolved, file a formal complaint with the appropriate Consumer Commission (District/State/National based on claim amount), 3) Include details of the complaint, supporting documents, and relief sought, 4) Pay the nominal fee, 5) Alternative online filing is available at edaakhil.nic.in.",
  "e-commerce rights": "For e-commerce purchases in India, consumers have rights under the Consumer Protection (E-Commerce) Rules, 2020, including: 1) Clear information about sellers, products, and prices, 2) Cancellation rights, 3) Refund policies, 4) Grievance redressal mechanism, 5) Protection from unfair trade practices like fake reviews. Platforms cannot manipulate prices or misrepresent quality.",
  
  // Employment Law
  "employment": "Employment in India is governed by various laws including the Industrial Disputes Act, Factories Act, Payment of Wages Act, and more recently, the Code on Wages, 2019. These laws cover minimum wages, working hours (typically 48 hours/week), overtime payment, leave entitlement, termination procedures, and social security benefits.",
  "maternity benefits": "Under the Maternity Benefit (Amendment) Act, 2017, working women in India are entitled to: 1) 26 weeks of paid maternity leave for the first two children (12 weeks for third child onwards), 2) 12 weeks for adoptive and commissioning mothers, 3) Work-from-home options post-leave, 4) Crèche facilities in establishments with 50+ employees, 5) No termination during pregnancy/maternity leave.",
  "sexual harassment": "Workplace sexual harassment in India is addressed by the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. Every organization with 10+ employees must have an Internal Complaints Committee. Complaints should be filed within 3 months of the incident. Employers must provide a safe working environment and display the consequences of sexual harassment prominently.",
  
  // Casual Phrases and Greetings
  "hello": "Hello! I'm your AI legal assistant. How can I help you with legal information today?",
  "hi": "Hi there! How can I assist you with legal matters today?",
  "how are you": "I'm functioning well, thank you! I'm here to provide legal information based on Indian law. What can I help you with?",
  "thank you": "You're welcome! If you have more legal questions in the future, feel free to ask.",
  "thanks": "You're welcome! Happy to help with any more legal questions.",
  "bye": "Goodbye! If you have more legal questions later, feel free to return.",
  
  // Recent Law Updates
  "new laws": "Recent significant Indian laws include: The Digital Personal Data Protection Act, 2023; The Bharatiya Nyaya Sanhita, 2023 (replacing IPC); The Bharatiya Nagarik Suraksha Sanhita, 2023 (replacing CrPC); The Bharatiya Sakshya Adhiniyam, 2023 (replacing Indian Evidence Act); and The Telecommunications Act, 2023.",
  
  // Bharatiya Nyaya Sanhita (BNS) - New Criminal Code
  "bharatiya nyaya sanhita": "The Bharatiya Nyaya Sanhita (BNS), 2023 replaces the Indian Penal Code, 1860. It consists of 358 sections across 8 chapters, modernizing criminal law in India. Key changes include: new definitions of terrorism and organized crime, specific provisions for mob lynching (Section 103), expanded sexual offenses, increased punishments for corruption, and introducing community service as a punishment for minor offenses. It comes into effect from July 1, 2024.",
  "bns": "The Bharatiya Nyaya Sanhita (BNS), 2023 replaces the Indian Penal Code, 1860. It consists of 358 sections across 8 chapters, modernizing criminal law in India. Key changes include: new definitions of terrorism and organized crime, specific provisions for mob lynching (Section 103), expanded sexual offenses, increased punishments for corruption, and introducing community service as a punishment for minor offenses. It comes into effect from July 1, 2024.",
  "section 103 bns": "Section 103 of the Bharatiya Nyaya Sanhita specifically criminalizes acts of mob lynching, defined as an act of violence by a group acting as vigilantes for enforcement of justice. The punishment ranges from 7 years imprisonment to life imprisonment, depending on the severity of harm caused to the victim. This is a new provision not present in the previous Indian Penal Code.",
  "section 69 bns": "Section 69 of the Bharatiya Nyaya Sanhita deals with punishment for murder, replacing Section 302 of the IPC. It prescribes death or life imprisonment along with a fine for murder. The provision maintains the severity of punishment for murder from the previous code but with updated language and context.",
  "section 70 bns": "Section 70 of the Bharatiya Nyaya Sanhita covers punishment for murder by a life convict. If a person already serving a life sentence commits murder, they shall be punished with death or further life imprisonment along with a fine. This provision addresses specific circumstances of repeat violent offenders.",
  "section 124 bns": "Section 124 of the Bharatiya Nyaya Sanhita covers terrorist acts, replacing multiple provisions from the IPC and special laws. It defines terrorism broadly, including acts that threaten India's unity, integrity, and sovereignty. Punishment includes death or life imprisonment along with fine. This consolidated section enhances counter-terrorism legal framework.",
  
  // Additional BNS Sections (Criminal Offenses)
  "section 63 bns": "Section 63 of the Bharatiya Nyaya Sanhita defines and punishes rape, replacing Section 375 of the IPC. It maintains gender-specific language (female victims) while broadening the definition of rape and enhancing punishment provisions. The minimum punishment is 10 years imprisonment, which may extend to life imprisonment with fine.",
  "section 66 bns": "Section 66 of the Bharatiya Nyaya Sanhita addresses sexual intercourse by deceitful means or false promise of marriage, replacing portions of Section 375 and Section 376 of the IPC. It explicitly criminalizes obtaining consent for sexual intercourse through deceit or false marriage promises.",
  "section 79 bns": "Section 79 of the Bharatiya Nyaya Sanhita addresses culpable homicide not amounting to murder, replacing Section 304 of the IPC. It applies in cases where the death is caused without premeditation or under provocation. Punishment ranges from imprisonment for up to 10 years with fine.",
  "section 125 bns": "Section 125 of the Bharatiya Nyaya Sanhita deals with assault and criminal force, replacing Sections 351-352 of the IPC. It criminalizes the intentional use of force against another person without that person's consent.",
  "section 115 bns": "Section 115 of the Bharatiya Nyaya Sanhita addresses rioting and unlawful assembly, replacing Sections 141-149 of the IPC. It defines unlawful assembly as five or more persons with a common unlawful object and prescribes penalties for participation.",
  "section 303 bns": "Section 303 of the Bharatiya Nyaya Sanhita defines theft, replacing Section 378 of the IPC. It involves dishonestly taking movable property from another's possession without consent. Punishment includes imprisonment for up to 3 years or fine or both.",
  "section 309 bns": "Section 309 of the Bharatiya Nyaya Sanhita addresses robbery, replacing Section 390 of the IPC. Robbery is defined as theft plus causing or attempting to cause fear of hurt, wrongful restraint, or death. Punishment includes imprisonment for up to 10 years and fine.",
  "section 318 bns": "Section 318 of the Bharatiya Nyaya Sanhita covers cheating and fraud, replacing Sections 415-420 of the IPC. It criminalizes fraudulently inducing a person to deliver property or consent to property delivery. Punishment varies based on the value involved and circumstances.",
  "section 324 bns": "Section 324 of the Bharatiya Nyaya Sanhita deals with forgery, replacing Section 463 of the IPC. It criminalizes making false documents or electronic records with intent to cause damage or injury. Punishment includes imprisonment for up to 3 years and fine.",
  "section 351 bns": "Section 351 of the Bharatiya Nyaya Sanhita addresses defamation, replacing Section 499 of the IPC. It criminalizes making or publishing imputations concerning any person with intent to harm their reputation. Exceptions include truth for public good and fair comment on public conduct.",
  
  // Bharatiya Nagarik Suraksha Sanhita (BNSS) - New Criminal Procedure Code
  "bharatiya nagarik suraksha sanhita": "The Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 replaces the Criminal Procedure Code, 1973. It modernizes procedural criminal law with provisions for electronic FIRs, mandatory videography of crime scenes, zero FIR filing at any police station, time limits for trials, and incorporation of technology in criminal justice processes. The BNSS aims to improve efficiency and fairness in criminal proceedings. It comes into effect from July 1, 2024.",
  "bnss": "The Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 replaces the Criminal Procedure Code, 1973. It modernizes procedural criminal law with provisions for electronic FIRs, mandatory videography of crime scenes, zero FIR filing at any police station, time limits for trials, and incorporation of technology in criminal justice processes. The BNSS aims to improve efficiency and fairness in criminal proceedings. It comes into effect from July 1, 2024.",
  "zero fir": "Zero FIR is a provision under the Bharatiya Nagarik Suraksha Sanhita (BNSS) that allows filing of an FIR at any police station, regardless of jurisdiction where the crime occurred. After preliminary investigation, the case is transferred to the appropriate police station. This ensures immediate registration of cases and prevents delays due to jurisdictional issues.",
  "section 173 bnss": "Section 173 of the Bharatiya Nagarik Suraksha Sanhita provides for the mandatory videography of crime scenes in certain offenses, including those punishable with 7+ years imprisonment. This provision aims to improve evidence collection and preservation, reducing the chance of evidence tampering and strengthening prosecution.",
  "section 177 bnss": "Section 177 of the Bharatiya Nagarik Suraksha Sanhita requires investigating officers to file status reports on investigation of offenses every 90 days to the Magistrate. This promotes accountability and timely completion of investigations while allowing judicial oversight of the investigation process.",
  
  // Bharatiya Sakshya Adhiniyam (BSA) - New Evidence Act
  "bharatiya sakshya adhiniyam": "The Bharatiya Sakshya Adhiniyam (BSA), 2023 replaces the Indian Evidence Act, 1872. It modernizes evidence law to incorporate electronic and digital evidence, streamlines the admissibility of electronic records, recognizes modern forensic techniques, and provides for the admissibility of scientific evidence. The BSA maintains the core principles of evidence law while updating them for the digital age. It comes into effect from July 1, 2024.",
  "bsa": "The Bharatiya Sakshya Adhiniyam (BSA), 2023 replaces the Indian Evidence Act, 1872. It modernizes evidence law to incorporate electronic and digital evidence, streamlines the admissibility of electronic records, recognizes modern forensic techniques, and provides for the admissibility of scientific evidence. The BSA maintains the core principles of evidence law while updating them for the digital age. It comes into effect from July 1, 2024.",
  "section 79 bsa": "Section 79 of the Bharatiya Sakshya Adhiniyam provides comprehensive guidelines for the admissibility of electronic evidence, including requirements for certification, chain of custody, and authentication. This modernized provision makes it easier to use digital evidence while ensuring its reliability and authenticity in court proceedings.",
  "section 57 bsa": "Section 57 of the Bharatiya Sakshya Adhiniyam addresses the admissibility of forensic science reports as evidence. It recognizes various modern forensic techniques and procedures for collecting and analyzing evidence, providing a legal framework for using scientific methods in criminal investigations and trials.",
  
  // Specific Acts and Legal Provisions
  "pocso act": "The Protection of Children from Sexual Offences (POCSO) Act, 2012 provides a comprehensive framework for protecting children from sexual assault, sexual harassment, and pornography. It establishes special courts for speedy trials, prescribes stringent punishments, and includes child-friendly procedures for reporting, recording evidence, investigation and trial. Key features include: mandatory reporting of offenses, in-camera trials, and special provisions for vulnerable children.",
  "dowry prohibition act": "The Dowry Prohibition Act, 1961 prohibits the giving, taking, or demanding of dowry. Dowry is defined as property or valuable security given in connection with marriage. Penalties include imprisonment of 5+ years and a fine of ₹15,000 or the value of dowry (whichever is higher). The Bharatiya Nyaya Sanhita's Section 69 addresses dowry deaths, and provisions against cruelty in domestic relationships.",
  "motor vehicles act": "The Motor Vehicles Act, 1988 (amended in 2019) governs all aspects of road transport vehicles in India. The 2019 amendment significantly increased penalties for traffic violations, introduced electronic monitoring of traffic rules, established a Motor Vehicle Accident Fund for victims, and created a National Road Safety Board. Key violations like drunk driving now carry fines up to ₹10,000 and/or imprisonment.",
  "juvenile justice act": "The Juvenile Justice (Care and Protection of Children) Act, 2015 addresses children in conflict with law and children in need of care and protection. For serious offenses by children aged 16-18, there's provision for trial as adults. The Act establishes Child Welfare Committees, Juvenile Justice Boards, and Children's Courts, while emphasizing rehabilitation and social reintegration.",
  "arbitration and conciliation act": "The Arbitration and Conciliation Act, 1996 (amended in 2019) provides for domestic and international commercial arbitration, conciliation, and enforcement of foreign awards. The 2019 amendment establishes an Arbitration Council of India, imposes a 12-month timeline (extendable by 6 months) for tribunal awards, and introduces provisions for the appointment of arbitrators by designated arbitral institutions.",
  "companies act": "The Companies Act, 2013 governs company formation, management, and dissolution in India. Key provisions include: mandatory Corporate Social Responsibility for eligible companies, one-person company concept, enhanced disclosure norms, mandatory rotation of auditors, stricter regulations for related party transactions, and provisions for class action suits by shareholders.",
  "income tax act": "The Income Tax Act, 1961 governs direct taxation in India. Income is categorized as: salary, house property, business/profession, capital gains, and other sources. Key features include Tax Deducted at Source (TDS), advance tax payments, deductions under Sections 80C-80U, and assessment procedures. Recent amendments have introduced simplified compliance for small taxpayers and faceless assessment schemes.",
  "gst": "Goods and Services Tax (GST) implemented in 2017 is a comprehensive indirect tax on supply of goods and services. It's a destination-based consumption tax with four main rates: 5%, 12%, 18%, and 28%. Special provisions exist for small businesses, including composition scheme for those with turnover below ₹1.5 crore. GST has subsumed multiple indirect taxes like VAT, Service Tax, and Excise Duty.",
  "patents act": "The Patents Act, 1970 (amended in 2005) governs patent protection in India. Patents are granted for inventions that are new, involve an inventive step, and have industrial application. The term is 20 years from filing date. Section 3(d) restricts evergreening of pharmaceutical patents. Compulsory licensing provisions exist for unmet public health needs and in cases of non-working of patents.",
  "copyright act": "The Copyright Act, 1957 (amended in 2012) protects literary, dramatic, musical, artistic works, films, and sound recordings. Copyright exists for 60 years after author's death or from publication for posthumous works. The 2012 amendment strengthened the rights of performers, addressed digital rights management, and introduced compulsory licensing for certain works.",
  "insolvency and bankruptcy code": "The Insolvency and Bankruptcy Code (IBC), 2016 provides time-bound resolution for insolvency, typically 180 days (extendable to 330 days). It establishes the National Company Law Tribunal as adjudicating authority, introduces a creditor-in-control model, ensures operational creditors' protection, and creates an information utility system. Recent amendments have recognized homebuyers as financial creditors.",
  "reservation policy": "India's reservation policy is based on Articles 15(4) and 16(4) of the Constitution, providing for reservation in education and public employment for Scheduled Castes (SCs), Scheduled Tribes (STs), and Other Backward Classes (OBCs). The current reservation stands at 15% for SCs, 7.5% for STs, and 27% for OBCs. The 103rd Amendment (2019) introduced 10% reservation for Economically Weaker Sections (EWS).",
  
  // Data Protection and Digital Laws
  "data protection act": "The Digital Personal Data Protection Act, 2023 was enacted on August 11, 2023. It establishes a framework for processing digital personal data, protecting individuals' privacy while enabling lawful data processing. Key features include: consent-based data processing, purpose limitation, data minimization, accuracy requirements, storage limitation, and security measures. It also establishes a Data Protection Board of India.",
  "digital india act": "The Digital India Act (currently in draft stage) aims to replace the IT Act, 2000 and provide a comprehensive framework for governing digital technology, internet, and cybersecurity. It proposes regulations for social media platforms, online gaming, AI, blockchain, IoT devices, and provisions against fake news, doxxing, and economic fraud. The draft includes protection for digital personal data and categorization of online content.",
  "it act section 66": "Section 66 of the Information Technology Act, 2000 deals with computer-related offenses. It criminalizes acts of dishonestly or fraudulently accessing computer systems, data theft, identity theft, cheating by personation using computer resources, and violation of privacy. Punishment includes imprisonment up to 3 years or fine up to ₹5 lakh, or both.",
  "it act section 67": "Section 67 of the Information Technology Act, 2000 prohibits publishing or transmitting obscene material in electronic form. The punishment is imprisonment up to 3 years and fine up to ₹5 lakh for the first conviction, and imprisonment up to 5 years and fine up to ₹10 lakh for subsequent convictions. Section 67A specifically addresses sexually explicit material with higher penalties.",
  
  // Recent Legal Topics
  "criminal law reform": "In 2023, India overhauled its criminal justice system by replacing colonial-era laws with three new codes: 1) Bharatiya Nyaya Sanhita (replacing IPC) - introduces community service as punishment, defines terrorism, and includes new provisions for mob lynching; 2) Bharatiya Nagarik Suraksha Sanhita (replacing CrPC) - mandates electronic FIRs and introduces zero FIR concept; 3) Bharatiya Sakshya Adhiniyam (replacing Indian Evidence Act) - modernizes evidence collection including electronic and digital evidence.",
  "telecommunications act": "The Telecommunications Act, 2023 replaces the 138-year-old Indian Telegraph Act. It simplifies licensing, recognizes spectrum as a valuable resource, creates a non-auction pathway for satellite broadband, establishes a Digital Bharat Nidhi (fund for rural connectivity), includes right of way provisions, and enhances user protection with stringent KYC requirements.",
  "mediation act": "The Mediation Act, 2023 promotes mediation as an alternative dispute resolution mechanism. It mandates pre-litigation mediation in certain cases, establishes the Mediation Council of India as a regulatory body, provides for enforcement of mediated settlement agreements, and includes online mediation provisions.",
  "insolvency bankruptcy code amendment": "The Insolvency and Bankruptcy Code (Amendment) Act, 2023 improves the insolvency resolution framework by allowing admission or withdrawal of insolvency applications with approval from 90% of creditors, streamlining the Corporate Insolvency Resolution Process, and addressing delays in admission of applications.",
  "waqf amendment bill": "The Waqf (Amendment) Bill, 2024 proposes significant changes to the Waqf Act, 1995, including renaming the 'Waqf Board' to 'Bharat Waqf Board', establishing a Central Waqf Council with broader representation, and requiring documentary evidence for property registration as waqf property. The bill is currently under parliamentary consideration.",
};

export default legalKnowledgeBase;
