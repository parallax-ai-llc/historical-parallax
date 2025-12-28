---
id: "ken-thompson"
name: "Ken Thompson"
birth: "1943-02-04"
death: null
nationality: "United States"
occupation: ["Computer Scientist", "Software Engineer", "Programmer"]
image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Ken_Thompson_and_Dennis_Ritchie--1973.jpg"
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/Ken_Thompson_(computer_programmer)"
lastUpdated: "2025-12-29"
---

## Summary

Kenneth Lane Thompson is an American pioneer of computer science who fundamentally shaped modern computing through his creation of the Unix operating system and the B programming language (precursor to C). Born in 1943 in New Orleans, Thompson's work at Bell Labs in the late 1960s and early 1970s laid the foundation for operating systems that power billions of devices today. He received the Turing Award in 1983 alongside Dennis Ritchie for their development of generic operating systems theory and specifically for Unix. After retiring from Bell Labs, Thompson continued his influential work at Google, contributing to the development of the Go programming language and UTF-8 encoding standard.

---

## Early Life and Background

Kenneth Lane Thompson was born on February 4, 1943, in New Orleans, Louisiana[^1]. Growing up in a post-World War II America that was rapidly embracing technological advancement, Thompson showed an early aptitude for mathematics and logical thinking. His family environment encouraged intellectual curiosity, setting the stage for his future contributions to computer science.

Thompson pursued his undergraduate education at the University of California, Berkeley, where he earned a Bachelor of Science degree in Electrical Engineering and Computer Science in 1965[^2]. He continued at Berkeley for graduate studies, completing his Master's degree in Electrical Engineering and Computer Science in 1966[^3]. His master's thesis focused on regular expressions and their implementation, work that would later prove foundational to many of his subsequent projects, particularly in the development of text processing tools and programming languages.

During his time at Berkeley, Thompson was exposed to the emerging field of computer science at a pivotal moment in its history. The university was one of the leading institutions in computing research, and Thompson benefited from working with cutting-edge technology and brilliant faculty members. His education coincided with the transition from mainframe batch processing to interactive computing, a shift that would profoundly influence his design philosophy[^4].

The intellectual environment at Berkeley in the mid-1960s was characterized by experimentation and innovation. Thompson absorbed the prevailing ethos of creating elegant, minimalist solutions to complex problems—a philosophy that would become his hallmark throughout his career. His academic work demonstrated not just technical proficiency but also a deep understanding of the theoretical foundations of computation, combining practical engineering with mathematical rigor.

---

## Rise to Prominence

Thompson joined Bell Telephone Laboratories in Murray Hill, New Jersey, in 1966, immediately after completing his master's degree[^5]. Bell Labs was at that time arguably the premier industrial research facility in the world, home to numerous Nobel Prize winners and groundbreaking innovations in physics, mathematics, and the nascent field of computer science. The lab's culture encouraged pure research alongside practical applications, providing an ideal environment for Thompson's talents.

Initially, Thompson worked on the Multics project, an ambitious time-sharing operating system being developed jointly by Bell Labs, MIT, and General Electric[^6]. Multics aimed to create a computing utility that multiple users could access simultaneously, with robust security and file management. While working on Multics, Thompson collaborated with Dennis Ritchie and other talented researchers, forming professional relationships that would prove crucial to his later work. However, by 1969, Bell Labs withdrew from the Multics project, deeming it too complex and resource-intensive[^7].

The withdrawal from Multics left Thompson and his colleagues without a modern computing environment to work in. In the summer of 1969, while his wife was away on vacation, Thompson wrote the first version of what would become Unix in just three weeks[^8]. Working on a little-used PDP-7 minicomputer, he created a simple but elegant operating system that embodied principles opposite to Multics's complexity: simplicity, modularity, and the "do one thing well" philosophy[^9].

Thompson's initial motivation was partly to create an environment where he could run Space Travel, a computer game he had developed, but the operating system quickly evolved beyond this modest beginning[^10]. He implemented a hierarchical file system, process management, and a command interpreter. Dennis Ritchie soon joined the effort, and together they refined and expanded Unix[^11].

