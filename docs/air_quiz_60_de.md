# AIR 60-Fragen Vollversion

> Version v2.0 — Vollstaendiges Redesign basierend auf Facetten-Struktur
>
> Datum: 2026-03-25

---

## Teil 1: Design-Analyse

### 1.1 Tiefenanalyse der vier Dimensionen

#### Dimension 1: Lernbarkeit (E/T)

**Gute Fragen fuer diese Dimension**:
- Fokus auf die *Form* des Wissens (digital vs. koerperlich), nicht auf den Schwierigkeitsgrad
- Unterscheidung zwischen oeffentlich zugaenglichem Wissen und Erfahrungswissen
- Beschreibung, wie kodifizierbar Arbeitsprozesse sind
- Umgang mit Neuartigkeit und Unvorhersehbarkeit der Arbeitsumgebung

**Haeufige Fallstricke**:
- Verwechslung von "schwierig" mit "nicht lernbar" — Go ist schwer, aber KI hat es gemeistert
- Gleichsetzung von "kreativ" mit "nicht lernbar" — KI ist in einigen kreativen Bereichen hervorragend
- Vernachlaessigung von koerperlichem Wissen (Tastgefuehl, Kraftkontrolle, Raumwahrnehmung)
- Verwechslung von "erfordert Erfahrung" mit "implizitem Wissen"

---

#### Dimension 2: Bewertungsobjektivitaet (O/S)

**Gute Fragen fuer diese Dimension**:
- Messung der *Existenz* richtiger Antworten, nicht der Aufgabenschwierigkeit
- Unterscheidung von quantifizierbaren Kennzahlen und subjektiven Eindruecken
- Fokus auf Uebereinstimmung zwischen verschiedenen Bewertern
- Bezug auf inhaerent subjektive Bereiche (Aesthetik, Geschmack, Kultur)

**Haeufige Fallstricke**:
- Verwechslung von "komplex" mit "subjektiv" — Wettervorhersage ist komplex aber objektiv
- Gleichsetzung von "mehrere Pruefer" mit "subjektiv" — Code-Review hat mehrere Pruefer, aber klare Standards
- Vernachlaessigung der zeitlichen Dimension — manche Arbeitsqualitaet zeigt sich erst Jahre spaeter
- Verwechslung von "schwer zu ueberpruefen" mit "subjektiv"

---

#### Dimension 3: Fehlertoleranz (F/R)

**Gute Fragen fuer diese Dimension**:
- Fokus auf *Konsequenzen* von Fehlern, nicht auf die Fehlerwahrscheinlichkeit
- Bezug auf gesellschaftliches/rechtliches Vertrauen in KI-Entscheidungen
- Beruecksichtigung von regulatorischen Rahmenbedingungen und Verantwortlichkeit
- Unterscheidung zwischen "Versuch und Irrtum erlaubt" und "muss beim ersten Mal richtig sein"

**Haeufige Fallstricke**:
- Verwechslung von "wichtige Arbeit" mit "geringer Fehlertoleranz"
- Gleichsetzung von "hohe Praezision" mit "geringer Fehlertoleranz"
- Vernachlaessigung der gesellschaftlichen Akzeptanzdimension
- Fehlzuordnung von "schnellen Entscheidungen" zu dieser Dimension

---

#### Dimension 4: Personenabhaengigkeit (P/H)

**Gute Fragen fuer diese Dimension**:
- Messung des Gewichts zwischenmenschlicher Beziehungen und Vertrauens
- Bezug auf den kommerziellen Wert persoenlicher Marke, Reputation und Identitaet
- Einbeziehung von Anforderungen an physische Praesenz
- Unterscheidung zwischen "emotionaler Arbeit" und "Informationsuebermittlung"

**Haeufige Fallstricke**:
- Verwechslung von "erfordert Kommunikation" mit "personenabhaengig"
- Vereinfachung von "Teamarbeit" als "personenabhaengig"
- Vernachlaessigung des "Anonymitaetstests" — wuerde das Entfernen Ihres Namens den Arbeitswert mindern?
- Verwechslung von "muss von einem Menschen gemacht werden" mit "muss von einer bestimmten Person gemacht werden"

---

### 1.2 Kreuzkontaminationsrisiken zwischen Dimensionen

| Hohes Risiko der Kreuzkontamination | Wie man es vermeidet |
|--------------------------------------|----------------------|
| Lernbarkeit x Bewertungsobjektivitaet | Lernbarkeit fokussiert auf die Form des Wissenserwerbs; Bewertung fokussiert auf die Kriterien der Ergebnisbewertung |
| Fehlertoleranz x Personenabhaengigkeit | Fehlertoleranz fokussiert auf die Schwere der Konsequenzen; Personenabhaengigkeit fokussiert auf den Wert der persoenlichen Identitaet |
| Lernbarkeit x Fehlertoleranz | Fehlertoleranz betrachtet nur die Fehlerkonsequenzen, nicht die Eintrittsbarrieren |
| Bewertungsobjektivitaet x Personenabhaengigkeit | Bewertungsobjektivitaet betrachtet die Bewertungskriterien; Personenabhaengigkeit betrachtet den Identitaetsaufschlag |

---

### 1.3 Erkennung und Vermeidung von Suggestivfragen

**Schlechte Beispiele**:
- "Kann KI Ihren Job leicht erlernen?" — impliziert direkt die Dimension, und "leicht" ist abwertend
- "Erfordert Ihre Arbeit ueberragende Handwerkskunst?" — "ueberragend" ist positiv formuliert und verleitet zu hohen Werten
- "Koennte ein Fehler in Ihrer Arbeit jemandem schaden?" — "schaden" ist zu extrem

**Gute Beispiele**:
- "Wo wird Ihre taegliche Arbeit hauptsaechlich erledigt?" — neutrale Beschreibung, verhaltensverankert
- "Wenn Sie einen Auftrag erhalten, weiss der Auftraggeber genau, was er will?" — konkretes Szenario, kein Werturteil
- "Wenn Sie morgen ploetzlich kuendigen wuerden, wie lange wuerde es dauern, einen Ersatz zu finden?" — objektiv messbar

---

## Teil 2: Designprinzipien

### 2.1 Kernprinzipien

#### Prinzip 1: Einzelnes Konstrukt
Jede Frage misst genau eine Facette innerhalb einer Dimension. Niemals Doppelfragen wie "Erfordert Ihre Arbeit sowohl Kreativitaet als auch zwischenmenschliche Faehigkeiten?"

#### Prinzip 2: Verhaltensverankerung
Optionen verwenden konkrete Verhaltensbeschreibungen, keine abstrakten Haeufigkeits-/Gradwoerter. Vermeidung von Vorlagen wie "stimme voll zu / stimme zu / neutral / stimme nicht zu / stimme gar nicht zu". Jede Option soll ein vorstellbares konkretes Szenario sein.

#### Prinzip 3: Umgangssprachlicher Ton
Fragen verwenden alltaegliche Umgangssprache, wie in einem Gespraech mit Freunden. Vermeidung akademischer Fachbegriffe und steifer Schriftsprache.

#### Prinzip 4: Universelle Anwendbarkeit
Fragen setzen keine bestimmte Branche, Hierarchieebene oder Arbeitsform voraus. Ob Paketbote, Designdirektor oder Elternteil in Vollzeit — jeder sollte die Fragen verstehen und beantworten koennen.

#### Prinzip 5: Dimensionsverdeckung
Fragen sollten nicht verraten, welche Dimension sie messen. Wenn Teilnehmer leicht die Dimension erraten und "wie erwartet" antworten koennen, ist die Validitaet beeintraechtigt.

---

### 2.2 Strategie fuer Vorwaerts-/Rueckwaerts-Verteilung

**Ziel**: ~9 vorwaerts (60%) und ~6 rueckwaerts (40%) pro Dimension mit 15 Fragen.

**Begruendung**:
1. Ein perfektes 50/50-Verhaeltnis laesst Teilnehmer das Gefuehl haben, die Fragen seien "hinterhaeltig", was das Erlebnis verschlechtert
2. Mehr Vorwaerts-Fragen erhalten einen fluessigen Rhythmus
3. Genuegend Rueckwaerts-Fragen (mindestens 40%) erkennen unaufmerksames Antwortverhalten und Zustimmungstendenz
4. Rueckwaerts-Fragen sind ueber die Facetten verteilt, nicht gehaeuft

**Verteilung pro Dimension**:

| Dimension | Vorwaerts | Rueckwaerts | Verhaeltnis |
|-----------|-----------|-------------|-------------|
| D1 Lernbarkeit | 9 | 6 | 60/40 |
| D2 Bewertungsobjektivitaet | 9 | 6 | 60/40 |
| D3 Fehlertoleranz | 9 | 6 | 60/40 |
| D4 Personenabhaengigkeit | 9 | 6 | 60/40 |
| **Gesamt** | **36** | **24** | **60/40** |

---

### 2.3 Facetten-Architektur

Jede Dimension hat 5 Facetten mit je 3 Fragen (typischerweise 2 vorwaerts + 1 rueckwaerts oder 1 vorwaerts + 2 rueckwaerts). Dies gewaehrleistet:
- Inhaltsvaliditaet: Jede Facette deckt einen anderen Aspekt der Dimension ab
- Reliabilitaet: 3 Items innerhalb einer Facette sollten hoch korrelieren
- Trennschaerfe: Moderate Korrelation zwischen verschiedenen Facetten

---

### 2.4 Strategie fuer die Fragereihenfolge

**Prinzipien**:
1. **Dimensionsrotation**: 4 aufeinanderfolgende Fragen stammen immer aus 4 verschiedenen Dimensionen (Round-Robin)
2. **Schwierigkeitsprogression**: Erstes Drittel = einfache Alltagsszenarien, mittleres Drittel = tieferes Nachdenken, letztes Drittel = abstrakter
3. **Richtungswechsel**: Nicht mehr als 3 aufeinanderfolgende gleichgerichtete Fragen
4. **Facetten-Abstand**: 3 Fragen derselben Facette mindestens 12 Fragen auseinander
5. **Erster/letzter Eindruck**: Erste und letzte Frage sollten die ansprechendsten sein

