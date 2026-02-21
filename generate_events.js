#!/usr/bin/env node
/**
 * Generate ~2000 Historical Event articles
 * Pipe output to generate_batch.js
 */

const events = [];

function add(name, birth, death, nat, occ, summary, timeline) {
  events.push({ name, birth, death, nat, occ: ["Historical Event", ...occ], summary, timeline });
}

// ========================================
// 1. WARS & BATTLES (~400)
// ========================================

// Ancient
add("Battle of Marathon", "0490-09-12", "0490-09-12", "Greece", ["Battle","Ancient War"],
  "The Battle of Marathon in 490 BC was a pivotal engagement during the first Persian invasion of Greece. The Athenian army, led by Miltiades, decisively defeated a larger Persian force on the plain of Marathon. This victory preserved Greek independence and boosted Athenian confidence, paving the way for the Golden Age of Athens.",
  [["492 BC","First Persian invasion begins"],["490 BC","Darius I sends fleet across Aegean"],["490 BC","Persian forces land at Marathon"],["490 BC","Miltiades leads Athenian charge"],["490 BC","Decisive Greek victory"],["480 BC","Second Persian invasion follows"]]);

add("Battle of Thermopylae", "0480-08-01", "0480-08-03", "Greece", ["Battle","Ancient War"],
  "The Battle of Thermopylae in 480 BC saw King Leonidas I of Sparta and a small Greek force hold a narrow pass against Xerxes I's massive Persian army for three days. Though the Greeks were defeated after being outflanked by a mountain path betrayed by Ephialtes, the sacrifice became an enduring symbol of courage against overwhelming odds and bought time for Greek naval preparations at Salamis.",
  [["480 BC","Xerxes invades Greece with massive army"],["480 BC","Greeks choose Thermopylae as defensive position"],["480 BC","Day 1-2: Greeks hold the pass"],["480 BC","Ephialtes reveals mountain path"],["480 BC","Leonidas and 300 Spartans make final stand"],["480 BC","Greek rearguard annihilated"],["480 BC","Battle of Salamis follows"]]);

add("Battle of Salamis", "0480-09-01", "0480-09-01", "Greece", ["Battle","Naval Battle"],
  "The Battle of Salamis in 480 BC was a decisive naval engagement where the Greek fleet under Themistocles lured the larger Persian navy into the narrow straits of Salamis. The Persian numerical advantage was nullified in the confined waters, and the Greek triremes dealt a devastating defeat. The victory effectively ended the Persian invasion and established Athens as a major naval power.",
  [["480 BC","Persian army sacks Athens"],["480 BC","Greek fleet assembles near Salamis"],["480 BC","Themistocles devises luring strategy"],["480 BC","Persian fleet enters narrow straits"],["480 BC","Greek triremes ram and sink Persian ships"],["480 BC","Decisive Greek naval victory"],["479 BC","Battle of Plataea ends invasion"]]);

add("Battle of Plataea", "0479-08-01", "0479-08-01", "Greece", ["Battle","Ancient War"],
  "The Battle of Plataea in 479 BC was the final major land battle of the second Persian invasion of Greece. A combined Greek force decisively defeated the Persian army under Mardonius, who was killed in the fighting. The victory, alongside the naval Battle of Mycale on the same day, permanently ended the Persian threat to Greece and marked the beginning of Greek counteroffensive operations.",
  [["480 BC","Persians occupy Athens after Thermopylae"],["479 BC","Mardonius offers peace terms, rejected"],["479 BC","Greek alliance assembles largest army"],["479 BC","Forces meet near Plataea"],["479 BC","Pausanias leads Spartans to victory"],["479 BC","Mardonius killed"],["479 BC","Persian camp overrun"]]);

add("Battle of Gaugamela", "0331-10-01", "0331-10-01", "Persia", ["Battle","Ancient War"],
  "The Battle of Gaugamela in 331 BC was the decisive engagement between Alexander the Great and Darius III. Despite being heavily outnumbered, Alexander's tactical genius shattered the Persian center. Darius fled the field, ending the Achaemenid Empire and establishing Alexander as ruler of the largest empire the ancient world had known.",
  [["334 BC","Alexander crosses into Asia Minor"],["333 BC","Battle of Issus"],["332 BC","Siege of Tyre and conquest of Egypt"],["331 BC","Armies meet at Gaugamela"],["331 BC","Alexander's cavalry breaks Persian line"],["331 BC","Darius III flees"],["330 BC","Darius murdered by Bessus"]]);

add("Battle of Cannae", "0216-08-02", "0216-08-02", "Roman Republic", ["Battle","Ancient War"],
  "The Battle of Cannae in 216 BC was one of the most devastating defeats in Roman history. Hannibal Barca's double-envelopment surrounded and annihilated a much larger Roman army, killing 50,000-70,000 in a single day. The battle became a textbook example of tactical warfare studied by military commanders for over two millennia.",
  [["218 BC","Hannibal crosses the Alps"],["217 BC","Battle of Lake Trasimene"],["216 BC","Roman Senate raises massive army"],["216 BC","Romans engage at Cannae"],["216 BC","Hannibal executes double envelopment"],["216 BC","Roman army annihilated"],["202 BC","Scipio defeats Hannibal at Zama"]]);

add("Battle of Zama", "0202-10-19", "0202-10-19", "Roman Republic", ["Battle","Ancient War"],
  "The Battle of Zama in 202 BC ended the Second Punic War when Scipio Africanus defeated Hannibal on Carthaginian soil. Scipio used tactics inspired by Hannibal's own methods, neutralizing the war elephants and routing the Carthaginian cavalry. The victory established Rome as the dominant power in the western Mediterranean.",
  [["204 BC","Scipio invades North Africa"],["203 BC","Hannibal recalled from Italy"],["202 BC","Armies meet at Zama"],["202 BC","Scipio neutralizes war elephants"],["202 BC","Roman cavalry routs Carthaginians"],["202 BC","Hannibal defeated"],["201 BC","Treaty ends Second Punic War"]]);

add("Battle of Actium", "0031-09-02", "0031-09-02", "Roman Republic", ["Battle","Naval Battle"],
  "The Battle of Actium in 31 BC was the decisive naval engagement between Octavian and the combined forces of Mark Antony and Cleopatra VII. Octavian's fleet under Agrippa outmaneuvered the enemy, and Cleopatra's withdrawal triggered Antony's collapse. The victory gave Octavian undisputed control of the Roman world, leading to his transformation into Augustus, the first Roman Emperor.",
  [["32 BC","Octavian declares war on Cleopatra"],["31 BC","Forces position at Actium"],["31 BC","Agrippa cuts supply lines"],["31 BC","Naval battle on September 2"],["31 BC","Cleopatra's fleet withdraws"],["30 BC","Antony and Cleopatra commit suicide"],["27 BC","Octavian becomes Augustus"]]);

add("Battle of Teutoburg Forest", "0009-09-01", "0009-09-01", "Roman Empire", ["Battle","Ancient War"],
  "The Battle of Teutoburg Forest in 9 AD was a catastrophic Roman defeat when Germanic tribes under Arminius ambushed and destroyed three Roman legions under Varus. The loss of 20,000 soldiers halted Roman expansion into Germania and established the Rhine as the empire's permanent frontier. Emperor Augustus reportedly cried 'Varus, give me back my legions!'",
  [["7 AD","Varus appointed governor of Germania"],["9 AD","Arminius secretly unites Germanic tribes"],["9 AD","Three legions lured into forest ambush"],["9 AD","Legions XVII, XVIII, XIX destroyed"],["9 AD","Varus commits suicide"],["15 AD","Germanicus recovers lost eagles"],["16 AD","Rome abandons Germania conquest"]]);

add("Battle of Adrianople 378", "0378-08-09", "0378-08-09", "Roman Empire", ["Battle","Ancient War"],
  "The Battle of Adrianople in 378 AD was a catastrophic Roman defeat against the Visigoths, resulting in Emperor Valens' death and destruction of two-thirds of the Eastern Roman army. The battle demonstrated Gothic heavy cavalry's superiority over Roman infantry and is considered a turning point foreshadowing the fall of the Western Roman Empire.",
  [["376","Visigoths cross Danube seeking refuge"],["377","Mistreatment of refugees leads to revolt"],["378","Emperor Valens marches to confront Goths"],["378","Gothic cavalry flanks Roman army"],["378","Emperor Valens killed"],["378","Two-thirds of eastern army destroyed"],["382","Treaty grants Visigoths settlement"]]);

add("Battle of Chalons 451", "0451-06-20", "0451-06-20", "Roman Empire", ["Battle","Ancient War"],
  "The Battle of the Catalaunian Plains in 451 AD was one of the last great battles of the Western Roman Empire. Romans under Aetius and Visigoths under Theodoric I defeated Attila the Hun's invasion of Gaul. The battle halted Hunnic expansion into Western Europe. Attila retreated beyond the Rhine, never to return to Gaul.",
  [["450","Attila demands half of Western Empire"],["451","Attila invades Gaul"],["451","Aetius forges alliance with Visigoths"],["451","Armies clash at Catalaunian Plains"],["451","Visigothic king Theodoric killed"],["451","Attila defeated, retreats"],["453","Attila dies; Hunnic Empire collapses"]]);

add("Battle of Hastings", "1066-10-14", "1066-10-14", "England", ["Battle","Medieval War"],
  "The Battle of Hastings on October 14, 1066, was the decisive engagement of the Norman Conquest. William, Duke of Normandy, defeated and killed King Harold II, ending Anglo-Saxon rule in England. The Norman victory fundamentally transformed English society, language, law, and architecture, establishing a new ruling dynasty.",
  [["1066-01","Edward the Confessor dies; Harold crowned"],["1066-09","Harold defeats Norse at Stamford Bridge"],["1066-09-28","William lands at Pevensey"],["1066-10-14","Armies meet at Hastings"],["1066-10-14","Harold killed"],["1066-12-25","William crowned King of England"],["1070","Norman consolidation complete"]]);

add("Battle of Manzikert", "1071-08-26", "1071-08-26", "Byzantine Empire", ["Battle","Medieval War"],
  "The Battle of Manzikert in 1071 was a catastrophic Byzantine defeat against the Seljuk Turks under Alp Arslan. Emperor Romanos IV was captured—unprecedented in Byzantine history. The defeat opened Anatolia to Turkish settlement and was a primary catalyst for the First Crusade twenty-four years later.",
  [["1064","Seljuks capture Armenian capital Ani"],["1071","Romanos IV leads army eastward"],["1071","Treachery weakens Byzantine force"],["1071","Seljuks defeat and capture Emperor"],["1071","Romanos blinded and deposed"],["1077","Sultanate of Rum established"],["1095","First Crusade called partly in response"]]);

add("Battle of Hattin", "1187-07-04", "1187-07-04", "Crusader States", ["Battle","Medieval War"],
  "The Battle of Hattin on July 4, 1187, was a devastating Crusader defeat at the hands of Saladin's forces. The Crusader army, suffering from thirst, was surrounded near the Horns of Hattin and virtually annihilated. Saladin recaptured Jerusalem and most Crusader territories, triggering the Third Crusade.",
  [["1174","Saladin unifies Egypt and Syria"],["1187","Saladin masses largest army"],["1187-07-03","Crusaders march without water"],["1187-07-04","Army surrounded at Hattin"],["1187-07-04","King Guy captured"],["1187-10","Saladin captures Jerusalem"],["1189","Third Crusade launched"]]);

add("Battle of Agincourt", "1415-10-25", "1415-10-25", "France", ["Battle","Medieval War"],
  "The Battle of Agincourt on October 25, 1415, was a major English victory in the Hundred Years' War. Henry V's small, disease-weakened army decisively defeated a much larger French force. English longbowmen devastated French cavalry charging across muddy terrain. The victory was immortalized in Shakespeare's Henry V.",
  [["1415-08","Henry V invades Normandy"],["1415-09","Siege of Harfleur"],["1415-10","English march toward Calais"],["1415-10-25","Rain-soaked battlefield favors English"],["1415-10-25","Longbowmen devastate French charges"],["1415-10-25","Decisive English victory"],["1420","Treaty of Troyes"]]);

add("Battle of Crecy", "1346-08-26", "1346-08-26", "France", ["Battle","Medieval War"],
  "The Battle of Crécy on August 26, 1346, was the first major land battle of the Hundred Years' War and a stunning English victory. Edward III's longbowmen routed Philip VI's much larger French force. The battle demonstrated the longbow's effectiveness against armored cavalry and changed European warfare.",
  [["1337","Hundred Years War begins"],["1346-07","Edward III lands in Normandy"],["1346-08-26","Armies meet near Crécy"],["1346-08-26","English longbows devastate French"],["1346-08-26","King John of Bohemia killed"],["1346-09","Siege of Calais begins"],["1347","Calais surrenders"]]);

add("Siege of Constantinople 1453", "1453-04-06", "1453-05-29", "Byzantine Empire", ["Siege","Medieval War"],
  "The Siege of Constantinople in 1453 by Ottoman Sultan Mehmed II ended the Byzantine Empire after over a thousand years. The massive Ottoman army breached the legendary Theodosian Walls after a 53-day siege. The fall marked the end of the Roman Empire and is traditionally used to mark the end of the Middle Ages.",
  [["1451","Mehmed II becomes Sultan"],["1452","Rumeli Hisarı fortress built"],["1453-04-06","Siege begins with 80,000 troops"],["1453-04","Giant cannon bombards walls"],["1453-04-22","Ships transported overland into Golden Horn"],["1453-05-29","Final assault breaches walls"],["1453-05-29","Constantine XI killed; Empire ends"]]);

add("Battle of Lepanto", "1571-10-07", "1571-10-07", "Mediterranean", ["Battle","Naval Battle"],
  "The Battle of Lepanto on October 7, 1571, was a major naval engagement where the Holy League decisively defeated the Ottoman navy. Commanded by Don John of Austria, the Holy League fleet shattered Ottoman naval dominance in the Mediterranean. It was the last major battle fought entirely between rowing vessels.",
  [["1570","Ottoman invasion of Cyprus"],["1571","Pope Pius V forms Holy League"],["1571-10-07","Fleets meet in Gulf of Patras"],["1571-10-07","Over 400 galleys engage"],["1571-10-07","Ottoman flagship captured"],["1571-10-07","Holy League destroys Ottoman fleet"],["1571","12,000 Christian galley slaves freed"]]);

add("Spanish Armada", "1588-07-21", "1588-08-12", "Europe", ["Battle","Naval Battle"],
  "The Spanish Armada of 1588 was Philip II's massive fleet sent to invade England and overthrow Elizabeth I. The English fleet, aided by fire ships and severe storms, scattered and defeated the Armada. The failed invasion marked Spain's decline as dominant naval power and England's rise as a major maritime nation.",
  [["1585","Anglo-Spanish War begins"],["1588-05","130 ships depart Lisbon"],["1588-07","Running battles in English Channel"],["1588-08-07","Fire ships scatter Armada at Calais"],["1588-08-08","Battle of Gravelines"],["1588","Storms destroy returning ships"],["1588","Only half the Armada returns"]]);