The breakthrough came in 1971 when Thompson and Ritchie convinced Bell Labs management to purchase a PDP-11 computer by proposing Unix as a text processing system for the patent department[^12]. This practical application secured institutional support and resources. Thompson developed the B programming language (named after BCPL) to facilitate Unix development, which Ritchie later evolved into the C programming language[^13]. The decision to rewrite Unix in C in 1973 made it portable across different computer architectures, a revolutionary concept that enabled Unix's eventual dominance[^14].

---

## Major Achievements

Thompson's creation of Unix stands as one of the most influential achievements in computing history. Unix introduced design principles that became fundamental to modern operating systems: a hierarchical file system where everything is represented as a file, simple tools that can be combined through pipes, plain text for data storage, and a clear separation between the kernel and user space[^15]. These concepts seem obvious today precisely because Unix made them ubiquitous.

The development of the B programming language and his collaboration with Dennis Ritchie on C's development constituted another major achievement[^16]. While Ritchie is primarily credited with C, Thompson's B provided the crucial foundation. C became the dominant programming language for systems programming and remained one of the most widely used languages for decades, influencing countless subsequent languages including C++, Java, C#, and others[^17].

Thompson co-developed the UTF-8 encoding scheme with Rob Pike in 1992[^18]. UTF-8 solved the critical problem of representing all the world's writing systems in computer text while maintaining backward compatibility with ASCII. Today, UTF-8 is the dominant character encoding on the internet, used by over 98% of all web pages[^19]. This work demonstrated Thompson's ability to create elegant solutions to complex problems—UTF-8's variable-length encoding is both efficient and remarkably simple in design.

In the realm of computer chess, Thompson made significant contributions that advanced both artificial intelligence and computer hardware design. He created the Belle chess machine, which became the first computer to achieve master-level play in 1983[^20]. Belle used custom hardware to evaluate chess positions at unprecedented speeds. Thompson later developed endgame tablebases that solved chess positions with six or fewer pieces, providing perfect play for these positions—work that remains relevant to chess engines today[^21].

At Google, where Thompson worked from 2006 to 2020, he co-designed the Go programming language with Rob Pike and Robert Griesemer[^22]. Go addressed limitations in existing languages for large-scale software development, particularly in concurrent and networked systems. The language quickly gained adoption for cloud infrastructure, distributed systems, and web services, with major projects like Docker and Kubernetes written in Go[^23]. Go's simplicity, efficiency, and excellent concurrency support reflect Thompson's long-standing design philosophy.

Thompson received the Turing Award in 1983, computer science's highest honor, sharing it with Dennis Ritchie "for their development of generic operating systems theory and specifically for the implementation of the UNIX operating system"[^24]. He was elected to the National Academy of Engineering in 1980 and received the National Medal of Technology in 1998 from President Clinton[^25]. In 2011, Thompson and Ritchie received the Japan Prize for Information and Communications for their pioneering work on Unix[^26].

---

## Controversies and Criticisms

In 1984, Thompson delivered his Turing Award lecture titled "Reflections on Trusting Trust," which simultaneously showcased his brilliance and raised disturbing questions about software security[^27]. The lecture described how a compiler could be modified to insert backdoors into programs it compiles, including into future versions of itself, creating an undetectable exploit that persists even if the source code is inspected. While presented as a thought experiment demonstrating the impossibility of truly trusting any software you didn't personally write, the lecture sparked concerns about whether Thompson or others might have actually implemented such backdoors[^28].

The "Reflections on Trusting Trust" concept has never been definitively proven to exist in any of Thompson's actual work, but its theoretical possibility has influenced discussions about software supply chain security for decades[^29]. Some critics argued that publicizing such an attack method was irresponsible, potentially giving malicious actors ideas. Others praised Thompson for highlighting a fundamental security problem that the industry needed to address. The ambiguity about whether this was purely theoretical or described actual practice has never been fully resolved, contributing to both his legend and controversy[^30].

Thompson's work on Unix, while revolutionary, has faced criticism for certain design decisions that created long-lasting problems. The Unix file permission system, while innovative for its time, proved inadequate for complex modern security requirements, leading to countless vulnerabilities over the decades[^31]. The lack of built-in security features in early Unix, operating under an assumption of trusted users, created a legacy of security challenges that persisted through Unix derivatives including Linux and BSD systems[^32].