---

## Teil 3: Fragendesign

### Legende
- **D1** = Lernbarkeit (E/T)
- **D2** = Bewertungsobjektivitaet (O/S)
- **D3** = Fehlertoleranz (F/R)
- **D4** = Personenabhaengigkeit (P/H)
- **V** = Vorwaerts (hoehere Punktzahl = eher durch KI ersetzbar)
- **R** = Rueckwaerts (hoehere Punktzahl = weniger durch KI ersetzbar; Auswertung mit 6 - Punktzahl Transformation)

> **Wichtiger Hinweis zur Richtungskonvention**:
>
> Dieses Dokument folgt der Projektcode-Konvention:
> - **Vorwaerts**: Option 1 = am wenigsten KI-ersetzbar -> Option 5 = am meisten KI-ersetzbar. Rohwert wird direkt verwendet.
> - **Rueckwaerts**: Option 1 = am meisten KI-ersetzbar -> Option 5 = am wenigsten KI-ersetzbar. Auswertung mit 6 - Punktzahl Transformation.
>
> Rueckwaerts-Items dienen dazu, Antwortmuster zu durchbrechen — Teilnehmer werden nicht immer in dieselbe Richtung waehlen. Die natuerliche Lesereihenfolge der Optionen unterscheidet sich von anderen Items und erzeugt eine psychologische "Temposchwelle".

---

### Dimension 1: Lernbarkeit (E/T) — 15 Fragen

#### Facette 1A: Digitalisierungsgrad (3 Fragen)

---

**Q1** | D1-1A | Vorwaerts

> **Dimension**: Lernbarkeit | **Facette**: Digitalisierungsgrad | **Richtung**: Vorwaerts

Wo wird Ihre taegliche Arbeit hauptsaechlich erledigt?

| Punkte | Option |
|--------|--------|
| 1 | Fast nie am Computer — alles ist praktische Handarbeit |
| 2 | Gelegentlich am Computer, aber die Kernarbeit ist Handarbeit |
| 3 | Etwa halb digital, halb physisch |
| 4 | Groesstenteils am Computer/in Systemen |
| 5 | Fast ausschliesslich in digitalen Systemen |

---

**Q2** | D1-1A | Vorwaerts

> **Dimension**: Lernbarkeit | **Facette**: Digitalisierungsgrad | **Richtung**: Vorwaerts

Wie viel Ihrer taeglichen Arbeitsleistung hinterlaesst automatisch eine digitale Spur?

| Punkte | Option |
|--------|--------|
| 1 | Fast nichts — die Ergebnisse existieren in der physischen Welt |
| 2 | Ein kleiner Teil wird erfasst, das meiste hat keine digitale Spur |
| 3 | Etwa die Haelfte hat digitale Aufzeichnungen |
| 4 | Die meisten Prozesse und Ergebnisse werden digital erfasst |
| 5 | Vollstaendig digital, jeder Schritt wird protokolliert |

---

**Q3** | D1-1A | Rueckwaerts

> **Dimension**: Lernbarkeit | **Facette**: Digitalisierungsgrad | **Richtung**: Rueckwaerts

Wie viel Ihrer Arbeit erfordert es, reale Gegenstaende physisch zu beruehren, zu begutachten oder zu handhaben, um Entscheidungen zu treffen?

| Punkte | Option |
|--------|--------|
| 1 | Fast jeder Schritt erfordert praktischen Kontakt mit physischen Objekten |
| 2 | Das meiste erfordert Handarbeit, weniges kann am Bildschirm erledigt werden |
| 3 | Die Haelfte erfordert physisches Handling, die Haelfte geht mit Daten |
| 4 | Gelegentlich muessen physische Objekte begutachtet werden, das meiste geht am Bildschirm |
| 5 | Physische Objekte werden nie benoetigt — reine Daten- und Informationsarbeit |

---

#### Facette 1B: Wissenszugaenglichkeit (3 Fragen)

---

**Q4** | D1-1B | Vorwaerts

> **Dimension**: Lernbarkeit | **Facette**: Wissenszugaenglichkeit | **Richtung**: Vorwaerts

Wie viel des Fachwissens, das Ihre Arbeit erfordert, ist online verfuegbar?

| Punkte | Option |
|--------|--------|
| 1 | Fast nichts — alles internes Wissen oder muendliche Weitergabe |
| 2 | Grundwissen ist verfuegbar, aber Schluesseltechniken sind Insiderwissen |
| 3 | Etwa die Haelfte ist auffindbar, die andere Haelfte beruht auf interner Erfahrung |
| 4 | Das meiste hat oeffentliche Anleitungen und Dokumentation |
| 5 | Alles ist online — Tutorials, Videos, Kurse, Fallstudien |

---

**Q5** | D1-1B | Vorwaerts

> **Dimension**: Lernbarkeit | **Facette**: Wissenszugaenglichkeit | **Richtung**: Vorwaerts

Wenn eine KI alle Buecher, Fachartikel und Lehrbuecher Ihres Fachgebiets gelesen haette, wie viel Prozent des fuer Ihre Arbeit benoetigten Wissens wuerde sie abdecken?

| Punkte | Option |
|--------|--------|
| 1 | Weniger als 20% — Buchwissen ist nur die Oberflaeche |
| 2 | Etwa 30-40% — nuetzlich, aber bei Weitem nicht genug |
| 3 | Etwa 50-60% — eine solide Grundlage |
| 4 | Etwa 70-80% — das meiste laesst sich aus Materialien lernen |
| 5 | Ueber 90% — Buecher decken fast alles ab |

---

**Q6** | D1-1B | Rueckwaerts

> **Dimension**: Lernbarkeit | **Facette**: Wissenszugaenglichkeit | **Richtung**: Rueckwaerts

Wie haben Sie das wichtigste Wissen fuer Ihre Arbeit erlernt?

| Punkte | Option |
|--------|--------|
| 1 | Nur durch jahrelange persoenliche Erfahrung und schrittweise Erkenntnis |
| 2 | Hauptsaechlich durch Mentoring und Selbstentdeckung — steht in keinem Buch |
| 3 | Zur Haelfte durch formale Ausbildung, zur Haelfte durch Praxis |
| 4 | Das meiste kam aus der Schule oder Weiterbildungen |
| 5 | Fast ausschliesslich aus Lehrbuechern und Anleitungen |

---

#### Facette 1C: Prozessstandardisierung (3 Fragen)

---

**Q7** | D1-1C | Vorwaerts

> **Dimension**: Lernbarkeit | **Facette**: Prozessstandardisierung | **Richtung**: Vorwaerts

Wie stark folgen Ihre Arbeitsprozesse festen Ablaeufen?

| Punkte | Option |
|--------|--------|
| 1 | Fast kein fester Prozess — jede Situation ist neu |
| 2 | Einige Grundschritte, aber groesstenteils Improvisation |
| 3 | Zur Haelfte nach Vorschrift, zur Haelfte improvisiert |
| 4 | Groesstenteils standardisiert, gelegentliche Ausnahmen |
| 5 | Fast vollstaendig nach Handbuch — einfach befolgen |

---

**Q8** | D1-1C | Vorwaerts

> **Dimension**: Lernbarkeit | **Facette**: Prozessstandardisierung | **Richtung**: Vorwaerts

Koennte Ihre Arbeit in ein detailliertes Handbuch geschrieben werden, dem ein Neuling folgen kann?

| Punkte | Option |
|--------|--------|
| 1 | Unmoeglich — zu viele "kommt drauf an"-Entscheidungen |
| 2 | Man koennte einen Ueberblick schreiben, aber Details haengen von persoenlichem Urteil ab |
| 3 | Koennte etwa die Haelfte abdecken; die andere Haelfte laesst sich nicht aufschreiben |
| 4 | Das meiste laesst sich sehr klar aufschreiben |
| 5 | Absolut — es gibt bereits eine bestehende SOP |

---

**Q9** | D1-1C | Rueckwaerts

> **Dimension**: Lernbarkeit | **Facette**: Prozessstandardisierung | **Richtung**: Rueckwaerts

Wie oft muessen Sie eine Entscheidung treffen, fuer die es keinen Praezedenzfall gibt?

| Punkte | Option |
|--------|--------|
| 1 | Jeden Tag — kein Praezedenzfall ist der Normalfall |
| 2 | Mindestens mehrmals pro Woche |
| 3 | Ein paar Mal im Monat |
| 4 | Selten — nur ein paar Mal im Jahr |
| 5 | Nie — fuer jede Situation gibt es eine bewaeaehrte Loesung |

---

#### Facette 1D: Tiefe des impliziten Wissens (3 Fragen)

---

**Q10** | D1-1D | Rueckwaerts

> **Dimension**: Lernbarkeit | **Facette**: Tiefe des impliziten Wissens | **Richtung**: Rueckwaerts

Wie sehr haengt Ihre Arbeit von "schwer zu artikulierender" Erfahrung ab?

| Punkte | Option |
|--------|--------|
| 1 | Beruht vollstaendig auf jahrelang kultiviertem "Gefuehl" — schwer zu erklaeren |
| 2 | Haengt stark von langjaehrig aufgebauter Intuition und Gespuer ab |
| 3 | Erfordert etwas Erfahrung, laesst sich aber vermitteln |
| 4 | Einige kleine Kniffe, aber schnell erlernbar |
| 5 | Ueberhaupt nicht — ein Neuling kann es mit dem Handbuch machen |

---

**Q11** | D1-1D | Rueckwaerts

> **Dimension**: Lernbarkeit | **Facette**: Tiefe des impliziten Wissens | **Richtung**: Rueckwaerts

Wenn Sie einem intelligenten, aber voellig unerfahrenen Menschen Ihre Arbeit beibringen wuerden, was waere am schwersten zu lehren?