add("Battle of Pavia", "1525-02-24", "1525-02-24", "Italy", ["Battle","Early Modern War"],
  "The Battle of Pavia on February 24, 1525, was a decisive engagement of the Italian Wars. Charles V's forces defeated and captured King Francis I of France. Spanish arquebusiers devastated the French heavy cavalry, demonstrating the growing dominance of firearms in European warfare.",
  [["1521","Italian Wars resume"],["1524","French army invades Italy"],["1524","French besiege Pavia"],["1525-02-24","Imperial relief army attacks"],["1525-02-24","Arquebusiers devastate French cavalry"],["1525-02-24","Francis I captured"],["1526","Treaty of Madrid signed"]]);

add("Battle of Breitenfeld", "1631-09-17", "1631-09-17", "Holy Roman Empire", ["Battle","Early Modern War"],
  "The Battle of Breitenfeld on September 17, 1631, was pivotal in the Thirty Years' War. Swedish King Gustavus Adolphus defeated the Catholic League under Tilly, demonstrating revolutionary combined arms tactics. It marked Sweden's entry as a major European power and turned the war in favor of Protestantism.",
  [["1618","Thirty Years War begins"],["1630","Gustavus Adolphus lands in Germany"],["1631-05","Sack of Magdeburg"],["1631-09","Sweden allies with Saxony"],["1631-09-17","Armies meet at Breitenfeld"],["1631-09-17","Swedish combined arms triumph"],["1632","Gustavus killed at Lützen"]]);

add("Battle of Rocroi", "1643-05-19", "1643-05-19", "France", ["Battle","Early Modern War"],
  "The Battle of Rocroi on May 19, 1643, was a decisive French victory that destroyed the famed Spanish tercios. The young Duke of Enghien (later Grand Condé) ended Spanish military supremacy in Europe and marked France's rise as the dominant continental power under Louis XIV.",
  [["1635","France enters Thirty Years War"],["1643-05-14","Louis XIII dies"],["1643-05-19","Duke of Enghien attacks at dawn"],["1643-05-19","French cavalry defeats Spanish flanks"],["1643-05-19","Spanish tercios destroyed"],["1648","Peace of Westphalia"],["1659","Treaty of the Pyrenees"]]);

add("Battle of Blenheim", "1704-08-13", "1704-08-13", "Europe", ["Battle","Early Modern War"],
  "The Battle of Blenheim on August 13, 1704, was a turning point in the War of the Spanish Succession. The Duke of Marlborough and Prince Eugene defeated the French and Bavarians, saving Vienna and ending French dominance established under Louis XIV. It was France's first major defeat in over fifty years.",
  [["1701","War of Spanish Succession begins"],["1704","Franco-Bavarian army threatens Vienna"],["1704","Marlborough marches 250 miles"],["1704-08-13","Allied forces attack at Blenheim"],["1704-08-13","French center broken"],["1704-08-13","Marshal Tallard captured"],["1713","Treaty of Utrecht ends war"]]);

add("Battle of Leuthen", "1757-12-05", "1757-12-05", "Prussia", ["Battle","Early Modern War"],
  "The Battle of Leuthen on December 5, 1757, is considered Frederick the Great's tactical masterpiece. With 36,000 Prussians he defeated 66,000 Austrians using his famous oblique order of attack. It is studied as one of the most brilliant victories in military history.",
  [["1756","Seven Years War begins"],["1757-11","Frederick defeats French at Rossbach"],["1757-12","Frederick force-marches to Silesia"],["1757-12-05","Prussians feint then attack Austrian left"],["1757-12-05","Oblique order rolls up Austrian line"],["1757-12-05","Austrians routed with 22,000 casualties"],["1763","Treaty of Hubertusburg"]]);

add("Siege of Yorktown", "1781-09-28", "1781-10-19", "United States", ["Battle","Siege","American Revolution"],
  "The Siege of Yorktown from September 28 to October 19, 1781, was the decisive engagement of the American Revolution. Washington and Rochambeau besieged Cornwallis while the French navy blocked escape by sea. The surrender of 8,000 British troops effectively ended the war and led to American independence.",
  [["1781-08","Washington and Rochambeau march south"],["1781-09-05","French fleet defeats British at the Capes"],["1781-09-28","Allied siege begins"],["1781-10-14","Key redoubts stormed"],["1781-10-17","Cornwallis requests terms"],["1781-10-19","British army surrenders"],["1783","Treaty of Paris recognizes independence"]]);

add("Battle of Trafalgar", "1805-10-21", "1805-10-21", "Europe", ["Battle","Naval Battle"],
  "The Battle of Trafalgar on October 21, 1805, was a decisive British naval victory during the Napoleonic Wars. Admiral Nelson's fleet destroyed the combined French and Spanish navies, ensuring British naval supremacy for over a century. Nelson was mortally wounded but lived to learn of his victory.",
  [["1803","Napoleonic Wars resume"],["1805","Napoleon plans invasion of Britain"],["1805-10-21","Nelson attacks in two columns"],["1805-10-21","'England expects every man to do his duty'"],["1805-10-21","Nelson fatally wounded"],["1805-10-21","Franco-Spanish fleet destroyed"],["1805","Napoleon abandons invasion plans"]]);

add("Battle of Austerlitz", "1805-12-02", "1805-12-02", "Europe", ["Battle","Napoleonic War"],
  "The Battle of Austerlitz on December 2, 1805, known as the Battle of the Three Emperors, was Napoleon's greatest military victory. He defeated combined Russian and Austrian armies by feigning weakness to draw allies into a trap, then striking their weakened center at Pratzen Heights. The victory forced Austria out of the Third Coalition.",
  [["1805","Third Coalition formed against France"],["1805-10","Napoleon defeats Austria at Ulm"],["1805-11","Napoleon occupies Vienna"],["1805-12-02","Napoleon feigns weakness on right"],["1805-12-02","French strike Pratzen Heights"],["1805-12-02","Coalition army destroyed"],["1805-12-26","Treaty of Pressburg"]]);

add("Battle of Borodino", "1812-09-07", "1812-09-07", "Russia", ["Battle","Napoleonic War"],
  "The Battle of Borodino on September 7, 1812, was the bloodiest single day of the Napoleonic Wars with 70,000-80,000 combined casualties. Napoleon's Grande Armée fought the Russian army under Kutuzov near Moscow. Though the French held the field, the pyrrhic victory marked the beginning of Napoleon's disastrous Russian campaign.",
  [["1812-06","Napoleon invades Russia with 600,000 troops"],["1812","Russians use scorched-earth strategy"],["1812-09-07","Russians make stand at Borodino"],["1812-09-07","70,000+ casualties in one day"],["1812-09-14","Napoleon enters abandoned Moscow"],["1812-10","Catastrophic retreat begins"],["1812-12","Only 27,000 return from Russia"]]);

add("Battle of Waterloo", "1815-06-18", "1815-06-18", "Europe", ["Battle","Napoleonic War"],
  "The Battle of Waterloo on June 18, 1815, was Napoleon's final defeat, ending his Hundred Days return and the Napoleonic Wars. Wellington's Anglo-allied army, reinforced by Blücher's Prussians, defeated Napoleon near Brussels. The battle reshaped Europe and ushered in nearly a century of relative peace.",
  [["1815-03-01","Napoleon escapes from Elba"],["1815-03-20","Hundred Days begin"],["1815-06-16","French defeat Prussians at Ligny"],["1815-06-18","Wellington holds at Waterloo"],["1815-06-18","Prussians arrive on Napoleon's flank"],["1815-06-18","Imperial Guard repulsed"],["1815-10","Napoleon exiled to Saint Helena"]]);

add("Battle of Leipzig", "1813-10-16", "1813-10-19", "Europe", ["Battle","Napoleonic War"],
  "The Battle of Leipzig (Battle of the Nations) from October 16-19, 1813, was the largest battle in European history before World War I. A coalition of Austrian, Prussian, Russian, and Swedish armies defeated Napoleon. With over 500,000 soldiers engaged and 100,000 casualties, the defeat forced Napoleon's retreat to France and his first abdication.",
  [["1813","Sixth Coalition forms"],["1813-10-16","Battle begins"],["1813-10-18","Coalition launches massive attack"],["1813-10-18","Saxon allies defect mid-battle"],["1813-10-19","Napoleon retreats"],["1813-10-19","30,000 French trapped"],["1814-04","Napoleon abdicates"]]);

add("Battle of Gettysburg", "1863-07-01", "1863-07-03", "United States", ["Battle","American Civil War"],
  "The Battle of Gettysburg, fought July 1-3, 1863, was the bloodiest battle and turning point of the American Civil War. Lee's invasion was defeated by Meade's Union forces. Pickett's Charge on the final day was a devastating failure that ended Confederate hopes of winning the war through decisive battle in the North.",
  [["1863-06","Lee invades Pennsylvania"],["1863-07-01","Forces collide at Gettysburg"],["1863-07-02","Fighting at Little Round Top"],["1863-07-03","Pickett's Charge fails"],["1863-07-04","Lee retreats to Virginia"],["1863-11-19","Lincoln delivers Gettysburg Address"],["1865","War ends"]]);

add("Battle of Antietam", "1862-09-17", "1862-09-17", "United States", ["Battle","American Civil War"],
  "The Battle of Antietam on September 17, 1862, was the bloodiest single day in American military history with 23,000 casualties. The strategic outcome favored the Union as Lee retreated, providing Lincoln the opportunity to issue the Emancipation Proclamation, transforming the war into a fight against slavery.",
  [["1862-09","Lee invades Maryland"],["1862-09-13","Union finds Lee's lost orders"],["1862-09-17","Battle at Cornfield, Bloody Lane, Burnside Bridge"],["1862-09-17","23,000 casualties in one day"],["1862-09-18","Lee retreats to Virginia"],["1862-09-22","Preliminary Emancipation Proclamation"],["1863-01-01","Emancipation takes effect"]]);

add("Siege of Vicksburg", "1863-05-18", "1863-07-04", "United States", ["Battle","Siege","American Civil War"],
  "The Siege of Vicksburg from May 18 to July 4, 1863, was a decisive Union victory. Grant's brilliant campaign and 47-day siege captured the Confederate fortress on the Mississippi River. The surrender gave the Union complete control of the Mississippi, effectively splitting the Confederacy in two.",
  [["1862","Initial attempts to take Vicksburg fail"],["1863-03","Grant begins campaign"],["1863-05","Grant wins five battles in 17 days"],["1863-05-18","Siege begins"],["1863-07-04","Confederate garrison surrenders"],["1863-07-09","Port Hudson falls"],["1863","Union controls entire Mississippi"]]);

add("Battle of Verdun", "1916-02-21", "1916-12-18", "France", ["Battle","World War I"],
  "The Battle of Verdun from February to December 1916 was one of the longest and most devastating battles of World War I. Germany intended to 'bleed France white' at this symbolic fortress. The French held under Pétain's 'Ils ne passeront pas!' but combined casualties exceeded 700,000, symbolizing WWI's futility.",
  [["1916-02-21","German offensive begins"],["1916-02-25","Fort Douaumont captured"],["1916-02","Pétain organizes Voie Sacrée supply route"],["1916-07","Somme draws German resources"],["1916-10","French counteroffensive under Nivelle"],["1916-10-24","Fort Douaumont recaptured"],["1916-12-18","Battle ends; lines nearly unchanged"]]);

add("Battle of the Somme", "1916-07-01", "1916-11-18", "France", ["Battle","World War I"],
  "The Battle of the Somme from July to November 1916 was one of the bloodiest battles in human history. On the first day, the British suffered nearly 60,000 casualties. The Anglo-French offensive gained only 10 km at the cost of over one million total casualties. It saw the first use of tanks and became synonymous with trench warfare horrors.",
  [["1916-06","Week-long bombardment begins"],["1916-07-01","57,470 British casualties on first day"],["1916-09-15","First tanks used at Flers-Courcelette"],["1916-10","Battle continues with diminishing returns"],["1916-11-18","Battle officially ends"],["1916","Over 1 million casualties for 10km"],["1917","German withdrawal to Hindenburg Line"]]);

add("Battle of Passchendaele", "1917-07-31", "1917-11-10", "Belgium", ["Battle","World War I"],
  "The Third Battle of Ypres (Passchendaele) from July to November 1917 epitomized WWI's futility. British and Commonwealth forces attacked in conditions where torrential rain turned the battlefield into impassable mud. The battle produced 475,000 casualties for an advance of just 8 kilometers.",
  [["1917-06","Battle of Messines as preliminary"],["1917-07-31","Main offensive begins in heavy rain"],["1917-08","Battlefield becomes impassable mud"],["1917-10","Canadians assigned to take Passchendaele"],["1917-11-06","Canadians capture village"],["1917-11-10","Battle ends"],["1918-04","Germans retake all gained ground"]]);

add("Gallipoli Campaign", "1915-02-19", "1916-01-09", "Ottoman Empire", ["Battle","World War I"],
  "The Gallipoli Campaign of 1915-1916 was a failed Allied attempt to secure a sea route to Russia through Ottoman territory. ANZAC, British, and French forces landed but couldn't advance against Ottoman resistance commanded by Mustafa Kemal. The campaign cost 500,000 casualties and became a founding myth for Australia, New Zealand, and modern Turkey.",
  [["1915-02-19","Allied naval bombardment begins"],["1915-03-18","Naval assault fails"],["1915-04-25","ANZAC and British land on peninsula"],["1915-04-25","Mustafa Kemal rallies defense"],["1915-08","Suvla Bay landing fails"],["1915-12","Evacuation decision made"],["1916-01-09","Last troops evacuated"]]);

add("Battle of Jutland", "1916-05-31", "1916-06-01", "Europe", ["Battle","Naval Battle"],
  "The Battle of Jutland on May 31-June 1, 1916, was the largest naval battle of World War I. Though the Germans inflicted heavier losses, the strategic outcome favored Britain as the German fleet never again sought major engagement. The battle confirmed British naval dominance and the effectiveness of the Allied blockade.",
  [["1916-05-31","German fleet sorties into North Sea"],["1916-05-31","Beatty's battlecruisers engage"],["1916-05-31","Three British battlecruisers destroyed"],["1916-05-31","Jellicoe deploys Grand Fleet"],["1916-06-01","Germans escape through night action"],["1916","German fleet remains in port"],["1918","German fleet mutinies"]]);

add("Battle of Tannenberg 1914", "1914-08-26", "1914-08-30", "East Prussia", ["Battle","World War I"],
  "The Battle of Tannenberg from August 26-30, 1914, was a decisive German victory on the Eastern Front. Hindenburg and Ludendorff encircled the Russian Second Army, capturing 92,000 soldiers. General Samsonov committed suicide. The victory made Hindenburg a national hero and halted the Russian invasion of Germany.",
  [["1914-08","Russia invades East Prussia"],["1914-08-22","Hindenburg and Ludendorff take command"],["1914-08-26","Germans concentrate against Second Army"],["1914-08-27","Double envelopment begins"],["1914-08-29","Russian army surrounded"],["1914-08-30","Samsonov commits suicide"],["1914-08-30","92,000 Russians captured"]]);

