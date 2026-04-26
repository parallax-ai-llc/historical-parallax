#!/usr/bin/env python3
"""Check which famous people in our curated list are missing images."""
import os
import re

ARTICLES = "content/articles"

FAMOUS = [
    "angela-merkel", "emmanuel-macron", "olaf-scholz",
    "francois-mitterrand", "jacques-chirac", "nicolas-sarkozy",
    "francois-hollande", "silvio-berlusconi", "mario-draghi",
    "giorgia-meloni", "viktor-orban",
    "recep-tayyip-erdogan", "mohammed-bin-salman", "abdel-fattah-el-sisi",
    "hosni-mubarak", "gamal-abdel-nasser",
    "hugo-chavez", "nicolas-maduro", "jair-bolsonaro", "dilma-rousseff",
    "evo-morales", "felipe-calderon",
    "jacob-zuma", "thabo-mbeki", "cyril-ramaphosa", "paul-kagame",
    "idi-amin", "haile-selassie",
    "abiy-ahmed", "muhammadu-buhari",
    "mikhail-gorbachev", "boris-yeltsin", "leonid-brezhnev",
    "nikita-khrushchev", "vladimir-lenin", "leon-trotsky", "dmitry-medvedev",
    "shinzo-abe", "fumio-kishida", "narendra-modi", "manmohan-singh",
    "jawaharlal-nehru", "indira-gandhi",
    "park-geun-hye", "moon-jae-in", "lee-myung-bak", "roh-moo-hyun",
    "kim-dae-jung", "chun-doo-hwan", "yoon-suk-yeol",
    "lee-byung-chul", "lee-kun-hee", "lee-jae-yong", "chung-ju-yung",
    "james-watson", "francis-crick", "rosalind-franklin", "linus-pauling",
    "erwin-schrodinger", "werner-heisenberg", "max-planck", "niels-bohr",
    "enrico-fermi", "robert-oppenheimer", "richard-feynman",
    "paul-dirac", "wolfgang-pauli", "johannes-kepler", "tycho-brahe",
    "nicolaus-copernicus", "rene-descartes", "blaise-pascal", "gottfried-leibniz",
    "james-clerk-maxwell", "michael-faraday", "james-watt", "alexander-graham-bell",
    "guglielmo-marconi", "henry-ford",
    "rembrandt", "caravaggio", "raphael",
    "titian", "francisco-goya", "claude-monet",
    "pierre-auguste-renoir", "edgar-degas", "paul-cezanne", "paul-gauguin",
    "henri-matisse", "salvador-dali", "andy-warhol",
    "jackson-pollock", "frida-kahlo", "diego-rivera",
    "frederic-chopin", "franz-liszt", "tchaikovsky",
    "richard-wagner", "giuseppe-verdi",
    "antonio-vivaldi", "george-frideric-handel",
    "johannes-brahms", "claude-debussy",
    "frank-sinatra", "elvis-presley", "john-lennon", "paul-mccartney",
    "david-bowie", "madonna",
    "aretha-franklin", "stevie-wonder", "ray-charles",
    "bob-marley", "jimi-hendrix",
    "kurt-cobain", "tupac-shakur",
    "kanye-west",
    "mark-twain", "jane-austen", "charles-dickens", "fyodor-dostoevsky",
    "leo-tolstoy", "anton-chekhov",
    "vladimir-nabokov",
    "james-joyce", "virginia-woolf", "george-orwell",
    "oscar-wilde", "h-g-wells", "arthur-conan-doyle", "agatha-christie",
    "j-k-rowling", "stephen-king",
    "victor-hugo", "alexandre-dumas",
    "albert-camus", "jean-paul-sartre", "voltaire",
    "jean-jacques-rousseau",
    "thomas-mann", "franz-kafka",
    "gabriel-garcia-marquez", "jorge-luis-borges", "mario-vargas-llosa",
    "pablo-neruda",
    "haruki-murakami",
    "rabindranath-tagore", "salman-rushdie",
    "rumi",
    "edgar-allan-poe", "walt-whitman", "emily-dickinson",
    "ralph-waldo-emerson", "herman-melville",
    "f-scott-fitzgerald", "william-faulkner", "john-steinbeck",
    "toni-morrison", "maya-angelou",
    "lionel-messi", "cristiano-ronaldo", "diego-maradona", "zinedine-zidane",
    "thierry-henry", "david-beckham",
    "kylian-mbappe", "neymar",
    "lebron-james", "kobe-bryant", "kareem-abdul-jabbar", "magic-johnson",
    "larry-bird", "shaquille-oneal",
    "kevin-durant", "stephen-curry",
    "roger-federer", "rafael-nadal", "novak-djokovic",
    "tiger-woods",
    "usain-bolt",
    "michael-phelps",
    "mike-tyson",
    "tom-brady",
    "babe-ruth", "jackie-robinson",
    "ayrton-senna", "michael-schumacher", "lewis-hamilton",
    "larry-page", "sergey-brin", "sundar-pichai", "satya-nadella",
    "tim-cook", "jensen-huang", "sam-altman",
    "larry-ellison", "michael-dell",
    "walt-disney", "ray-kroc", "sam-walton",
    "john-d-rockefeller", "andrew-carnegie",
    "mother-teresa", "pope-john-paul-ii",
    "martin-luther", "thomas-aquinas",
    "henry-viii", "elizabeth-i",
    "queen-victoria",
    "charles-de-gaulle", "louis-xiv", "louis-xvi", "marie-antoinette",
    "frederick-the-great", "catherine-the-great", "peter-the-great",
    "ivan-the-terrible",
    "otto-von-bismarck",
    "steven-spielberg", "martin-scorsese",
    "stanley-kubrick", "alfred-hitchcock", "akira-kurosawa",
    "federico-fellini", "ingmar-bergman",
    "quentin-tarantino", "christopher-nolan", "ridley-scott", "james-cameron",
    "george-lucas", "tim-burton",
    "spike-lee",
    "bong-joon-ho", "park-chan-wook",
    "hayao-miyazaki",
    "marlon-brando", "al-pacino", "robert-de-niro", "jack-nicholson",
    "morgan-freeman", "denzel-washington", "tom-hanks", "leonardo-dicaprio",
    "brad-pitt", "george-clooney",
    "tom-cruise", "meryl-streep", "audrey-hepburn",
    "marilyn-monroe", "elizabeth-taylor",
    "humphrey-bogart", "clint-eastwood",
    "sean-connery",
    "anthony-hopkins",
    "angelina-jolie", "jennifer-lawrence", "scarlett-johansson",
    "natalie-portman", "nicole-kidman", "julia-roberts",
    "malala-yousafzai", "greta-thunberg", "rosa-parks", "malcolm-x",
    "frederick-douglass", "harriet-tubman",
    "susan-b-anthony",
    "gloria-steinem",
    "cesar-chavez",
    "desmond-tutu",
]


def has_image(path):
    try:
        with open(path, encoding="utf-8") as fh:
            content = fh.read(3000)
    except Exception:
        return None
    m = re.match(r"^---\r?\n(.*?)\r?\n---", content, re.DOTALL)
    if not m:
        return False
    fm = m.group(1)
    img = re.search(r"^image:\s*(.*)$", fm, re.MULTILINE)
    if not img:
        return False
    val = img.group(1).strip()
    if val in ('""', "''", ""):
        return False
    return True


def main():
    missing = []
    not_found = []
    for name in FAMOUS:
        path = os.path.join(ARTICLES, name + ".md")
        if not os.path.isfile(path):
            not_found.append(name)
            continue
        if not has_image(path):
            missing.append(name)
    print("MISSING:")
    for n in missing:
        print(n)
    print("\nNOT FOUND (no article):")
    for n in not_found:
        print(n)


if __name__ == "__main__":
    main()