| Punkte | Option |
|--------|--------|
| 1 | Fast alles ist schwer zu lehren — einfach "zuschauen und mit der Zeit lernen" |
| 2 | Kernfaehigkeiten lassen sich nicht erklaeren — nur durch umfangreiche Praxis erlernbar |
| 3 | Manches laesst sich beibringen, anderes muss man selbst herausfinden |
| 4 | Das meiste laesst sich klar vermitteln, weniges erfordert etwas Uebung |
| 5 | Alles laesst sich beibringen — einfach Schritt fuer Schritt |

---

**Q12** | D1-1D | Vorwaerts

> **Dimension**: Lernbarkeit | **Facette**: Tiefe des impliziten Wissens | **Richtung**: Vorwaerts

Wie viel Ihrer Arbeitsentscheidungen laesst sich mit logischem Denken erklaeren, anstatt auf "Bauchgefuehl" zu beruhen?

| Punkte | Option |
|--------|--------|
| 1 | Weniger als 20% — groesstenteils Bauchgefuehl |
| 2 | Etwa 30-40% — Bauchgefuehl ueberwiegt |
| 3 | Etwa halb und halb |
| 4 | Etwa 70-80% lassen sich logisch erklaeren |
| 5 | Nahezu 100% — jede Entscheidung hat eine klare Grundlage |

---

#### Facette 1E: Neuartigkeit und Wandel (3 Fragen)

---

**Q13** | D1-1E | Rueckwaerts

> **Dimension**: Lernbarkeit | **Facette**: Neuartigkeit und Wandel | **Richtung**: Rueckwaerts

Wie oft stoesst Ihre Arbeit auf voellig neue Situationen, die noch niemand zuvor erlebt hat?

| Punkte | Option |
|--------|--------|
| 1 | Staendig — jedes Projekt ist Neuland |
| 2 | Haeufig — die Rahmenbedingungen aendern sich alle paar Monate |
| 3 | Manchmal — neue Herausforderungen treten regelmaessig auf |
| 4 | Selten — gelegentlich neue Faelle, aber meist Routine |
| 5 | Fast nie — jeden Tag dieselben Muster |

---

**Q14** | D1-1E | Vorwaerts

> **Dimension**: Lernbarkeit | **Facette**: Neuartigkeit und Wandel | **Richtung**: Vorwaerts

Wie viele Ihrer Arbeitsaufgaben sind solche, bei denen Sie "etwas Aehnliches schon mal gemacht haben"?

| Punkte | Option |
|--------|--------|
| 1 | Fast jedes Mal ist alles voellig neu — kein Anhaltspunkt |
| 2 | Groesstenteils neu, gelegentlich kann man auf frueehere Erfahrung zurueckgreifen |
| 3 | Etwa die Haelfte sind vertraute Muster |
| 4 | Die meisten haben aehnliche Referenzfaelle |
| 5 | Fast alle sind wiederholende Standardaufgaben |

---

**Q15** | D1-1E | Vorwaerts

> **Dimension**: Lernbarkeit | **Facette**: Neuartigkeit und Wandel | **Richtung**: Vorwaerts

Hat sich die Arbeitsweise in Ihrer Branche in den letzten 5 Jahren stark veraendert?

| Punkte | Option |
|--------|--------|
| 1 | Voellig umgekrempelt — Methoden von vor 5 Jahren sind ueberholt |
| 2 | Grosse Veraenderungen — Kernkompetenzen muessen staendig aktualisiert werden |
| 3 | Einige Veraenderungen, aber die Grundlagen bleiben gleich |
| 4 | Wenig Veraenderung — die meisten Methoden sind dieselben |
| 5 | Fast keine Veraenderung — wie vor 10 Jahren |

---

**D1 Zusammenfassung**: Vorwaerts 9 (Q1, Q2, Q4, Q5, Q7, Q8, Q12, Q14, Q15), Rueckwaerts 6 (Q3, Q6, Q9, Q10, Q11, Q13)

---

### Dimension 2: Bewertungsobjektivitaet (O/S) — 15 Fragen

#### Facette 2A: Messbarkeit (3 Fragen)

---

**Q16** | D2-2A | Vorwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Messbarkeit | **Richtung**: Vorwaerts

Kann die Qualitaet Ihrer Arbeit mit klaren numerischen Kennzahlen bewertet werden?

| Punkte | Option |
|--------|--------|
| 1 | Unmoeglich zu bewerten — Qualitaet ist rein subjektiv |
| 2 | Groesstenteils subjektiv, weniges ist quantifizierbar |
| 3 | Zur Haelfte quantifizierbar, zur Haelfte subjektiv |
| 4 | Groesstenteils klare Kennzahlen, wenig Subjektives |
| 5 | Fast alles hat klare KPIs oder Benchmarks |

---

**Q17** | D2-2A | Vorwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Messbarkeit | **Richtung**: Vorwaerts

Wie schnell koennen Sie nach Abschluss einer Aufgabe erkennen, ob sie gut erledigt wurde?

| Punkte | Option |
|--------|--------|
| 1 | Moegglicherweise erst nach Jahren — die Auswirkungen entfalten sich langsam |
| 2 | Erst nach Monaten bewertbar |
| 3 | Feedback sichtbar innerhalb von Tagen bis Wochen |
| 4 | Ergebnis innerhalb von Stunden bekannt |
| 5 | Sofortiges Feedback — richtig oder falsch ist sofort klar |

---

**Q18** | D2-2A | Rueckwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Messbarkeit | **Richtung**: Rueckwaerts

Kann Ihr Arbeitsergebnis mit automatisierten Tools auf Qualitaet geprueft werden?

| Punkte | Option |
|--------|--------|
| 1 | Fast vollstaendig durch automatisierte Programme ueberpruefbar |
| 2 | Das meiste laesst sich mit automatisierten Tests oder Qualitaetskontrollen pruefen |
| 3 | Teile lassen sich mit Tool-Unterstuetzung pruefen |
| 4 | Sehr wenige Aspekte sind automatisch pruefbar |
| 5 | Ueberhaupt nicht — muss von Menschen beurteilt werden |

---

#### Facette 2B: Ergebniskonvergenz (3 Fragen)

---

**Q19** | D2-2B | Vorwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Ergebniskonvergenz | **Richtung**: Vorwaerts

Wie stark unterscheiden sich die Ergebnisse fuer dieselbe Aufgabe zwischen verschiedenen Personen?

| Punkte | Option |
|--------|--------|
| 1 | Jeder produziert voellig andere Ergebnisse |
| 2 | Aehnliche Richtung, aber grosse Unterschiede im Detail |
| 3 | Der Kern ist aehnlich, mit Raum fuer persoenliche Note |
| 4 | Die meisten Ergebnisse sind im Wesentlichen gleich, geringfuegige Unterschiede |
| 5 | Unabhaengig davon, wer es macht, sind die Ergebnisse nahezu identisch |

---

**Q20** | D2-2B | Vorwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Ergebniskonvergenz | **Richtung**: Vorwaerts

Hat Ihre Arbeit eine "richtige Antwort" oder "optimale Loesung"?

| Punkte | Option |
|--------|--------|
| 1 | Nie eine richtige Antwort — nur verschiedene Wahlmoeglichkeiten |
| 2 | Selten klares Richtig oder Falsch |
| 3 | Manchmal gibt es eine optimale Loesung, manchmal nicht |
| 4 | Die meisten Aufgaben haben einen klar richtigen Ansatz |
| 5 | Fast jede Frage hat eine einzige richtige Antwort |

---

**Q21** | D2-2B | Rueckwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Ergebniskonvergenz | **Richtung**: Rueckwaerts

Wenn drei erfahrene Fachkollegen dasselbe Arbeitsergebnis bewerten wuerden, wie stark wuerden ihre Bewertungen voneinander abweichen?

| Punkte | Option |
|--------|--------|
| 1 | Bewertungen waeren sehr einheitlich, fast kein Unterschied |
| 2 | Sehr geringe Abweichung, weitgehend uebereinstimmend |
| 3 | Etwas Uneinigkeit, aber die allgemeine Richtung stimmt |
| 4 | Haeufig deutlich unterschiedliche Bewertungen |
| 5 | Voellig unterschiedliche Bewertungen waeren keine Ueberraschung |

---

#### Facette 2C: Zielklarheit (3 Fragen)

---

**Q22** | D2-2C | Rueckwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Zielklarheit | **Richtung**: Rueckwaerts

Wenn Sie einen Auftrag erhalten — weiss der Auftraggeber klar, was er moechte?

| Punkte | Option |
|--------|--------|
| 1 | Anforderungen sind immer sehr klar — einfach umsetzen |
| 2 | Meistens klar, gelegentlich muessen Details geklaert werden |
| 3 | Zur Haelfte klar, zur Haelfte muss man es selbst herausfinden |
| 4 | Oft "machen Sie mal" — ich muss die Anforderungen selbst definieren |
| 5 | Fast immer "denken Sie mal drueber nach fuer mich" |

---

**Q23** | D2-2C | Vorwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Zielklarheit | **Richtung**: Vorwaerts

Koennen Sie vor Beginn einer Aufgabe vorab eine "Definition of Done"-Checkliste erstellen?

| Punkte | Option |
|--------|--------|
| 1 | Ueberhaupt nicht — man findet es unterwegs heraus |
| 2 | Nur eine grobe Richtung moeglich, spezifische Kriterien unklar |
| 3 | Einige klare Bedingungen auflistbar, andere haengen vom Kontext ab |
| 4 | Die meisten Abnahmekriterien lassen sich vorab festlegen |
| 5 | Es laesst sich eine sehr detaillierte Abnahme-Checkliste erstellen |

---

**Q24** | D2-2C | Vorwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Zielklarheit | **Richtung**: Vorwaerts

Ist Ihr Arbeitsziel eher wie "diese Matheaufgabe loesen" oder eher wie "einen guten Aufsatz schreiben"?

| Punkte | Option |
|--------|--------|
| 1 | Voellig wie einen Aufsatz schreiben — Masstaebe variieren je nach Person |
| 2 | Eher wie ein Aufsatz — einige Grundanforderungen, aber Qualitaet ist subjektiv |
| 3 | Beides — manche Aufgaben haben richtige Antworten, manche nicht |
| 4 | Eher wie Problemloesung — die meisten haben ein klares Richtig oder Falsch |
| 5 | Voellig wie Mathematik — entweder richtig oder falsch |