The culture that developed around Unix and Bell Labs, while productive, has been criticized for being insular and sometimes dismissive of alternative approaches[^33]. Thompson and his colleagues developed strong opinions about the "right way" to design systems, which influenced generations of programmers but also potentially limited exploration of different paradigms. Critics have argued that the Unix philosophy's emphasis on simplicity sometimes resulted in fragmentation, with numerous small tools creating complexity through their interactions[^34].

Thompson's work on computer chess, while technically impressive, faced criticism from some in the AI community who argued that brute-force search represented a dead end for artificial intelligence research rather than genuine progress toward machine intelligence[^35]. The debate between symbolic AI and connectionist approaches was contentious in the 1980s and 1990s, with chess serving as a battleground. Critics contended that Belle's success told us little about human cognition or general intelligence, though defenders argued it advanced our understanding of search algorithms and specialized hardware[^36].

Some have criticized Thompson for a perceived lack of engagement with the broader social implications of his work. Unlike some contemporaries who actively participated in debates about technology's impact on society, Thompson remained largely focused on technical matters[^37]. As Unix and C became foundational to computing infrastructure worldwide, affecting billions of people, questions about accessibility, digital divide, and technology's societal role became increasingly important—areas where Thompson's public engagement was limited.

---

## Personal Life

Ken Thompson married Bonnie Thompson, and they had one son together[^38]. He has maintained an extremely private personal life, rarely giving interviews or making public appearances beyond technical conferences. This privacy has been so consistent that relatively little is publicly known about his family life, hobbies outside of computing, or personal beliefs. Colleagues describe him as intensely focused, preferring to let his work speak for itself rather than cultivating a public persona[^39].

Those who worked closely with Thompson describe him as possessing a dry wit and preference for elegant, minimal solutions over complex ones[^40]. He reportedly has little patience for unnecessarily complicated designs or verbose explanations, favoring code and direct demonstration over lengthy discussion. This personality trait aligned perfectly with the Unix philosophy he helped create: simplicity, clarity, and avoiding unnecessary complexity.

Thompson is known to be an aviation enthusiast and holds a private pilot's license[^41]. Flying represented one of his few known interests outside of computer science, offering a different kind of technical challenge and precision-focused activity. The attention to detail and systems thinking required in aviation parallels his approach to software design.

His working relationship with Dennis Ritchie was particularly significant and productive. The two complemented each other well, with Thompson often focused on implementation and core mechanisms while Ritchie handled language design and theoretical aspects[^42]. Their collaboration produced some of computing's most enduring innovations, yet both men remained humble about their achievements. After Ritchie's death in 2011, Thompson rarely spoke publicly about their partnership, maintaining his characteristic privacy even in grief[^43].

Colleagues at Bell Labs and later at Google noted Thompson's preference for working on genuinely interesting technical problems rather than chasing commercial success or fame[^44]. He turned down numerous opportunities for wealth through startups or consulting, preferring the research environment where he could focus on problems that intrigued him intellectually. This prioritization of intellectual satisfaction over financial gain was consistent throughout his career.

---

## Legacy

Thompson's legacy in computer science is profound and multifaceted, touching nearly every aspect of modern computing. Unix and its descendants—including Linux, macOS, iOS, Android, and BSD systems—power the vast majority of servers, smartphones, and critical infrastructure worldwide[^45]. An operating system designed by one person in three weeks became the foundation for the digital age, demonstrating the power of elegant design principles over brute-force complexity.

The Unix philosophy that Thompson exemplified—write programs that do one thing well, combine simple tools, use plain text—influenced software development methodology far beyond operating systems[^46]. This approach shaped how generations of programmers think about software architecture, modularity, and composition. The pipe mechanism Thompson invented, allowing one program's output to become another's input, became a fundamental programming paradigm[^47].

UTF-8's impact on global computing cannot be overstated. By enabling the representation of all human writing systems while maintaining backward compatibility with ASCII, Thompson and Pike's encoding scheme facilitated the internet's transformation into a truly global medium[^48]. Without UTF-8, the web's internationalization would have been vastly more complicated, potentially fragmenting digital communication along linguistic lines.

Thompson's influence on programming language design extends through multiple generations. B led to C, which influenced C++, Java, C#, JavaScript, and countless others[^49]. Go, his most recent major language contribution, is shaping how modern distributed systems and cloud infrastructure are built. Each language embodies principles Thompson championed: efficiency, simplicity, and practical utility over theoretical purity.

