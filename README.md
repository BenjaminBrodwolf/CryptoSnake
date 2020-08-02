# Blockhain Collectables


 <img src="https://github.com/BenjaminBrodwolf/CryptoSnake/blob/master/images/cryptosnake.png" width="450" title="CryptoSnake">

# CryptoSnake
CryptoSnake ist eine Blockchain-Basierte Web-Applikation, mit welcher auf spielerische Art Schlangen gehalten, erzeugt, gefüttert und auf einem Markt gehandelt oder verschenkt werden können. Die Web-App wurde mit Smart-Contracts für die Ethereum-Blockchain entwickelt.

## Eigenschaften einer Schlange (CryptoSnake)
Jede Schlange besitzt folgende Attribute:
* Name: Der Name der Schlange
* DNA: Eine DNA, die aus 16 Zahlen besteht (Aus der DNA lassen sich weitere Eigenschaften ablesen)
* Level: Zeigt die Entwicklung der Schlange an. Je höher der Level umso höher der Wert der Schlange
* Ready-Time: Gibt einen Zeitpunkt an, wann die Schlange wieder zur Paarung bereit ist.

## Spielregeln
### Schlange erzeugen

**Erzeugen durch Generieren**
Eine initiale Schlange kann pro User gratis erzeugt werden. Weitere Schlangen können jederzeit gegen 0.001 Ether erworben werden. Die letzten beiden Zahlen der DNA einer erzeugten Schlange sind 00. Somit ist anhand der DNA ersichtlich, ob diese Schlange erzeugt wurde.

**Erzeugen durch Paaren**
Benutzer, welche über zwei Schlangen verfügen, können diese miteinander paaren, worauf eine neue Schlange entsteht. Die Schlange ist anschliessend ebenfalls im Besitz des Benutzers. Eine Schlange kann sich dabei allerdings höchstens alle 24h (beachte readyTime) einmal paaren. So ist es also nicht möglich, eine beliebige Anzahl Schlangen zu erzeugen. Die Eltern einer neu erzeugten Schlange werden zudem vermerkt, sodass sie zurückverfolgt werden kann. Die DNA der Schlange, welche durch Paarung entstanden ist, endet auf die Zahl 42. Somit kann anhand der DNA unterschieden werden ob diese Schlange durch Paarung oder durch einen Kauf entstanden ist.
 <img src="https://github.com/BenjaminBrodwolf/CryptoSnake/blob/master/images/pairing.png" width="650" title="Paarung von zwei CryptoSnake">

### Schlangen füttern
Schlangen können gefüttert werden, um so ein höheres Level zu erreichen. Das benötigte Futter kann gegen Ether gekauft werden. Beim Futterkauf gibt der Benutzer eine geheime Zutat (als Text) mit. Anhand dieser Zutat wird dann mathematisch berechnet wie viele Level aufgestiegen werden können und welchen Namen das Futter bekommt. Der Level-Upgrade Bereich liegt zwischen 1 und 5. Für den Namen des Futters gibt es auch 5 Möglichkeiten (Insects, Snails, Birds, Snakes, Deer). Nach dem Kauf von Schlangen-Futter, kann dies einer beliebigen Schlange zum Essen (feeding) gegeben werden.

### Schlangen-Marktplatz
Auf dem Marktplatz können die User ihre Schlangen verkaufen oder Schlangen von anderen Benutzern
erwerben. Der gewünschte Verkaufspreis einer Schlange kann dabei selbst definiert werden. Nebst dem
Kauf und Verkauf von Schlagen zu einem bestimmten Preis gibt es auch die Möglichkeit, eine Schlange
an jemanden zu verschenken.


## Anreize für das Spiel
Durch das Sammeln und Weiterentwickeln der Schlange kann ein höherer Preis am Markt verlangt
werden. Ein weiterer Anreiz ist der Besitz einer einzigartigen Schlange, die dem Benutzer farblich oder
anhand der Eigenschaften besonders gefällt.

## Architektur
Unsere Webapplikation ist unterteilt in ein klassisches Frontend und Backend. Das Frontend wurde mit
den klassischen Webtechnologien wie JavaScript, HTML, CSS entwickelt. Im Backend wurde Solidity
verwendet, um Smart Contracts zu erstellen, die dann auf der Ethereum Blockchain deployed werden.
Um das Backend mit dem Frontend zu verbinden wurde Web3.js benutzt und zusätzlich noch MetaMask
als Krypto-Wallet. Im Backend gibt es eine Vererbungsstruktur, um die einzelnen Smart Contracts besser
aufzuteilen. Der Snake-Market ist als eigenständiger Contract deployed und ist somit nicht in der
Vererbungshierarchie.