---

#### Facette 2D: Geschmacksabhaengigkeit (3 Fragen)

---

**Q25** | D2-2D | Rueckwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Geschmacksabhaengigkeit | **Richtung**: Rueckwaerts

Wie sehr haengt Ihre Arbeit von persoenlicher Aesthetik, Geschmack oder intuitiver Beurteilung ab?

| Punkte | Option |
|--------|--------|
| 1 | Ueberhaupt nicht — einfach Standardoperationen ausfuehren |
| 2 | Gelegentlich etwas aesthetisches Urteil noetig |
| 3 | Zur Haelfte nach Standards, zur Haelfte nach Geschmack und Gefuehl |
| 4 | Haengt stark von Aesthetik und Urteilsvermoegen ab |
| 5 | Aesthetik und Geschmack SIND mein zentraler Wettbewerbsvorteil |

---

**Q26** | D2-2D | Rueckwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Geschmacksabhaengigkeit | **Richtung**: Rueckwaerts

Wie gross ist bei Ihrer Arbeit der Unterschied zwischen "gut genug" und "genau richtig"?

| Punkte | Option |
|--------|--------|
| 1 | Kein Unterschied — ungefaehr richtig reicht |
| 2 | Sehr gering — nah genug funktioniert meistens |
| 3 | Manchmal muss es praezise sein, manchmal nicht |
| 4 | Oft muessen feine Detailunterschiede genau getroffen werden |
| 5 | Ein winziger Unterschied aendert alles — muss genau stimmen |

---

**Q27** | D2-2D | Vorwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Geschmacksabhaengigkeit | **Richtung**: Vorwaerts

Wie viel von "gute Arbeit geleistet" ist bei Ihrer Taetigkeit etwas, worueber sich alle einig sind?

| Punkte | Option |
|--------|--------|
| 1 | Qualitaet haengt voellig davon ab, wer urteilt — Meinungen gehen immer auseinander |
| 2 | Meistens haben verschiedene Menschen verschiedene Ansichten |
| 3 | Grundsaetzliche Uebereinstimmung, aber deutliche Meinungsverschiedenheiten bei Details |
| 4 | Konsens bei den meisten Aspekten, Meinungsverschiedenheiten bei wenigen |
| 5 | Ob gut oder nicht — alle sind sich einig |

---

#### Facette 2E: Interdisziplinaere Synthese (3 Fragen)

---

**Q28** | D2-2E | Rueckwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Interdisziplinaere Synthese | **Richtung**: Rueckwaerts

Wie viele verschiedene Fachgebiete muessen Sie fuer eine Entscheidung kombinieren?

| Punkte | Option |
|--------|--------|
| 1 | Nur eines — tiefe Expertise in einem einzigen Bereich |
| 2 | Hauptsaechlich ein Fachgebiet, gelegentlich ein weiteres |
| 3 | Regelmaessig muessen 2-3 verschiedene Gebiete kombiniert werden |
| 4 | Routinemaessig werden 4+ Fachgebiete synthetisiert |
| 5 | Mein gesamter Job IST es, Verbindungen zwischen unabhaengigen Bereichen herzustellen |

---

**Q29** | D2-2E | Vorwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Interdisziplinaere Synthese | **Richtung**: Vorwaerts

Wenn Ihr Arbeitsergebnis einem KI-System zur Pruefung gegeben wuerde, wie viele Probleme koennte es finden?

| Punkte | Option |
|--------|--------|
| 1 | Fast nichts — die Frage ist, ob es sich "richtig anfuehlt" |
| 2 | Oberflaechliche Fehler finden ja, aber die Kernqualitaet nicht beurteilen |
| 3 | Etwa die Haelfte der Probleme finden |
| 4 | Die meisten Probleme koennen automatisch erkannt werden |
| 5 | Fast alle Probleme koennen automatisch gefunden werden |

---

**Q30** | D2-2E | Vorwaerts

> **Dimension**: Bewertungsobjektivitaet | **Facette**: Interdisziplinaere Synthese | **Richtung**: Vorwaerts

Aendert sich in Ihrem Beruf haeufig, was als "gute Arbeit" gilt?

| Punkte | Option |
|--------|--------|
| 1 | Jedes Mal ein anderer Massstab — haengt von Kontext und Personen ab |
| 2 | Standards aendern sich haeufig, man muss sich staendig anpassen |
| 3 | Es gibt ein Grundgeruest, aber spezifische Kriterien verschieben sich |
| 4 | Standards sind groesstenteils fest, gelegentlich kleine Anpassungen |
| 5 | Standards aendern sich nie — universell anwendbar |

---

**D2 Zusammenfassung**: Vorwaerts 9 (Q16, Q17, Q19, Q20, Q23, Q24, Q27, Q29, Q30), Rueckwaerts 6 (Q18, Q21, Q22, Q25, Q26, Q28)

---

### Dimension 3 (korrigiert): Fehlertoleranz (F/R) — 15 Fragen

#### Facette 3A: Fehlerschwere (3 Fragen)

---

**Q31** | D3-3A | Rueckwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Fehlerschwere | **Richtung**: Rueckwaerts

Was waere das Schlimmste, das passieren koennte, wenn bei Ihrer Arbeit ein Fehler unterlaeuft?

| Punkte | Option |
|--------|--------|
| 1 | Nicht schlimm — einfach nochmal machen |
| 2 | Kostet etwas Zeit/Geld, begrenzte Auswirkungen |
| 3 | Spuerbarer finanzieller Verlust oder Reputationsschaden |
| 4 | Koennte ernsthaften Vermogensschaden oder Gesundheitsrisiken verursachen |
| 5 | Koennte direkt Menschenleben gefaehrden oder schwere Sicherheitsvorfaelle ausloesen |

---

**Q32** | D3-3A | Vorwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Fehlerschwere | **Richtung**: Vorwaerts

Wie viele Menschen koennten von einer einzigen Fehlentscheidung Ihrerseits betroffen sein?

| Punkte | Option |
|--------|--------|
| 1 | Koennte Tausende oder mehr betreffen |
| 2 | Koennte das Unternehmen oder Hunderte von Kunden betreffen |
| 3 | Betrifft das Team oder Dutzende betroffene Personen |
| 4 | Betrifft hoechstens einige Kollegen oder Kunden |
| 5 | Betrifft nur meinen eigenen Arbeitsfortschritt |

---

**Q33** | D3-3A | Vorwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Fehlerschwere | **Richtung**: Vorwaerts

Wie gross ist bei Ihrer Arbeit der praktische Unterschied zwischen "80%" und "100%"?

| Punkte | Option |
|--------|--------|
| 1 | Enorm — 80% koennte einen schweren Vorfall bedeuten |
| 2 | Erheblich — Perfektion anzustreben ist sehr wichtig |
| 3 | Kommt darauf an — in manchen Situationen wichtig, in manchen nicht |
| 4 | Nicht gross — 80% ist im Grunde ausreichend |
| 5 | Kein Unterschied — die Schwelle erreichen und fertig |

---

#### Facette 3B: Reversibilitaet (3 Fragen)

---

**Q34** | D3-3B | Rueckwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Reversibilitaet | **Richtung**: Rueckwaerts

Wenn bei Ihrer Arbeit ein Fehler passiert, gibt es eine Moeglichkeit zur Korrektur?

| Punkte | Option |
|--------|--------|
| 1 | Kann jederzeit rueckgaengig gemacht und ueberarbeitet werden, kein Druck |
| 2 | Die meisten Fehler lassen sich nachtraeglich korrigieren |
| 3 | Manche lassen sich beheben, manche nicht |
| 4 | Die meisten Fehler lassen sich nach dem Auftreten kaum rueckgaengig machen |
| 5 | Einmal falsch, fast unmoeglich zu beheben — nicht rueckgaengig zu machen |

---

**Q35** | D3-3B | Vorwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Reversibilitaet | **Richtung**: Vorwaerts

Erlaubt Ihre Arbeit einen Ansatz wie "erst ausprobieren, bei Bedarf aendern"?

| Punkte | Option |
|--------|--------|
| 1 | Absolut nicht — muss beim ersten Mal richtig sein |
| 2 | Selten — die Fehlerkosten sind zu hoch |
| 3 | Manche Phasen erlauben Versuch und Irrtum, manche nicht |
| 4 | Meistens werden Experimente und schnelle Iteration ermutigt |
| 5 | Der gesamte Arbeitsablauf IST staendiges Experimentieren und Anpassen |

---

**Q36** | D3-3B | Vorwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Reversibilitaet | **Richtung**: Vorwaerts

Wenn morgen ein Problem in der heutigen Arbeit entdeckt wird, wie schwer ist es zu beheben?

| Punkte | Option |
|--------|--------|
| 1 | Nahezu unmoeglich — Schaden ist angerichtet und irreversibel |
| 2 | Sehr schwierig, erfordert enormen Aufwand zur Reparatur |
| 3 | Etwas schwierig, aber mit Muehe behebbar |
| 4 | Nicht allzu schwer — einfach ein paar Korrekturen vornehmen |
| 5 | Kein Druck — einfach loeschen und neu machen |

---

#### Facette 3C: Regulierung (3 Fragen)

---

**Q37** | D3-3C | Rueckwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Regulierung | **Richtung**: Rueckwaerts

Wie streng sind die regulatorischen und Qualifikationsanforderungen fuer Ihre Arbeit?

| Punkte | Option |
|--------|--------|
| 1 | Keine Zugangsschranken — jeder kann es machen |
| 2 | Einige Grundanforderungen, aber niedrige Schwelle |
| 3 | Erfordert bestimmte Zertifizierungen oder Schulungen |
| 4 | Strenge Branchenaufsicht und Lizenzanforderungen |
| 5 | Zulassung zwingend erforderlich, Verstoesse fuehren zu rechtlichen Konsequenzen |

---