In computer chess and game AI, Thompson's contributions demonstrated the viability of specialized hardware for specific computational tasks, prefiguring later developments in GPUs, TPUs, and other domain-specific processors[^50]. His endgame tablebases remain in use, providing perfect play for solved positions and advancing both competitive chess and AI research.

Perhaps Thompson's most significant legacy is methodological: demonstrating that small teams or even individuals, working with clear principles and deep understanding, can create tools that transform entire industries[^51]. In an era of massive software projects requiring hundreds or thousands of developers, Unix stands as a reminder that architectural coherence and conceptual clarity often matter more than resources. Thompson showed that great design could be minimalist, that complexity often indicates unclear thinking, and that tools should serve users rather than showcasing technological sophistication.

Educational institutions worldwide teach Unix and C, ensuring that Thompson's ideas continue shaping new generations of computer scientists[^52]. The textbooks, courses, and programming exercises that introduce students to operating systems, systems programming, and software engineering invariably reference or build upon Thompson's work. His influence is so pervasive that many programmers benefit from his ideas without knowing their origin.

---

## Historical Assessment

### Positive Views

Computer science historians and practitioners widely regard Thompson as one of the field's most important pioneers. The ACM Turing Award citation recognized him for fundamentally advancing operating systems theory and practice[^53]. Scholars note that Unix represented not merely an incremental improvement but a paradigm shift in how operating systems could be designed and used, emphasizing interactive computing and programmer productivity.

Dennis Ritchie, Thompson's closest collaborator, praised his ability to see through complex problems to find simple, elegant solutions[^54]. Ritchie noted that Thompson possessed an exceptional talent for implementation—turning ideas into working code with remarkable speed and reliability. This combination of theoretical insight and practical ability was rare and crucial to Unix's success.

Rob Pike, who worked with Thompson at Bell Labs and later at Google, described him as "one of the greatest programmers who ever lived"[^55]. Pike emphasized Thompson's ability to write correct code quickly, often producing production-quality software in first drafts that others might require multiple iterations to achieve. This technical virtuosity, combined with excellent design judgment, made Thompson an exceptionally productive researcher.

Academic researchers studying the history of computing consistently place Thompson among the most influential figures in the field, alongside Alan Turing, John von Neumann, and a handful of others[^56]. His work touched multiple subdisciplines—operating systems, programming languages, character encoding, computer chess, and more—with transformative effect in each area. Few computer scientists can claim such breadth of impact.

The practical impact of Thompson's work has been celebrated by industry leaders. Linux creator Linus Torvalds acknowledged Unix's profound influence on Linux, calling it the foundation upon which modern open-source operating systems were built[^57]. Technology executives have noted that Unix's design principles guided the development of the internet, cloud computing, and mobile devices, making Thompson's contribution to modern digital infrastructure incalculable.

Colleagues consistently praised Thompson's intellectual honesty and rigor. He was known for admitting when he didn't know something and for being willing to discard his own work if better approaches emerged[^58]. This scientific integrity, combined with technical brilliance, made him an ideal collaborator and mentor.

---

## Negative Views

Some critics have argued that Thompson and the Bell Labs Unix team created a monoculture in operating system design, with Unix's dominance potentially suppressing alternative approaches[^59]. Operating systems research became largely focused on incremental improvements to the Unix model rather than exploring fundamentally different paradigms. Systems like Multics, while complex, explored ideas about security and capability-based access control that Unix largely ignored, potentially setting back certain areas of OS research.

Richard Stallman and the Free Software Foundation initially had contentious relationships with the Unix heritage, criticizing the proprietary nature of commercial Unix systems and the fragmentation into incompatible variants[^60]. While Thompson himself was not responsible for AT&T's later licensing decisions, his creation became a proprietary product that restricted user freedom in ways that motivated the creation of GNU and later Linux. Stallman argued that the Unix culture prioritized technical elegance over user freedom and social responsibility.

Computer science researchers in alternative paradigms sometimes criticized the Unix philosophy as too limiting. Advocates for object-oriented operating systems, microkernel architectures, or capability-based systems argued that Unix's monolithic kernel design and file-centric worldview prevented more robust security models and modern architectural approaches[^61]. The conservative "worse is better" design philosophy associated with Unix, while pragmatic, arguably discouraged more ambitious research.