## Sicherheit
**Visibility Types**
Grundsätzlich wurde in Solidity möglichst mittels Sichtbarkeitstypen versucht die Zugänglichkeit von
Methoden von ausserhalb einzuschränken. Dazu sind Methoden, welche über das Frontend
angesprochen werden mit public deklariert. Diese Public-Methoden rufen dann wiederum Internal- oder
Privat-Deklarierte Methoden auf, hinter welchen sich dann die eigentlichen Kernaufgaben des Frontend-
Aufrufes verbergen. Beispielsweise kann der Befehl zum Erzeugen einer Schlange zwar über die Public-
Methoden createPayedSnake() und createInitialSnake() ausgeführt werden, die endgültige Erstellung
der Snake findet allerdings erst in der Internal-Methode _createSnake() statt. Das bedeutet, dass ein
Blockchain-User keine Möglichkeit hat, direkt von ausserhalb eine Snake erzeugen zu können.

**Require-Statements**
Damit nun auch die von aussen zugänglichen Public-Methoden nicht einfach beliebig von Usern
aufgerufen werden können, haben wir diese mit Require-Statements gesichert. Beispielsweise kann ein
User nur dann eine neue «Payed-Snake» erzeugen, wenn er auch entsprechend genügend Ether
übermittelt. In der Methode createPayedSnake() wird daher beispielsweise im Require-Statement
geprüft ob der «msg.value», also die Transaktion des Users, überhaupt über genügend Ether für das
Bezahlen der Snake verfügt.

**Zufallszahlen**
Da bei einem Smart Contract von aussen normalerweise alles sichtbar ist, also auch der Quellcode,
verwenden wir Zufallszahlen, damit bei bestimmten Konzepten Böswillige diesbezüglich keine
Manipulationsmöglichkeiten haben. Damit verhindern wir beispielsweise, dass jemand von aussen die
DNA einer teuer gehandelte Snake nachmachen kann. Wir setzten dies um, indem wir bei der Erstellung
einer neuen Snake die keccak256 Hash Funktion mit dem Namen der Snake anwenden. Da diese
Funktion eine zufallsbedingte Hexadezimal-Zahl generiert, erhalten wir entsprechend eine
glücksbedingte DNA der neuen Snake.

## Verbesserungspotential
**Loops**
Es muss beachtet werden, dass Loops, zB. mittels For-Schleifen, die Netzwerkressourcen mit intensiven
Berechnungen in Beschlag nehmen können und so zu hohen Gas-Kosten führen könnte. Wir haben
deshalb beim Iterieren durch Informationen, beispielsweise IDs von Snakes, statt die Snakes als Objekt
selbst verwendet. Angenommen es befänden sich extrem viele Snakes auf dem Marktplatz, könnte aber
das Iterieren selbst nur durch IDs zu hohem Ressourcenverbrauch führen. Aus diesen Gründen haben
wir in unserer Applikation möglichst versucht auf Iterationen zu verzichten.

**Code-Review**
In einem Code Review könnte man an einigen Stellen noch besser überprüfen, ob die Sichtbarkeitstypen
genügen streng gewählt wurden und diese gegebenenfalls noch anpassen.
Des Weiteren gibt es noch diverse Coding-Guidelines, wie z.B. die Underline-Annotation bei internen
Methoden, welche angepasst werden könnten.


## Design der CryptoSnakes
Für die Gestaltung der CryptoSnakes wurde die jeweilige 16-stellige DNA in Hexadezimal-Codes
umgewandelt. Dabei wird bei jedem Hexadezimal-Code iterativ drei stellen nach rechts geshiftet und
dabei die ersten sechs Zahlen erfasst, welche als Hexadezimal-Code-Farbe verwendet werden um die
Körperteile der CryptoSnake einzufärben. Der letzte erfasste Hexadezimal-Code wird von rechts
genommen, somit erhalten wir insgesamt sechs Hexadezimal-Codes, um die CryptoSnake individuell zu
gestalten. Da aber sechs Körper-Teilen etwas zu kurz wären, wurde eine Funktion erstellt, welche neue
Farben zwischen zwei Hexadezimal-Codes generieren kann, womit wir fünf zusätzliche Körperteile
erhalten. Dies sorgt auch für einen schöneren Übergang der Farben.

Folgendes Beispiels zeigt die ersten 3 Iterationen:
 <img src="https://github.com/BenjaminBrodwolf/CryptoSnake/blob/master/images/snakeCreationDesign.png" width="650" title="Paarung von zwei CryptoSnake">
 
 ## Frontend
  <img src="https://github.com/BenjaminBrodwolf/CryptoSnake/blob/master/images/frontend.png" width="650" title="Paarung von zwei CryptoSnake">