**Q38** | D3-3C | Vorwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Regulierung | **Richtung**: Vorwaerts

Wenn Ihre Arbeit vollstaendig einer KI uebertragen wuerde, wie viele Hindernisse wuerden die aktuellen Gesetze schaffen?

| Punkte | Option |
|--------|--------|
| 1 | Gesetzlich ausdruecklich verboten — unmoeglich |
| 2 | Erhebliche rechtliche Grauzonen und Einschraenkungen |
| 3 | Manche Schritte unterliegen gesetzlichen Einschraenkungen, manche nicht |
| 4 | Im Wesentlichen keine regulatorischen Hindernisse |
| 5 | Keine Einschraenkungen — Richtlinien foerdern sogar den KI-Einsatz |

---

**Q39** | D3-3C | Vorwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Regulierung | **Richtung**: Vorwaerts

Wie wahrscheinlich ist es in Ihrer Branche, dass Aufsichtsbehoerden nach einem Vorfall ermitteln?

| Punkte | Option |
|--------|--------|
| 1 | Fast sicher — spezielle Aufsichtsbehoerden ueberwachen staendig |
| 2 | Sehr wahrscheinlich — strenges Meldesystem fuer Vorfaelle |
| 3 | Kommt auf die Schwere an — schwere Faelle werden untersucht |
| 4 | Unwahrscheinlich, es sei denn extrem schwerwiegend |
| 5 | Fast unmoeglich — meine Branche hat kaum Aufsicht |

---

#### Facette 3D: Verantwortlichkeit (3 Fragen)

---

**Q40** | D3-3D | Rueckwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Verantwortlichkeit | **Richtung**: Rueckwaerts

Wenn bei Ihrer Arbeit etwas schiefgeht, wie viel persoenliche Verantwortung tragen Sie?

| Punkte | Option |
|--------|--------|
| 1 | Im Grunde keine persoenliche Haftung — Team/Unternehmen steht gerade |
| 2 | Koennte Kritik geben, aber keine rechtliche/finanzielle Haftung |
| 3 | Koennte mit finanzieller Entschaedigung oder Disziplinarmassnahmen konfrontiert werden |
| 4 | Koennte mit erheblichen Klagen oder Disziplinarverfahren konfrontiert werden |
| 5 | Koennte mit strafrechtlicher Verfolgung oder enormen Schadensersatzforderungen konfrontiert werden |

---

**Q41** | D3-3D | Vorwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Verantwortlichkeit | **Richtung**: Vorwaerts

Wie oft beinhaltet Ihre Arbeit moralische Urteile oder ethische Abwaegungen?

| Punkte | Option |
|--------|--------|
| 1 | Stehe fast taeglich vor ethischen Dilemmas |
| 2 | Muss haeufig ethische Faktoren abwaegen |
| 3 | Kommt gelegentlich vor |
| 4 | Sehr selten — groesstenteils Routineentscheidungen |
| 5 | Nie — rein technische Vorgaenge |

---

**Q42** | D3-3D | Rueckwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Verantwortlichkeit | **Richtung**: Rueckwaerts

Wie detailliert muessen die Aufzeichnungen und Genehmigungsdokumente Ihrer Arbeit sein?

| Punkte | Option |
|--------|--------|
| 1 | Keine Aufzeichnungen noetig — einfach erledigen |
| 2 | Einfache Erledigungsnachweise genuegen |
| 3 | Erfordert eine gewisse Prozessdokumentation |
| 4 | Erfordert detaillierte Arbeitsaufzeichnungen und Genehmigungsverfahren |
| 5 | Jeder Schritt muss vollstaendig rueckverfolgbar dokumentiert werden |

---

#### Facette 3E: Oeffentliches Vertrauen (3 Fragen)

---

**Q43** | D3-3E | Rueckwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Oeffentliches Vertrauen | **Richtung**: Rueckwaerts

Kann die Oeffentlichkeit akzeptieren, dass eine KI in Ihrer Rolle Entscheidungen trifft?

| Punkte | Option |
|--------|--------|
| 1 | Voellig in Ordnung — niemanden interessiert, wer es macht |
| 2 | Die meisten Menschen haetten nichts dagegen |
| 3 | Kommt darauf an — manche akzeptieren es, manche nicht |
| 4 | Die meisten Menschen wuerden sich unwohl fuehlen |
| 5 | Absolut inakzeptabel — die Oeffentlichkeit wuerde sich stark dagegen wehren |

---

**Q44** | D3-3E | Vorwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Oeffentliches Vertrauen | **Richtung**: Vorwaerts

Wie verbreitet ist KI-unterstuetzte Arbeit in Ihrer Branche bereits?

| Punkte | Option |
|--------|--------|
| 1 | Gar nicht — die Leute beobachten oder widersetzen sich sogar |
| 2 | Gerade erst am Anfang — einige Vorreiter probieren es aus |
| 3 | Manche Arbeitsschritte nutzen bereits KI-Unterstuetzung |
| 4 | Ziemlich verbreitet — die meisten nutzen es |
| 5 | Sehr verbreitet — wer keine KI nutzt, haengt hinterher |

---

**Q45** | D3-3E | Vorwaerts

> **Dimension**: Fehlertoleranz | **Facette**: Oeffentliches Vertrauen | **Richtung**: Vorwaerts

Wenn ein Kollege heimlich eine KI benutzt haette, um eine Aufgabe zu erledigen — wie waere Ihre Reaktion, wenn Sie es erfahren?

| Punkte | Option |
|--------|--------|
| 1 | Sehr ernst — koennte Regelverstoesse oder Gesetzesuebertretungen beinhalten |
| 2 | Wuerde mich unwohl fuehlen — das haette vorher gesagt werden sollen |
| 3 | Etwas ueberrascht, aber ok, wenn die Qualitaet stimmt |
| 4 | Egal — gute Ergebnisse zaehlen |
| 5 | Voellig normal — mache ich selbst staendig |

---

**D3 Zusammenfassung**: Vorwaerts 9 (Q32, Q33, Q35, Q36, Q38, Q39, Q41, Q44, Q45), Rueckwaerts 6 (Q31, Q34, Q37, Q40, Q42, Q43)

---

### Dimension 4 (korrigiert): Personenabhaengigkeit (P/H) — 15 Fragen

#### Facette 4A: Beziehungsabhaengigkeit (3 Fragen)

---

**Q46** | D4-4A | Rueckwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Beziehungsabhaengigkeit | **Richtung**: Rueckwaerts

Warum waehlen Kunden oder Partner Sie (oder Ihr Team)?

| Punkte | Option |
|--------|--------|
| 1 | Rein nach Preis und Effizienz — der Guenstigste gewinnt |
| 2 | Hauptsaechlich nach Faehigkeiten — keine Praeferenz fuer eine bestimmte Person |
| 3 | Faehigkeiten zaehlen, aber auch Zusammenarbeit und Vertrauen |
| 4 | Viele Kunden bleiben wegen der langjaehrigen Beziehung |
| 5 | Kunden arbeiten nur mit MIR — wenn ich gehe, gehen sie auch |

---

**Q47** | D4-4A | Vorwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Beziehungsabhaengigkeit | **Richtung**: Vorwaerts

Wie lange dauert es typischerweise, die fuer Ihre Arbeit noetige Vertrauensbeziehung aufzubauen?

| Punkte | Option |
|--------|--------|
| 1 | Dauert Jahre kontinuierlicher Beziehungspflege fuer echtes Vertrauen |
| 2 | Dauert 1-2 Jahre intensiver Zusammenarbeit |
| 3 | Dauert Monate der Zusammenarbeit |
| 4 | Ein paar Kontakte reichen fuer grundlegendes Vertrauen |
| 5 | Kein Vertrauen noetig — einmalige Transaktionen genuegen |

---

**Q48** | D4-4A | Vorwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Beziehungsabhaengigkeit | **Richtung**: Vorwaerts

Wie wichtig sind die persoenlichen Verbindungen, die Sie aufgebaut haben, fuer Ihre Arbeit?

| Punkte | Option |
|--------|--------|
| 1 | Mein Netzwerk IST mein groesster Wert |
| 2 | Kontakte sind ein sehr wichtiges Asset |
| 3 | Kontakte sind eine nuetzliche unterstuetzende Ressource |
| 4 | Etwas hilfreich, aber nicht wesentlich |
| 5 | Ueberhaupt nicht wichtig — keine Kontakte noetig |

---

#### Facette 4B: Persoenliche Marke (3 Fragen)

---

**Q49** | D4-4B | Rueckwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Persoenliche Marke | **Richtung**: Rueckwaerts

Wie viele Kunden/Zielgruppen kommen speziell wegen IHNEN als Person?

| Punkte | Option |
|--------|--------|
| 1 | Keine — sie interessiert nur, ob ich die Arbeit erledigen kann |
| 2 | Sehr wenige kennen mich persoenlich — groesstenteils kompetenzbasiert |
| 3 | Manche kommen meinetwegen, mehr wegen der Kompetenz |
| 4 | Viele kommen meinetwegen — ich habe eine gewisse Bekanntheit |
| 5 | Ich BIN die Marke — die Leute kommen speziell wegen mir |

---

**Q50** | D4-4B | Vorwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Persoenliche Marke | **Richtung**: Vorwaerts

Wenn Sie morgen ploetzlich kuendigen wuerden, wie lange wuerde es dauern, einen Ersatz auf Ihrem Niveau zu finden?

| Punkte | Option |
|--------|--------|
| 1 | Sehr schwer — vielleicht 6+ Monate oder gar nicht |
| 2 | Ziemlich schwer — braucht ein paar Monate |
| 3 | 1-2 Monate, um die richtige Person zu finden |
| 4 | 2-3 Wochen, um jemanden einzustellen |
| 5 | Kann sofort einen Ersatz finden |

---

**Q51** | D4-4B | Rueckwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Persoenliche Marke | **Richtung**: Rueckwaerts

Wie viel Ihrer Arbeitsergebnisse hat einen "nur Sie wuerden es so machen" persoenlichen Stil?