add("First Battle of the Marne", "1914-09-05", "1914-09-12", "France", ["Battle","World War I"],
  "The First Battle of the Marne in September 1914 was the pivotal engagement that saved Paris and halted the German advance in WWI's opening weeks. The French famously used Parisian taxicabs to rush reinforcements to the front. The German retreat ended the Schlieffen Plan's hope for quick victory and led to trench warfare.",
  [["1914-08","German armies advance through Belgium"],["1914-09-01","German First Army turns east of Paris"],["1914-09-04","Gallieni spots opportunity"],["1914-09-05","Counterattack launched"],["1914-09-07","Taxis ferry 6,000 troops to front"],["1914-09-12","Germans retreat to the Aisne"],["1914","Trench warfare follows"]]);

add("Battle of Stalingrad", "1942-08-23", "1943-02-02", "Soviet Union", ["Battle","World War II"],
  "The Battle of Stalingrad from August 1942 to February 1943 was the largest and bloodiest battle in warfare history, with nearly 2 million combined casualties. The Soviet encirclement and destruction of the German 6th Army under Paulus marked the turning point of WWII on the Eastern Front and shattered the myth of Wehrmacht invincibility.",
  [["1942-08-23","Massive German bombardment"],["1942-09","Street-by-street fighting begins"],["1942-10","Soviets hold by meters"],["1942-11-19","Operation Uranus encircles Germans"],["1942-12","Relief attempt fails"],["1943-01-31","Paulus surrenders"],["1943-02-02","Last resistance ends"]]);

add("Battle of Midway", "1942-06-04", "1942-06-07", "Pacific Ocean", ["Battle","Naval Battle"],
  "The Battle of Midway in June 1942 was the decisive naval battle of the Pacific War. American carrier aircraft sank four Japanese fleet carriers in exchange for one American carrier. Achieved through codebreaking and extraordinary bravery, the victory shifted Pacific naval power and forced Japan onto the defensive.",
  [["1942-05","US codebreakers identify Midway target"],["1942-06-04","Japanese strike Midway Island"],["1942-06-04","US dive bombers find carriers"],["1942-06-04","Three carriers sunk in five minutes"],["1942-06-05","Hiryu sunk"],["1942-06-07","Yorktown sunk by submarine"],["1942","Japanese offensive capability crippled"]]);

add("Battle of Kursk", "1943-07-05", "1943-07-23", "Soviet Union", ["Battle","World War II"],
  "The Battle of Kursk in July 1943 was the largest tank battle in history and the last major German offensive on the Eastern Front. Soviet forces, forewarned by intelligence, built deep defenses. The Soviet counteroffensive that followed permanently seized the strategic initiative. After Kursk, the Wehrmacht was in continuous retreat.",
  [["1943-04","Germans plan Operation Citadel"],["1943-07-05","Offensive begins"],["1943-07-12","Largest tank battle at Prokhorovka"],["1943-07-12","German advance halted"],["1943-07-13","Hitler cancels operation"],["1943-07-17","Soviet counteroffensives begin"],["1943-08-23","Soviets recapture Kharkov"]]);

add("D-Day Normandy Invasion", "1944-06-06", "1944-06-06", "France", ["Battle","World War II"],
  "D-Day on June 6, 1944, was the largest amphibious invasion in history, opening the Western Front in WWII. Allied forces landed on five Normandy beaches despite fierce German resistance, especially at Omaha Beach. 156,000 troops landed by day's end, leading to France's liberation and Nazi Germany's defeat.",
  [["1943","Operation Overlord planning begins"],["1944-06-05","Eisenhower decides to launch"],["1944-06-06","Airborne troops land overnight"],["1944-06-06","Landings at five beaches"],["1944-06-06","Heavy casualties at Omaha Beach"],["1944-06-06","156,000 troops land"],["1944-08-25","Paris liberated"]]);

add("Battle of the Bulge", "1944-12-16", "1945-01-25", "Europe", ["Battle","World War II"],
  "The Battle of the Bulge from December 1944 to January 1945 was the last major German offensive in WWII. Hitler's surprise attack through the Ardennes created a dangerous 'bulge' in Allied lines. Despite the siege of Bastogne and initial success, Patton's counterattack eliminated the salient and exhausted Germany's last reserves.",
  [["1944-12-16","German surprise attack"],["1944-12-17","Malmedy massacre"],["1944-12-20","101st Airborne surrounded at Bastogne"],["1944-12-22","McAuliffe replies 'Nuts!'"],["1944-12-26","Patton relieves Bastogne"],["1945-01","Counteroffensive eliminates bulge"],["1945-05","Germany surrenders"]]);

add("Second Battle of El Alamein", "1942-10-23", "1942-11-11", "Egypt", ["Battle","World War II"],
  "The Second Battle of El Alamein from October to November 1942 was the decisive North African engagement. Montgomery's Eighth Army defeated Rommel's Afrika Korps, preventing Axis seizure of the Suez Canal. Churchill said: 'Before Alamein we never had a victory. After Alamein we never had a defeat.'",
  [["1942-07","First El Alamein halts Rommel"],["1942-08","Montgomery takes command"],["1942-10-23","Operation Lightfoot begins"],["1942-11-02","Operation Supercharge breaks through"],["1942-11-04","Rommel retreats"],["1942-11-08","Operation Torch landings"],["1943-05","Axis surrender in North Africa"]]);

add("Battle of Iwo Jima", "1945-02-19", "1945-03-26", "Japan", ["Battle","World War II"],
  "The Battle of Iwo Jima from February to March 1945 was one of the bloodiest Pacific War engagements. Marines assaulted the fortified volcanic island with its extensive tunnel network. The iconic flag-raising on Mount Suribachi became one of WWII's most recognized images. Nearly all 21,000 Japanese defenders were killed.",
  [["1945-02-19","Marines land under heavy fire"],["1945-02-23","Flag raised on Mount Suribachi"],["1945-03","Fierce fighting through tunnels"],["1945-03-26","Island declared secured"],["1945","6,800 Americans killed"],["1945","18,000+ Japanese killed"],["1945","Island used as B-29 emergency strip"]]);

add("Battle of Okinawa", "1945-04-01", "1945-06-22", "Japan", ["Battle","World War II"],
  "The Battle of Okinawa from April to June 1945 was the largest Pacific Theater amphibious assault and the bloodiest Pacific battle. The 82-day campaign included massive kamikaze attacks. The enormous casualties—over 200,000 total including 100,000 civilians—strongly influenced the decision to use atomic bombs to end the war.",
  [["1945-04-01","US forces land on Okinawa"],["1945-04-06","First mass kamikaze attacks"],["1945-04-07","Yamato sunk en route"],["1945-05","Fierce fighting at Shuri Line"],["1945-06-18","General Buckner killed"],["1945-06-22","Organized resistance ends"],["1945","Over 200,000 total killed"]]);

add("Battle of Britain", "1940-07-10", "1940-10-31", "United Kingdom", ["Battle","World War II"],
  "The Battle of Britain from July to October 1940 was the first major campaign fought entirely by air forces. The RAF, aided by radar, successfully defended Britain against the Luftwaffe's attempt to gain air superiority for Operation Sea Lion. It was Hitler's first major defeat and kept Britain in the war.",
  [["1940-06","France falls; Britain stands alone"],["1940-07-10","Battle officially begins"],["1940-08","Luftwaffe targets RAF airfields"],["1940-08-20","Churchill's 'The Few' speech"],["1940-09-07","Blitz begins on London"],["1940-09-15","Battle of Britain Day"],["1940-10","Hitler postpones invasion"]]);

add("Battle of the Atlantic", "1939-09-03", "1945-05-08", "Atlantic Ocean", ["Battle","Naval Battle"],
  "The Battle of the Atlantic was the longest continuous WWII campaign. German U-boats attempted to sever Allied supply lines, threatening to starve Britain. The Allies won through sonar, radar, codebreaking, and convoy tactics. Churchill called it the 'dominating factor' of the war; 70,000 Allied seamen were lost.",
  [["1939-09","Unrestricted submarine warfare begins"],["1940","First 'Happy Time' for U-boats"],["1942","Second Happy Time; massive losses"],["1943-03","Crisis month: highest losses"],["1943-05","Black May: 43 U-boats sunk"],["1943","Technology overcomes U-boats"],["1945-05","783 U-boats lost total"]]);

add("Attack on Pearl Harbor", "1941-12-07", "1941-12-07", "United States", ["Battle","World War II"],
  "The attack on Pearl Harbor on December 7, 1941, was Japan's surprise strike against the US naval base in Hawaii. 21 ships and 347 aircraft were destroyed or damaged, killing 2,403 Americans. Roosevelt called it 'a date which will live in infamy.' The attack brought the United States into World War II.",
  [["1941","US-Japan relations deteriorate"],["1941-11","Japanese carrier fleet departs secretly"],["1941-12-07","First wave attacks at 7:48 AM"],["1941-12-07","USS Arizona explodes"],["1941-12-07","2,403 Americans killed"],["1941-12-08","Congress declares war on Japan"],["1941-12-11","Germany declares war on US"]]);

add("Battle of Berlin 1945", "1945-04-16", "1945-05-02", "Germany", ["Battle","World War II"],
  "The Battle of Berlin from April 16 to May 2, 1945, was the final major European Theater offensive. Soviet forces under Zhukov and Konev stormed the German capital in brutal urban warfare. Hitler committed suicide on April 30, and Berlin surrendered on May 2, ending Nazi Germany.",
  [["1945-04-16","Soviet offensive across Oder"],["1945-04-20","Soviet artillery reaches Berlin"],["1945-04-25","Berlin encircled"],["1945-04-30","Hitler commits suicide"],["1945-05-01","Goebbels commits suicide"],["1945-05-02","Berlin surrenders"],["1945-05-08","V-E Day"]]);

add("Fall of France 1940", "1940-05-10", "1940-06-25", "France", ["Battle","World War II"],
  "The Fall of France in May-June 1940 was Germany's stunningly rapid Blitzkrieg conquest. German forces broke through the Ardennes, cutting off Allied forces in Belgium. The BEF evacuated at Dunkirk, and France signed an armistice in just six weeks. The disaster shocked the world and left Britain alone against Nazi Germany.",
  [["1940-05-10","Germany invades Low Countries"],["1940-05-13","Panzers cross Meuse at Sedan"],["1940-05-20","Germans reach English Channel"],["1940-05-26","Dunkirk evacuation begins"],["1940-06-04","338,000 evacuated"],["1940-06-14","Germans enter Paris"],["1940-06-22","France signs armistice"]]);

add("Operation Barbarossa", "1941-06-22", "1941-12-05", "Soviet Union", ["Battle","World War II"],
  "Operation Barbarossa, launched June 22, 1941, was the German invasion of the Soviet Union—the largest military operation in history. Over 3.8 million Axis troops attacked along a 2,900-km front. Despite devastating initial success, the offensive stalled before Moscow in December 1941, opening the Eastern Front that consumed the majority of German resources.",
  [["1941-06-22","3.8 million troops invade"],["1941-07","Smolensk captured"],["1941-09","Siege of Leningrad begins"],["1941-09","Battle of Kiev; 600,000 captured"],["1941-10","Operation Typhoon toward Moscow"],["1941-12-05","Soviet counteroffensive"],["1941-12","Blitzkrieg strategy fails"]]);

add("Siege of Leningrad", "1941-09-08", "1944-01-27", "Soviet Union", ["Siege","World War II"],
  "The Siege of Leningrad lasting 872 days was one of history's longest and most destructive sieges. German and Finnish forces blockaded the city, causing mass starvation among 3 million inhabitants. Approximately 1 million civilians died, mostly from famine. Supply came only via the perilous 'Road of Life' across frozen Lake Ladoga.",
  [["1941-09-08","Encirclement complete"],["1941-11","Daily bread ration drops to 125 grams"],["1941-12","Road of Life opens across Lake Ladoga"],["1942","650,000 civilians die from starvation"],["1943-01","Partial blockade break"],["1944-01-27","Full liberation"],["1945","Hero City status awarded"]]);

add("Battle of Inchon", "1950-09-15", "1950-09-19", "South Korea", ["Battle","Korean War"],
  "The Battle of Inchon on September 15, 1950, was MacArthur's bold amphibious landing behind North Korean lines during the Korean War. The surprise attack cut enemy supply lines and led to Seoul's recapture, reversing the course of the war. It is regarded as one of the most brilliant military operations in modern history.",
  [["1950-06-25","Korean War begins"],["1950-08","UN forces at Pusan Perimeter"],["1950-09-15","Amphibious landing at Inchon"],["1950-09-19","Inchon secured"],["1950-09-22","Pusan breakout begins"],["1950-09-28","Seoul recaptured"],["1950-10","UN forces enter North Korea"]]);

add("Battle of Chosin Reservoir", "1950-11-27", "1950-12-13", "North Korea", ["Battle","Korean War"],
  "The Battle of Chosin Reservoir from November 27 to December 13, 1950, was one of the Korean War's most brutal engagements. UN forces, primarily US Marines, were surrounded by Chinese forces in -40° temperatures. The fighting retreat through 78 miles of mountains became legendary, preserving the core of UN fighting forces.",
  [["1950-10","Chinese forces enter war"],["1950-11-27","Chinese launch massive assault"],["1950-11-28","UN forces surrounded"],["1950-12","Marines begin fighting retreat"],["1950-12-09","Breakout through Funchilin Pass"],["1950-12-11","Evacuation from Hungnam begins"],["1950-12-24","100,000+ evacuated"]]);

add("Battle of Dien Bien Phu", "1954-03-13", "1954-05-07", "Vietnam", ["Battle","Colonial War"],
  "The Battle of Dien Bien Phu from March to May 1954 was the climactic confrontation of the First Indochina War. Viet Minh forces under Giap besieged the French garrison in a remote valley. The French defeat led to the Geneva Accords ending colonial rule. It is one of the 20th century's most significant anticolonial victories.",
  [["1953-11","French establish base at Dien Bien Phu"],["1954-01","Viet Minh mass forces"],["1954-03-13","Artillery bombardment begins"],["1954-04","French airstrip unusable"],["1954-04-26","Geneva Conference begins"],["1954-05-07","French garrison surrenders"],["1954-07","Geneva Accords divide Vietnam"]]);

add("Tet Offensive", "1968-01-30", "1968-03-28", "Vietnam", ["Battle","Vietnam War"],
  "The Tet Offensive launched January 30, 1968, was a massive coordinated surprise attack by Viet Cong and North Vietnamese forces during the Vietnamese New Year. Though a military failure, it was a psychological victory that shattered American public confidence and is the turning point that led to US withdrawal from Vietnam.",
  [["1968-01-21","Siege of Khe Sanh begins"],["1968-01-30","Coordinated attacks across South Vietnam"],["1968-01-31","US Embassy compound breached"],["1968-02","Battle of Hue"],["1968-02","Cronkite declares 'stalemate'"],["1968-03-31","LBJ won't seek re-election"],["1968-05","Paris Peace Talks begin"]]);