Some critics of Thompson's "Reflections on Trusting Trust" lecture argued that it was irresponsible to publicize such an attack method without offering viable defenses[^62]. The lecture demonstrated a fundamental weakness in software security but provided little guidance on mitigation, potentially harming security more than helping it. While Thompson framed it as a cautionary tale, skeptics questioned whether the educational value justified revealing a dangerous technique.

Feminist critics of computing culture have noted that Bell Labs and the Unix environment were overwhelmingly male-dominated, and that the culture surrounding Unix development could be exclusionary[^63]. While not unique to Thompson or his immediate team, the homogeneity of early Unix development may have embedded certain assumptions and biases into foundational software. Thompson's minimal public engagement with diversity issues in computing has been noted by those advocating for more inclusive technical communities.

Some AI researchers criticized Thompson's computer chess work as representing a philosophically barren approach to intelligence, prioritizing winning games over understanding cognition[^64]. The debate between "scruffy" and "neat" AI approaches positioned brute-force search methods like those used in Belle as intellectually unsatisfying, even if practically effective. Critics argued this approach contributed to AI winters by promising intelligence while delivering merely powerful search.

---

## Timeline

| Year | Event |
|------|-------|
| 1943 | Born February 4 in New Orleans, Louisiana |
| 1965 | Received B.S. in Electrical Engineering and Computer Science from UC Berkeley |
| 1966 | Received M.S. in Electrical Engineering and Computer Science from UC Berkeley; joined Bell Labs |
| 1966-1969 | Worked on the Multics project at Bell Labs |
| 1969 | Created the first version of Unix on a PDP-7 minicomputer |
| 1970 | Unix was named and began spreading within Bell Labs |
| 1971 | Wrote the first version of the B programming language |
| 1973 | Unix rewritten in C (developed with Dennis Ritchie), making it portable |
| 1975 | Unix Version 6 released, first to be widely available outside AT&T |
| 1978 | Created the Belle chess machine |
| 1980 | Elected to the National Academy of Engineering |
| 1983 | Belle became first computer to achieve chess master rating; received Turing Award with Dennis Ritchie |
| 1984 | Delivered "Reflections on Trusting Trust" Turing Award lecture |
| 1992 | Co-created UTF-8 character encoding with Rob Pike |
| 1998 | Received National Medal of Technology from President Clinton |
| 2000 | Retired from Bell Labs (now part of Lucent Technologies) |
| 2006 | Joined Google |
| 2009 | Co-created the Go programming language (announced publicly) |
| 2011 | Received Japan Prize for Information and Communications with Dennis Ritchie |
| 2019 | Received Computer History Museum Fellow Award |
| 2020 | Retired from Google |

---

## Famous Quotes

> "One of my most productive days was throwing away 1,000 lines of code." - Thompson on the value of simplicity and removing unnecessary complexity[^65]

> "When in doubt, use brute force." - Thompson's pragmatic approach to problem-solving, emphasizing working solutions over theoretical elegance[^66]

> "You can't trust code that you did not totally create yourself." - From "Reflections on Trusting Trust," highlighting fundamental software security challenges[^67]

> "I wanted to avoid the problem of 'creeping featurism' that plagues so many software projects." - Thompson on Unix design philosophy[^68]

> "The average Unix programmer knows more about the system than the average Windows programmer knows about Windows." - Thompson on Unix's transparency and accessibility[^69]

---

## References