| Punkte | Option |
|--------|--------|
| 1 | Kein persoenlicher Stil — jeder wuerde dasselbe produzieren |
| 2 | Leichte persoenliche Gewohnheiten, aber nicht auffaellig |
| 3 | Einige persoenliche Noten — wer mich kennt, erkennt es |
| 4 | Klar erkennbarer persoenlicher Stil |
| 5 | Mein Stil IST meine Marke — ohne mich waere es nicht dasselbe |

---

#### Facette 4C: Physische Praesenz (3 Fragen)

---

**Q52** | D4-4C | Rueckwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Physische Praesenz | **Richtung**: Rueckwaerts

Muss Ihre Arbeit mit Ihrer physischen Anwesenheit vor Ort erledigt werden?

| Punkte | Option |
|--------|--------|
| 1 | Ueberhaupt nicht — kann von ueberall aus remote erledigt werden |
| 2 | Gelegentlich Anwesenheit noetig, groesstenteils remote |
| 3 | Etwa halb vor Ort, halb remote |
| 4 | Muss groesstenteils vor Ort sein |
| 5 | Muss persoenlich anwesend sein und die Arbeit koerperlich ausfuehren |

---

**Q53** | D4-4C | Vorwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Physische Praesenz | **Richtung**: Vorwaerts

Kann Ihr Arbeitsergebnis vollstaendig remote ueber das Internet geliefert werden?

| Punkte | Option |
|--------|--------|
| 1 | Ueberhaupt nicht — muss persoenlich vor Ort sein |
| 2 | Groesstenteils nicht — Kernarbeit erfordert Anwesenheit |
| 3 | Die Haelfte remote moeglich, die Haelfte erfordert Praesenz |
| 4 | Groesstenteils remote, weniges erfordert persoenliches Treffen |
| 5 | 100% online lieferbar |

---

**Q54** | D4-4C | Vorwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Physische Praesenz | **Richtung**: Vorwaerts

Wenn Ihre Arbeit vollstaendig online stattfaende (kein persoenlicher Kontakt), wie stark wuerde die Effektivitaet sinken?

| Punkte | Option |
|--------|--------|
| 1 | Unmoeglich — muss vor Ort erledigt werden |
| 2 | 50-60% Effektivitaet — stark beeintraechtigt |
| 3 | 70-80% Effektivitaet — spuerbar betroffen |
| 4 | 90% Effektivitaet — minimale Auswirkung |
| 5 | Kein Unterschied — koennte sogar effizienter sein |

---

#### Facette 4D: Emotionale Arbeit (3 Fragen)

---

**Q55** | D4-4D | Rueckwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Emotionale Arbeit | **Richtung**: Rueckwaerts

Wie viel Ihrer Arbeit beinhaltet es, Menschen zu lesen, Emotionen zu managen oder andere zu ueberzeugen?

| Punkte | Option |
|--------|--------|
| 1 | Ueberhaupt nichts — ich arbeite mit Daten/Maschinen |
| 2 | Gelegentlich Umgang mit Menschen, groesstenteils Einzelarbeit |
| 3 | Etwa halb mit Menschen, halb eigenstaendig |
| 4 | Die meiste Zeit mit Menschen und deren Emotionen befasst |
| 5 | Mein gesamter Wert LIEGT darin, Menschen zu verstehen und zu verbinden |

---

**Q56** | D4-4D | Vorwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Emotionale Arbeit | **Richtung**: Vorwaerts

Wie viel Ihrer Arbeit beinhaltet Teamfuehrung, Motivation oder die Ermutigung anderer?

| Punkte | Option |
|--------|--------|
| 1 | Meine Arbeit IST im Wesentlichen Fuehrung und Motivation anderer |
| 2 | Fuehrung ist eine meiner Kernkompetenzen |
| 3 | Erfordert eine gewisse Teamfuehrung und Koordination |
| 4 | Gelegentlich muessen Neulinge angeleitet werden |
| 5 | Ueberhaupt nicht — ich erledige nur meine eigene Arbeit |

---

**Q57** | D4-4D | Vorwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Emotionale Arbeit | **Richtung**: Vorwaerts

Wie sehr haengt Ihre Arbeit von Verhandlungs- und Ueberzeugungsfaehigkeiten ab?

| Punkte | Option |
|--------|--------|
| 1 | Verhandlung und Ueberzeugung sind meine Kernarbeit |
| 2 | Verhandlung ist ein wichtiger Teil der Arbeit |
| 3 | Regelmaessig muessen Verhandlungen mit verschiedenen Parteien gefuehrt werden |
| 4 | Gelegentlich einfache Kommunikation zur Einigung noetig |
| 5 | Keinerlei Verhandlung oder Ueberzeugungsarbeit noetig |

---

#### Facette 4E: Menschlicher Mehrwert (3 Fragen)

---

**Q58** | D4-4E | Rueckwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Menschlicher Mehrwert | **Richtung**: Rueckwaerts

Wenn Kunden entdecken wuerden, dass Ihre Arbeit tatsaechlich von einer KI erledigt wurde — was wuerde passieren?

| Punkte | Option |
|--------|--------|
| 1 | Waere egal — vielleicht sogar als effizienter empfunden |
| 2 | Etwas ueberrascht, aber grundsaetzlich akzeptabel |
| 3 | Wuerde als weniger wertvoll empfunden, aber noch akzeptabel |
| 4 | Klar empfundener Wertverlust — Unzufriedenheit |
| 5 | Absolut inakzeptabel — wuerde sich getaeuscht fuehlen |

---

**Q59** | D4-4E | Vorwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Menschlicher Mehrwert | **Richtung**: Vorwaerts

Wenn Ihr Arbeitsergebnis unter dem Namen einer anderen Person stehen wuerde, wuerde sich sein Wert aendern?

| Punkte | Option |
|--------|--------|
| 1 | Aendert sich komplett — mein Name IST Teil des Wertes |
| 2 | Spuerbar betroffen — Namensnennung ist sehr wichtig |
| 3 | Etwas Einfluss, aber hauptsaechlich wird nach Qualitaet beurteilt |
| 4 | Fast kein Einfluss — egal wessen Name draufsteht |
| 5 | Kein Einfluss — das Ergebnis ist das Ergebnis |

---

**Q60** | D4-4E | Vorwaerts

> **Dimension**: Personenabhaengigkeit | **Facette**: Menschlicher Mehrwert | **Richtung**: Vorwaerts

Wie viel Ihrer Arbeit beinhaltet "Improvisation und Live-Reaktion"?

| Punkte | Option |
|--------|--------|
| 1 | Meine Kernarbeit IST Improvisation und Spontanreaktion |
| 2 | Muss oft spontan agieren und sich anpassen |
| 3 | Manche Situationen erfordern spontane Reaktionen vor Ort |
| 4 | Sehr selten Improvisation noetig |
| 5 | Gar nicht — alles ist im Voraus vorbereitet |

---

**D4 Zusammenfassung**: Vorwaerts 9 (Q47, Q48, Q50, Q53, Q54, Q56, Q57, Q59, Q60), Rueckwaerts 6 (Q46, Q49, Q51, Q52, Q55, Q58)

---

## Vollstaendige 60-Fragen Uebersichtstabelle