add("Battle of Isandlwana", "1879-01-22", "1879-01-22", "South Africa", ["Battle","Colonial War"],
  "The Battle of Isandlwana on January 22, 1879, was the first major engagement of the Anglo-Zulu War and one of the worst British defeats against an indigenous force. A Zulu army of 20,000 overwhelmed 1,800 British and colonial troops, killing over 1,300. The disaster shocked Victorian Britain.",
  [["1879-01-11","British invade Zululand"],["1879-01-22","Lord Chelmsford divides force"],["1879-01-22","Zulu impis attack camp"],["1879-01-22","Ammunition supply fails"],["1879-01-22","1,300+ killed"],["1879-01-22","Battle of Rorke's Drift follows"],["1879-07","Zulu kingdom defeated"]]);

add("Battle of Adwa", "1896-03-01", "1896-03-01", "Ethiopia", ["Battle","Colonial War"],
  "The Battle of Adwa on March 1, 1896, was a decisive Ethiopian victory over Italian invaders. Emperor Menelik II's 100,000 troops defeated 17,700 Italians, preserving Ethiopia as the only African nation to resist European colonization during the Scramble for Africa. It became a powerful symbol of African resistance.",
  [["1889","Treaty of Wuchale dispute"],["1895","Italy invades Ethiopia"],["1896-02","Menelik mobilizes massive army"],["1896-03-01","Italians attack in three columns"],["1896-03-01","Ethiopians overwhelm Italian army"],["1896-03-01","6,000+ Italians killed"],["1896-10","Treaty recognizes Ethiopian sovereignty"]]);

add("Battle of Tsushima", "1905-05-27", "1905-05-28", "Japan", ["Battle","Naval Battle"],
  "The Battle of Tsushima on May 27-28, 1905, was the decisive naval engagement of the Russo-Japanese War. Admiral Togo annihilated the Russian Baltic Fleet, which had sailed 18,000 miles only to be destroyed. Japan sank 21 Russian ships while losing only 3 torpedo boats, establishing Japan as a major world power.",
  [["1904-02","Russo-Japanese War begins"],["1904-10","Baltic Fleet departs for Far East"],["1905-05","Fleet arrives after 7-month voyage"],["1905-05-27","Togo intercepts in Tsushima Strait"],["1905-05-27","Togo crosses the T"],["1905-05-28","21 Russian ships sunk or captured"],["1905-09","Treaty of Portsmouth"]]);

add("Battle of Red Cliffs", "0208-11-01", "0208-12-01", "China", ["Battle","Ancient War"],
  "The Battle of Red Cliffs (Chibi) in 208 AD was one of China's most famous battles. Allied forces of Sun Quan and Liu Bei defeated Cao Cao's larger army using fire ships. The victory prevented Chinese unification and established the Three Kingdoms division immortalized in the Romance of the Three Kingdoms.",
  [["208","Cao Cao conquers north and marches south"],["208","Liu Bei and Sun Quan form alliance"],["208","Fire attack strategy devised"],["208","Fire ships destroy Cao Cao's chained fleet"],["208","Cao Cao retreats north"],["220","Kingdom of Wei established"],["221","Shu Han and Wu established"]]);

add("Battle of Sekigahara", "1600-10-21", "1600-10-21", "Japan", ["Battle","Japanese History"],
  "The Battle of Sekigahara on October 21, 1600, established Tokugawa dominance over Japan. Ieyasu's Eastern Army defeated the Western Army at the crossroads of Sekigahara, with Kobayakawa Hideaki's betrayal proving decisive. Ieyasu became shogun in 1603, beginning 260 years of Tokugawa rule.",
  [["1598","Hideyoshi dies"],["1599","Power struggle begins"],["1600","Japan divides into two armies"],["1600-10-21","180,000 warriors clash"],["1600-10-21","Kobayakawa betrays Western Army"],["1603","Ieyasu appointed Shogun"],["1615","Osaka siege ends Toyotomi resistance"]]);

add("Battle of Changping", "0260-01-01", "0260-01-01", "China", ["Battle","Ancient War"],
  "The Battle of Changping in 260 BC during the Warring States period saw Qin under Bai Qi defeat Zhao, reportedly burying 400,000 prisoners alive. This horrific mass execution severely weakened Zhao and demonstrated Qin's ruthless power, a crucial step toward Qin's unification of China.",
  [["262 BC","Conflict over Han territory"],["260 BC","Zhao replaces cautious general"],["260 BC","Bai Qi lures Zhao into trap"],["260 BC","Zhao army encircled for 46 days"],["260 BC","Zhao Kuo killed in breakout"],["260 BC","400,000 prisoners buried alive"],["221 BC","Qin unifies China"]]);

add("Siege of Baghdad 1258", "1258-01-29", "1258-02-10", "Iraq", ["Siege","Medieval War"],
  "The Siege of Baghdad in 1258 by Hulagu Khan was one of the most catastrophic events in Islamic history. The Mongols sacked the Abbasid capital, destroying the House of Wisdom and killing estimates of 200,000 to over 1 million. The destruction ended the Islamic Golden Age and devastated the region for centuries.",
  [["1257","Hulagu marches west"],["1258-01-29","Siege begins"],["1258-02-05","Walls breached"],["1258-02-10","Caliph surrenders"],["1258-02-13","Caliph executed"],["1258","Libraries destroyed"],["1258","Abbasid Caliphate ends"]]);

add("Battle of Ain Jalut", "1260-09-03", "1260-09-03", "Palestine", ["Battle","Medieval War"],
  "The Battle of Ain Jalut on September 3, 1260, was the first major Mongol defeat. Mamluk forces under Qutuz and Baibars used feigned retreat to destroy the Mongol force in the Jezreel Valley. The victory halted Mongol westward expansion and preserved the Islamic heartland from conquest.",
  [["1258","Mongols sack Baghdad"],["1260","Mongols conquer Syria"],["1260","Hulagu withdraws main force east"],["1260-09-03","Mamluks meet Mongols at Ain Jalut"],["1260-09-03","Baibars leads feigned retreat"],["1260-09-03","Mongol force destroyed"],["1260","Mongol expansion west halted"]]);

add("Siege of Orleans", "1428-10-12", "1429-05-08", "France", ["Siege","Hundred Years War"],
  "The Siege of Orléans from 1428 to 1429 was a turning point of the Hundred Years' War. The English siege was lifted by French forces inspired by Joan of Arc. Joan's arrival revitalized French morale, led to Charles VII's coronation at Reims, and ultimately to French victory in the war.",
  [["1428-10-12","English begin siege"],["1429-02","Joan of Arc meets Charles VII"],["1429-04-29","Joan enters Orléans"],["1429-05-07","Joan leads attack on Les Tourelles"],["1429-05-08","English abandon siege"],["1429-07-17","Charles VII crowned at Reims"],["1431-05-30","Joan burned at stake"]]);

add("Battle of Bannockburn", "1314-06-23", "1314-06-24", "Scotland", ["Battle","Medieval War"],
  "The Battle of Bannockburn on June 23-24, 1314, was a decisive Scottish victory in the First War of Independence. Robert the Bruce defeated a much larger English force under Edward II near Stirling Castle. The victory secured Scottish independence for generations and established Bruce as Scotland's greatest national hero.",
  [["1306","Robert the Bruce crowned"],["1314-06-23","English vanguard defeated"],["1314-06-24","Scottish schiltrons destroy cavalry"],["1314-06-24","Edward II flees"],["1314","Independence secured"],["1320","Declaration of Arbroath"],["1328","Treaty recognizes Scottish independence"]]);

add("Battle of Mohacs", "1526-08-29", "1526-08-29", "Hungary", ["Battle","Early Modern War"],
  "The Battle of Mohács on August 29, 1526, was a decisive Ottoman victory. Suleiman the Magnificent's forces annihilated the Hungarian army, and King Louis II drowned fleeing. The defeat led to Hungary's partition and 150 years of Ottoman occupation, ending the medieval Hungarian kingdom.",
  [["1521","Suleiman captures Belgrade"],["1526","Suleiman invades Hungary"],["1526-08-29","Armies clash at Mohács"],["1526-08-29","Hungarian cavalry broken"],["1526-08-29","King Louis II killed"],["1526","Hungary partitioned"],["1529","First Siege of Vienna"]]);

add("Battle of Vienna 1683", "1683-09-12", "1683-09-12", "Austria", ["Battle","Early Modern War"],
  "The Battle of Vienna on September 12, 1683, was a decisive European victory against the Ottoman siege. King Jan III Sobieski of Poland led the largest cavalry charge in history with 18,000 horsemen, shattering Ottoman siege lines. The victory began Ottoman decline in Europe.",
  [["1683-07-14","Ottoman siege begins"],["1683-07","Vienna garrison holds"],["1683-09","Relief force assembles under Sobieski"],["1683-09-12","Infantry attacks from hills"],["1683-09-12","Sobieski leads massive cavalry charge"],["1683-09-12","Ottoman camp overrun"],["1683","Grand Vizier executed for failure"]]);

add("Battle of Saratoga", "1777-09-19", "1777-10-17", "United States", ["Battle","American Revolution"],
  "The Battles of Saratoga in 1777 were the turning point of the American Revolution. American forces defeated British General Burgoyne, who surrendered 6,000 troops. The victory convinced France to enter the war as an American ally, providing crucial military and financial support.",
  [["1777","British plan three-pronged attack"],["1777-09-19","First Battle of Freeman's Farm"],["1777-10-07","Second Battle of Bemis Heights"],["1777-10-07","Benedict Arnold leads decisive charge"],["1777-10-17","Burgoyne surrenders 6,000 troops"],["1778-02","France recognizes American independence"],["1783","Treaty of Paris ends war"]]);

add("Fall of Singapore", "1942-02-08", "1942-02-15", "Singapore", ["Battle","World War II"],
  "The Fall of Singapore on February 15, 1942, was one of Britain's greatest military defeats. Japanese forces conquered the 'impregnable' fortress in one week, capturing 80,000 troops—the largest British surrender ever. The defeat shattered European colonial prestige in Asia.",
  [["1941-12-08","Japanese invasion of Malaya"],["1942-01","Rapid Japanese advance"],["1942-01-31","British withdraw to Singapore"],["1942-02-08","Japanese cross Johor Strait"],["1942-02-15","Percival surrenders 80,000 troops"],["1945-09","Singapore liberated"],["1942","Colonial prestige shattered"]]);

add("Battle of Guadalcanal", "1942-08-07", "1943-02-09", "Solomon Islands", ["Battle","World War II"],
  "The Battle of Guadalcanal from August 1942 to February 1943 was the first major Allied offensive in the Pacific. US Marines fought months of brutal jungle warfare to secure a critical airfield. The campaign included fierce naval engagements in 'Ironbottom Sound' and marked the transition from defense to offense.",
  [["1942-08-07","Marines land on Guadalcanal"],["1942-08-08","Naval defeat at Savo Island"],["1942-08","Henderson Field secured"],["1942-10-25","Japanese assault repulsed"],["1942-11","Naval Battle of Guadalcanal"],["1943-01","Japanese evacuate"],["1943-02-09","Island secured"]]);

add("Battle of Sedan 1870", "1870-09-01", "1870-09-02", "France", ["Battle","Franco-Prussian War"],
  "The Battle of Sedan on September 1-2, 1870, was the decisive engagement of the Franco-Prussian War. Prussia surrounded and captured the French Army and Emperor Napoleon III. The capture led to the Second Empire's collapse, the Third Republic's creation, and the German Empire's proclamation at Versailles.",
  [["1870-07-19","France declares war on Prussia"],["1870-08","German armies invade France"],["1870-09-01","Germans surround French at Sedan"],["1870-09-02","Napoleon III surrenders with 83,000"],["1870-09-04","French Third Republic proclaimed"],["1871-01-18","German Empire proclaimed at Versailles"],["1871-05","Treaty of Frankfurt"]]);

add("Battle of Koniggratz", "1866-07-03", "1866-07-03", "Austria", ["Battle","Austro-Prussian War"],
  "The Battle of Königgrätz on July 3, 1866, was the decisive Austro-Prussian War engagement. Prussian forces used superior organization and the needle gun to rout the Austrian Empire's army. The victory established Prussian dominance in Germany and paved the way for unification under Bismarck.",
  [["1866-06","War begins over Schleswig-Holstein"],["1866-06","Prussia invades Bohemia"],["1866-07-03","Armies meet at Königgrätz"],["1866-07-03","Needle guns give Prussian advantage"],["1866-07-03","Crown Prince flanks Austrians"],["1866-08","Treaty of Prague"],["1867","North German Confederation formed"]]);

add("Battle of Plassey", "1757-06-23", "1757-06-23", "India", ["Battle","Colonial War"],
  "The Battle of Plassey on June 23, 1757, established British East India Company rule in India. Clive's 3,000 defeated the Nawab's 50,000 through the treachery of Mir Jafar. The victory gave the Company control of Bengal's revenues and is considered the beginning of British colonial rule in India.",
  [["1756","Nawab captures Calcutta"],["1757-01","Clive recaptures Calcutta"],["1757","Clive conspires with Mir Jafar"],["1757-06-23","Battle at Plassey"],["1757-06-23","Mir Jafar's forces don't fight"],["1757-06-23","Nawab's army collapses"],["1757","Mir Jafar installed as puppet"]]);

add("Battle of Huaihai", "1948-11-06", "1949-01-10", "China", ["Battle","Chinese Civil War"],
  "The Huaihai Campaign (November 1948-January 1949) was the decisive Chinese Civil War battle. Communist forces encircled and destroyed 555,000 Nationalist troops. The victory opened the road to Nanjing and Shanghai, ensuring Communist victory and the establishment of the People's Republic of China.",
  [["1948-09","PLA victories in Manchuria"],["1948-11-06","Campaign begins"],["1948-11","PLA encircles Nationalist forces"],["1948-12","Relief attempts fail"],["1949-01-10","Campaign ends"],["1949-04","PLA crosses Yangtze"],["1949-10-01","PRC proclaimed"]]);

add("Siege of Troy", "1260-01-01", "1250-01-01", "Anatolia", ["Battle","Legendary War"],
  "The Siege of Troy, traditionally dated around 1260-1180 BC, is the legendary ten-year conflict immortalized in Homer's Iliad. Archaeological evidence at Hisarlik suggests a real conflict. The story of Achilles, Hector, the Trojan Horse, and Odysseus became the foundational narrative of Western literature.",
  [["1260 BC","Greeks assemble fleet at Aulis"],["1260 BC","Greeks land at Troy"],["1260 BC","Nine years of fighting"],["1250 BC","Achilles kills Hector"],["1250 BC","Greeks build Trojan Horse"],["1250 BC","Troy falls"],["750 BC","Homer composes the Iliad"]]);

