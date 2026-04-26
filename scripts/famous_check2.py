#!/usr/bin/env python3
"""Second batch of famous figures to check."""
import os
import re

ARTICLES = "content/articles"

FAMOUS = [
    # Korean culture/cinema
    "bong-joon-ho", "park-chan-wook", "kim-ki-duk", "lee-chang-dong",
    "im-kwon-taek", "hong-sang-soo", "kim-jee-woon", "ryoo-seung-wan",
    "lee-byung-hun", "song-kang-ho", "choi-min-sik", "lee-jung-jae",
    "ma-dong-seok", "kim-hye-soo", "jeon-ji-hyun", "ha-ji-won",
    "kim-tae-hee", "song-hye-kyo", "son-ye-jin", "park-bo-young",
    "shin-min-a", "park-shin-hye", "iu", "lee-ji-eun",
    "park-bo-gum", "lee-min-ho", "song-joong-ki", "gong-yoo",
    "hyun-bin", "lee-jung-jae", "lee-do-hyun", "park-seo-joon",

    # K-pop
    "bts", "rm-bts", "jin-bts", "suga", "j-hope", "jimin", "v-bts",
    "jungkook", "blackpink", "jisoo", "jennie", "rose", "lisa",
    "twice", "psy", "g-dragon", "taeyang", "iu-singer", "iu",
    "lim-young-woong", "lee-young-ji", "jay-park",
    "newjeans", "minji", "haerin", "danielle", "hanni", "hyein",
    "lesserafim",

    # Korean other
    "hong-myung-bo", "park-ji-sung", "son-heung-min", "kim-min-jae",
    "lee-kang-in", "ki-sung-yueng",
    "kim-yu-na", "yuna-kim", "cho-young-pil", "lee-mi-ja",

    # Japan
    "shinzo-abe-2", "yoshiro-mori", "junichiro-koizumi", "yasuhiro-nakasone",
    "akira-kurosawa", "yasujiro-ozu", "kenji-mizoguchi", "takeshi-kitano",
    "hayao-miyazaki", "isao-takahata", "satoshi-kon",
    "haruki-murakami", "yukio-mishima", "kenzaburo-oe",
    "takashi-murakami", "yayoi-kusama",
    "shohei-otani", "shohei-ohtani", "ichiro", "ichiro-suzuki",
    "hideki-matsui", "hideo-nomo", "kohei-uchimura",
    "hideki-tojo", "fumimaro-konoe",

    # China
    "deng-xiaoping", "hua-guofeng", "liu-shaoqi", "lin-biao",
    "jiang-qing", "zhu-de",
    "li-ka-shing", "li-keqiang", "hu-yaobang", "zhao-ziyang",
    "wang-jianzhou",
    "lu-xun", "ba-jin", "lao-she", "mo-yan",
    "ang-lee", "wong-kar-wai", "john-woo", "tsui-hark", "fruit-chan",
    "hou-hsiao-hsien", "edward-yang", "tsai-ming-liang",
    "fan-bingbing", "li-bingbing", "zhou-xun", "tang-wei",
    "chow-yun-fat", "tony-leung", "tony-leung-chiu-wai",
    "leslie-cheung", "anita-mui", "teresa-teng", "faye-wong",
    "jay-chou",
    "li-ning", "lang-ping",

    # Middle East / Iran
    "ali-khamenei", "hassan-rouhani", "ebrahim-raisi",
    "mahmoud-ahmadinejad", "mohammad-mossadegh",
    "mohammad-reza-pahlavi", "shah-of-iran",
    "ataturk", "mustafa-kemal-ataturk",
    "yasser-arafat", "mahmoud-abbas", "yitzhak-rabin", "shimon-peres",
    "ariel-sharon", "ehud-barak", "ehud-olmert",
    "menachem-begin", "yitzhak-shamir", "golda-meir", "david-ben-gurion",
    "king-hussein", "king-abdullah-ii",
    "saddam-hussein", "muammar-gaddafi", "bashar-al-assad",

    # Africa
    "wole-soyinka", "chinua-achebe", "ngugi-wa-thiong-o",
    "kofi-annan", "boutros-boutros-ghali",
    "thabo-mbeki", "f-w-de-klerk",

    # Latin America
    "gabriel-garcia-marquez", "jorge-luis-borges", "pablo-neruda",
    "isabel-allende", "mario-vargas-llosa", "octavio-paz",
    "frida-kahlo", "diego-rivera",
    "shakira", "ricky-martin", "selena", "selena-quintanilla",
    "jorge-mario-bergoglio",

    # India
    "amitabh-bachchan", "shah-rukh-khan", "salman-khan", "aamir-khan",
    "ranveer-singh", "deepika-padukone", "priyanka-chopra",
    "aishwarya-rai", "kareena-kapoor", "alia-bhatt",
    "sachin-tendulkar", "virat-kohli", "ms-dhoni", "kapil-dev",
    "sunil-gavaskar", "rohit-sharma",
    "abdul-kalam", "apj-abdul-kalam",
    "amartya-sen", "ravi-shankar",
    "satyajit-ray",

    # Modern entrepreneurs
    "richard-branson", "michael-bloomberg", "rupert-murdoch",
    "carlos-slim", "bernard-arnault", "francois-pinault",
    "paul-allen", "steve-wozniak", "tim-cook", "satya-nadella",
    "andy-jassy", "jensen-huang", "lisa-su",
    "jack-dorsey", "dustin-moskovitz", "peter-thiel",
    "marc-andreessen", "marc-benioff",

    # Philosophers
    "immanuel-kant", "georg-wilhelm-friedrich-hegel", "hegel",
    "arthur-schopenhauer", "friedrich-nietzsche", "soren-kierkegaard",
    "ludwig-wittgenstein", "martin-heidegger", "jean-paul-sartre",
    "michel-foucault", "jacques-derrida", "noam-chomsky",
    "john-locke", "thomas-hobbes", "david-hume", "george-berkeley",
    "john-stuart-mill", "jeremy-bentham", "adam-smith",
    "karl-marx", "friedrich-engels", "max-weber", "emile-durkheim",

    # Ancient/Medieval
    "homer", "hesiod", "herodotus", "thucydides",
    "virgil", "horace", "cicero", "ovid", "seneca",
    "augustus", "marcus-aurelius", "constantine-the-great",
    "justinian", "charlemagne",
    "saladin", "richard-the-lionheart",

    # Music modern
    "beyonce", "jay-z", "rihanna", "drake", "eminem",
    "lady-gaga", "ariana-grande", "taylor-swift", "ed-sheeran",
    "adele", "billie-eilish",
    "freddie-mercury", "queen-band", "the-beatles",
    "rolling-stones", "led-zeppelin", "pink-floyd",
    "michael-jackson", "prince",
    "celine-dion", "shania-twain", "mariah-carey",
    "snoop-dogg", "dr-dre", "ice-cube", "50-cent",

    # Tech and innovation
    "tim-berners-lee", "alan-turing", "ada-lovelace",
    "linus-torvalds", "richard-stallman", "vint-cerf",
    "marvin-minsky", "john-von-neumann", "claude-shannon",
    "grace-hopper", "donald-knuth", "ken-thompson", "dennis-ritchie",
    "bjarne-stroustrup", "guido-van-rossum",

    # Activists/Reformers
    "harvey-milk", "marsha-p-johnson", "audre-lorde",
    "angela-davis", "malcolm-x", "stokely-carmichael",
    "fred-hampton", "huey-newton", "bobby-seale",
    "ruth-bader-ginsburg", "thurgood-marshall",
    "ralph-nader", "noam-chomsky",
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
    for name in FAMOUS:
        path = os.path.join(ARTICLES, name + ".md")
        if not os.path.isfile(path):
            continue
        if not has_image(path):
            missing.append(name)
    for n in missing:
        print(n)
    print(f"\nTotal: {len(missing)}", file=__import__("sys").stderr)


if __name__ == "__main__":
    main()