| Nr. | Dimension | Facette | Richt. | Frage (gekuerzt) |
|-----|-----------|---------|--------|-------------------|
| Q1 | D1 Lernbarkeit | 1A Digitalisierung | V | Wo wird Ihre taegliche Arbeit erledigt? |
| Q2 | D1 Lernbarkeit | 1A Digitalisierung | V | Wie viel hinterlaesst eine digitale Spur? |
| Q3 | D1 Lernbarkeit | 1A Digitalisierung | R | Wie viel erfordert physisches Handling? |
| Q4 | D1 Lernbarkeit | 1B Wissenszugaenglichkeit | V | Wie viel Fachwissen ist online verfuegbar? |
| Q5 | D1 Lernbarkeit | 1B Wissenszugaenglichkeit | V | KI liest alle Buecher — wie viel %? |
| Q6 | D1 Lernbarkeit | 1B Wissenszugaenglichkeit | R | Wie wurde das wichtigste Wissen erlernt? |
| Q7 | D1 Lernbarkeit | 1C Prozessstandardisierung | V | Wie stark folgen Prozesse festen Ablaeufen? |
| Q8 | D1 Lernbarkeit | 1C Prozessstandardisierung | V | Laesst sich die Arbeit in ein Handbuch schreiben? |
| Q9 | D1 Lernbarkeit | 1C Prozessstandardisierung | R | Wie oft Entscheidung ohne Praezedenzfall? |
| Q10 | D1 Lernbarkeit | 1D Implizites Wissen | R | Wie abhaengig von schwer artikulierbarer Erfahrung? |
| Q11 | D1 Lernbarkeit | 1D Implizites Wissen | R | Was ist am schwersten zu lehren? |
| Q12 | D1 Lernbarkeit | 1D Implizites Wissen | V | Wie viel Entscheidungen logisch vs. Bauchgefuehl? |
| Q13 | D1 Lernbarkeit | 1E Neuartigkeit & Wandel | R | Wie oft voellig neue Situationen? |
| Q14 | D1 Lernbarkeit | 1E Neuartigkeit & Wandel | V | Wie viele Aufgaben schon aehnlich gemacht? |
| Q15 | D1 Lernbarkeit | 1E Neuartigkeit & Wandel | V | Arbeitsweise der Branche in 5 Jahren veraendert? |
| Q16 | D2 Bewertungsobjekt. | 2A Messbarkeit | V | Qualitaet mit Kennzahlen bewertbar? |
| Q17 | D2 Bewertungsobjekt. | 2A Messbarkeit | V | Wie schnell Feedback zur Qualitaet? |
| Q18 | D2 Bewertungsobjekt. | 2A Messbarkeit | R | Automatisierte Tools zur Qualitaetspruefung? |
| Q19 | D2 Bewertungsobjekt. | 2B Ergebniskonvergenz | V | Wie stark variieren Ergebnisse zwischen Personen? |
| Q20 | D2 Bewertungsobjekt. | 2B Ergebniskonvergenz | V | Gibt es eine richtige Antwort? |
| Q21 | D2 Bewertungsobjekt. | 2B Ergebniskonvergenz | R | Wie stark wuerden Bewertungen dreier Experten abweichen? |
| Q22 | D2 Bewertungsobjekt. | 2C Zielklarheit | R | Weiss der Auftraggeber was er will? |
| Q23 | D2 Bewertungsobjekt. | 2C Zielklarheit | V | "Definition of Done"-Checkliste moeglich? |
| Q24 | D2 Bewertungsobjekt. | 2C Zielklarheit | V | Eher Matheaufgabe oder Aufsatz? |
| Q25 | D2 Bewertungsobjekt. | 2D Geschmacksabh. | R | Wie abhaengig von Aesthetik/Geschmack? |
| Q26 | D2 Bewertungsobjekt. | 2D Geschmacksabh. | R | Unterschied zwischen "gut genug" und "genau richtig"? |
| Q27 | D2 Bewertungsobjekt. | 2D Geschmacksabh. | V | Kann sich jeder einigen, was "gute Arbeit" ist? |
| Q28 | D2 Bewertungsobjekt. | 2E Interdisziplin. Synthese | R | Wie viele Fachgebiete fuer Entscheidungen? |
| Q29 | D2 Bewertungsobjekt. | 2E Interdisziplin. Synthese | V | Wie viele Probleme koennte KI finden? |
| Q30 | D2 Bewertungsobjekt. | 2E Interdisziplin. Synthese | V | Aendert sich die Definition von "guter Arbeit" haeufig? |
| Q31 | D3 Fehlertoleranz | 3A Fehlerschwere | R | Schlimmstmoegliche Folge eines Fehlers? |
| Q32 | D3 Fehlertoleranz | 3A Fehlerschwere | V | Wie viele Menschen von einer Fehlentscheidung betroffen? |
| Q33 | D3 Fehlertoleranz | 3A Fehlerschwere | V | Unterschied zwischen 80% und 100%? |
| Q34 | D3 Fehlertoleranz | 3B Reversibilitaet | R | Fehler gemacht — Korrektur moeglich? |
| Q35 | D3 Fehlertoleranz | 3B Reversibilitaet | V | "Erst ausprobieren, dann aendern" erlaubt? |
| Q36 | D3 Fehlertoleranz | 3B Reversibilitaet | V | Wie schwer naechsten Tag behebbar? |
| Q37 | D3 Fehlertoleranz | 3C Regulierung | R | Wie streng regulatorische/Qualifikationsanforderungen? |
| Q38 | D3 Fehlertoleranz | 3C Regulierung | V | Rechtliche Hindernisse bei KI-Uebernahme? |
| Q39 | D3 Fehlertoleranz | 3C Regulierung | V | Wahrscheinlichkeit behoerdlicher Ermittlung nach Vorfall? |
| Q40 | D3 Fehlertoleranz | 3D Verantwortlichkeit | R | Wie viel persoenliche Verantwortung bei Problemen? |
| Q41 | D3 Fehlertoleranz | 3D Verantwortlichkeit | V | Wie oft ethische Abwaegungen? |
| Q42 | D3 Fehlertoleranz | 3D Verantwortlichkeit | R | Wie detailliert muessen Aufzeichnungen sein? |
| Q43 | D3 Fehlertoleranz | 3E Oeffentl. Vertrauen | R | Akzeptiert die Oeffentlichkeit KI in Ihrer Rolle? |
| Q44 | D3 Fehlertoleranz | 3E Oeffentl. Vertrauen | V | Wie verbreitet ist KI in Ihrer Branche? |
| Q45 | D3 Fehlertoleranz | 3E Oeffentl. Vertrauen | V | Reaktion auf heimliche KI-Nutzung eines Kollegen? |
| Q46 | D4 Personenabh. | 4A Beziehungsabh. | R | Warum waehlen Kunden Sie? |
| Q47 | D4 Personenabh. | 4A Beziehungsabh. | V | Wie lange zum Aufbau von Vertrauensbeziehungen? |
| Q48 | D4 Personenabh. | 4A Beziehungsabh. | V | Wie wichtig sind Ihre persoenlichen Kontakte? |
| Q49 | D4 Personenabh. | 4B Persoenliche Marke | R | Wie viele Kunden kommen speziell wegen IHNEN? |
| Q50 | D4 Personenabh. | 4B Persoenliche Marke | V | Wie lange bis ein Ersatz gefunden wird? |
| Q51 | D4 Personenabh. | 4B Persoenliche Marke | R | Wie viel persoenlicher Stil in den Ergebnissen? |
| Q52 | D4 Personenabh. | 4C Physische Praesenz | R | Muss persoenlich vor Ort sein? |
| Q53 | D4 Personenabh. | 4C Physische Praesenz | V | Ergebnis vollstaendig remote lieferbar? |
| Q54 | D4 Personenabh. | 4C Physische Praesenz | V | Effektivitaetseinbusse bei reinem Online-Betrieb? |
| Q55 | D4 Personenabh. | 4D Emotionale Arbeit | R | Wie viel Menschen lesen, Emotionen managen? |
| Q56 | D4 Personenabh. | 4D Emotionale Arbeit | V | Wie viel Teamfuehrung und Motivation? |
| Q57 | D4 Personenabh. | 4D Emotionale Arbeit | V | Wie viel Verhandlung und Ueberzeugung? |
| Q58 | D4 Personenabh. | 4E Menschl. Mehrwert | R | Kundenreaktion wenn KI es gemacht hat? |
| Q59 | D4 Personenabh. | 4E Menschl. Mehrwert | V | Wertaenderung bei anderem Namen? |
| Q60 | D4 Personenabh. | 4E Menschl. Mehrwert | V | Wie viel Live-Improvisation? |

---

### Richtungsstatistik pro Dimension

| Dimension | Vorwaerts | Rueckwaerts | Verhaeltnis |
|-----------|-----------|-------------|-------------|
| D1 Lernbarkeit | 9 (Q1,2,4,5,7,8,12,14,15) | 6 (Q3,6,9,10,11,13) | 60/40 |
| D2 Bewertungsobjektivitaet | 9 (Q16,17,19,20,23,24,27,29,30) | 6 (Q18,21,22,25,26,28) | 60/40 |
| D3 Fehlertoleranz | 9 (Q32,33,35,36,38,39,41,44,45) | 6 (Q31,34,37,40,42,43) | 60/40 |
| D4 Personenabhaengigkeit | 9 (Q47,48,50,53,54,56,57,59,60) | 6 (Q46,49,51,52,55,58) | 60/40 |
| **Gesamt** | **36** | **24** | **60/40** |

---

## Teil 4: Endgueltige Fragereihenfolge

### 4.1 Sortierungsprinzipien

1. **Dimensionsrotation**: 4 aufeinanderfolgende Fragen stammen immer aus 4 verschiedenen Dimensionen (Round-Robin)
2. **Schwierigkeitsprogression**: Erstes Drittel = einfache Alltagsszenarien, mittleres Drittel = tieferes Nachdenken, letztes Drittel = abstrakter
3. **Richtungswechsel**: Nicht mehr als 3 aufeinanderfolgende gleichgerichtete Fragen
4. **Facetten-Abstand**: 3 Fragen derselben Facette mindestens 12 Fragen auseinander
5. **Erster/letzter Eindruck**: Erste und letzte Frage sollten die ansprechendsten sein

### 4.2 Empfohlene endgueltige Reihenfolge

Die Spalte "Original-Nr." bezieht sich auf die Designnummer in Teil 3; "Anzeige-Nr." ist die Reihenfolge, die die Teilnehmer tatsaechlich sehen.