add("Battle of Kadesh", "1274-05-01", "1274-05-01", "Syria", ["Battle","Ancient War"],
  "The Battle of Kadesh in 1274 BC between Egypt under Ramesses II and the Hittites under Muwatalli II is the earliest battle with known tactical details. Both sides claimed victory in what was a strategic draw. It led to the earliest known peace treaty in history, the Egyptian-Hittite treaty of 1259 BC.",
  [["1274 BC","Ramesses marches north"],["1274 BC","Egyptian army ambushed by Hittite chariots"],["1274 BC","Ramesses personally rallies forces"],["1274 BC","Reinforcements save the day"],["1274 BC","Battle ends inconclusively"],["1259 BC","Peace treaty signed"],["1259 BC","Earliest known peace agreement"]]);

add("Mongol Invasion of Europe", "1241-04-09", "1242-03-01", "Europe", ["Battle","Medieval War"],
  "The Mongol invasion of Europe in 1241-1242 saw Batu Khan and Subutai simultaneously defeat the Polish-German army at Legnica and the Hungarian army at Mohi. Only Great Khan Ögedei's death caused the Mongols to withdraw, potentially saving Western Europe from conquest.",
  [["1237","Mongols invade Kievan Rus"],["1240","Kiev sacked"],["1241-04-09","Battle of Legnica"],["1241-04-11","Battle of Mohi"],["1241","Hungary and Poland ravaged"],["1242","Ögedei's death triggers withdrawal"],["1242","Golden Horde established"]]);

add("Battle of Kosovo 1389", "1389-06-15", "1389-06-15", "Serbia", ["Battle","Medieval War"],
  "The Battle of Kosovo on June 15, 1389, between a Serbian-led coalition and the Ottoman Empire saw both leaders—Prince Lazar and Sultan Murad I—killed. The strategic result favored the Ottomans, leading to Serbian vassalage. The battle became central to Serbian national identity and mythology.",
  [["1371","Ottomans defeat Serbs at Maritsa"],["1389-06-15","Coalition meets Ottomans at Kosovo Polje"],["1389-06-15","Sultan Murad assassinated"],["1389-06-15","Prince Lazar captured and executed"],["1389","Serbia becomes Ottoman vassal"],["1459","Serbian Despotate falls"],["1989","600th anniversary ceremonies"]]);

add("First Battle of Panipat", "1526-04-21", "1526-04-21", "India", ["Battle","Early Modern War"],
  "The First Battle of Panipat on April 21, 1526, established the Mughal Empire in India. Babur's 12,000 defeated Ibrahim Lodi's 100,000 using field artillery and innovative tactics. The victory founded one of India's greatest empires, ruling the subcontinent for over three centuries.",
  [["1504","Babur captures Kabul"],["1519","Babur raids into India"],["1526-04-21","Armies meet at Panipat"],["1526-04-21","Mughal artillery devastates Lodi's forces"],["1526-04-21","Ibrahim Lodi killed"],["1527","Babur defeats Rajputs at Khanwa"],["1530","Babur dies; Mughal Empire established"]]);

// More wars and battles
add("Battle of Dunkirk Evacuation", "1940-05-26", "1940-06-04", "France", ["Battle","World War II"],
  "The Dunkirk evacuation (Operation Dynamo) from May 26 to June 4, 1940, rescued 338,000 Allied soldiers trapped in northern France. Military vessels and civilian 'Little Ships' crossed the Channel under constant air attack. Though a military defeat, the successful evacuation preserved the British Army and gave rise to the 'Dunkirk spirit.'",
  [["1940-05-10","Germany invades Low Countries"],["1940-05-20","Germans reach English Channel"],["1940-05-24","Hitler's halt order"],["1940-05-26","Evacuation begins"],["1940-06-01","Little Ships join evacuation"],["1940-06-04","338,000 troops evacuated"],["1940-06-04","Churchill's 'fight on the beaches' speech"]]);

add("Battle of Bunker Hill", "1775-06-17", "1775-06-17", "United States", ["Battle","American Revolution"],
  "The Battle of Bunker Hill on June 17, 1775, was one of the first major engagements of the American Revolution. Colonial militia fortified Breed's Hill and repelled two British assaults before being overrun on the third. British casualties exceeded 1,000, demonstrating that colonial forces could stand against regulars.",
  [["1775-04-19","Lexington and Concord"],["1775-06-16","Americans fortify Breed's Hill"],["1775-06-17","First assault repulsed"],["1775-06-17","Second assault repulsed"],["1775-06-17","Third assault succeeds"],["1775-06-17","British suffer 1,054 casualties"],["1776-03","British evacuate Boston"]]);

add("Hundred Years War", "1337-05-24", "1453-10-19", "Europe", ["War","Medieval War"],
  "The Hundred Years' War (1337-1453) was a series of conflicts between England and France. English victories at Crécy, Poitiers, and Agincourt were followed by French revival under Joan of Arc. The conflict ended feudal armies, introduced military innovations, and fostered national identities in both countries.",
  [["1337","Edward III claims French throne"],["1346","Battle of Crécy"],["1356","Battle of Poitiers"],["1415","Battle of Agincourt"],["1429","Joan of Arc lifts Siege of Orléans"],["1431","Joan burned at stake"],["1453","Battle of Castillon ends war"]]);

add("Thirty Years War", "1618-05-23", "1648-10-24", "Europe", ["War","Early Modern War"],
  "The Thirty Years' War (1618-1648) was one of Europe's most destructive conflicts. Beginning as a religious war, it killed an estimated 8 million people—one-third of the German population. It ended with the Peace of Westphalia, establishing the modern concept of state sovereignty.",
  [["1618","Defenestration of Prague"],["1620","Battle of White Mountain"],["1630","Swedish intervention under Gustavus Adolphus"],["1631","Sack of Magdeburg"],["1635","France enters war"],["1648","Peace of Westphalia"],["1648","Modern sovereignty concept established"]]);

add("Seven Years War", "1756-05-17", "1763-02-10", "Global", ["War","Early Modern War"],
  "The Seven Years' War (1756-1763) was the first true 'world war,' fought across Europe, North America, India, and the Philippines. Britain's victories established it as the dominant colonial power. The financial burden contributed to both the American and French Revolutions.",
  [["1756","War begins in Europe"],["1757","Plassey establishes British power in India"],["1759","Year of Victories: Quebec, Minden"],["1760","British capture Montreal"],["1763","Treaty of Paris: France cedes Canada"],["1763","Treaty of Hubertusburg"],["1763","Britain dominant colonial power"]]);

add("Napoleonic Wars", "1803-05-18", "1815-11-20", "Europe", ["War","Napoleonic War"],
  "The Napoleonic Wars (1803-1815) saw Napoleon's French Empire conquer much of continental Europe, spreading revolutionary ideals and the Napoleonic Code. The disastrous 1812 Russian campaign and coalition defeats led to his abdication. The wars reshaped European borders at the Congress of Vienna.",
  [["1805","Trafalgar and Austerlitz"],["1806","Holy Roman Empire dissolved"],["1808","Peninsular War begins"],["1812","Russian campaign; Grande Armée destroyed"],["1813","Battle of Leipzig"],["1814","Napoleon abdicates"],["1815","Waterloo; exile to St. Helena"]]);

add("Russo-Japanese War", "1904-02-08", "1905-09-05", "East Asia", ["War","Modern War"],
  "The Russo-Japanese War (1904-1905) was the first major defeat of a European power by an Asian nation. Japan's victories at Port Arthur and Tsushima stunned the world. The Treaty of Portsmouth established Japan as a major power and contributed to Russia's 1905 Revolution.",
  [["1904-02-08","Japanese surprise attack on Port Arthur"],["1904-05","Battle of Yalu River"],["1905-01","Port Arthur surrenders"],["1905-03","Battle of Mukden"],["1905-05","Battle of Tsushima"],["1905-09-05","Treaty of Portsmouth"],["1905","Russian Revolution partly triggered"]]);

add("Korean War", "1950-06-25", "1953-07-27", "Korea", ["War","Cold War"],
  "The Korean War (1950-1953) began with North Korea's invasion and drew in UN forces and China. The conflict killed approximately 2.5 million and ended in armistice near the original border. The peninsula remains divided, and no formal peace treaty has been signed.",
  [["1950-06-25","North Korea invades"],["1950-09-15","Inchon landing"],["1950-11","Chinese intervention"],["1951-01","Chinese capture Seoul"],["1951-07","Armistice talks begin"],["1953-07-27","Armistice signed"],["1953","Peninsula remains divided"]]);

add("Vietnam War", "1955-11-01", "1975-04-30", "Vietnam", ["War","Cold War"],
  "The Vietnam War (1955-1975) was a prolonged conflict between communist North Vietnam and US-backed South Vietnam. American military involvement peaked at over 500,000 troops. The war killed 2-3 million Vietnamese and 58,000 Americans. The fall of Saigon in 1975 unified Vietnam under communist rule.",
  [["1964","Gulf of Tonkin; US escalation"],["1965","First US combat troops arrive"],["1968","Tet Offensive"],["1969","Vietnamization begins"],["1973","Paris Peace Accords"],["1975-04-30","Fall of Saigon"],["1975","Vietnam reunified"]]);

add("Falklands War", "1982-04-02", "1982-06-14", "South Atlantic", ["War","Modern War"],
  "The Falklands War was a ten-week 1982 conflict between Argentina and Britain over the Falkland Islands. Britain dispatched a naval task force 8,000 miles and recaptured the islands after fierce land, sea, and air battles. The war boosted Thatcher's popularity and toppled Argentina's military junta.",
  [["1982-04-02","Argentina invades"],["1982-04-05","British task force sails"],["1982-05-02","Belgrano sunk"],["1982-05-04","Sheffield hit by Exocet"],["1982-05-21","British land at San Carlos"],["1982-06-14","Argentine surrender"],["1982","Junta falls in Argentina"]]);

add("Gulf War 1991", "1991-01-17", "1991-02-28", "Middle East", ["War","Modern War"],
  "The Gulf War (1991) was a US-led coalition operation to liberate Kuwait from Iraqi occupation. A 39-day air campaign was followed by a 100-hour ground offensive that decisively defeated Iraq. The war demonstrated precision-guided weapons and established US military dominance in the post-Cold War era.",
  [["1990-08-02","Iraq invades Kuwait"],["1990-11-29","UN authorizes force"],["1991-01-17","Air campaign begins"],["1991-02-24","Ground offensive begins"],["1991-02-27","Kuwait City liberated"],["1991-02-28","Ceasefire declared"],["1991","US military dominance established"]]);

add("Spanish Civil War", "1936-07-17", "1939-04-01", "Spain", ["War","Modern War"],
  "The Spanish Civil War (1936-1939) pitted Republicans against Franco's Nationalists. It became an ideological battleground drawing Nazi Germany, Fascist Italy, and the Soviet Union. The bombing of Guernica symbolized modern warfare's brutality. Franco's victory established a dictatorship lasting until 1975.",
  [["1936-07-17","Military uprising begins"],["1936-11","Nationalists besiege Madrid"],["1937-04-26","Bombing of Guernica"],["1937","International Brigades fight"],["1938","Battle of the Ebro"],["1939-01-26","Barcelona falls"],["1939-04-01","Franco declares victory"]]);

add("Sino-Japanese War 1937", "1937-07-07", "1945-09-02", "East Asia", ["War","World War II"],
  "The Second Sino-Japanese War (1937-1945) began with the Marco Polo Bridge Incident. Japan invaded and occupied eastern China, committing the Nanjing Massacre. An estimated 15-20 million Chinese civilians died. The war merged with WWII's Pacific Theater and ended with Japan's 1945 surrender.",
  [["1937-07-07","Marco Polo Bridge Incident"],["1937-08","Battle of Shanghai"],["1937-12","Nanjing Massacre"],["1938","Chinese retreat to Chongqing"],["1941-12","Merges with Pacific Theater"],["1944","Operation Ichi-Go"],["1945-09-02","Japan surrenders"]]);

add("Soviet-Afghan War", "1979-12-24", "1989-02-15", "Afghanistan", ["War","Cold War"],
  "The Soviet-Afghan War (1979-1989) became the Soviet Union's 'Vietnam.' Soviet forces fought mujahideen insurgents backed by the US, Pakistan, and Saudi Arabia. US-supplied Stinger missiles negated Soviet air superiority. The withdrawal contributed to the USSR's fall and left Afghanistan destabilized.",
  [["1978","Communist coup in Afghanistan"],["1979-12-24","Soviet troops invade"],["1980","Mujahideen resistance intensifies"],["1984","CIA provides billions in weapons"],["1986","Stinger missiles introduced"],["1988","Geneva Accords signed"],["1989-02-15","Last Soviet troops leave"]]);

add("Taiping Rebellion", "1850-12-01", "1864-08-01", "China", ["War","Rebellion"],
  "The Taiping Rebellion (1850-1864) killed an estimated 20-30 million people, making it one of history's deadliest conflicts. Led by Hong Xiuquan, who claimed to be Jesus Christ's brother, the movement controlled much of southern China before being suppressed. The devastation fatally weakened the Qing dynasty.",
  [["1850","Hong Xiuquan proclaims kingdom"],["1851","Rebellion begins in Guangxi"],["1853","Taiping capture Nanjing"],["1860","Qing enlists Western-trained armies"],["1862","Xiang Army besieges Nanjing"],["1864","Nanjing falls; Hong dies"],["1864","20-30 million estimated dead"]]);

add("American Civil War", "1861-04-12", "1865-04-09", "United States", ["War","Modern War"],
  "The American Civil War (1861-1865) was fought over slavery and states' rights. The war killed 620,000-750,000 soldiers—the deadliest in American history. The Union victory preserved the nation, abolished slavery through the 13th Amendment, and fundamentally transformed American society.",
  [["1860-11","Lincoln elected"],["1861-04-12","Fort Sumter attacked"],["1862-09","Emancipation Proclamation"],["1863-07","Gettysburg and Vicksburg"],["1864","Sherman's March to the Sea"],["1865-04-09","Lee surrenders"],["1865-04-14","Lincoln assassinated"]]);

add("World War I", "1914-07-28", "1918-11-11", "Global", ["War","World War"],
  "World War I (1914-1918) killed approximately 17 million people. Triggered by Archduke Franz Ferdinand's assassination, it featured devastating trench warfare and new technologies. The war collapsed four empires (Ottoman, Austro-Hungarian, Russian, German) and set the stage for World War II.",
  [["1914-06-28","Archduke assassination"],["1914-09","Trench warfare begins"],["1915","Gallipoli Campaign"],["1916","Verdun and the Somme"],["1917","Russian Revolution; US enters"],["1918","German Spring Offensive fails"],["1918-11-11","Armistice signed"]]);