[^1]: "Ken Thompson." Computer History Museum. https://www.computerhistory.org/fellowawards/hall/ken-thompson/
[^2]: Salus, Peter H. "A Quarter Century of UNIX." Addison-Wesley, 1994, p. 23.
[^3]: University of California, Berkeley. "Notable Alumni in Computer Science." UC Berkeley EECS Department.
[^4]: Ritchie, Dennis M. "The Evolution of the Unix Time-sharing System." AT&T Bell Laboratories Technical Journal 63.6 (1984): 1577-1593.
[^5]: "Ken Thompson - A.M. Turing Award Laureate." Association for Computing Machinery. https://amturing.acm.org/award_winners/thompson_4588371.cfm
[^6]: Corbató, F. J., and Vyssotsky, V. A. "Introduction and Overview of the Multics System." AFIPS Fall Joint Computer Conference, 1965.
[^7]: Raymond, Eric S. "The Art of Unix Programming." Addison-Wesley, 2003, p. 45.
[^8]: Ritchie, Dennis M. "The Development of the C Language." ACM SIGPLAN Notices 28.3 (1993): 201-208.
[^9]: McIlroy, M. D., Pinson, E. N., and Tague, B. A. "Unix Time-Sharing System Forward." Bell System Technical Journal 57.6 (1978): 1899-1904.
[^10]: Salus, Peter H. "The Daemon, the Gnu, and the Penguin." Reed Media Services, 2008, p. 12.
[^11]: Kernighan, Brian W., and Pike, Rob. "The Unix Programming Environment." Prentice Hall, 1984.
[^12]: Ritchie, Dennis M., and Thompson, Ken. "The UNIX Time-Sharing System." Communications of the ACM 17.7 (1974): 365-375.
[^13]: Johnson, S. C., and Kernighan, B. W. "The Programming Language B." Bell Laboratories, 1973.
[^14]: Lions, John. "Lions' Commentary on UNIX 6th Edition." Peer to Peer Communications, 1996 (originally 1977).
[^15]: Raymond, Eric S. "The Art of Unix Programming." Addison-Wesley, 2003, pp. 1-30.
[^16]: Ritchie, Dennis M. "The Development of the C Language." ACM SIGPLAN Notices 28.3 (1993): 201-208.
[^17]: Stroustrup, Bjarne. "The C++ Programming Language." Addison-Wesley, 4th edition, 2013, Historical Notes.
[^18]: Pike, Rob, and Thompson, Ken. "Hello World or Καλημέρα κόσμε or こんにちは世界." Proceedings of the Winter 1993 USENIX Conference, 1993.
[^19]: W3Techs. "Usage statistics of character encodings for websites." https://w3techs.com/technologies/overview/character_encoding (accessed 2025).
[^20]: Hsu, Feng-hsiung. "Behind Deep Blue: Building the Computer that Defeated the World Chess Champion." Princeton University Press, 2002, p. 34.
[^21]: Thompson, Ken. "Retrograde Analysis of Certain Endgames." ICCA Journal 9.3 (1986): 131-139.
[^22]: Pike, Rob. "Go at Google: Language Design in the Service of Software Engineering." Google Tech Talk, 2012.
[^23]: Gerrand, Andrew. "The Go Programming Language turns 10." The Go Blog, November 2019.
[^24]: Association for Computing Machinery. "ACM Turing Award Citation - Thompson and Ritchie." 1983.
[^25]: National Academy of Engineering. "Ken Thompson Member Profile." https://www.nae.edu/
[^26]: The Japan Prize Foundation. "2011 Japan Prize Laureates." https://www.japanprize.jp/
[^27]: Thompson, Ken. "Reflections on Trusting Trust." Communications of the ACM 27.8 (1984): 761-763.
[^28]: Wheeler, David A. "Countering Trusting Trust through Diverse Double-Compiling." 21st Annual Computer Security Applications Conference, 2005.
[^29]: Schneier, Bruce. "Attack Trees and Trusting Trust." Schneier on Security blog, 2006.
[^30]: Karger, Paul A., and Schell, Roger R. "Thirty Years Later: Lessons from the Multics Security Evaluation." Annual Computer Security Applications Conference, 2002.
[^31]: Bishop, Matt. "Computer Security: Art and Science." Addison-Wesley, 2002, pp. 234-267.
[^32]: Garfinkel, Simson, and Spafford, Gene. "Practical Unix and Internet Security." O'Reilly Media, 3rd edition, 2003.
[^33]: Levy, Steven. "Hackers: Heroes of the Computer Revolution." O'Reilly Media, 25th Anniversary Edition, 2010.
[^34]: Gancarz, Mike. "Linux and the Unix Philosophy." Digital Press, 2003.
[^35]: Dreyfus, Hubert L. "What Computers Still Can't Do: A Critique of Artificial Reason." MIT Press, 1992.
[^36]: Newborn, Monroe. "Kasparov versus Deep Blue: Computer Chess Comes of Age." Springer, 1997.
[^37]: Ceruzzi, Paul E. "A History of Modern Computing." MIT Press, 2nd edition, 2003.
[^38]: "Ken Thompson Biography." IEEE Computer Society. https://www.computer.org/profiles/ken-thompson
[^39]: Seibel, Peter. "Coders at Work: Reflections on the Craft of Programming." Apress, 2009, interviews with Thompson's colleagues.
[^40]: Kernighan, Brian W. "Unix: A History and a Memoir." Kindle Direct Publishing, 2019.
[^41]: "Thompson, Kenneth Lane." Marquis Who's Who, 2010 edition.
[^42]: Ritchie, Dennis M. "The Development of the C Language." ACM SIGPLAN Notices 28.3 (1993): 201-208.
[^43]: Pike, Rob. "Dennis Ritchie." Google+ post, October 2011 (archived).
[^44]: Kernighan, Brian W. "Unix: A History and a Memoir." Kindle Direct Publishing, 2019, pp. 67-89.
[^45]: Vaughan-Nichols, Steven J. "Unix at 40: The past, present and future." ZDNet, August 2009.
[^46]: Raymond, Eric S. "The Art of Unix Programming." Addison-Wesley, 2003.
[^47]: McIlroy, M. D. "A Research Unix Reader: Annotated Excerpts from the Programmer's Manual, 1971–1986." Bell Labs, 1987.
[^48]: Yergeau, F. "UTF-8, a transformation format of ISO 10646." RFC 3629, Internet Engineering Task Force, 2003.
[^49]: O'Regan, Gerard. "A Brief History of Computing." Springer, 2nd edition, 2012.
[^50]: Hsu, Feng-hsiung. "Behind Deep Blue: Building the Computer that Defeated the World Chess Champion." Princeton University Press, 2002.
[^51]: Brooks, Frederick P. "The Mythical Man-Month: Essays on Software Engineering." Addison-Wesley, Anniversary Edition, 1995.
[^52]: Tanenbaum, Andrew S. "Modern Operating Systems." Pearson, 4th edition, 2014.
[^53]: Association for Computing Machinery. "ACM Turing Award Citation - Thompson and Ritchie." 1983.
[^54]: Ritchie, Dennis M. "The Evolution of the Unix Time-sharing System." AT&T Bell Laboratories Technical Journal 63.6 (1984): 1577-1593.
[^55]: Pike, Rob. "Ken Thompson's Unix." Usenix Annual Technical Conference keynote, 2019.
[^56]: Campbell-Kelly, Martin, et al. "Computer: A History of the Information Machine." Westview Press, 3rd edition, 2013.
[^57]: Torvalds, Linus. "Just for Fun: The Story of an Accidental Revolutionary." HarperBusiness, 2001.
[^58]: Kernighan, Brian W. "Unix: A History and a Memoir." Kindle Direct Publishing, 2019.
[^59]: Tanenbaum, Andrew S., and Woodhull, Albert S. "Operating Systems: Design and Implementation." Prentice Hall, 3rd edition, 2006.
[^60]: Stallman, Richard M. "The GNU Manifesto." Dr. Dobb's Journal, March 1985.
[^61]: Levy, Henry M. "Capability-Based Computer Systems." Digital Press, 1984.
[^62]: Thompson, Ken. "Reflections on Trusting Trust." Communications of the ACM 27.8 (1984): 761-763; subsequent commentary.
[^63]: Abbate, Janet. "Recoding Gender: Women's Changing Participation in Computing." MIT Press, 2012.
[^64]: Dreyfus, Hubert L., and Dreyfus, Stuart E. "Mind over Machine." Free Press, 1986.
[^65]: Kernighan, Brian W. "Unix: A History and a Memoir." Kindle Direct Publishing, 2019, p. 94.
[^66]: Pike, Rob. "Notes on Programming in C." February 1989.
[^67]: Thompson, Ken. "Reflections on Trusting Trust." Communications of the ACM 27.8 (1984): 761-763.
[^68]: Salus, Peter H. "A Quarter Century of UNIX." Addison-Wesley, 1994, p. 78.
[^69]: Raymond, Eric S. "The Art of Unix Programming." Addison-Wesley, 2003, p. 156.