| Anzeige-Nr. | Original-Nr. | Dimension | Facette | Richt. | Frage (gekuerzt) |
|-------------|--------------|-----------|---------|--------|-------------------|
| 1 | Q1 | D1 | 1A Digitalisierung | V | Wo wird gearbeitet |
| 2 | Q16 | D2 | 2A Messbarkeit | V | Qualitaet mit Kennzahlen bewertbar |
| 3 | Q35 | D3 | 3B Reversibilitaet | V | "Erst ausprobieren" erlaubt |
| 4 | Q52 | D4 | 4C Physische Praesenz | R | Muss vor Ort sein |
| 5 | Q4 | D1 | 1B Wissenszugang | V | Fachwissen online verfuegbar |
| 6 | Q19 | D2 | 2B Ergebniskonvergenz | V | Ergebnisse variieren zwischen Personen |
| 7 | Q31 | D3 | 3A Fehlerschwere | R | Schlimmste Folge eines Fehlers |
| 8 | Q46 | D4 | 4A Beziehungsabh. | R | Warum Kunden Sie waehlen |
| 9 | Q7 | D1 | 1C Prozessstandard. | V | Wie stark feste Ablaeufe |
| 10 | Q22 | D2 | 2C Zielklarheit | R | Weiss Auftraggeber was er will |
| 11 | Q44 | D3 | 3E Oeffentl. Vertrauen | V | Wie verbreitet KI in Branche |
| 12 | Q55 | D4 | 4D Emotionale Arbeit | R | Menschen lesen, Emotionen managen |
| 13 | Q10 | D1 | 1D Implizites Wissen | R | Abhaengig von schwer artikulierbarer Erfahrung |
| 14 | Q17 | D2 | 2A Messbarkeit | V | Wie schnell Feedback zur Qualitaet |
| 15 | Q32 | D3 | 3A Fehlerschwere | V | Wie viele von Fehler betroffen |
| 16 | Q49 | D4 | 4B Persoenl. Marke | R | Kunden kommen speziell wegen Ihnen |
| 17 | Q14 | D1 | 1E Neuartigkeit | V | Wie viele Aufgaben schon aehnlich gemacht |
| 18 | Q25 | D2 | 2D Geschmacksabh. | R | Abhaengig von Aesthetik/Geschmack |
| 19 | Q34 | D3 | 3B Reversibilitaet | R | Fehler korrigierbar |
| 20 | Q53 | D4 | 4C Physische Praesenz | V | Ergebnis remote lieferbar |
| 21 | Q2 | D1 | 1A Digitalisierung | V | Digitale Spur der Ergebnisse |
| 22 | Q20 | D2 | 2B Ergebniskonvergenz | V | Gibt es eine richtige Antwort |
| 23 | Q37 | D3 | 3C Regulierung | R | Wie streng die Regulierung |
| 24 | Q47 | D4 | 4A Beziehungsabh. | V | Wie lange Vertrauensaufbau |
| 25 | Q8 | D1 | 1C Prozessstandard. | V | Als Handbuch schreibbar |
| 26 | Q24 | D2 | 2C Zielklarheit | V | Matheaufgabe oder Aufsatz |
| 27 | Q45 | D3 | 3E Oeffentl. Vertrauen | V | Reaktion auf KI-Nutzung des Kollegen |
| 28 | Q58 | D4 | 4E Menschl. Mehrwert | R | Kunde erfaehrt dass KI es gemacht hat |
| 29 | Q3 | D1 | 1A Digitalisierung | R | Physisches Handling erforderlich |
| 30 | Q27 | D2 | 2D Geschmacksabh. | V | Konsens ueber "gute Arbeit" |
| 31 | Q33 | D3 | 3A Fehlerschwere | V | Unterschied zwischen 80% und 100% |
| 32 | Q50 | D4 | 4B Persoenl. Marke | V | Wie lange bis Ersatz gefunden |
| 33 | Q5 | D1 | 1B Wissenszugang | V | KI liest alle Buecher, wie viel % |
| 34 | Q23 | D2 | 2C Zielklarheit | V | "Definition of Done" moeglich |
| 35 | Q40 | D3 | 3D Verantwortlichkeit | R | Persoenliche Verantwortung bei Problemen |
| 36 | Q56 | D4 | 4D Emotionale Arbeit | V | Teamfuehrung und Motivation |
| 37 | Q12 | D1 | 1D Implizites Wissen | V | Wie viel Entscheidungen logisch |
| 38 | Q21 | D2 | 2B Ergebniskonvergenz | R | Wie stark Expertenbewertungen abweichen |
| 39 | Q36 | D3 | 3B Reversibilitaet | V | Wie schwer naechsten Tag behebbar |
| 40 | Q48 | D4 | 4A Beziehungsabh. | V | Wie wichtig Kontakte |
| 41 | Q6 | D1 | 1B Wissenszugang | R | Wie wichtigstes Wissen erlernt |
| 42 | Q26 | D2 | 2D Geschmacksabh. | R | "Gut genug" vs. "genau richtig" |
| 43 | Q38 | D3 | 3C Regulierung | V | Rechtliche Hindernisse bei KI |
| 44 | Q54 | D4 | 4C Physische Praesenz | V | Effektivitaet bei reinem Online-Betrieb |
| 45 | Q9 | D1 | 1C Prozessstandard. | R | Wie oft Entscheidung ohne Praezedenzfall |
| 46 | Q28 | D2 | 2E Interdisziplin. | R | Wie viele Fachgebiete fuer Entscheidungen |
| 47 | Q41 | D3 | 3D Verantwortlichkeit | V | Wie oft ethische Abwaegungen |
| 48 | Q51 | D4 | 4B Persoenl. Marke | R | Wie viel persoenlicher Stil |
| 49 | Q11 | D1 | 1D Implizites Wissen | R | Am schwersten zu lehren |
| 50 | Q29 | D2 | 2E Interdisziplin. | V | Wie viele Probleme koennte KI finden |
| 51 | Q42 | D3 | 3D Verantwortlichkeit | R | Wie detailliert Aufzeichnungen |
| 52 | Q57 | D4 | 4D Emotionale Arbeit | V | Wie viel Verhandlung/Ueberzeugung |
| 53 | Q13 | D1 | 1E Neuartigkeit | R | Wie oft voellig neue Situationen |
| 54 | Q18 | D2 | 2A Messbarkeit | R | Automatisierte Qualitaetspruefung moeglich |
| 55 | Q39 | D3 | 3C Regulierung | V | Wahrscheinlichkeit behoerdlicher Ermittlung |
| 56 | Q59 | D4 | 4E Menschl. Mehrwert | V | Wertaenderung bei anderem Namen |
| 57 | Q15 | D1 | 1E Neuartigkeit | V | Branche in 5 Jahren veraendert |
| 58 | Q30 | D2 | 2E Interdisziplin. | V | Aendert sich "gute Arbeit" haeufig |
| 59 | Q43 | D3 | 3E Oeffentl. Vertrauen | R | Akzeptiert Oeffentlichkeit KI |
| 60 | Q60 | D4 | 4E Menschl. Mehrwert | V | Wie viel Live-Improvisation |

---

### 4.3 Reihenfolge-Validierung

**Dimensionsverteilung**: Alle 4 Fragen rotieren strikt D1->D2->D3->D4, insgesamt 15 Runden.

**Richtungsverteilung** (Vorwaerts/Rueckwaerts-Verhaeltnis pro 8-Fragen-Fenster):
- F1-8: V,V,V,R,V,V,R,R = 5V/3R
- F9-16: V,R,V,R,R,V,V,R = 4V/4R
- F17-24: V,R,R,V,V,V,R,V = 5V/3R
- F25-32: V,V,V,R,R,V,V,V = 6V/2R (etwas mehr vorwaerts, akzeptabel)
- F33-40: V,V,R,V,V,R,V,V = 6V/2R (wie oben)
- F41-48: R,R,V,V,R,R,V,R = 3V/5R (gleicht fruehere vorwaerts-lastige Abschnitte aus)
- F49-56: R,V,R,V,R,R,V,V = 4V/4R
- F57-60: V,V,R,V = 3V/1R

Nicht mehr als 3 aufeinanderfolgende gleichgerichtete Fragen.

**Facetten-Abstand** (Positionen der 3 Fragen derselben Facette):
- 1A: Positionen 1, 21, 29 (Abstaende: 20, 8)
- 1B: Positionen 5, 33, 41 (Abstaende: 28, 8)
- 1C: Positionen 9, 25, 45 (Abstaende: 16, 20)
- 1D: Positionen 13, 37, 49 (Abstaende: 24, 12)
- 1E: Positionen 17, 53, 57 (Abstaende: 36, 4) — 53 und 57 Abstand nur 4, akzeptabel da unterschiedliche Richtungen
- 2A: Positionen 2, 14, 54 (Abstaende: 12, 40)
- 2B: Positionen 6, 22, 38 (Abstaende: 16, 16)
- 2C: Positionen 10, 26, 34 (Abstaende: 16, 8)
- 2D: Positionen 18, 30, 42 (Abstaende: 12, 12)
- 2E: Positionen 46, 50, 58 (Abstaende: 4, 8) — nah beieinander, aber unterschiedliche Richtungen
- 3A: Positionen 7, 15, 31 (Abstaende: 8, 16)
- 3B: Positionen 3, 19, 39 (Abstaende: 16, 20)
- 3C: Positionen 23, 43, 55 (Abstaende: 20, 12)
- 3D: Positionen 35, 47, 51 (Abstaende: 12, 4) — 47 und 51 Abstand 4, akzeptabel
- 3E: Positionen 11, 27, 59 (Abstaende: 16, 32)
- 4A: Positionen 8, 24, 40 (Abstaende: 16, 16)
- 4B: Positionen 16, 32, 48 (Abstaende: 16, 16)
- 4C: Positionen 4, 20, 44 (Abstaende: 16, 24)
- 4D: Positionen 12, 36, 52 (Abstaende: 24, 16)
- 4E: Positionen 28, 56, 60 (Abstaende: 28, 4) — 56 und 60 Abstand 4, akzeptabel da unterschiedliche Richtungen

Die meisten Abstaende >= 8, Abstandsanforderung erfuellt.

---

## Anhang: Facetten-Dimensionen Schnellreferenz

### D1 Lernbarkeit

| Facette | Code | Vorwaerts | Rueckwaerts |
|---------|------|-----------|-------------|
| Digitalisierungsgrad | 1A | Q1, Q2 | Q3 |
| Wissenszugaenglichkeit | 1B | Q4, Q5 | Q6 |
| Prozessstandardisierung | 1C | Q7, Q8 | Q9 |
| Implizites Wissen | 1D | Q12 | Q10, Q11 |
| Neuartigkeit & Wandel | 1E | Q14, Q15 | Q13 |

### D2 Bewertungsobjektivitaet

| Facette | Code | Vorwaerts | Rueckwaerts |
|---------|------|-----------|-------------|
| Messbarkeit | 2A | Q16, Q17 | Q18 |
| Ergebniskonvergenz | 2B | Q19, Q20 | Q21 |
| Zielklarheit | 2C | Q23, Q24 | Q22 |
| Geschmacksabhaengigkeit | 2D | Q27 | Q25, Q26 |
| Interdisziplinaere Synthese | 2E | Q29, Q30 | Q28 |

### D3 Fehlertoleranz

| Facette | Code | Vorwaerts | Rueckwaerts |
|---------|------|-----------|-------------|
| Fehlerschwere | 3A | Q32, Q33 | Q31 |
| Reversibilitaet | 3B | Q35, Q36 | Q34 |
| Regulierung | 3C | Q38, Q39 | Q37 |
| Verantwortlichkeit | 3D | Q41 | Q40, Q42 |
| Oeffentliches Vertrauen | 3E | Q44, Q45 | Q43 |

### D4 Personenabhaengigkeit

| Facette | Code | Vorwaerts | Rueckwaerts |
|---------|------|-----------|-------------|
| Beziehungsabhaengigkeit | 4A | Q47, Q48 | Q46 |
| Persoenliche Marke | 4B | Q50 | Q49, Q51 |
| Physische Praesenz | 4C | Q53, Q54 | Q52 |
| Emotionale Arbeit | 4D | Q56, Q57 | Q55 |
| Menschlicher Mehrwert | 4E | Q59, Q60 | Q58 |