add("World War II", "1939-09-01", "1945-09-02", "Global", ["War","World War"],
  "World War II (1939-1945) was the deadliest conflict in history, killing 70-85 million. The Allies defeated the Axis Powers across global theaters. The Holocaust killed 6 million Jews. The war led to the United Nations, the Cold War, decolonization, and the atomic age.",
  [["1939-09-01","Germany invades Poland"],["1940","Fall of France; Battle of Britain"],["1941","Barbarossa; Pearl Harbor"],["1942-43","Stalingrad; Midway turn the tide"],["1944-06-06","D-Day"],["1945-05-08","V-E Day"],["1945-08","Atomic bombs"],["1945-09-02","Japan surrenders"]]);

add("War of 1812", "1812-06-18", "1815-02-17", "North America", ["War","Modern War"],
  "The War of 1812 between the US and Britain saw the burning of Washington D.C. and the defense of Baltimore that inspired the Star-Spangled Banner. The Treaty of Ghent restored the status quo, but the war cemented American national identity and ended Native American resistance in the East.",
  [["1812-06-18","US declares war"],["1813-04","Americans burn York"],["1814-08-24","British burn Washington"],["1814-09","Battle of Baltimore"],["1814-12-24","Treaty of Ghent signed"],["1815-01-08","Battle of New Orleans"],["1815","American identity cemented"]]);

add("Crimean War", "1853-10-16", "1856-03-30", "Europe", ["War","Modern War"],
  "The Crimean War (1853-1856) between Russia and an alliance of Ottoman Empire, France, Britain, and Sardinia featured the Siege of Sevastopol, the Charge of the Light Brigade, and Florence Nightingale's nursing reforms. It was the first war extensively covered by media and photography.",
  [["1853-10","Russia and Ottomans go to war"],["1854-03","France and Britain join"],["1854-10","Charge of the Light Brigade"],["1854-11","Florence Nightingale arrives"],["1855-09","Sevastopol captured"],["1856-03","Treaty of Paris"],["1856","Russia begins Great Reforms"]]);

add("Boer War", "1899-10-11", "1902-05-31", "South Africa", ["War","Colonial War"],
  "The Second Boer War (1899-1902) between Britain and the Boer republics saw 450,000 British troops deployed. British concentration camps killed 26,000 Boer civilians, causing international outrage. The war led to the Union of South Africa in 1910.",
  [["1899-10-11","War begins"],["1899-12","Black Week: three British defeats"],["1900-06","British capture Pretoria"],["1900-09","Guerrilla warfare begins"],["1901","Concentration camps established"],["1901","26,000 civilians die in camps"],["1902-05-31","Treaty of Vereeniging"]]);

add("Iran-Iraq War", "1980-09-22", "1988-08-20", "Middle East", ["War","Modern War"],
  "The Iran-Iraq War (1980-1988) killed an estimated 500,000-1 million people. Iraq invaded Iran expecting quick victory but the war became a brutal stalemate featuring trench warfare, human wave attacks, and chemical weapons. It ended without significant territorial changes.",
  [["1979","Iranian Revolution"],["1980-09-22","Iraq invades Iran"],["1982","Iran invades Iraq; stalemate"],["1983","Chemical weapons used"],["1987","US reflagging of Kuwaiti tankers"],["1988-08-20","Ceasefire"],["1988","Both nations devastated"]]);

add("Six-Day War", "1967-06-05", "1967-06-10", "Middle East", ["War","Modern War"],
  "The Six-Day War in June 1967 saw Israel preemptively strike Egypt, then conquer the Sinai, West Bank, Gaza Strip, and Golan Heights. The war tripled Israeli-controlled territory and created the Palestinian occupation issue central to regional politics today.",
  [["1967-05","Egypt blockades Straits of Tiran"],["1967-06-05","Israel launches preemptive strikes"],["1967-06-05","Egyptian air force destroyed"],["1967-06-07","Jerusalem and West Bank captured"],["1967-06-08","Sinai conquered"],["1967-06-10","Golan Heights taken"],["1967","UN Resolution 242"]]);

add("Yom Kippur War", "1973-10-06", "1973-10-25", "Middle East", ["War","Modern War"],
  "The Yom Kippur War began October 6, 1973, when Egypt and Syria launched surprise attacks on Israel. Israeli counterattacks eventually prevailed, but the war triggered the 1973 oil crisis and led to the Camp David Accords, fundamentally changing Middle Eastern diplomacy.",
  [["1973-10-06","Egypt and Syria attack on Yom Kippur"],["1973-10-06","Egypt crosses Suez Canal"],["1973-10-08","Israeli counterattack on Golan"],["1973-10-15","Israel crosses Suez westward"],["1973-10-17","OPEC oil embargo"],["1973-10-25","Ceasefire"],["1978","Camp David Accords"]]);

add("Peloponnesian War", "0431-01-01", "0404-01-01", "Greece", ["War","Ancient War"],
  "The Peloponnesian War (431-404 BC) between Athens and Sparta reshaped ancient Greece. Athens suffered plague, the catastrophic Sicilian Expedition, and final defeat when Sparta allied with Persia. The war ended the Athenian Golden Age and left Greece weakened for Macedonian conquest.",
  [["431 BC","War begins"],["430 BC","Plague devastates Athens"],["421 BC","Peace of Nicias"],["415 BC","Sicilian Expedition"],["413 BC","Sicilian disaster"],["405 BC","Fleet destroyed at Aegospotami"],["404 BC","Athens surrenders"]]);

add("Punic Wars", "0264-01-01", "0146-01-01", "Mediterranean", ["War","Ancient War"],
  "The Punic Wars (264-146 BC) were three conflicts between Rome and Carthage. The First established Rome as a naval power; the Second featured Hannibal's epic invasion; the Third ended with Carthage's total destruction. These wars transformed Rome into the Mediterranean's dominant force.",
  [["264 BC","First Punic War begins"],["241 BC","Rome wins First Punic War"],["218 BC","Hannibal crosses Alps"],["202 BC","Scipio wins at Zama"],["149 BC","Third Punic War"],["146 BC","Carthage destroyed"],["146 BC","Africa becomes Roman province"]]);

add("First Crusade", "1096-08-15", "1099-07-15", "Middle East", ["War","Crusade"],
  "The First Crusade (1096-1099) was called by Pope Urban II to recapture the Holy Land. European knights captured Antioch and Jerusalem in 1099 through bloody conquest. Crusader states were established in the Levant, with lasting consequences for Christian-Muslim relations.",
  [["1095","Pope Urban II calls Crusade"],["1096","People's Crusade massacred"],["1097","Nicaea captured"],["1098","Antioch captured"],["1098","County of Edessa established"],["1099-07-15","Jerusalem captured; mass slaughter"],["1099","Kingdom of Jerusalem established"]]);

add("Battle of Carrhae", "0053-06-01", "0053-06-01", "Parthia", ["Battle","Ancient War"],
  "The Battle of Carrhae in 53 BC was a devastating Roman defeat by the Parthian Empire. Crassus led seven legions into Parthia and was destroyed by Parthian horse archers under Surena. Crassus was killed and Roman standards captured, demonstrating the limits of Roman power in the east.",
  [["55 BC","Crassus becomes governor of Syria"],["53 BC","Roman army crosses Euphrates"],["53 BC","Parthian horse archers harass column"],["53 BC","Roman infantry unable to close"],["53 BC","Crassus's son killed"],["53 BC","Crassus killed during negotiations"],["53 BC","20,000 Romans killed"]]);

add("Battle of Alesia", "0052-09-01", "0052-10-01", "Gaul", ["Battle","Siege"],
  "The Battle of Alesia in 52 BC was the decisive engagement of Caesar's Gallic Wars. Caesar besieged Vercingetorix with double siege works, fighting both the garrison and a massive relief army. His tactical brilliance prevailed, ending Gallic resistance and securing Roman control of Gaul for 500 years.",
  [["52 BC","Vercingetorix leads Gallic revolt"],["52 BC","Caesar pursues to Alesia"],["52 BC","Romans build 18km circumvallation"],["52 BC","Gallic relief army of 250,000 arrives"],["52 BC","Romans fight on two fronts"],["52 BC","Caesar leads reserve to victory"],["52 BC","Vercingetorix surrenders"]]);

add("Battle of Pharsalus", "0048-08-09", "0048-08-09", "Greece", ["Battle","Roman Civil War"],
  "The Battle of Pharsalus on August 9, 48 BC, was the decisive engagement of Caesar's Civil War. Caesar's veterans defeated Pompey's larger army using a hidden fourth line. The victory gave Caesar control of the Republic and set the stage for dictatorship, assassination, and the Republic's fall.",
  [["49 BC","Caesar crosses the Rubicon"],["49 BC","Pompey flees to Greece"],["48 BC","Caesar pursues across Adriatic"],["48 BC","Armies meet at Pharsalus"],["48 BC","Fourth line breaks Pompey's cavalry"],["48 BC","Pompey murdered in Egypt"],["44 BC","Caesar assassinated"]]);

add("Battle of Badr", "0624-03-13", "0624-03-13", "Arabia", ["Battle","Early Islamic History"],
  "The Battle of Badr on March 13, 624 CE, was the first major military victory of the early Muslim community. Prophet Muhammad led 313 Muslims against a Quraysh force of 1,000. The victory strengthened Islamic authority in Medina and is referenced multiple times in the Quran.",
  [["622","Muslim Hijra to Medina"],["624","Muslims intercept Meccan caravan"],["624-03-13","313 Muslims face 1,000 Meccans"],["624-03-13","Surprising Muslim victory"],["624","Key Quraysh leaders killed"],["625","Battle of Uhud follows"],["630","Muslims conquer Mecca"]]);

// Additional wars/battles to reach ~400
add("Battle of Poitiers 732", "0732-10-10", "0732-10-10", "France", ["Battle","Medieval War"],
  "The Battle of Tours/Poitiers in 732 AD saw Frankish leader Charles Martel defeat an invading Umayyad army, halting Islamic expansion into Western Europe. The victory established the Franks as the dominant power in Western Europe and is traditionally viewed as a pivotal moment in European history.",
  [["711","Umayyad conquest of Iberian Peninsula"],["719","Muslim raids into Gaul begin"],["732","Abd al-Rahman leads army into Francia"],["732-10","Charles Martel assembles Frankish army"],["732-10-10","Franks defeat Umayyad cavalry"],["732","Abd al-Rahman killed in battle"],["732","Islamic advance into Europe halted"]]);

add("Battle of Agnadello", "1509-05-14", "1509-05-14", "Italy", ["Battle","Italian Wars"],
  "The Battle of Agnadello on May 14, 1509, was a decisive French victory over Venice during the War of the League of Cambrai. Louis XII's forces crushed the Venetian army, stripping Venice of most of its mainland territories. The battle demonstrated French military dominance in early 16th-century Italy.",
  [["1508","League of Cambrai formed against Venice"],["1509-04","French invasion of Venetian territory"],["1509-05-14","Armies meet at Agnadello"],["1509-05-14","French cavalry and artillery devastate Venetians"],["1509","Venice loses mainland territories"],["1510","Pope Julius II switches sides"],["1516","Treaty of Noyon"]]);

add("Battle of White Mountain", "1620-11-08", "1620-11-08", "Bohemia", ["Battle","Thirty Years War"],
  "The Battle of White Mountain on November 8, 1620, was an early decisive engagement of the Thirty Years' War. Catholic League forces under Tilly crushed the Bohemian Protestant army outside Prague in just two hours. The defeat ended the Bohemian Revolt and led to the forced re-Catholicization of Bohemia.",
  [["1618","Defenestration of Prague starts revolt"],["1619","Frederick V elected Bohemian king"],["1620-11-08","Catholic League attacks Bohemian army"],["1620-11-08","Battle lasts only two hours"],["1620","Frederick V flees; 'Winter King'"],["1621","Mass executions of Protestant leaders"],["1627","Forced re-Catholicization of Bohemia"]]);

add("Battle of Nagashino", "1575-06-29", "1575-06-29", "Japan", ["Battle","Japanese History"],
  "The Battle of Nagashino on June 29, 1575, was a pivotal engagement in Japanese history where Oda Nobunaga and Tokugawa Ieyasu's forces used rotating volleys of arquebusiers to devastate Takeda Katsuyori's cavalry charges. The battle demonstrated the decisive power of firearms in Japanese warfare and accelerated the unification of Japan.",
  [["1573","Takeda Shingen dies; Katsuyori succeeds"],["1575","Takeda besiege Nagashino Castle"],["1575-06-29","Oda-Tokugawa relief force arrives"],["1575-06-29","3,000 arquebusiers deployed behind palisades"],["1575-06-29","Takeda cavalry charges devastated"],["1575","Takeda clan fatally weakened"],["1582","Oda Nobunaga assassinated"]]);

add("Battle of Busan 1592", "1592-05-25", "1592-05-25", "Korea", ["Battle","Imjin War"],
  "The Battle of Busan in 1592 was the opening engagement of the Japanese invasions of Korea (Imjin War). Japanese forces under Konishi Yukinaga stormed Busan fortress, overwhelming the Korean garrison. The rapid fall of Busan opened the path for Japan's invasion of the Korean peninsula.",
  [["1592-05-23","Japanese fleet departs Tsushima"],["1592-05-24","Japanese land at Busan"],["1592-05-25","Busan fortress assaulted"],["1592-05-25","Korean garrison overwhelmed"],["1592-06","Japanese advance rapidly toward Seoul"],["1592-06","Seoul falls to Japanese"],["1592","Admiral Yi Sun-sin begins naval campaign"]]);

add("Battle of Noryang", "1598-12-16", "1598-12-16", "Korea", ["Battle","Naval Battle","Imjin War"],
  "The Battle of Noryang on December 16, 1598, was the final major naval engagement of the Imjin War. A combined Korean-Ming Chinese fleet destroyed the retreating Japanese navy. Admiral Yi Sun-sin was killed by a stray bullet during the battle, dying at the moment of his greatest victory.",
  [["1592","Imjin War begins"],["1597","Second Japanese invasion"],["1598","Hideyoshi dies; Japanese withdrawal ordered"],["1598-12-16","Korean-Ming fleet intercepts retreating Japanese"],["1598-12-16","Over 200 Japanese ships destroyed"],["1598-12-16","Admiral Yi Sun-sin killed"],["1598","Japanese withdrawal from Korea complete"]]);

add("Battle of Myeongnyang", "1597-10-26", "1597-10-26", "Korea", ["Battle","Naval Battle","Imjin War"],
  "The Battle of Myeongnyang on October 26, 1597, was one of the most remarkable naval victories in history. Admiral Yi Sun-sin, with only 13 ships, defeated a Japanese fleet of 133 warships and 200 support ships in the narrow Myeongnyang Strait by exploiting the strong currents and geography.",
  [["1597","Second Japanese invasion of Korea"],["1597","Yi Sun-sin reinstated as naval commander"],["1597-10-26","Japanese fleet enters Myeongnyang Strait"],["1597-10-26","Strong currents trap Japanese ships"],["1597-10-26","Yi's 13 ships defeat 133 Japanese warships"],["1597-10-26","31 Japanese ships destroyed"],["1598","Japanese unable to use western sea route"]]);

add("Battle of Hansando", "1592-08-14", "1592-08-14", "Korea", ["Battle","Naval Battle","Imjin War"],
  "The Battle of Hansando on August 14, 1592, was the greatest naval victory of Admiral Yi Sun-sin during the Imjin War. Using the crane wing formation, Yi lured the Japanese fleet into open waters and surrounded them, destroying 59 of 73 Japanese ships. The victory secured Korean control of the sea and cut Japanese supply lines.",
  [["1592-05","Japanese invade Korea"],["1592-07","Yi Sun-sin wins series of naval battles"],["1592-08-14","Japanese fleet lured into open waters"],["1592-08-14","Crane wing formation deployed"],["1592-08-14","59 of 73 Japanese ships destroyed"],["1592","Japanese naval advance halted"],["1592","Japanese supply lines severed"]]);

add("Battle of Sarhu", "1619-04-14", "1619-04-18", "Manchuria", ["Battle","Early Modern War"],
  "The Battle of Sarhu in April 1619 was a decisive victory for the Later Jin (Manchu) forces under Nurhaci against the Ming dynasty. Nurhaci defeated four separate Ming columns by concentrating his forces against each in turn. The victory established Manchu military dominance and set the stage for the eventual Qing conquest of China.",
  [["1616","Nurhaci establishes Later Jin dynasty"],["1619","Ming assembles 100,000+ troops in four columns"],["1619-04-14","Nurhaci attacks westernmost column first"],["1619-04-15","Second column destroyed"],["1619-04-17","Third column defeated"],["1619-04-18","Fourth column retreats"],["1619","Ming loses 45,000+ troops"]]);

add("Battle of Megiddo Ancient", "1457-04-01", "1457-04-01", "Egypt", ["Battle","Ancient War"],
  "The Battle of Megiddo in 1457 BC was fought between the forces of Egyptian Pharaoh Thutmose III and a coalition of Canaanite city-states. It is the first battle recorded in relatively reliable detail. Thutmose's victory at the strategic fortress of Megiddo established Egyptian supremacy in the Levant for decades.",
  [["1457 BC","Canaanite coalition rebels against Egypt"],["1457 BC","Thutmose III leads army through narrow Aruna pass"],["1457 BC","Surprise approach to Megiddo"],["1457 BC","Egyptian chariots rout coalition forces"],["1457 BC","Seven-month siege of Megiddo follows"],["1457 BC","Megiddo falls; Egyptian control restored"],["1457 BC","First detailed battle record in history"]]);

add("Battle of Leuctra", "0371-07-06", "0371-07-06", "Greece", ["Battle","Ancient War"],
  "The Battle of Leuctra in 371 BC was a revolutionary engagement where the Theban army under Epaminondas defeated Sparta, ending Spartan military dominance over Greece. Epaminondas invented the oblique order of battle, concentrating his left wing in an unprecedented deep formation that overwhelmed the Spartan right.",
  [["371 BC","Thebes refuses to dissolve Boeotian League"],["371 BC","Spartans march into Boeotia"],["371 BC","Epaminondas deploys oblique order"],["371 BC","Deep left wing smashes Spartan right"],["371 BC","Spartan king Cleombrotus killed"],["371 BC","Spartan hegemony ends"],["362 BC","Battle of Mantinea; Epaminondas killed"]]);

add("Battle of Cajamarca", "1532-11-16", "1532-11-16", "Peru", ["Battle","Colonial Conquest"],
  "The Battle of Cajamarca on November 16, 1532, was the ambush that toppled the Inca Empire. Francisco Pizarro's 168 Spanish conquistadors captured Inca Emperor Atahualpa in the midst of his 80,000-strong army through surprise, firearms, and cavalry. The capture led to the destruction of the Inca Empire.",
  [["1531","Pizarro begins third expedition to Peru"],["1532","Pizarro marches into Andes"],["1532-11-15","Atahualpa meets Pizarro at Cajamarca"],["1532-11-16","Spanish ambush Inca in main square"],["1532-11-16","Atahualpa captured; thousands killed"],["1533","Atahualpa executed after paying ransom"],["1533","Spanish capture Cusco"]]);

add("Battle of Tenochtitlan", "1521-05-26", "1521-08-13", "Mexico", ["Battle","Siege","Colonial Conquest"],
  "The Siege of Tenochtitlan in 1521 was the final battle of the Spanish conquest of the Aztec Empire. Hernán Cortés and his indigenous allies besieged the Aztec capital for 80 days. The fall of Tenochtitlan, combined with smallpox epidemics, destroyed the Aztec civilization and established Spanish rule over Mexico.",
  [["1519","Cortés arrives in Mexico"],["1520","Noche Triste: Spanish expelled from Tenochtitlan"],["1521-05-26","Spanish siege begins"],["1521","Smallpox devastates defenders"],["1521-08-13","Tenochtitlan falls after 80-day siege"],["1521","Cuauhtémoc captured"],["1521","Aztec Empire destroyed"]]);

add("Siege of Vienna 1529", "1529-09-27", "1529-10-15", "Austria", ["Siege","Early Modern War"],
  "The First Siege of Vienna in 1529 was the Ottoman Empire's first attempt to capture the Habsburg capital. Sultan Suleiman the Magnificent's army of 120,000 besieged the city for two weeks but failed to breach the walls. The failure marked the high-water mark of Ottoman expansion into Central Europe.",
  [["1526","Ottoman victory at Mohács"],["1529","Suleiman marches on Vienna"],["1529-09-27","Ottoman siege begins"],["1529-10","Mining and assault attempts fail"],["1529-10-14","Final assault repulsed"],["1529-10-15","Ottomans withdraw"],["1529","Ottoman western expansion limit reached"]]);

add("Third Battle of Panipat", "1761-01-14", "1761-01-14", "India", ["Battle","Early Modern War"],
  "The Third Battle of Panipat on January 14, 1761, was one of the largest and bloodiest 18th-century battles. Afghan forces under Ahmad Shah Durrani decisively defeated the Maratha Confederacy. An estimated 40,000-100,000 were killed in a single day. The Maratha defeat ended their bid for Indian supremacy and created a power vacuum later filled by the British.",
  [["1758","Marathas expand into Punjab"],["1759","Ahmad Shah Durrani invades India"],["1760","Both armies maneuver near Panipat"],["1761-01-14","Massive battle; Marathas initially advance"],["1761-01-14","Afghan reserves turn the tide"],["1761-01-14","40,000-100,000 killed"],["1761","Maratha power permanently weakened"]]);

add("Battle of Austerlitz Prelude Ulm Campaign", "1805-09-25", "1805-10-20", "Austria", ["Battle","Napoleonic War"],
  "The Ulm Campaign in October 1805 was Napoleon's brilliant strategic maneuver that encircled and captured an entire Austrian army without a major battle. Through rapid marching and deception, Napoleon trapped General Mack's 30,000 troops at Ulm, forcing their surrender. The campaign opened the road to Vienna and set up the decisive Battle of Austerlitz.",
  [["1805-08","Austria joins Third Coalition"],["1805-09","Napoleon wheels Grande Armée from Channel to Rhine"],["1805-10-07","French cross Danube behind Austrian army"],["1805-10-14","Battle of Elchingen"],["1805-10-17","Mack realizes he is surrounded"],["1805-10-20","Mack surrenders 30,000 troops at Ulm"],["1805-12-02","Battle of Austerlitz follows"]]);

add("Battle of Narva 1700", "1700-11-30", "1700-11-30", "Estonia", ["Battle","Great Northern War"],
  "The Battle of Narva on November 30, 1700, was an early engagement of the Great Northern War where 8,000 Swedish troops under Charles XII routed a Russian siege force of 40,000. The stunning victory established Charles XII's reputation as a military genius but led to overconfidence that would prove fatal at Poltava.",
  [["1700","Great Northern War begins"],["1700-10","Russian army besieges Narva"],["1700-11-30","Charles XII attacks in snowstorm"],["1700-11-30","Swedish charge breaks Russian center"],["1700-11-30","Russian army collapses"],["1700","10,000 Russians captured"],["1709","Charles XII defeated at Poltava"]]);

add("Battle of Poltava", "1709-06-27", "1709-06-27", "Ukraine", ["Battle","Great Northern War"],
  "The Battle of Poltava on June 27, 1709, was the decisive engagement of the Great Northern War. Peter the Great's reformed Russian army crushed Charles XII's Swedish forces. The victory marked Russia's emergence as a major European power and Sweden's decline from great power status, fundamentally shifting the Baltic power balance.",
  [["1700","Great Northern War begins"],["1708","Charles XII invades Russia"],["1708-09","Swedish supply train destroyed at Lesnaya"],["1709","Harsh winter devastates Swedish army"],["1709-06-27","Battle of Poltava"],["1709-06-27","Swedish army destroyed"],["1709","Charles XII flees to Ottoman Empire"]]);

add("Battle of the Nile", "1798-08-01", "1798-08-02", "Egypt", ["Battle","Naval Battle"],
  "The Battle of the Nile on August 1-2, 1798, was a decisive British naval victory during the French Revolutionary Wars. Admiral Nelson's fleet found and destroyed the French fleet anchored in Aboukir Bay, stranding Napoleon's army in Egypt. The victory established British naval dominance in the Mediterranean and boosted the Second Coalition against France.",
  [["1798-05","Napoleon's expedition sails for Egypt"],["1798-07","French capture Alexandria"],["1798-08-01","Nelson finds French fleet at Aboukir Bay"],["1798-08-01","British attack from both sides"],["1798-08-02","French flagship L'Orient explodes"],["1798-08-02","11 of 13 French ships captured or destroyed"],["1799","Napoleon abandons army in Egypt"]]);

add("Battle of Jena-Auerstedt", "1806-10-14", "1806-10-14", "Prussia", ["Battle","Napoleonic War"],
  "The twin Battles of Jena and Auerstedt on October 14, 1806, saw Napoleon's forces shatter the Prussian army. Napoleon won at Jena while Marshal Davout's single corps defeated the main Prussian army at Auerstedt despite being outnumbered 2-to-1. The campaign destroyed the Prussian military and led to the occupation of Berlin.",
  [["1806-10","Napoleon invades Prussia"],["1806-10-14","Napoleon defeats Prussians at Jena"],["1806-10-14","Davout defeats main army at Auerstedt"],["1806-10-14","Prussian army shattered"],["1806-10-27","Napoleon enters Berlin"],["1806","Prussia loses half its territory"],["1807","Treaty of Tilsit"]]);

add("Battle of Wagram", "1809-07-05", "1809-07-06", "Austria", ["Battle","Napoleonic War"],
  "The Battle of Wagram on July 5-6, 1809, was one of the largest Napoleonic battles with 300,000 troops engaged. Napoleon defeated Archduke Charles of Austria after two days of fierce fighting near Vienna. The victory ended the War of the Fifth Coalition and forced Austria to accept the harsh Treaty of Schönbrunn.",
  [["1809-04","Austria attacks Bavaria; Fifth Coalition"],["1809-05","Napoleon captures Vienna"],["1809-05-21","Battle of Aspern-Essling; Napoleon repulsed"],["1809-07-05","Napoleon crosses Danube in force"],["1809-07-06","Decisive French attack breaks Austrian line"],["1809-07-06","Austria requests armistice"],["1809-10","Treaty of Schönbrunn"]]);

add("Battle of Fredericksburg", "1862-12-11", "1862-12-15", "United States", ["Battle","American Civil War"],
  "The Battle of Fredericksburg on December 13, 1862, was a devastating Union defeat during the American Civil War. Union General Burnside ordered repeated frontal assaults against well-entrenched Confederate positions behind a stone wall on Marye's Heights. The futile attacks resulted in over 12,000 Union casualties, making it one of the most lopsided Confederate victories.",
  [["1862-11","Burnside replaces McClellan"],["1862-12-11","Union forces cross Rappahannock"],["1862-12-13","Frontal assaults against stone wall"],["1862-12-13","14 failed charges at Marye's Heights"],["1862-12-13","Over 12,000 Union casualties"],["1862-12-15","Union retreats across river"],["1863-01","Burnside replaced by Hooker"]]);

add("Battle of Chancellorsville", "1863-04-30", "1863-05-06", "United States", ["Battle","American Civil War"],
  "The Battle of Chancellorsville from April 30 to May 6, 1863, was Robert E. Lee's tactical masterpiece and greatest victory. Despite being outnumbered more than 2-to-1, Lee divided his forces and sent Stonewall Jackson on a devastating flank attack. However, the victory was marred by Jackson's death from friendly fire, a loss Lee called losing his right arm.",
  [["1863-04-27","Hooker crosses Rappahannock"],["1863-04-30","Union army moves through Wilderness"],["1863-05-01","Lee decides to divide his forces"],["1863-05-02","Jackson's flank march and attack"],["1863-05-02","Jackson wounded by friendly fire"],["1863-05-06","Union retreats across river"],["1863-05-10","Stonewall Jackson dies"]]);

add("Siege of Petersburg", "1864-06-09", "1865-03-25", "United States", ["Siege","American Civil War"],
  "The Siege of Petersburg from June 1864 to March 1865 was the longest siege in American Civil War history. Grant's Union forces attempted to cut Confederate supply lines to Richmond through continuous trench warfare. The nine-month siege exhausted Lee's army and led to the fall of Richmond and Lee's surrender at Appomattox.",
  [["1864-06-09","Initial Union attacks on Petersburg fail"],["1864-06-15","Full siege begins"],["1864-07-30","Battle of the Crater disaster"],["1864","Trench warfare extends for miles"],["1865-03-25","Confederate attack at Fort Stedman fails"],["1865-04-01","Battle of Five Forks"],["1865-04-02","Petersburg and Richmond fall"]]);

add("Gallipoli Landing ANZAC Day", "1915-04-25", "1915-04-25", "Turkey", ["Battle","World War I"],
  "The ANZAC landing at Gallipoli on April 25, 1915, was the day Australian and New Zealand troops first saw major combat, landing on a narrow beach under fierce Ottoman fire. The soldiers were pinned down on the cliffs and could never advance inland. April 25 became ANZAC Day, the most significant national commemoration in Australia and New Zealand.",
  [["1915-04-25","ANZAC troops land at dawn"],["1915-04-25","Landed at wrong location; steep cliffs"],["1915-04-25","Mustafa Kemal orders 'I don't order you to attack, I order you to die'"],["1915-04-25","2,000 casualties on first day"],["1915","Stalemate develops on peninsula"],["1916-01","Evacuation complete"],["1916","ANZAC Day established as memorial"]]);

add("Battle of Cambrai", "1917-11-20", "1917-12-07", "France", ["Battle","World War I"],
  "The Battle of Cambrai in November 1917 was the first large-scale use of tanks in a combined arms assault. British forces initially broke through the Hindenburg Line using 476 tanks, achieving a major advance. However, a German counterattack recaptured most of the gained ground. The battle proved the potential of armored warfare.",
  [["1917-11-20","476 British tanks attack at Cambrai"],["1917-11-20","Hindenburg Line breached on 10km front"],["1917-11-20","Deepest single-day advance on Western Front"],["1917-11-20","Church bells ring in England"],["1917-11-30","German counterattack begins"],["1917-12-07","Germans recapture most ground"],["1918","Tank warfare tactics refined"]]);

add("Battle of Amiens 1918", "1918-08-08", "1918-08-12", "France", ["Battle","World War I"],
  "The Battle of Amiens on August 8, 1918, was the opening phase of the Hundred Days Offensive that ended World War I. British, Australian, and Canadian forces, supported by 500 tanks, achieved a stunning breakthrough. Ludendorff called it 'the black day of the German Army.' The victory broke German morale and initiated the Allied advance to victory.",
  [["1918-03","German Spring Offensive halted"],["1918-08-08","Allied surprise attack near Amiens"],["1918-08-08","500 tanks lead assault"],["1918-08-08","13km advance in single day"],["1918-08-08","Ludendorff: 'black day of the German Army'"],["1918-09","Allies breach Hindenburg Line"],["1918-11-11","Armistice signed"]]);

add("Siege of Sevastopol 1941", "1941-10-30", "1942-07-04", "Soviet Union", ["Siege","World War II"],
  "The Siege of Sevastopol from October 1941 to July 1942 was a prolonged Axis operation to capture the major Soviet naval base on the Black Sea. The Germans deployed the largest siege gun ever built, the 'Schwerer Gustav,' to reduce the fortress. After 250 days of fierce resistance, the Soviet garrison was overwhelmed, giving Germany control of Crimea.",
  [["1941-10-30","German siege begins"],["1941-12","First German assault repulsed"],["1942-06","Second major assault begins"],["1942-06","Schwerer Gustav railway gun deployed"],["1942-07-01","Final German assault"],["1942-07-04","Soviet resistance ends"],["1944","Soviets recapture Sevastopol"]]);

add("Battle of Imphal and Kohima", "1944-03-08", "1944-07-22", "India", ["Battle","World War II"],
  "The twin Battles of Imphal and Kohima in 1944 were the turning point of the Burma Campaign in World War II. Japan's attempt to invade India was stopped by British and Indian forces in brutal fighting. The Japanese defeat, with 53,000 casualties, was described as the greatest Japanese land defeat. Kohima has been called 'the Stalingrad of the East.'",
  [["1944-03-08","Japanese launch Operation U-Go"],["1944-04","Kohima besieged; tennis court fighting"],["1944-04","Imphal surrounded by three Japanese divisions"],["1944-05","Kohima relieved; siege broken"],["1944-06","Japanese offensive collapses"],["1944-07-22","Japanese withdraw"],["1944","53,000 Japanese casualties"]]);

add("Battle of Coral Sea", "1942-05-04", "1942-05-08", "Pacific Ocean", ["Battle","Naval Battle"],
  "The Battle of the Coral Sea from May 4-8, 1942, was the first naval battle in which opposing ships never directly sighted or fired upon each other, with all attacks carried out by aircraft. The tactical draw was a strategic Allied victory, as it turned back the Japanese attempt to capture Port Moresby and was the first check on Japanese expansion in the Pacific.",
  [["1942-05","Japanese plan to capture Port Moresby"],["1942-05-04","US aircraft attack Tulagi"],["1942-05-07","Japanese carrier Shoho sunk"],["1942-05-08","Carriers exchange strikes"],["1942-05-08","USS Lexington sunk; Shokaku damaged"],["1942-05-08","Japanese cancel Port Moresby invasion"],["1942-06","Damaged Japanese carriers miss Midway"]]);

add("Battle of Leyte Gulf", "1944-10-23", "1944-10-26", "Philippines", ["Battle","Naval Battle"],
  "The Battle of Leyte Gulf from October 23-26, 1944, was the largest naval battle in history by number of ships involved. The US Navy decisively defeated the Imperial Japanese Navy in a series of four engagements around the Philippines. The battle saw the first organized use of kamikaze attacks and ended Japan as an effective naval power.",
  [["1944-10-20","MacArthur returns to Philippines"],["1944-10-23","Battle of Palawan Passage"],["1944-10-24","Battle of Sibuyan Sea; Musashi sunk"],["1944-10-25","Battle off Samar; desperate US stand"],["1944-10-25","Battle of Surigao Strait"],["1944-10-25","First kamikaze attacks"],["1944-10-26","Japanese fleet retreat"]]);

add("Battle of Ia Drang", "1965-11-14", "1965-11-18", "Vietnam", ["Battle","Vietnam War"],
  "The Battle of Ia Drang in November 1965 was the first major engagement between US Army and North Vietnamese forces. The two-phase battle at Landing Zones X-Ray and Albany demonstrated both airmobile effectiveness and enemy determination. It convinced both sides they could win, escalating the war.",
  [["1965-11-14","1st Battalion lands at LZ X-Ray"],["1965-11-14","Immediately engaged by PAVN"],["1965-11-15","'Broken Arrow' called"],["1965-11-16","PAVN withdraw from X-Ray"],["1965-11-17","Devastating ambush at LZ Albany"],["1965-11-18","305 Americans killed"],["1965","War escalates"]]);

add("Battle of Mogadishu", "1993-10-03", "1993-10-04", "Somalia", ["Battle","Modern War"],
  "The Battle of Mogadishu on October 3-4, 1993, was an intense urban battle in which US special operations forces attempted to capture Somali warlord Mohamed Farrah Aidid's lieutenants. Two Black Hawk helicopters were shot down, and 18 Americans were killed in the ensuing rescue operation. The event inspired the book and film 'Black Hawk Down' and led to US withdrawal from Somalia.",
  [["1992","US intervenes in Somali civil war"],["1993-10-03","Rangers and Delta Force raid Olympic Hotel"],["1993-10-03","Two Black Hawk helicopters shot down"],["1993-10-03","Intense urban firefight erupts"],["1993-10-04","Rescue convoy reaches survivors"],["1993","18 Americans, 1,000+ Somalis killed"],["1994","US withdraws from Somalia"]]);

add("Battle of 73 Easting", "1991-02-26", "1991-02-26", "Iraq", ["Battle","Gulf War"],
  "The Battle of 73 Easting on February 26, 1991, was a tank battle during the Gulf War in which the US 2nd Armored Cavalry Regiment destroyed the Iraqi Republican Guard's Tawakalna Division. In 23 minutes, American M1A1 Abrams tanks destroyed dozens of Iraqi T-72s in a sandstorm, demonstrating overwhelming US technological superiority.",
  [["1991-02-24","Coalition ground offensive begins"],["1991-02-26","2nd ACR advances through sandstorm"],["1991-02-26","Contact with Republican Guard at 73 Easting"],["1991-02-26","M1A1 Abrams engage T-72 tanks"],["1991-02-26","Iraqi tanks destroyed at 3km range"],["1991-02-26","Battle lasts 23 minutes"],["1991-02-28","Ceasefire declared"]]);

add("Siege of Masada", "0073-01-01", "0073-04-16", "Judea", ["Siege","Ancient War"],
  "The Siege of Masada in 73 AD was the final event of the First Jewish-Roman War. Roman forces besieged 960 Jewish Zealots atop the desert fortress near the Dead Sea. When the Romans finally breached the walls using a massive siege ramp, they found that the defenders had committed mass suicide rather than face slavery. Masada became a symbol of Jewish resistance.",
  [["66 AD","First Jewish-Roman War begins"],["70 AD","Roman destruction of Jerusalem Temple"],["72 AD","Roman Tenth Legion arrives at Masada"],["73 AD","Romans build massive siege ramp"],["73 AD","Roman battering rams breach walls"],["73-04-16","Romans enter fortress; find mass suicide"],["73 AD","960 defenders chose death over slavery"]]);

add("Battle of Balaclava", "1854-10-25", "1854-10-25", "Crimea", ["Battle","Crimean War"],
  "The Battle of Balaclava on October 25, 1854, during the Crimean War, is best known for the disastrous Charge of the Light Brigade. Due to miscommunicated orders, 670 British cavalry charged directly into Russian artillery, suffering terrible casualties. The event was immortalized by Tennyson's poem and became a symbol of both military valor and the futility of blind obedience.",
  [["1854-10-25","Russians attack British supply base"],["1854-10-25","Thin Red Line: 93rd Highlanders repulse cavalry"],["1854-10-25","Heavy Brigade charge succeeds"],["1854-10-25","Miscommunicated orders sent to Light Brigade"],["1854-10-25","670 cavalry charge into Russian guns"],["1854-10-25","118 killed, 127 wounded"],["1854","Tennyson writes 'Charge of the Light Brigade'"]]);

add("Siege of Khartoum", "1884-03-13", "1885-01-26", "Sudan", ["Siege","Colonial War"],
  "The Siege of Khartoum from March 1884 to January 1885 was a dramatic episode of the Mahdist War. British General Charles Gordon was besieged in Khartoum by forces of Muhammad Ahmad (the Mahdi). A British relief expedition arrived two days too late—the city had fallen and Gordon was killed. The fall shocked Victorian Britain.",
  [["1881","Mahdist revolt begins in Sudan"],["1884-03","Gordon arrives in Khartoum to evacuate garrison"],["1884","Mahdist forces surround Khartoum"],["1884","British government delays rescue expedition"],["1885-01-26","Mahdists storm Khartoum"],["1885-01-26","Gordon killed on palace steps"],["1885-01-28","Relief expedition arrives too late"]]);

add("Battle of Manila Bay", "1898-05-01", "1898-05-01", "Philippines", ["Battle","Naval Battle"],
  "The Battle of Manila Bay on May 1, 1898, was a decisive American naval victory in the Spanish-American War. Commodore George Dewey's Asiatic Squadron destroyed the entire Spanish Pacific fleet without losing a single American life. The victory led to US acquisition of the Philippines and marked America's emergence as a Pacific power.",
  [["1898-04","Spanish-American War begins"],["1898-04","Dewey sails from Hong Kong to Philippines"],["1898-05-01","American fleet enters Manila Bay at night"],["1898-05-01","Dewey: 'You may fire when ready, Gridley'"],["1898-05-01","Spanish fleet destroyed"],["1898-05-01","Zero American deaths"],["1898","Treaty of Paris; US acquires Philippines"]]);

add("Battle of Vimy Ridge", "1917-04-09", "1917-04-12", "France", ["Battle","World War I"],
  "The Battle of Vimy Ridge from April 9-12, 1917, was a landmark Canadian military victory in World War I. The Canadian Corps captured the heavily fortified German position that French and British forces had failed to take. The battle, requiring meticulous planning and innovative tactics, is often cited as a defining moment of Canadian national identity.",
  [["1917-04","Elaborate preparation including tunnels and rehearsals"],["1917-04-09","Four Canadian divisions attack together for first time"],["1917-04-09","Creeping barrage covers advance"],["1917-04-10","Most of ridge captured"],["1917-04-12","Final objectives taken"],["1917","3,598 Canadians killed; 7,004 wounded"],["1936","Vimy Memorial dedicated"]]);

add("Battle of Gallipoli Naval Attack", "1915-03-18", "1915-03-18", "Turkey", ["Battle","Naval Battle"],
  "The Allied naval attack on the Dardanelles on March 18, 1915, was a disastrous attempt to force the straits leading to Constantinople. Three battleships were sunk and three more crippled by Ottoman mines and shore batteries. The naval failure led to the decision to land troops on the Gallipoli peninsula.",
  [["1915-02-19","Initial bombardment of outer forts"],["1915-03-18","Main fleet attack on the Narrows"],["1915-03-18","Bouvet hits mine and sinks in minutes"],["1915-03-18","Irresistible and Ocean also sunk"],["1915-03-18","Three more battleships severely damaged"],["1915-03","Naval attack abandoned"],["1915-04","Ground invasion planned instead"]]);

add("Siege of Port Arthur", "1904-08-01", "1905-01-02", "China", ["Siege","Russo-Japanese War"],
  "The Siege of Port Arthur from August 1904 to January 1905 was the longest and most costly engagement of the Russo-Japanese War. Japanese forces suffered over 57,000 casualties in repeated assaults on the heavily fortified Russian naval base. The fall of Port Arthur was a major blow to Russian morale and prestige.",
  [["1904-02","Russo-Japanese War begins"],["1904-08","Japanese begin siege operations"],["1904-08","First assault fails with heavy casualties"],["1904-09","Second assault also fails"],["1904-11","203 Meter Hill finally captured"],["1904-12","Japanese artillery sinks Russian fleet in harbor"],["1905-01-02","Russian garrison surrenders"]]);

add("Battle of Teutonic Knights at Lake Peipus", "1242-04-05", "1242-04-05", "Estonia", ["Battle","Medieval War"],
  "The Battle on the Ice at Lake Peipus on April 5, 1242, was Alexander Nevsky's decisive victory over the Teutonic Knights. The battle, fought on the frozen surface of the lake, halted the Northern Crusaders' eastward expansion into Russian territory. The victory made Nevsky a Russian national hero and later a saint.",
  [["1240","Alexander Nevsky defeats Swedes on Neva"],["1242","Teutonic Knights invade Novgorod territory"],["1242-04-05","Armies meet on frozen Lake Peipus"],["1242-04-05","Russian flanks encircle Teutonic center"],["1242-04-05","Heavy knights break through ice"],["1242","Teutonic expansion eastward halted"],["1242","Alexander Nevsky becomes national hero"]]);

add("Battle of Sarikamish", "1914-12-22", "1915-01-17", "Turkey", ["Battle","World War I"],
  "The Battle of Sarikamish from December 1914 to January 1915 was a catastrophic Ottoman defeat against Russia on the Caucasus Front in World War I. Enver Pasha's poorly planned winter offensive in mountainous terrain led to the loss of nearly 90,000 troops, mostly to cold and disease. The defeat led to Ottoman scapegoating of Armenians and contributed to the Armenian Genocide.",
  [["1914-11","Ottoman Empire enters WWI"],["1914-12-22","Enver Pasha launches winter offensive"],["1914-12","Troops march through mountains in deep snow"],["1915-01","Freezing temperatures decimate Ottoman forces"],["1915-01","Russian counterattack destroys Ottoman army"],["1915-01-17","Battle ends; nearly 90,000 Ottoman casualties"],["1915","Armenian Genocide begins"]]);

add("Battle of Somme Second 1918", "1918-03-21", "1918-04-05", "France", ["Battle","World War I"],
  "The German Spring Offensive (Operation Michael) launched on March 21, 1918, was Germany's last major attempt to win World War I before American reinforcements arrived. The initial attack achieved the deepest advance on the Western Front since 1914, but ultimately failed to achieve a decisive breakthrough. The offensive exhausted Germany's reserves and set the stage for