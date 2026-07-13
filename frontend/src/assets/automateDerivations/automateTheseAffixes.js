import fs from "fs";

const automateAffixes = [{
    "unformattedName": "penta",
    "affixName": "penta"
  },
  {
    "unformattedName": "ectomy",
    "affixName": "ectomy"
  },
  {
    "unformattedName": "oxalo",
    "affixName": "oxalo"
  },
  {
    "unformattedName": "octa",
    "affixName": "octa"
  },
  {
    "unformattedName": "centesis",
    "affixName": "centesis"
  },
  {
    "unformattedName": "tastic",
    "affixName": "tastic"
  },
  {
    "unformattedName": "mebi",
    "affixName": "mebi"
  },
  {
    "unformattedName": "kibi",
    "affixName": "kibi"
  },
  {
    "unformattedName": "spiro",
    "affixName": "spiro"
  },
  {
    "unformattedName": "cha",
    "affixName": "cha"
  },
  {
    "unformattedName": "bot",
    "affixName": "bot"
  },
  {
    "unformattedName": "socio",
    "affixName": "socio"
  },
  {
    "unformattedName": "astro",
    "affixName": "astro"
  },
  {
    "unformattedName": "duo",
    "affixName": "duo"
  },
  {
    "unformattedName": "gyro",
    "affixName": "gyro"
  },
  {
    "unformattedName": "iferous",
    "affixName": "iferous"
  },
  {
    "unformattedName": "morpho",
    "affixName": "morpho"
  },
  {
    "unformattedName": "icosa",
    "affixName": "icosa"
  },
  {
    "unformattedName": "nucleo",
    "affixName": "nucleo"
  },
  {
    "unformattedName": "eury",
    "affixName": "eury"
  },
  {
    "unformattedName": "onym",
    "affixName": "onym"
  },
  {
    "unformattedName": "deoxy",
    "affixName": "deoxy"
  },
  {
    "unformattedName": "lipo",
    "affixName": "lipo"
  },
  {
    "unformattedName": "wither",
    "affixName": "wither"
  },
  {
    "unformattedName": "bathy",
    "affixName": "bathy"
  },
  {
    "unformattedName": "supra",
    "affixName": "supra"
  },
  {
    "unformattedName": "endo",
    "affixName": "endo"
  },
  {
    "unformattedName": "adeno",
    "affixName": "adeno"
  },
  {
    "unformattedName": "iasis",
    "affixName": "iasis"
  },
  {
    "unformattedName": "back",
    "affixName": "back"
  },
  {
    "unformattedName": "nap",
    "affixName": "nap"
  },
  {
    "unformattedName": "deipno",
    "affixName": "deipno"
  },
  {
    "unformattedName": "quad",
    "affixName": "quad"
  },
  {
    "unformattedName": "ass",
    "affixName": "ass"
  },
  {
    "unformattedName": "vore",
    "affixName": "eaterOf"
  },
  {
    "unformattedName": "pneumo",
    "affixName": "pneumo"
  },
  {
    "unformattedName": "side",
    "affixName": "side"
  },
  {
    "unformattedName": "techno",
    "affixName": "techno"
  },
  {
    "unformattedName": "uro",
    "affixName": "uro"
  },
  {
    "unformattedName": "eroo",
    "affixName": "eroo"
  },
  {
    "unformattedName": "iform",
    "affixName": "iform"
  },
  {
    "unformattedName": "opistho",
    "affixName": "opistho"
  },
  {
    "unformattedName": "graph",
    "affixName": "graph"
  },
  {
    "unformattedName": "genesis",
    "affixName": "genesis"
  },
  {
    "unformattedName": "ecto",
    "affixName": "ecto"
  },
  {
    "unformattedName": "ento",
    "affixName": "ento"
  },
  {
    "unformattedName": "ka",
    "affixName": "ka"
  },
  {
    "unformattedName": "fest",
    "affixName": "fest"
  },
  {
    "unformattedName": "gameto",
    "affixName": "gameto"
  },
  {
    "unformattedName": "neur",
    "affixName": "neur"
  },
  {
    "unformattedName": "angio",
    "affixName": "angio"
  },
  {
    "unformattedName": "urgy",
    "affixName": "urgy"
  },
  {
    "unformattedName": "cardio",
    "affixName": "cardio"
  },
  {
    "unformattedName": "pene",
    "affixName": "pene"
  },
  {
    "unformattedName": "meth",
    "affixName": "meth"
  },
  {
    "unformattedName": "mania",
    "affixName": "mania"
  },
  {
    "unformattedName": "phyte",
    "affixName": "phyte"
  },
  {
    "unformattedName": "hepta",
    "affixName": "hepta"
  },
  {
    "unformattedName": "theo",
    "affixName": "theo"
  },
  {
    "unformattedName": "ferro",
    "affixName": "ferro"
  },
  {
    "unformattedName": "ville",
    "affixName": "ville"
  },
  {
    "unformattedName": "tebi",
    "affixName": "tebi"
  },
  {
    "unformattedName": "end",
    "affixName": "end"
  },
  {
    "unformattedName": "gastro",
    "affixName": "gastro"
  },
  {
    "unformattedName": "osteo",
    "affixName": "osteo"
  },
  {
    "unformattedName": "isation",
    "affixName": "isation"
  },
  {
    "unformattedName": "rix",
    "affixName": "rix"
  },
  {
    "unformattedName": "burger",
    "affixName": "burger"
  },
  {
    "unformattedName": "chrono",
    "affixName": "chrono"
  },
  {
    "unformattedName": "ribo",
    "affixName": "ribo"
  },
  {
    "unformattedName": "twi",
    "affixName": "twi"
  },
  {
    "unformattedName": "icity",
    "affixName": "icity"
  },
  {
    "unformattedName": "palaeo",
    "affixName": "palaeo"
  },
  {
    "unformattedName": "oon",
    "affixName": "oon"
  },
  {
    "unformattedName": "extro",
    "affixName": "extro"
  },
  {
    "unformattedName": "fast",
    "affixName": "fast"
  },
  {
    "unformattedName": "escent",
    "affixName": "escent"
  },
  {
    "unformattedName": "piezo",
    "affixName": "piezo"
  },
  {
    "unformattedName": "amphi",
    "affixName": "amphi"
  },
  {
    "unformattedName": "azo",
    "affixName": "azo"
  },
  {
    "unformattedName": "cosmo",
    "affixName": "cosmo"
  },
  {
    "unformattedName": "alumino",
    "affixName": "alumino"
  },
  {
    "unformattedName": "boro",
    "affixName": "boro"
  },
  {
    "unformattedName": "organo",
    "affixName": "organo"
  },
  {
    "unformattedName": "cyano",
    "affixName": "cyano"
  },
  {
    "unformattedName": "dendro",
    "affixName": "dendro"
  },
  {
    "unformattedName": "ferri",
    "affixName": "ferri"
  },
  {
    "unformattedName": "myo",
    "affixName": "myo"
  },
  {
    "unformattedName": "cryo",
    "affixName": "cryo"
  },
  {
    "unformattedName": "morph",
    "affixName": "morph"
  },
  {
    "unformattedName": "repro",
    "affixName": "repro"
  },
  {
    "unformattedName": "metallo",
    "affixName": "metallo"
  },
  {
    "unformattedName": "zygo",
    "affixName": "zygo"
  },
  {
    "unformattedName": "zoö",
    "affixName": "zoö"
  },
  {
    "unformattedName": "gen",
    "affixName": "gen"
  },
  {
    "unformattedName": "oma",
    "affixName": "oma"
  },
  {
    "unformattedName": "cysto",
    "affixName": "cysto"
  },
  {
    "unformattedName": "anthropo",
    "affixName": "anthropo"
  },
  {
    "unformattedName": "licious",
    "affixName": "licious"
  },
  {
    "unformattedName": "Finno",
    "affixName": "Finno"
  },
  {
    "unformattedName": "encephalo",
    "affixName": "encephalo"
  },
  {
    "unformattedName": "histo",
    "affixName": "histo"
  },
  {
    "unformattedName": "atrio",
    "affixName": "atrio"
  },
  {
    "unformattedName": "ventriculo",
    "affixName": "ventriculo"
  },
  {
    "unformattedName": "logo",
    "affixName": "logo"
  },
  {
    "unformattedName": "chemi",
    "affixName": "chemi"
  },
  {
    "unformattedName": "ated",
    "affixName": "ated"
  },
  {
    "unformattedName": "ergic",
    "affixName": "ergic"
  },
  {
    "unformattedName": "palæo",
    "affixName": "palæo"
  },
  {
    "unformattedName": "latry",
    "affixName": "latry"
  },
  {
    "unformattedName": "acious",
    "affixName": "acious"
  },
  {
    "unformattedName": "derma",
    "affixName": "derma"
  },
  {
    "unformattedName": "Afro",
    "affixName": "Afro"
  },
  {
    "unformattedName": "amelo",
    "affixName": "amelo"
  },
  {
    "unformattedName": "spectro",
    "affixName": "spectro"
  },
  {
    "unformattedName": "eka",
    "affixName": "eka"
  },
  {
    "unformattedName": "Syro",
    "affixName": "Syro"
  },
  {
    "unformattedName": "mytho",
    "affixName": "mytho"
  },
  {
    "unformattedName": "maniac",
    "affixName": "maniac"
  },
  {
    "unformattedName": "sperma",
    "affixName": "sperma"
  },
  {
    "unformattedName": "ismus",
    "affixName": "ismus"
  },
  {
    "unformattedName": "quin",
    "affixName": "quin"
  },
  {
    "unformattedName": "viginti",
    "affixName": "viginti"
  },
  {
    "unformattedName": "hyp",
    "affixName": "hyp"
  },
  {
    "unformattedName": "ovo",
    "affixName": "ovo"
  },
  {
    "unformattedName": "nor",
    "affixName": "nor"
  },
  {
    "unformattedName": "antho",
    "affixName": "antho"
  },
  {
    "unformattedName": "patho",
    "affixName": "patho"
  },
  {
    "unformattedName": "emia",
    "affixName": "emia"
  },
  {
    "unformattedName": "magnet",
    "affixName": "magnet"
  },
  {
    "unformattedName": "magneto",
    "affixName": "magneto"
  },
  {
    "unformattedName": "metric",
    "affixName": "metric"
  },
  {
    "unformattedName": "religio",
    "affixName": "religio"
  },
  {
    "unformattedName": "dar",
    "affixName": "dar"
  },
  {
    "unformattedName": "com",
    "affixName": "com"
  },
  {
    "unformattedName": "quasi",
    "affixName": "quasi"
  },
  {
    "unformattedName": "astic",
    "affixName": "astic"
  },
  {
    "unformattedName": "sion",
    "affixName": "sion"
  },
  {
    "unformattedName": "dolicho",
    "affixName": "dolicho"
  },
  {
    "unformattedName": "cyte",
    "affixName": "cyte"
  },
  {
    "unformattedName": "xanth",
    "affixName": "xanth"
  },
  {
    "unformattedName": "leuco",
    "affixName": "leuco"
  },
  {
    "unformattedName": "setter",
    "affixName": "setter"
  },
  {
    "unformattedName": "muco",
    "affixName": "muco"
  },
  {
    "unformattedName": "phil",
    "affixName": "phil"
  },
  {
    "unformattedName": "adic",
    "affixName": "adic"
  },
  {
    "unformattedName": "turbo",
    "affixName": "turbo"
  },
  {
    "unformattedName": "visco",
    "affixName": "visco"
  },
  {
    "unformattedName": "long",
    "affixName": "long"
  },
  {
    "unformattedName": "ipsi",
    "affixName": "ipsi"
  },
  {
    "unformattedName": "stat",
    "affixName": "stat"
  },
  {
    "unformattedName": "arachno",
    "affixName": "arachno"
  },
  {
    "unformattedName": "ator",
    "affixName": "ator"
  },
  {
    "unformattedName": "nomino",
    "affixName": "nomino"
  },
  {
    "unformattedName": "verse",
    "affixName": "verse"
  },
  {
    "unformattedName": "race",
    "affixName": "race"
  },
  {
    "unformattedName": "plasty",
    "affixName": "plasty"
  },
  {
    "unformattedName": "gono",
    "affixName": "gono"
  },
  {
    "unformattedName": "dermato",
    "affixName": "dermato"
  },
  {
    "unformattedName": "xylo",
    "affixName": "xylo"
  },
  {
    "unformattedName": "xiphidio",
    "affixName": "xiphidio"
  },
  {
    "unformattedName": "quarter",
    "affixName": "quarter"
  },
  {
    "unformattedName": "germano",
    "affixName": "germano"
  },
  {
    "unformattedName": "phyllo",
    "affixName": "phyllo"
  },
  {
    "unformattedName": "enantio",
    "affixName": "enantio"
  },
  {
    "unformattedName": "Greco",
    "affixName": "Greco"
  },
  {
    "unformattedName": "strato",
    "affixName": "strato"
  },
  {
    "unformattedName": "ichno",
    "affixName": "ichno"
  },
  {
    "unformattedName": "illion",
    "affixName": "illion"
  },
  {
    "unformattedName": "meio",
    "affixName": "meio"
  },
  {
    "unformattedName": "aqua",
    "affixName": "aqua"
  },
  {
    "unformattedName": "xipho",
    "affixName": "xipho"
  },
  {
    "unformattedName": "porta",
    "affixName": "porta"
  },
  {
    "unformattedName": "steno",
    "affixName": "steno"
  },
  {
    "unformattedName": "aholic",
    "affixName": "aholic"
  },
  {
    "unformattedName": "Hiberno",
    "affixName": "Hiberno"
  },
  {
    "unformattedName": "hemo",
    "affixName": "hemo"
  },
  {
    "unformattedName": "silvo",
    "affixName": "silvo"
  },
  {
    "unformattedName": "ola",
    "affixName": "ola"
  },
  {
    "unformattedName": "parvo",
    "affixName": "parvo"
  },
  {
    "unformattedName": "phospho",
    "affixName": "phospho"
  },
  {
    "unformattedName": "sie",
    "affixName": "sie"
  },
  {
    "unformattedName": "benzo",
    "affixName": "benzo"
  },
  {
    "unformattedName": "hippo",
    "affixName": "hippo"
  },
  {
    "unformattedName": "lyso",
    "affixName": "lyso"
  },
  {
    "unformattedName": "cortico",
    "affixName": "cortico"
  },
  {
    "unformattedName": "anthra",
    "affixName": "anthra"
  },
  {
    "unformattedName": "pheno",
    "affixName": "pheno"
  },
  {
    "unformattedName": "butyro",
    "affixName": "butyro"
  },
  {
    "unformattedName": "plasto",
    "affixName": "plasto"
  },
  {
    "unformattedName": "gluco",
    "affixName": "gluco"
  },
  {
    "unformattedName": "octo",
    "affixName": "octo"
  },
  {
    "unformattedName": "cero",
    "affixName": "cero"
  },
  {
    "unformattedName": "astragalo",
    "affixName": "astragalo"
  },
  {
    "unformattedName": "auro",
    "affixName": "auro"
  },
  {
    "unformattedName": "athon",
    "affixName": "athon"
  },
  {
    "unformattedName": "amino",
    "affixName": "amino"
  },
  {
    "unformattedName": "heli",
    "affixName": "heli"
  },
  {
    "unformattedName": "landia",
    "affixName": "landia"
  },
  {
    "unformattedName": "ways",
    "affixName": "ways"
  },
  {
    "unformattedName": "taut",
    "affixName": "taut"
  },
  {
    "unformattedName": "hydroxy",
    "affixName": "hydroxy"
  },
  {
    "unformattedName": "phlebo",
    "affixName": "phlebo"
  },
  {
    "unformattedName": "chiro",
    "affixName": "chiro"
  },
  {
    "unformattedName": "flavo",
    "affixName": "flavo"
  },
  {
    "unformattedName": "keto",
    "affixName": "keto"
  },
  {
    "unformattedName": "ethno",
    "affixName": "ethno"
  },
  {
    "unformattedName": "myco",
    "affixName": "myco"
  },
  {
    "unformattedName": "oholic",
    "affixName": "oholic"
  },
  {
    "unformattedName": "lysis",
    "affixName": "lysis"
  },
  {
    "unformattedName": "arium",
    "affixName": "arium"
  },
  {
    "unformattedName": "carbo",
    "affixName": "carbo"
  },
  {
    "unformattedName": "oxo",
    "affixName": "oxo"
  },
  {
    "unformattedName": "sulfo",
    "affixName": "sulfo"
  },
  {
    "unformattedName": "bis",
    "affixName": "bis"
  },
  {
    "unformattedName": "bromo",
    "affixName": "bromo"
  },
  {
    "unformattedName": "scape",
    "affixName": "scape"
  },
  {
    "unformattedName": "dehydro",
    "affixName": "dehydro"
  },
  {
    "unformattedName": "ista",
    "affixName": "ista"
  },
  {
    "unformattedName": "fluoro",
    "affixName": "fluoro"
  },
  {
    "unformattedName": "onco",
    "affixName": "onco"
  },
  {
    "unformattedName": "glycosamino",
    "affixName": "glycosamino"
  },
  {
    "unformattedName": "antero",
    "affixName": "antero"
  },
  {
    "unformattedName": "escence",
    "affixName": "escence"
  },
  {
    "unformattedName": "aemia",
    "affixName": "aemia"
  },
  {
    "unformattedName": "seleno",
    "affixName": "seleno"
  },
  {
    "unformattedName": "hepato",
    "affixName": "hepato"
  },
  {
    "unformattedName": "tricho",
    "affixName": "tricho"
  },
  {
    "unformattedName": "ino",
    "affixName": "ino"
  },
  {
    "unformattedName": "sulpho",
    "affixName": "sulpho"
  },
  {
    "unformattedName": "brachy",
    "affixName": "brachy"
  },
  {
    "unformattedName": "ers",
    "affixName": "ers"
  },
  {
    "unformattedName": "perma",
    "affixName": "perma"
  },
  {
    "unformattedName": "polis",
    "affixName": "polis"
  },
  {
    "unformattedName": "chloro",
    "affixName": "chloro"
  },
  {
    "unformattedName": "halo",
    "affixName": "halo"
  },
  {
    "unformattedName": "kerato",
    "affixName": "kerato"
  },
  {
    "unformattedName": "phono",
    "affixName": "phono"
  },
  {
    "unformattedName": "hex",
    "affixName": "hex"
  },
  {
    "unformattedName": "oct",
    "affixName": "oct"
  },
  {
    "unformattedName": "hystero",
    "affixName": "hystero"
  },
  {
    "unformattedName": "ific",
    "affixName": "ific"
  },
  {
    "unformattedName": "pluri",
    "affixName": "pluri"
  },
  {
    "unformattedName": "iatro",
    "affixName": "iatro"
  },
  {
    "unformattedName": "floxacin",
    "affixName": "floxacin"
  },
  {
    "unformattedName": "blepharo",
    "affixName": "blepharo"
  },
  {
    "unformattedName": "bary",
    "affixName": "bary"
  },
  {
    "unformattedName": "actino",
    "affixName": "actino"
  },
  {
    "unformattedName": "psychro",
    "affixName": "psychro"
  },
  {
    "unformattedName": "psychoto",
    "affixName": "psychoto"
  },
  {
    "unformattedName": "brevi",
    "affixName": "brevi"
  },
  {
    "unformattedName": "burg",
    "affixName": "burg"
  },
  {
    "unformattedName": "esce",
    "affixName": "esce"
  },
  {
    "unformattedName": "ptilo",
    "affixName": "ptilo"
  },
  {
    "unformattedName": "he",
    "affixName": "he"
  },
  {
    "unformattedName": "gerous",
    "affixName": "gerous"
  },
  {
    "unformattedName": "tic",
    "affixName": "tic"
  },
  {
    "unformattedName": "hemato",
    "affixName": "hemato"
  },
  {
    "unformattedName": "lev",
    "affixName": "lev"
  },
  {
    "unformattedName": "plano",
    "affixName": "plano"
  },
  {
    "unformattedName": "morphic",
    "affixName": "morphic"
  },
  {
    "unformattedName": "melo",
    "affixName": "melo"
  },
  {
    "unformattedName": "dactylo",
    "affixName": "dactylo"
  },
  {
    "unformattedName": "x",
    "affixName": "x"
  },
  {
    "unformattedName": "musculo",
    "affixName": "musculo"
  },
  {
    "unformattedName": "normo",
    "affixName": "normo"
  },
  {
    "unformattedName": "cranio",
    "affixName": "cranio"
  },
  {
    "unformattedName": "cephalo",
    "affixName": "cephalo"
  },
  {
    "unformattedName": "form",
    "affixName": "form"
  },
  {
    "unformattedName": "centric",
    "affixName": "centric"
  },
  {
    "unformattedName": "rhizo",
    "affixName": "rhizo"
  },
  {
    "unformattedName": "aldo",
    "affixName": "aldo"
  },
  {
    "unformattedName": "ologist",
    "affixName": "ologist"
  },
  {
    "unformattedName": "gate",
    "affixName": "gate"
  },
  {
    "unformattedName": "servo",
    "affixName": "servo"
  },
  {
    "unformattedName": "preneur",
    "affixName": "preneur"
  },
  {
    "unformattedName": "chion",
    "affixName": "chion"
  },
  {
    "unformattedName": "salpingo",
    "affixName": "salpingo"
  },
  {
    "unformattedName": "sono",
    "affixName": "sono"
  },
  {
    "unformattedName": "opto",
    "affixName": "opto"
  },
  {
    "unformattedName": "broncho",
    "affixName": "broncho"
  },
  {
    "unformattedName": "osity",
    "affixName": "osity"
  },
  {
    "unformattedName": "opia",
    "affixName": "opia"
  },
  {
    "unformattedName": "necro",
    "affixName": "necro"
  },
  {
    "unformattedName": "vorous",
    "affixName": "vorous"
  },
  {
    "unformattedName": "rheo",
    "affixName": "rheo"
  },
  {
    "unformattedName": "alpha",
    "affixName": "alpha"
  },
  {
    "unformattedName": "oro",
    "affixName": "oro"
  },
  {
    "unformattedName": "omics",
    "affixName": "omics"
  },
  {
    "unformattedName": "izer",
    "affixName": "izer"
  },
  {
    "unformattedName": "nether",
    "affixName": "nether"
  },
  {
    "unformattedName": "ergo",
    "affixName": "ergo"
  },
  {
    "unformattedName": "chole",
    "affixName": "chole"
  },
  {
    "unformattedName": "sito",
    "affixName": "sito"
  },
  {
    "unformattedName": "telo",
    "affixName": "telo"
  },
  {
    "unformattedName": "oleo",
    "affixName": "oleo"
  },
  {
    "unformattedName": "thyro",
    "affixName": "thyro"
  },
  {
    "unformattedName": "gamo",
    "affixName": "gamo"
  },
  {
    "unformattedName": "dorsi",
    "affixName": "dorsi"
  },
  {
    "unformattedName": "genous",
    "affixName": "genous"
  },
  {
    "unformattedName": "cidal",
    "affixName": "cidal"
  },
  {
    "unformattedName": "Fitz",
    "affixName": "Fitz"
  },
  {
    "unformattedName": "U",
    "affixName": "U"
  },
  {
    "unformattedName": "cerebro",
    "affixName": "cerebro"
  },
  {
    "unformattedName": "myelo",
    "affixName": "myelo"
  },
  {
    "unformattedName": "pharmaco",
    "affixName": "pharmaco"
  },
  {
    "unformattedName": "hylo",
    "affixName": "hylo"
  },
  {
    "unformattedName": "robo",
    "affixName": "robo"
  },
  {
    "unformattedName": "sacro",
    "affixName": "sacro"
  },
  {
    "unformattedName": "ilio",
    "affixName": "ilio"
  },
  {
    "unformattedName": "retino",
    "affixName": "retino"
  },
  {
    "unformattedName": "entero",
    "affixName": "entero"
  },
  {
    "unformattedName": "gravito",
    "affixName": "gravito"
  },
  {
    "unformattedName": "Ibero",
    "affixName": "Ibero"
  },
  {
    "unformattedName": "haem",
    "affixName": "haem"
  },
  {
    "unformattedName": "naso",
    "affixName": "naso"
  },
  {
    "unformattedName": "otomy",
    "affixName": "otomy"
  },
  {
    "unformattedName": "etio",
    "affixName": "etio"
  },
  {
    "unformattedName": "gyno",
    "affixName": "gyno"
  },
  {
    "unformattedName": "ridden",
    "affixName": "ridden"
  },
  {
    "unformattedName": "parous",
    "affixName": "parous"
  },
  {
    "unformattedName": "adreno",
    "affixName": "adreno"
  },
  {
    "unformattedName": "vibro",
    "affixName": "vibro"
  },
  {
    "unformattedName": "crat",
    "affixName": "crat"
  },
  {
    "unformattedName": "adipo",
    "affixName": "adipo"
  },
  {
    "unformattedName": "even",
    "affixName": "even"
  },
  {
    "unformattedName": "Arcado",
    "affixName": "Arcado"
  },
  {
    "unformattedName": "nephro",
    "affixName": "nephro"
  },
  {
    "unformattedName": "Judeo",
    "affixName": "Judeo"
  },
  {
    "unformattedName": "'d",
    "affixName": "'d"
  },
  {
    "unformattedName": "anarcho",
    "affixName": "anarcho"
  },
  {
    "unformattedName": "bacterio",
    "affixName": "bacterio"
  },
  {
    "unformattedName": "acousto",
    "affixName": "acousto"
  },
  {
    "unformattedName": "onium",
    "affixName": "onium"
  },
  {
    "unformattedName": "benz",
    "affixName": "benz"
  },
  {
    "unformattedName": "Sino",
    "affixName": "Sino"
  },
  {
    "unformattedName": "Franco",
    "affixName": "Franco"
  },
  {
    "unformattedName": "Russo",
    "affixName": "Russo"
  },
  {
    "unformattedName": "Luso",
    "affixName": "Luso"
  },
  {
    "unformattedName": "scapulo",
    "affixName": "scapulo"
  },
  {
    "unformattedName": "log",
    "affixName": "log"
  },
  {
    "unformattedName": "therm",
    "affixName": "therm"
  },
  {
    "unformattedName": "caine",
    "affixName": "caine"
  },
  {
    "unformattedName": "tomy",
    "affixName": "tomy"
  },
  {
    "unformattedName": "semio",
    "affixName": "semio"
  },
  {
    "unformattedName": "arseno",
    "affixName": "arseno"
  },
  {
    "unformattedName": "hapto",
    "affixName": "hapto"
  },
  {
    "unformattedName": "dodeca",
    "affixName": "dodeca"
  },
  {
    "unformattedName": "panto",
    "affixName": "panto"
  },
  {
    "unformattedName": "sero",
    "affixName": "sero"
  },
  {
    "unformattedName": "nonadeca",
    "affixName": "nonadeca"
  },
  {
    "unformattedName": "ocracy",
    "affixName": "ocracy"
  },
  {
    "unformattedName": "phallo",
    "affixName": "phallo"
  },
  {
    "unformattedName": "ambi",
    "affixName": "ambi"
  },
  {
    "unformattedName": "wash",
    "affixName": "wash"
  },
  {
    "unformattedName": "cupro",
    "affixName": "cupro"
  },
  {
    "unformattedName": "mangano",
    "affixName": "mangano"
  },
  {
    "unformattedName": "terato",
    "affixName": "terato"
  },
  {
    "unformattedName": "pleuro",
    "affixName": "pleuro"
  },
  {
    "unformattedName": "tracheo",
    "affixName": "tracheo"
  },
  {
    "unformattedName": "andro",
    "affixName": "andro"
  },
  {
    "unformattedName": "magnesio",
    "affixName": "magnesio"
  },
  {
    "unformattedName": "mero",
    "affixName": "mero"
  },
  {
    "unformattedName": "rhino",
    "affixName": "rhino"
  },
  {
    "unformattedName": "haemato",
    "affixName": "haemato"
  },
  {
    "unformattedName": "insta",
    "affixName": "insta"
  },
  {
    "unformattedName": "cholecysto",
    "affixName": "cholecysto"
  },
  {
    "unformattedName": "lexico",
    "affixName": "lexico"
  },
  {
    "unformattedName": "desoxy",
    "affixName": "desoxy"
  },
  {
    "unformattedName": "toxico",
    "affixName": "toxico"
  },
  {
    "unformattedName": "Edward",
    "affixName": "Edward"
  },
  {
    "unformattedName": "bin",
    "affixName": "bin"
  },
  {
    "unformattedName": "homeo",
    "affixName": "homeo"
  },
  {
    "unformattedName": "telluro",
    "affixName": "telluro"
  },
  {
    "unformattedName": "haplo",
    "affixName": "haplo"
  },
  {
    "unformattedName": "plani",
    "affixName": "plani"
  },
  {
    "unformattedName": "pedo",
    "affixName": "pedo"
  },
  {
    "unformattedName": "paedo",
    "affixName": "paedo"
  },
  {
    "unformattedName": "biblio",
    "affixName": "biblio"
  },
  {
    "unformattedName": "blast",
    "affixName": "blast"
  },
  {
    "unformattedName": "emics",
    "affixName": "emics"
  },
  {
    "unformattedName": "regio",
    "affixName": "regio"
  },
  {
    "unformattedName": "pachy",
    "affixName": "pachy"
  },
  {
    "unformattedName": "phage",
    "affixName": "phage"
  },
  {
    "unformattedName": "mandibulo",
    "affixName": "mandibulo"
  },
  {
    "unformattedName": "amylo",
    "affixName": "amylo"
  },
  {
    "unformattedName": "viscero",
    "affixName": "viscero"
  },
  {
    "unformattedName": "amundo",
    "affixName": "amundo"
  },
  {
    "unformattedName": "silico",
    "affixName": "silico"
  },
  {
    "unformattedName": "platino",
    "affixName": "platino"
  },
  {
    "unformattedName": "oside",
    "affixName": "oside"
  },
  {
    "unformattedName": "ina",
    "affixName": "ina"
  },
  {
    "unformattedName": "La",
    "affixName": "La"
  },
  {
    "unformattedName": "archy",
    "affixName": "archy"
  },
  {
    "unformattedName": "fos",
    "affixName": "fos"
  },
  {
    "unformattedName": "navir",
    "affixName": "navir"
  },
  {
    "unformattedName": "poiesis",
    "affixName": "poiesis"
  },
  {
    "unformattedName": "ligno",
    "affixName": "ligno"
  },
  {
    "unformattedName": "Latino",
    "affixName": "Latino"
  },
  {
    "unformattedName": "topo",
    "affixName": "topo"
  },
  {
    "unformattedName": "osmo",
    "affixName": "osmo"
  },
  {
    "unformattedName": "chromo",
    "affixName": "chromo"
  },
  {
    "unformattedName": "methyl",
    "affixName": "methyl"
  },
  {
    "unformattedName": "holo",
    "affixName": "holo"
  },
  {
    "unformattedName": "core",
    "affixName": "core"
  },
  {
    "unformattedName": "notho",
    "affixName": "notho"
  },
  {
    "unformattedName": "thrombo",
    "affixName": "thrombo"
  },
  {
    "unformattedName": "vacci",
    "affixName": "vacci"
  },
  {
    "unformattedName": "mancy",
    "affixName": "mancy"
  },
  {
    "unformattedName": "leuko",
    "affixName": "leuko"
  },
  {
    "unformattedName": "seismo",
    "affixName": "seismo"
  },
  {
    "unformattedName": "spatio",
    "affixName": "spatio"
  },
  {
    "unformattedName": "sclero",
    "affixName": "sclero"
  },
  {
    "unformattedName": "sex",
    "affixName": "sex"
  },
  {
    "unformattedName": "synchro",
    "affixName": "synchro"
  },
  {
    "unformattedName": "aza",
    "affixName": "aza"
  },
  {
    "unformattedName": "trito",
    "affixName": "trito"
  },
  {
    "unformattedName": "nym",
    "affixName": "nym"
  },
  {
    "unformattedName": "olan",
    "affixName": "olan"
  },
  {
    "unformattedName": "chlor",
    "affixName": "chlor"
  },
  {
    "unformattedName": "sies",
    "affixName": "sies"
  },
  {
    "unformattedName": "allelo",
    "affixName": "allelo"
  },
  {
    "unformattedName": "oyl",
    "affixName": "oyl"
  },
  {
    "unformattedName": "pubo",
    "affixName": "pubo"
  },
  {
    "unformattedName": "kins",
    "affixName": "kins"
  },
  {
    "unformattedName": "ano",
    "affixName": "ano"
  },
  {
    "unformattedName": "somato",
    "affixName": "somato"
  },
  {
    "unformattedName": "Daco",
    "affixName": "Daco"
  },
  {
    "unformattedName": "hyalo",
    "affixName": "hyalo"
  },
  {
    "unformattedName": "colo",
    "affixName": "colo"
  },
  {
    "unformattedName": "Istro",
    "affixName": "Istro"
  },
  {
    "unformattedName": "Macedo",
    "affixName": "Macedo"
  },
  {
    "unformattedName": "baculo",
    "affixName": "baculo"
  },
  {
    "unformattedName": "deutero",
    "affixName": "deutero"
  },
  {
    "unformattedName": "Christo",
    "affixName": "Christo"
  },
  {
    "unformattedName": "blasto",
    "affixName": "blasto"
  },
  {
    "unformattedName": "orial",
    "affixName": "orial"
  },
  {
    "unformattedName": "tribo",
    "affixName": "tribo"
  },
  {
    "unformattedName": "mo",
    "affixName": "mo"
  },
  {
    "unformattedName": "chondro",
    "affixName": "chondro"
  },
  {
    "unformattedName": "nomics",
    "affixName": "nomics"
  },
  {
    "unformattedName": "hygro",
    "affixName": "hygro"
  },
  {
    "unformattedName": "formo",
    "affixName": "formo"
  },
  {
    "unformattedName": "cock",
    "affixName": "cock"
  },
  {
    "unformattedName": "war",
    "affixName": "war"
  },
  {
    "unformattedName": "feto",
    "affixName": "feto"
  },
  {
    "unformattedName": "cholangio",
    "affixName": "cholangio"
  },
  {
    "unformattedName": "rhabdo",
    "affixName": "rhabdo"
  },
  {
    "unformattedName": "leio",
    "affixName": "leio"
  },
  {
    "unformattedName": "gero",
    "affixName": "gero"
  },
  {
    "unformattedName": "lings",
    "affixName": "lings"
  },
  {
    "unformattedName": "tomo",
    "affixName": "tomo"
  },
  {
    "unformattedName": "dino",
    "affixName": "dino"
  },
  {
    "unformattedName": "trigemino",
    "affixName": "trigemino"
  },
  {
    "unformattedName": "teno",
    "affixName": "teno"
  },
  {
    "unformattedName": "stan",
    "affixName": "stan"
  },
  {
    "unformattedName": "aniso",
    "affixName": "aniso"
  },
  {
    "unformattedName": "preter",
    "affixName": "preter"
  },
  {
    "unformattedName": "lacto",
    "affixName": "lacto"
  },
  {
    "unformattedName": "lith",
    "affixName": "lith"
  },
  {
    "unformattedName": "postero",
    "affixName": "postero"
  },
  {
    "unformattedName": "phaeo",
    "affixName": "phaeo"
  },
  {
    "unformattedName": "idio",
    "affixName": "idio"
  },
  {
    "unformattedName": "tous",
    "affixName": "tous"
  },
  {
    "unformattedName": "wick",
    "affixName": "wick"
  },
  {
    "unformattedName": "colous",
    "affixName": "colous"
  },
  {
    "unformattedName": "glio",
    "affixName": "glio"
  },
  {
    "unformattedName": "procto",
    "affixName": "procto"
  },
  {
    "unformattedName": "thia",
    "affixName": "thia"
  },
  {
    "unformattedName": "juxta",
    "affixName": "juxta"
  },
  {
    "unformattedName": "basidio",
    "affixName": "basidio"
  },
  {
    "unformattedName": "pebi",
    "affixName": "pebi"
  },
  {
    "unformattedName": "myringo",
    "affixName": "myringo"
  },
  {
    "unformattedName": "lact",
    "affixName": "lact"
  },
  {
    "unformattedName": "schizo",
    "affixName": "schizo"
  },
  {
    "unformattedName": "choano",
    "affixName": "choano"
  },
  {
    "unformattedName": "sexuo",
    "affixName": "sexuo"
  },
  {
    "unformattedName": "grapher",
    "affixName": "grapher"
  },
  {
    "unformattedName": "chylo",
    "affixName": "chylo"
  },
  {
    "unformattedName": "excito",
    "affixName": "excito"
  },
  {
    "unformattedName": "axo",
    "affixName": "axo"
  },
  {
    "unformattedName": "galacto",
    "affixName": "galacto"
  },
  {
    "unformattedName": "gluta",
    "affixName": "gluta"
  },
  {
    "unformattedName": "iodo",
    "affixName": "iodo"
  },
  {
    "unformattedName": "proteo",
    "affixName": "proteo"
  },
  {
    "unformattedName": "scapho",
    "affixName": "scapho"
  },
  {
    "unformattedName": "nona",
    "affixName": "nona"
  },
  {
    "unformattedName": "undeca",
    "affixName": "undeca"
  },
  {
    "unformattedName": "sploitation",
    "affixName": "sploitation"
  },
  {
    "unformattedName": "ski",
    "affixName": "ski"
  },
  {
    "unformattedName": "orphine",
    "affixName": "orphine"
  },
  {
    "unformattedName": "eridine",
    "affixName": "eridine"
  },
  {
    "unformattedName": "ethidine",
    "affixName": "ethidine"
  },
  {
    "unformattedName": "azocine",
    "affixName": "azocine"
  },
  {
    "unformattedName": "fentanil",
    "affixName": "fentanil"
  },
  {
    "unformattedName": "peptido",
    "affixName": "peptido"
  },
  {
    "unformattedName": "methoxy",
    "affixName": "methoxy"
  },
  {
    "unformattedName": "glacio",
    "affixName": "glacio"
  },
  {
    "unformattedName": "gon",
    "affixName": "gon"
  },
  {
    "unformattedName": "lepto",
    "affixName": "lepto"
  },
  {
    "unformattedName": "spino",
    "affixName": "spino"
  },
  {
    "unformattedName": "oxa",
    "affixName": "oxa"
  },
  {
    "unformattedName": "sym",
    "affixName": "sym"
  },
  {
    "unformattedName": "aut",
    "affixName": "aut"
  },
  {
    "unformattedName": "epoxy",
    "affixName": "epoxy"
  },
  {
    "unformattedName": "idine",
    "affixName": "idine"
  },
  {
    "unformattedName": "thromb",
    "affixName": "thromb"
  },
  {
    "unformattedName": "anhydro",
    "affixName": "anhydro"
  },
  {
    "unformattedName": "erythro",
    "affixName": "erythro"
  },
  {
    "unformattedName": "fructo",
    "affixName": "fructo"
  },
  {
    "unformattedName": "fuco",
    "affixName": "fuco"
  },
  {
    "unformattedName": "hepto",
    "affixName": "hepto"
  },
  {
    "unformattedName": "manno",
    "affixName": "manno"
  },
  {
    "unformattedName": "hexo",
    "affixName": "hexo"
  },
  {
    "unformattedName": "pento",
    "affixName": "pento"
  },
  {
    "unformattedName": "rhamno",
    "affixName": "rhamno"
  },
  {
    "unformattedName": "malto",
    "affixName": "malto"
  },
  {
    "unformattedName": "clinico",
    "affixName": "clinico"
  },
  {
    "unformattedName": "glycero",
    "affixName": "glycero"
  },
  {
    "unformattedName": "carp",
    "affixName": "carp"
  },
  {
    "unformattedName": "glutar",
    "affixName": "glutar"
  },
  {
    "unformattedName": "batho",
    "affixName": "batho"
  },
  {
    "unformattedName": "hypso",
    "affixName": "hypso"
  },
  {
    "unformattedName": "centro",
    "affixName": "centro"
  },
  {
    "unformattedName": "baso",
    "affixName": "baso"
  },
  {
    "unformattedName": "pauci",
    "affixName": "pauci"
  },
  {
    "unformattedName": "tropic",
    "affixName": "tropic"
  },
  {
    "unformattedName": "ideo",
    "affixName": "ideo"
  },
  {
    "unformattedName": "laryngo",
    "affixName": "laryngo"
  },
  {
    "unformattedName": "my",
    "affixName": "my"
  },
  {
    "unformattedName": "pisci",
    "affixName": "pisci"
  },
  {
    "unformattedName": "sympatho",
    "affixName": "sympatho"
  },
  {
    "unformattedName": "copro",
    "affixName": "copro"
  },
  {
    "unformattedName": "melano",
    "affixName": "melano"
  },
  {
    "unformattedName": "through",
    "affixName": "through"
  },
  {
    "unformattedName": "calci",
    "affixName": "calci"
  },
  {
    "unformattedName": "litho",
    "affixName": "litho"
  },
  {
    "unformattedName": "gnatho",
    "affixName": "gnatho"
  },
  {
    "unformattedName": "vertebro",
    "affixName": "vertebro"
  },
  {
    "unformattedName": "fibro",
    "affixName": "fibro"
  },
  {
    "unformattedName": "elasto",
    "affixName": "elasto"
  },
  {
    "unformattedName": "Croato",
    "affixName": "Croato"
  },
  {
    "unformattedName": "Balto",
    "affixName": "Balto"
  },
  {
    "unformattedName": "kini",
    "affixName": "kini"
  },
  {
    "unformattedName": "mans",
    "affixName": "mans"
  },
  {
    "unformattedName": "orbito",
    "affixName": "orbito"
  },
  {
    "unformattedName": "brachio",
    "affixName": "brachio"
  },
  {
    "unformattedName": "atropo",
    "affixName": "atropo"
  },
  {
    "unformattedName": "arabine",
    "affixName": "arabine"
  },
  {
    "unformattedName": "mustine",
    "affixName": "mustine"
  },
  {
    "unformattedName": "mercapto",
    "affixName": "mercapto"
  },
  {
    "unformattedName": "mito",
    "affixName": "mito"
  },
  {
    "unformattedName": "rubicin",
    "affixName": "rubicin"
  },
  {
    "unformattedName": "trophy",
    "affixName": "trophy"
  },
  {
    "unformattedName": "archi",
    "affixName": "archi"
  },
  {
    "unformattedName": "parieto",
    "affixName": "parieto"
  },
  {
    "unformattedName": "of",
    "affixName": "of"
  },
  {
    "unformattedName": "deuter",
    "affixName": "deuter"
  },
  {
    "unformattedName": "pent",
    "affixName": "pent"
  },
  {
    "unformattedName": "hept",
    "affixName": "hept"
  },
  {
    "unformattedName": "unfeigned",
    "affixName": "unfeigned"
  },
  {
    "unformattedName": "sterno",
    "affixName": "sterno"
  },
  {
    "unformattedName": "twin",
    "affixName": "twin"
  },
  {
    "unformattedName": "nemat",
    "affixName": "nemat"
  },
  {
    "unformattedName": "spoligo",
    "affixName": "spoligo"
  },
  {
    "unformattedName": "materno",
    "affixName": "materno"
  },
  {
    "unformattedName": "tono",
    "affixName": "tono"
  },
  {
    "unformattedName": "phago",
    "affixName": "phago"
  },
  {
    "unformattedName": "tropism",
    "affixName": "tropism"
  },
  {
    "unformattedName": "mnemo",
    "affixName": "mnemo"
  },
  {
    "unformattedName": "brady",
    "affixName": "brady"
  },
  {
    "unformattedName": "magno",
    "affixName": "magno"
  },
  {
    "unformattedName": "az",
    "affixName": "az"
  },
  {
    "unformattedName": "chito",
    "affixName": "chito"
  },
  {
    "unformattedName": "viro",
    "affixName": "viro"
  },
  {
    "unformattedName": "visuo",
    "affixName": "visuo"
  },
  {
    "unformattedName": "platy",
    "affixName": "platy"
  },
  {
    "unformattedName": "reticulo",
    "affixName": "reticulo"
  },
  {
    "unformattedName": "bie",
    "affixName": "bie"
  },
  {
    "unformattedName": "myxo",
    "affixName": "myxo"
  },
  {
    "unformattedName": "culturo",
    "affixName": "culturo"
  },
  {
    "unformattedName": "stauro",
    "affixName": "stauro"
  },
  {
    "unformattedName": "titano",
    "affixName": "titano"
  },
  {
    "unformattedName": "iana",
    "affixName": "iana"
  },
  {
    "unformattedName": "yobi",
    "affixName": "yobi"
  },
  {
    "unformattedName": "zebi",
    "affixName": "zebi"
  },
  {
    "unformattedName": "wave",
    "affixName": "wave"
  },
  {
    "unformattedName": "actuo",
    "affixName": "actuo"
  },
  {
    "unformattedName": "zinco",
    "affixName": "zinco"
  },
  {
    "unformattedName": "digi",
    "affixName": "digi"
  },
  {
    "unformattedName": "acaro",
    "affixName": "acaro"
  },
  {
    "unformattedName": "sarco",
    "affixName": "sarco"
  },
  {
    "unformattedName": "azido",
    "affixName": "azido"
  },
  {
    "unformattedName": "teleo",
    "affixName": "teleo"
  },
  {
    "unformattedName": "recto",
    "affixName": "recto"
  },
  {
    "unformattedName": "angusti",
    "affixName": "angusti"
  },
  {
    "unformattedName": "hipp",
    "affixName": "hipp"
  },
  {
    "unformattedName": "onic",
    "affixName": "onic"
  },
  {
    "unformattedName": "quadrato",
    "affixName": "quadrato"
  },
  {
    "unformattedName": "cheilo",
    "affixName": "cheilo"
  },
  {
    "unformattedName": "meister",
    "affixName": "meister"
  },
  {
    "unformattedName": "anth",
    "affixName": "anth"
  },
  {
    "unformattedName": "Uto",
    "affixName": "Uto"
  },
  {
    "unformattedName": "ji",
    "affixName": "ji"
  },
  {
    "unformattedName": "chorio",
    "affixName": "chorio"
  },
  {
    "unformattedName": "sphero",
    "affixName": "sphero"
  },
  {
    "unformattedName": "picro",
    "affixName": "picro"
  },
  {
    "unformattedName": "supero",
    "affixName": "supero"
  },
  {
    "unformattedName": "ischio",
    "affixName": "ischio"
  },
  {
    "unformattedName": "dorso",
    "affixName": "dorso"
  },
  {
    "unformattedName": "mela",
    "affixName": "mela"
  },
  {
    "unformattedName": "cavo",
    "affixName": "cavo"
  },
  {
    "unformattedName": "lyze",
    "affixName": "lyze"
  },
  {
    "unformattedName": "gravi",
    "affixName": "gravi"
  },
  {
    "unformattedName": "hadro",
    "affixName": "hadro"
  },
  {
    "unformattedName": "lumbo",
    "affixName": "lumbo"
  },
  {
    "unformattedName": "deaza",
    "affixName": "deaza"
  },
  {
    "unformattedName": "sino",
    "affixName": "sino"
  },
  {
    "unformattedName": "tauto",
    "affixName": "tauto"
  },
  {
    "unformattedName": "asco",
    "affixName": "asco"
  },
  {
    "unformattedName": "cine",
    "affixName": "cine"
  },
  {
    "unformattedName": "eroto",
    "affixName": "eroto"
  },
  {
    "unformattedName": "phosphoro",
    "affixName": "phosphoro"
  },
  {
    "unformattedName": "palato",
    "affixName": "palato"
  },
  {
    "unformattedName": "calcio",
    "affixName": "calcio"
  },
  {
    "unformattedName": "z",
    "affixName": "z"
  },
  {
    "unformattedName": "sidero",
    "affixName": "sidero"
  },
  {
    "unformattedName": "quinque",
    "affixName": "quinque"
  },
  {
    "unformattedName": "front",
    "affixName": "front"
  },
  {
    "unformattedName": "ptero",
    "affixName": "ptero"
  },
  {
    "unformattedName": "arte",
    "affixName": "arte"
  },
  {
    "unformattedName": "typo",
    "affixName": "typo"
  },
  {
    "unformattedName": "utero",
    "affixName": "utero"
  },
  {
    "unformattedName": "grapho",
    "affixName": "grapho"
  },
  {
    "unformattedName": "genin",
    "affixName": "genin"
  },
  {
    "unformattedName": "ventri",
    "affixName": "ventri"
  },
  {
    "unformattedName": "orium",
    "affixName": "orium"
  },
  {
    "unformattedName": "basi",
    "affixName": "basi"
  },
  {
    "unformattedName": "tachy",
    "affixName": "tachy"
  },
  {
    "unformattedName": "qu",
    "affixName": "qu"
  },
  {
    "unformattedName": "bronchio",
    "affixName": "bronchio"
  },
  {
    "unformattedName": "caudo",
    "affixName": "caudo"
  },
  {
    "unformattedName": "maxillo",
    "affixName": "maxillo"
  },
  {
    "unformattedName": "ified",
    "affixName": "ified"
  },
  {
    "unformattedName": "hedron",
    "affixName": "hedron"
  },
  {
    "unformattedName": "klepto",
    "affixName": "klepto"
  },
  {
    "unformattedName": "entomo",
    "affixName": "entomo"
  },
  {
    "unformattedName": "ethmo",
    "affixName": "ethmo"
  },
  {
    "unformattedName": "glosso",
    "affixName": "glosso"
  },
  {
    "unformattedName": "acanth",
    "affixName": "acanth"
  },
  {
    "unformattedName": "mate",
    "affixName": "mate"
  },
  {
    "unformattedName": "ophthalmo",
    "affixName": "ophthalmo"
  },
  {
    "unformattedName": "naphtho",
    "affixName": "naphtho"
  },
  {
    "unformattedName": "nido",
    "affixName": "nido"
  },
  {
    "unformattedName": "palyno",
    "affixName": "palyno"
  },
  {
    "unformattedName": "fronto",
    "affixName": "fronto"
  },
  {
    "unformattedName": "thon",
    "affixName": "thon"
  },
  {
    "unformattedName": "choledocho",
    "affixName": "choledocho"
  },
  {
    "unformattedName": "buterol",
    "affixName": "buterol"
  },
  {
    "unformattedName": "water",
    "affixName": "water"
  },
  {
    "unformattedName": "imibe",
    "affixName": "imibe"
  },
  {
    "unformattedName": "vastatin",
    "affixName": "vastatin"
  },
  {
    "unformattedName": "coxib",
    "affixName": "coxib"
  },
  {
    "unformattedName": "ur",
    "affixName": "ur"
  },
  {
    "unformattedName": "thanato",
    "affixName": "thanato"
  },
  {
    "unformattedName": "bucco",
    "affixName": "bucco"
  },
  {
    "unformattedName": "galvano",
    "affixName": "galvano"
  },
  {
    "unformattedName": "infero",
    "affixName": "infero"
  },
  {
    "unformattedName": "Malayo",
    "affixName": "Malayo"
  },
  {
    "unformattedName": "proximo",
    "affixName": "proximo"
  },
  {
    "unformattedName": "baryto",
    "affixName": "baryto"
  },
  {
    "unformattedName": "fluor",
    "affixName": "fluor"
  },
  {
    "unformattedName": "ized",
    "affixName": "ized"
  },
  {
    "unformattedName": "poro",
    "affixName": "poro"
  },
  {
    "unformattedName": "bactam",
    "affixName": "bactam"
  },
  {
    "unformattedName": "sialo",
    "affixName": "sialo"
  },
  {
    "unformattedName": "lite",
    "affixName": "lite"
  },
  {
    "unformattedName": "philic",
    "affixName": "philic"
  },
  {
    "unformattedName": "bamate",
    "affixName": "bamate"
  },
  {
    "unformattedName": "crete",
    "affixName": "crete"
  },
  {
    "unformattedName": "thalamo",
    "affixName": "thalamo"
  },
  {
    "unformattedName": "scoto",
    "affixName": "scoto"
  },
  {
    "unformattedName": "ventro",
    "affixName": "ventro"
  },
  {
    "unformattedName": "men",
    "affixName": "men"
  },
  {
    "unformattedName": "vesico",
    "affixName": "vesico"
  },
  {
    "unformattedName": "delto",
    "affixName": "delto"
  },
  {
    "unformattedName": "exbi",
    "affixName": "exbi"
  },
  {
    "unformattedName": "rostro",
    "affixName": "rostro"
  },
  {
    "unformattedName": "tert",
    "affixName": "tert"
  },
  {
    "unformattedName": "info",
    "affixName": "info"
  },
  {
    "unformattedName": "mesio",
    "affixName": "mesio"
  },
  {
    "unformattedName": "ciclovir",
    "affixName": "ciclovir"
  },
  {
    "unformattedName": "traline",
    "affixName": "traline"
  },
  {
    "unformattedName": "oto",
    "affixName": "oto"
  },
  {
    "unformattedName": "sulfa",
    "affixName": "sulfa"
  },
  {
    "unformattedName": "masso",
    "affixName": "masso"
  },
  {
    "unformattedName": "masto",
    "affixName": "masto"
  },
  {
    "unformattedName": "reno",
    "affixName": "reno"
  },
  {
    "unformattedName": "ileo",
    "affixName": "ileo"
  },
  {
    "unformattedName": "dilol",
    "affixName": "dilol"
  },
  {
    "unformattedName": "infundibulo",
    "affixName": "infundibulo"
  },
  {
    "unformattedName": "cillin",
    "affixName": "cillin"
  },
  {
    "unformattedName": "oesophago",
    "affixName": "oesophago"
  },
  {
    "unformattedName": "thoraco",
    "affixName": "thoraco"
  },
  {
    "unformattedName": "stylo",
    "affixName": "stylo"
  },
  {
    "unformattedName": "papillo",
    "affixName": "papillo"
  },
  {
    "unformattedName": "spleno",
    "affixName": "spleno"
  },
  {
    "unformattedName": "geddon",
    "affixName": "geddon"
  },
  {
    "unformattedName": "meco",
    "affixName": "meco"
  },
  {
    "unformattedName": "cen",
    "affixName": "cen"
  },
  {
    "unformattedName": "tubulo",
    "affixName": "tubulo"
  },
  {
    "unformattedName": "xantho",
    "affixName": "xantho"
  },
  {
    "unformattedName": "cholyl",
    "affixName": "cholyl"
  },
  {
    "unformattedName": "ode",
    "affixName": "ode"
  },
  {
    "unformattedName": "sky",
    "affixName": "sky"
  },
  {
    "unformattedName": "fu",
    "affixName": "fu"
  },
  {
    "unformattedName": "medico",
    "affixName": "medico"
  },
  {
    "unformattedName": "aesthesio",
    "affixName": "aesthesio"
  },
  {
    "unformattedName": "assed",
    "affixName": "assed"
  },
  {
    "unformattedName": "enviro",
    "affixName": "enviro"
  },
  {
    "unformattedName": "kerauno",
    "affixName": "kerauno"
  },
  {
    "unformattedName": "uveo",
    "affixName": "uveo"
  },
  {
    "unformattedName": "dex",
    "affixName": "dex"
  },
  {
    "unformattedName": "vestibulo",
    "affixName": "vestibulo"
  },
  {
    "unformattedName": "peridol",
    "affixName": "peridol"
  },
  {
    "unformattedName": "asparto",
    "affixName": "asparto"
  },
  {
    "unformattedName": "pilo",
    "affixName": "pilo"
  },
  {
    "unformattedName": "ot",
    "affixName": "ot"
  },
  {
    "unformattedName": "mab",
    "affixName": "mab"
  },
  {
    "unformattedName": "conazole",
    "affixName": "conazole"
  },
  {
    "unformattedName": "onycho",
    "affixName": "onycho"
  },
  {
    "unformattedName": "flurane",
    "affixName": "flurane"
  },
  {
    "unformattedName": "rinone",
    "affixName": "rinone"
  },
  {
    "unformattedName": "phragmo",
    "affixName": "phragmo"
  },
  {
    "unformattedName": "ven",
    "affixName": "ven"
  },
  {
    "unformattedName": "perineo",
    "affixName": "perineo"
  },
  {
    "unformattedName": "uric",
    "affixName": "uric"
  },
  {
    "unformattedName": "cin",
    "affixName": "cin"
  },
  {
    "unformattedName": "staphylo",
    "affixName": "staphylo"
  },
  {
    "unformattedName": "carcino",
    "affixName": "carcino"
  },
  {
    "unformattedName": "propy",
    "affixName": "propy"
  },
  {
    "unformattedName": "tizolam",
    "affixName": "tizolam"
  },
  {
    "unformattedName": "rolimus",
    "affixName": "rolimus"
  },
  {
    "unformattedName": "dichloro",
    "affixName": "dichloro"
  },
  {
    "unformattedName": "strepto",
    "affixName": "strepto"
  },
  {
    "unformattedName": "cervico",
    "affixName": "cervico"
  },
  {
    "unformattedName": "amido",
    "affixName": "amido"
  },
  {
    "unformattedName": "tubero",
    "affixName": "tubero"
  },
  {
    "unformattedName": "giline",
    "affixName": "giline"
  },
  {
    "unformattedName": "quine",
    "affixName": "quine"
  },
  {
    "unformattedName": "formin",
    "affixName": "formin"
  },
  {
    "unformattedName": "carpo",
    "affixName": "carpo"
  },
  {
    "unformattedName": "sol",
    "affixName": "sol"
  },
  {
    "unformattedName": "sal",
    "affixName": "sal"
  },
  {
    "unformattedName": "ec",
    "affixName": "ec"
  },
  {
    "unformattedName": "tidine",
    "affixName": "tidine"
  },
  {
    "unformattedName": "irido",
    "affixName": "irido"
  },
  {
    "unformattedName": "pterygo",
    "affixName": "pterygo"
  },
  {
    "unformattedName": "prostil",
    "affixName": "prostil"
  },
  {
    "unformattedName": "oxanide",
    "affixName": "oxanide"
  },
  {
    "unformattedName": "olivo",
    "affixName": "olivo"
  },
  {
    "unformattedName": "pyelo",
    "affixName": "pyelo"
  },
  {
    "unformattedName": "homœ",
    "affixName": "homœ"
  },
  {
    "unformattedName": "thalasso",
    "affixName": "thalasso"
  },
  {
    "unformattedName": "hem",
    "affixName": "hem"
  },
  {
    "unformattedName": "algia",
    "affixName": "algia"
  },
  {
    "unformattedName": "peg",
    "affixName": "peg"
  },
  {
    "unformattedName": "baro",
    "affixName": "baro"
  },
  {
    "unformattedName": "phony",
    "affixName": "phony"
  },
  {
    "unformattedName": "Gallo",
    "affixName": "Gallo"
  },
  {
    "unformattedName": "trypano",
    "affixName": "trypano"
  },
  {
    "unformattedName": "cumulo",
    "affixName": "cumulo"
  },
  {
    "unformattedName": "milna",
    "affixName": "milna"
  },
  {
    "unformattedName": "roto",
    "affixName": "roto"
  },
  {
    "unformattedName": "eno",
    "affixName": "eno"
  },
  {
    "unformattedName": "spirone",
    "affixName": "spirone"
  },
  {
    "unformattedName": "amnio",
    "affixName": "amnio"
  },
  {
    "unformattedName": "clidine",
    "affixName": "clidine"
  },
  {
    "unformattedName": "atlanto",
    "affixName": "atlanto"
  },
  {
    "unformattedName": "zymo",
    "affixName": "zymo"
  },
  {
    "unformattedName": "nifur",
    "affixName": "nifur"
  },
  {
    "unformattedName": "azosin",
    "affixName": "azosin"
  },
  {
    "unformattedName": "vulvo",
    "affixName": "vulvo"
  },
  {
    "unformattedName": "glomerulo",
    "affixName": "glomerulo"
  },
  {
    "unformattedName": "mere",
    "affixName": "mere"
  },
  {
    "unformattedName": "tecto",
    "affixName": "tecto"
  },
  {
    "unformattedName": "Judaeo",
    "affixName": "Judaeo"
  },
  {
    "unformattedName": "radiation",
    "affixName": "radiation"
  },
  {
    "unformattedName": "gonio",
    "affixName": "gonio"
  },
  {
    "unformattedName": "karyo",
    "affixName": "karyo"
  },
  {
    "unformattedName": "foeto",
    "affixName": "foeto"
  },
  {
    "unformattedName": "trophic",
    "affixName": "trophic"
  },
  {
    "unformattedName": "repa",
    "affixName": "repa"
  },
  {
    "unformattedName": "nate",
    "affixName": "nate"
  },
  {
    "unformattedName": "occipito",
    "affixName": "occipito"
  },
  {
    "unformattedName": "astero",
    "affixName": "astero"
  },
  {
    "unformattedName": "antiferro",
    "affixName": "antiferro"
  },
  {
    "unformattedName": "balneo",
    "affixName": "balneo"
  },
  {
    "unformattedName": "perfluoro",
    "affixName": "perfluoro"
  },
  {
    "unformattedName": "oculo",
    "affixName": "oculo"
  },
  {
    "unformattedName": "pycno",
    "affixName": "pycno"
  },
  {
    "unformattedName": "flexo",
    "affixName": "flexo"
  },
  {
    "unformattedName": "humero",
    "affixName": "humero"
  },
  {
    "unformattedName": "tropho",
    "affixName": "tropho"
  },
  {
    "unformattedName": "molybdo",
    "affixName": "molybdo"
  },
  {
    "unformattedName": "pentakis",
    "affixName": "pentakis"
  },
  {
    "unformattedName": "mageddon",
    "affixName": "mageddon"
  },
  {
    "unformattedName": "itan",
    "affixName": "itan"
  },
  {
    "unformattedName": "palladation",
    "affixName": "palladation"
  },
  {
    "unformattedName": "boration",
    "affixName": "boration"
  },
  {
    "unformattedName": "carba",
    "affixName": "carba"
  },
  {
    "unformattedName": "curonium",
    "affixName": "curonium"
  },
  {
    "unformattedName": "azepam",
    "affixName": "azepam"
  },
  {
    "unformattedName": "stanno",
    "affixName": "stanno"
  },
  {
    "unformattedName": "sexi",
    "affixName": "sexi"
  },
  {
    "unformattedName": "partite",
    "affixName": "partite"
  },
  {
    "unformattedName": "kinesis",
    "affixName": "kinesis"
  },
  {
    "unformattedName": "rutheno",
    "affixName": "rutheno"
  },
  {
    "unformattedName": "argento",
    "affixName": "argento"
  },
  {
    "unformattedName": "auxo",
    "affixName": "auxo"
  },
  {
    "unformattedName": "ella",
    "affixName": "ella"
  },
  {
    "unformattedName": "hendeca",
    "affixName": "hendeca"
  },
  {
    "unformattedName": "opamine",
    "affixName": "opamine"
  },
  {
    "unformattedName": "tronics",
    "affixName": "tronics"
  },
  {
    "unformattedName": "techni",
    "affixName": "techni"
  },
  {
    "unformattedName": "cuneo",
    "affixName": "cuneo"
  },
  {
    "unformattedName": "vir",
    "affixName": "vir"
  },
  {
    "unformattedName": "abad",
    "affixName": "abad"
  },
  {
    "unformattedName": "oö",
    "affixName": "oö"
  },
  {
    "unformattedName": "equ",
    "affixName": "equ"
  },
  {
    "unformattedName": "temporo",
    "affixName": "temporo"
  },
  {
    "unformattedName": "tarso",
    "affixName": "tarso"
  },
  {
    "unformattedName": "gravo",
    "affixName": "gravo"
  },
  {
    "unformattedName": "diplo",
    "affixName": "diplo"
  },
  {
    "unformattedName": "creno",
    "affixName": "creno"
  },
  {
    "unformattedName": "ibility",
    "affixName": "ibility"
  },
  {
    "unformattedName": "K",
    "affixName": "K"
  },
  {
    "unformattedName": "sporo",
    "affixName": "sporo"
  },
  {
    "unformattedName": "semper",
    "affixName": "semper"
  },
  {
    "unformattedName": "zo",
    "affixName": "zo"
  },
  {
    "unformattedName": "herpeto",
    "affixName": "herpeto"
  },
  {
    "unformattedName": "nesse",
    "affixName": "nesse"
  },
  {
    "unformattedName": "onomics",
    "affixName": "onomics"
  },
  {
    "unformattedName": "oan",
    "affixName": "oan"
  },
  {
    "unformattedName": "cerio",
    "affixName": "cerio"
  },
  {
    "unformattedName": "pyrano",
    "affixName": "pyrano"
  },
  {
    "unformattedName": "cleido",
    "affixName": "cleido"
  },
  {
    "unformattedName": "baryo",
    "affixName": "baryo"
  },
  {
    "unformattedName": "hexakis",
    "affixName": "hexakis"
  },
  {
    "unformattedName": "perchloro",
    "affixName": "perchloro"
  },
  {
    "unformattedName": "pudlian",
    "affixName": "pudlian"
  },
  {
    "unformattedName": "ïng",
    "affixName": "ïng"
  },
  {
    "unformattedName": "stygo",
    "affixName": "stygo"
  },
  {
    "unformattedName": "vasculo",
    "affixName": "vasculo"
  },
  {
    "unformattedName": "saccharo",
    "affixName": "saccharo"
  },
  {
    "unformattedName": "contro",
    "affixName": "contro"
  },
  {
    "unformattedName": "tetrakis",
    "affixName": "tetrakis"
  },
  {
    "unformattedName": "megalo",
    "affixName": "megalo"
  },
  {
    "unformattedName": "peno",
    "affixName": "peno"
  },
  {
    "unformattedName": "derm",
    "affixName": "derm"
  },
  {
    "unformattedName": "esophago",
    "affixName": "esophago"
  },
  {
    "unformattedName": "steato",
    "affixName": "steato"
  },
  {
    "unformattedName": "urethro",
    "affixName": "urethro"
  },
  {
    "unformattedName": "petal",
    "affixName": "petal"
  },
  {
    "unformattedName": "aetio",
    "affixName": "aetio"
  },
  {
    "unformattedName": "gli",
    "affixName": "gli"
  },
  {
    "unformattedName": "inguino",
    "affixName": "inguino"
  },
  {
    "unformattedName": "papulo",
    "affixName": "papulo"
  },
  {
    "unformattedName": "tectono",
    "affixName": "tectono"
  },
  {
    "unformattedName": "acromio",
    "affixName": "acromio"
  },
  {
    "unformattedName": "octavo",
    "affixName": "octavo"
  },
  {
    "unformattedName": "malaco",
    "affixName": "malaco"
  },
  {
    "unformattedName": "spondylo",
    "affixName": "spondylo"
  },
  {
    "unformattedName": "teplase",
    "affixName": "teplase"
  },
  {
    "unformattedName": "pristin",
    "affixName": "pristin"
  },
  {
    "unformattedName": "pramine",
    "affixName": "pramine"
  },
  {
    "unformattedName": "ali",
    "affixName": "ali"
  },
  {
    "unformattedName": "coeno",
    "affixName": "coeno"
  },
  {
    "unformattedName": "gleno",
    "affixName": "gleno"
  },
  {
    "unformattedName": "patello",
    "affixName": "patello"
  },
  {
    "unformattedName": "tibio",
    "affixName": "tibio"
  },
  {
    "unformattedName": "squamo",
    "affixName": "squamo"
  },
  {
    "unformattedName": "stomato",
    "affixName": "stomato"
  },
  {
    "unformattedName": "trit",
    "affixName": "trit"
  },
  {
    "unformattedName": "vari",
    "affixName": "vari"
  },
  {
    "unformattedName": "striato",
    "affixName": "striato"
  },
  {
    "unformattedName": "auri",
    "affixName": "auri"
  },
  {
    "unformattedName": "anthro",
    "affixName": "anthro"
  },
  {
    "unformattedName": "nutri",
    "affixName": "nutri"
  },
  {
    "unformattedName": "bulbo",
    "affixName": "bulbo"
  },
  {
    "unformattedName": "optico",
    "affixName": "optico"
  },
  {
    "unformattedName": "holism",
    "affixName": "holism"
  },
  {
    "unformattedName": "pride",
    "affixName": "pride"
  },
  {
    "unformattedName": "denti",
    "affixName": "denti"
  },
  {
    "unformattedName": "pause",
    "affixName": "pause"
  },
  {
    "unformattedName": "urano",
    "affixName": "urano"
  },
  {
    "unformattedName": "cerebello",
    "affixName": "cerebello"
  },
  {
    "unformattedName": "ponto",
    "affixName": "ponto"
  },
  {
    "unformattedName": "centri",
    "affixName": "centri"
  },
  {
    "unformattedName": "iono",
    "affixName": "iono"
  },
  {
    "unformattedName": "fluvio",
    "affixName": "fluvio"
  },
  {
    "unformattedName": "drome",
    "affixName": "drome"
  },
  {
    "unformattedName": "stato",
    "affixName": "stato"
  },
  {
    "unformattedName": "at",
    "affixName": "at"
  },
  {
    "unformattedName": "metre",
    "affixName": "metre"
  },
  {
    "unformattedName": "cule",
    "affixName": "cule"
  },
  {
    "unformattedName": "thigmo",
    "affixName": "thigmo"
  },
  {
    "unformattedName": "hoplo",
    "affixName": "hoplo"
  },
  {
    "unformattedName": "myrmeco",
    "affixName": "myrmeco"
  },
  {
    "unformattedName": "algo",
    "affixName": "algo"
  },
  {
    "unformattedName": "Tibeto",
    "affixName": "Tibeto"
  },
  {
    "unformattedName": "natro",
    "affixName": "natro"
  },
  {
    "unformattedName": "magni",
    "affixName": "magni"
  },
  {
    "unformattedName": "deka",
    "affixName": "deka"
  },
  {
    "unformattedName": "centrism",
    "affixName": "centrism"
  },
  {
    "unformattedName": "archeo",
    "affixName": "archeo"
  },
  {
    "unformattedName": "Nilo",
    "affixName": "Nilo"
  },
  {
    "unformattedName": "alia",
    "affixName": "alia"
  },
  {
    "unformattedName": "forth",
    "affixName": "forth"
  },
  {
    "unformattedName": "logist",
    "affixName": "logist"
  },
  {
    "unformattedName": "potentio",
    "affixName": "potentio"
  },
  {
    "unformattedName": "enna",
    "affixName": "enna"
  },
  {
    "unformattedName": "fluo",
    "affixName": "fluo"
  },
  {
    "unformattedName": "Celto",
    "affixName": "Celto"
  },
  {
    "unformattedName": "urino",
    "affixName": "urino"
  },
  {
    "unformattedName": "thorough",
    "affixName": "thorough"
  },
  {
    "unformattedName": "sinistr",
    "affixName": "sinistr"
  },
  {
    "unformattedName": "gynæco",
    "affixName": "gynæco"
  },
  {
    "unformattedName": "coen",
    "affixName": "coen"
  },
  {
    "unformattedName": "clado",
    "affixName": "clado"
  },
  {
    "unformattedName": "again",
    "affixName": "again"
  },
  {
    "unformattedName": "sicle",
    "affixName": "sicle"
  },
  {
    "unformattedName": "itive",
    "affixName": "itive"
  },
  {
    "unformattedName": "eus",
    "affixName": "eus"
  },
  {
    "unformattedName": "palae",
    "affixName": "palae"
  },
  {
    "unformattedName": "skeleto",
    "affixName": "skeleto"
  },
  {
    "unformattedName": "psammo",
    "affixName": "psammo"
  },
  {
    "unformattedName": "pæd",
    "affixName": "pæd"
  },
  {
    "unformattedName": "yttro",
    "affixName": "yttro"
  },
  {
    "unformattedName": "chalco",
    "affixName": "chalco"
  },
  {
    "unformattedName": "schm",
    "affixName": "schm"
  },
  {
    "unformattedName": "pædo",
    "affixName": "pædo"
  },
  {
    "unformattedName": "lect",
    "affixName": "lect"
  },
  {
    "unformattedName": "istics",
    "affixName": "istics"
  },
  {
    "unformattedName": "dacryo",
    "affixName": "dacryo"
  },
  {
    "unformattedName": "logue",
    "affixName": "logue"
  },
  {
    "unformattedName": "fag",
    "affixName": "fag"
  },
  {
    "unformattedName": "nidazole",
    "affixName": "nidazole"
  },
  {
    "unformattedName": "maxi",
    "affixName": "maxi"
  },
  {
    "unformattedName": "costo",
    "affixName": "costo"
  },
  {
    "unformattedName": "il",
    "affixName": "il"
  },
  {
    "unformattedName": "xyr",
    "affixName": "xyr"
  },
  {
    "unformattedName": "xyl",
    "affixName": "xyl"
  },
  {
    "unformattedName": "sauce",
    "affixName": "sauce"
  },
  {
    "unformattedName": "zirco",
    "affixName": "zirco"
  },
  {
    "unformattedName": "type",
    "affixName": "type"
  },
  {
    "unformattedName": "ichthyo",
    "affixName": "ichthyo"
  },
  {
    "unformattedName": "here",
    "affixName": "here"
  },
  {
    "unformattedName": "strontio",
    "affixName": "strontio"
  },
  {
    "unformattedName": "bario",
    "affixName": "bario"
  },
  {
    "unformattedName": "clitoro",
    "affixName": "clitoro"
  },
  {
    "unformattedName": "ampho",
    "affixName": "ampho"
  },
  {
    "unformattedName": "dihydro",
    "affixName": "dihydro"
  },
  {
    "unformattedName": "full",
    "affixName": "full"
  },
  {
    "unformattedName": "Cambro",
    "affixName": "Cambro"
  },
  {
    "unformattedName": "pallado",
    "affixName": "pallado"
  },
  {
    "unformattedName": "uran",
    "affixName": "uran"
  },
  {
    "unformattedName": "ammonio",
    "affixName": "ammonio"
  },
  {
    "unformattedName": "vanado",
    "affixName": "vanado"
  },
  {
    "unformattedName": "vanadio",
    "affixName": "vanadio"
  },
  {
    "unformattedName": "bismuto",
    "affixName": "bismuto"
  },
  {
    "unformattedName": "lithio",
    "affixName": "lithio"
  },
  {
    "unformattedName": "stibio",
    "affixName": "stibio"
  },
  {
    "unformattedName": "sterone",
    "affixName": "sterone"
  },
  {
    "unformattedName": "niobo",
    "affixName": "niobo"
  },
  {
    "unformattedName": "plumbo",
    "affixName": "plumbo"
  },
  {
    "unformattedName": "rhodo",
    "affixName": "rhodo"
  },
  {
    "unformattedName": "scandio",
    "affixName": "scandio"
  },
  {
    "unformattedName": "kineto",
    "affixName": "kineto"
  },
  {
    "unformattedName": "jejuno",
    "affixName": "jejuno"
  },
  {
    "unformattedName": "vitreo",
    "affixName": "vitreo"
  },
  {
    "unformattedName": "cor",
    "affixName": "cor"
  },
  {
    "unformattedName": "sulf",
    "affixName": "sulf"
  },
  {
    "unformattedName": "typho",
    "affixName": "typho"
  },
  {
    "unformattedName": "kine",
    "affixName": "kine"
  },
  {
    "unformattedName": "chryso",
    "affixName": "chryso"
  },
  {
    "unformattedName": "protero",
    "affixName": "protero"
  },
  {
    "unformattedName": "ick",
    "affixName": "ick"
  },
  {
    "unformattedName": "ress",
    "affixName": "ress"
  },
  {
    "unformattedName": "luteo",
    "affixName": "luteo"
  },
  {
    "unformattedName": "politico",
    "affixName": "politico"
  },
  {
    "unformattedName": "lagnia",
    "affixName": "lagnia"
  },
  {
    "unformattedName": "nervo",
    "affixName": "nervo"
  },
  {
    "unformattedName": "spermato",
    "affixName": "spermato"
  },
  {
    "unformattedName": "tartro",
    "affixName": "tartro"
  },
  {
    "unformattedName": "izzle",
    "affixName": "izzle"
  },
  {
    "unformattedName": "enter",
    "affixName": "enter"
  },
  {
    "unformattedName": "gony",
    "affixName": "gony"
  },
  {
    "unformattedName": "tome",
    "affixName": "tome"
  },
  {
    "unformattedName": "caco",
    "affixName": "caco"
  },
  {
    "unformattedName": "lins",
    "affixName": "lins"
  },
  {
    "unformattedName": "gymno",
    "affixName": "gymno"
  },
  {
    "unformattedName": "recti",
    "affixName": "recti"
  },
  {
    "unformattedName": "dermo",
    "affixName": "dermo"
  },
  {
    "unformattedName": "deuto",
    "affixName": "deuto"
  },
  {
    "unformattedName": "ast",
    "affixName": "ast"
  },
  {
    "unformattedName": "gloss",
    "affixName": "gloss"
  },
  {
    "unformattedName": "uple",
    "affixName": "uple"
  },
  {
    "unformattedName": "hyo",
    "affixName": "hyo"
  },
  {
    "unformattedName": "mechanico",
    "affixName": "mechanico"
  },
  {
    "unformattedName": "pyo",
    "affixName": "pyo"
  },
  {
    "unformattedName": "tropo",
    "affixName": "tropo"
  },
  {
    "unformattedName": "ornitho",
    "affixName": "ornitho"
  },
  {
    "unformattedName": "omphalo",
    "affixName": "omphalo"
  },
  {
    "unformattedName": "purpureo",
    "affixName": "purpureo"
  },
  {
    "unformattedName": "sacculo",
    "affixName": "sacculo"
  },
  {
    "unformattedName": "calcareo",
    "affixName": "calcareo"
  },
  {
    "unformattedName": "pneumato",
    "affixName": "pneumato"
  },
  {
    "unformattedName": "crico",
    "affixName": "crico"
  },
  {
    "unformattedName": "lieno",
    "affixName": "lieno"
  },
  {
    "unformattedName": "sept",
    "affixName": "sept"
  },
  {
    "unformattedName": "sporous",
    "affixName": "sporous"
  },
  {
    "unformattedName": "cardia",
    "affixName": "cardia"
  },
  {
    "unformattedName": "jugulo",
    "affixName": "jugulo"
  },
  {
    "unformattedName": "carb",
    "affixName": "carb"
  },
  {
    "unformattedName": "amide",
    "affixName": "amide"
  },
  {
    "unformattedName": "gab",
    "affixName": "gab"
  },
  {
    "unformattedName": "piprazole",
    "affixName": "piprazole"
  },
  {
    "unformattedName": "acetyl",
    "affixName": "acetyl"
  },
  {
    "unformattedName": "podo",
    "affixName": "podo"
  },
  {
    "unformattedName": "hiero",
    "affixName": "hiero"
  },
  {
    "unformattedName": "cele",
    "affixName": "cele"
  },
  {
    "unformattedName": "acino",
    "affixName": "acino"
  },
  {
    "unformattedName": "septi",
    "affixName": "septi"
  },
  {
    "unformattedName": "tympano",
    "affixName": "tympano"
  },
  {
    "unformattedName": "uret",
    "affixName": "uret"
  },
  {
    "unformattedName": "plagio",
    "affixName": "plagio"
  },
  {
    "unformattedName": "anine",
    "affixName": "anine"
  },
  {
    "unformattedName": "pharyngo",
    "affixName": "pharyngo"
  },
  {
    "unformattedName": "axono",
    "affixName": "axono"
  },
  {
    "unformattedName": "sulph",
    "affixName": "sulph"
  },
  {
    "unformattedName": "praseo",
    "affixName": "praseo"
  },
  {
    "unformattedName": "trocho",
    "affixName": "trocho"
  },
  {
    "unformattedName": "auriculo",
    "affixName": "auriculo"
  },
  {
    "unformattedName": "ureo",
    "affixName": "ureo"
  },
  {
    "unformattedName": "anatomico",
    "affixName": "anatomico"
  },
  {
    "unformattedName": "pluto",
    "affixName": "pluto"
  },
  {
    "unformattedName": "zygomatico",
    "affixName": "zygomatico"
  },
  {
    "unformattedName": "valent",
    "affixName": "valent"
  },
  {
    "unformattedName": "stomy",
    "affixName": "stomy"
  },
  {
    "unformattedName": "mane",
    "affixName": "mane"
  },
  {
    "unformattedName": "0r",
    "affixName": "0r"
  },
  {
    "unformattedName": "spermo",
    "affixName": "spermo"
  },
  {
    "unformattedName": "ties",
    "affixName": "ties"
  },
  {
    "unformattedName": "soleno",
    "affixName": "soleno"
  },
  {
    "unformattedName": "cono",
    "affixName": "cono"
  },
  {
    "unformattedName": "tris",
    "affixName": "tris"
  },
  {
    "unformattedName": "tude",
    "affixName": "tude"
  },
  {
    "unformattedName": "septa",
    "affixName": "septa"
  },
  {
    "unformattedName": "spondyl",
    "affixName": "spondyl"
  },
  {
    "unformattedName": "membrano",
    "affixName": "membrano"
  },
  {
    "unformattedName": "succin",
    "affixName": "succin"
  },
  {
    "unformattedName": "septo",
    "affixName": "septo"
  },
  {
    "unformattedName": "uretero",
    "affixName": "uretero"
  },
  {
    "unformattedName": "tungsto",
    "affixName": "tungsto"
  },
  {
    "unformattedName": "opsono",
    "affixName": "opsono"
  },
  {
    "unformattedName": "perone",
    "affixName": "perone"
  },
  {
    "unformattedName": "intro",
    "affixName": "intro"
  },
  {
    "unformattedName": "nemato",
    "affixName": "nemato"
  },
  {
    "unformattedName": "omo",
    "affixName": "omo"
  },
  {
    "unformattedName": "spheno",
    "affixName": "spheno"
  },
  {
    "unformattedName": "haema",
    "affixName": "haema"
  },
  {
    "unformattedName": "latero",
    "affixName": "latero"
  },
  {
    "unformattedName": "laevo",
    "affixName": "laevo"
  },
  {
    "unformattedName": "phore",
    "affixName": "phore"
  },
  {
    "unformattedName": "aorto",
    "affixName": "aorto"
  },
  {
    "unformattedName": "phreno",
    "affixName": "phreno"
  },
  {
    "unformattedName": "phonic",
    "affixName": "phonic"
  },
  {
    "unformattedName": "cerato",
    "affixName": "cerato"
  },
  {
    "unformattedName": "sexa",
    "affixName": "sexa"
  },
  {
    "unformattedName": "mento",
    "affixName": "mento"
  },
  {
    "unformattedName": "met",
    "affixName": "met"
  },
  {
    "unformattedName": "meno",
    "affixName": "meno"
  },
  {
    "unformattedName": "enchyma",
    "affixName": "enchyma"
  },
  {
    "unformattedName": "cheiro",
    "affixName": "cheiro"
  },
  {
    "unformattedName": "vesiculo",
    "affixName": "vesiculo"
  },
  {
    "unformattedName": "Moeso",
    "affixName": "Moeso"
  },
  {
    "unformattedName": "setron",
    "affixName": "setron"
  },
  {
    "unformattedName": "splain",
    "affixName": "splain"
  },
  {
    "unformattedName": "optene",
    "affixName": "optene"
  },
  {
    "unformattedName": "gingivo",
    "affixName": "gingivo"
  },
  {
    "unformattedName": "prae",
    "affixName": "prae"
  },
  {
    "unformattedName": "phrenia",
    "affixName": "phrenia"
  },
  {
    "unformattedName": "pharma",
    "affixName": "pharma"
  },
  {
    "unformattedName": "phyco",
    "affixName": "phyco"
  },
  {
    "unformattedName": "vagino",
    "affixName": "vagino"
  },
  {
    "unformattedName": "pheo",
    "affixName": "pheo"
  },
  {
    "unformattedName": "oneiro",
    "affixName": "oneiro"
  },
  {
    "unformattedName": "eum",
    "affixName": "eum"
  },
  {
    "unformattedName": "zza",
    "affixName": "zza"
  },
  {
    "unformattedName": "heptadeca",
    "affixName": "heptadeca"
  },
  {
    "unformattedName": "sursum",
    "affixName": "sursum"
  },
  {
    "unformattedName": "deorsum",
    "affixName": "deorsum"
  },
  {
    "unformattedName": "ballisto",
    "affixName": "ballisto"
  },
  {
    "unformattedName": "disto",
    "affixName": "disto"
  },
  {
    "unformattedName": "arthro",
    "affixName": "arthro"
  },
  {
    "unformattedName": "chlamydo",
    "affixName": "chlamydo"
  },
  {
    "unformattedName": "decidual",
    "affixName": "decidual"
  },
  {
    "unformattedName": "rrhaphy",
    "affixName": "rrhaphy"
  },
  {
    "unformattedName": "vin",
    "affixName": "vin"
  },
  {
    "unformattedName": "olone",
    "affixName": "olone"
  },
  {
    "unformattedName": "relin",
    "affixName": "relin"
  },
  {
    "unformattedName": "io",
    "affixName": "io"
  },
  {
    "unformattedName": "brom",
    "affixName": "brom"
  },
  {
    "unformattedName": "iod",
    "affixName": "iod"
  },
  {
    "unformattedName": "epta",
    "affixName": "epta"
  },
  {
    "unformattedName": "verine",
    "affixName": "verine"
  },
  {
    "unformattedName": "cef",
    "affixName": "cef"
  },
  {
    "unformattedName": "drine",
    "affixName": "drine"
  },
  {
    "unformattedName": "glitazone",
    "affixName": "glitazone"
  },
  {
    "unformattedName": "boreo",
    "affixName": "boreo"
  },
  {
    "unformattedName": "frine",
    "affixName": "frine"
  },
  {
    "unformattedName": "nicline",
    "affixName": "nicline"
  },
  {
    "unformattedName": "dalt",
    "affixName": "dalt"
  },
  {
    "unformattedName": "metho",
    "affixName": "metho"
  },
  {
    "unformattedName": "mestane",
    "affixName": "mestane"
  },
  {
    "unformattedName": "lukast",
    "affixName": "lukast"
  },
  {
    "unformattedName": "prenaline",
    "affixName": "prenaline"
  },
  {
    "unformattedName": "Italo",
    "affixName": "Italo"
  },
  {
    "unformattedName": "Thraco",
    "affixName": "Thraco"
  },
  {
    "unformattedName": "Graeco",
    "affixName": "Graeco"
  },
  {
    "unformattedName": "Helleno",
    "affixName": "Helleno"
  },
  {
    "unformattedName": "poikilo",
    "affixName": "poikilo"
  },
  {
    "unformattedName": "Fenno",
    "affixName": "Fenno"
  },
  {
    "unformattedName": "condylo",
    "affixName": "condylo"
  },
  {
    "unformattedName": "geronto",
    "affixName": "geronto"
  },
  {
    "unformattedName": "ritide",
    "affixName": "ritide"
  },
  {
    "unformattedName": "cycline",
    "affixName": "cycline"
  },
  {
    "unformattedName": "scopic",
    "affixName": "scopic"
  },
  {
    "unformattedName": "scopy",
    "affixName": "scopy"
  },
  {
    "unformattedName": "fosine",
    "affixName": "fosine"
  },
  {
    "unformattedName": "orphone",
    "affixName": "orphone"
  },
  {
    "unformattedName": "terol",
    "affixName": "terol"
  },
  {
    "unformattedName": "tirelin",
    "affixName": "tirelin"
  },
  {
    "unformattedName": "tepine",
    "affixName": "tepine"
  },
  {
    "unformattedName": "thi",
    "affixName": "thi"
  },
  {
    "unformattedName": "fiban",
    "affixName": "fiban"
  },
  {
    "unformattedName": "bentho",
    "affixName": "bentho"
  },
  {
    "unformattedName": "oryzo",
    "affixName": "oryzo"
  },
  {
    "unformattedName": "salazo",
    "affixName": "salazo"
  },
  {
    "unformattedName": "orex",
    "affixName": "orex"
  },
  {
    "unformattedName": "prazole",
    "affixName": "prazole"
  },
  {
    "unformattedName": "nitr",
    "affixName": "nitr"
  },
  {
    "unformattedName": "oxacin",
    "affixName": "oxacin"
  },
  {
    "unformattedName": "adol",
    "affixName": "adol"
  },
  {
    "unformattedName": "kacin",
    "affixName": "kacin"
  },
  {
    "unformattedName": "fosfamide",
    "affixName": "fosfamide"
  },
  {
    "unformattedName": "fungin",
    "affixName": "fungin"
  },
  {
    "unformattedName": "citabine",
    "affixName": "citabine"
  },
  {
    "unformattedName": "cyan",
    "affixName": "cyan"
  },
  {
    "unformattedName": "arotene",
    "affixName": "arotene"
  },
  {
    "unformattedName": "platin",
    "affixName": "platin"
  },
  {
    "unformattedName": "meningo",
    "affixName": "meningo"
  },
  {
    "unformattedName": "metatarso",
    "affixName": "metatarso"
  },
  {
    "unformattedName": "trideca",
    "affixName": "trideca"
  },
  {
    "unformattedName": "porto",
    "affixName": "porto"
  },
  {
    "unformattedName": "calori",
    "affixName": "calori"
  },
  {
    "unformattedName": "corneo",
    "affixName": "corneo"
  },
  {
    "unformattedName": "micto",
    "affixName": "micto"
  },
  {
    "unformattedName": "femoro",
    "affixName": "femoro"
  },
  {
    "unformattedName": "cantho",
    "affixName": "cantho"
  },
  {
    "unformattedName": "ganglio",
    "affixName": "ganglio"
  },
  {
    "unformattedName": "talo",
    "affixName": "talo"
  },
  {
    "unformattedName": "saur",
    "affixName": "saur"
  },
  {
    "unformattedName": "plesio",
    "affixName": "plesio"
  },
  {
    "unformattedName": "rumino",
    "affixName": "rumino"
  },
  {
    "unformattedName": "hagio",
    "affixName": "hagio"
  },
  {
    "unformattedName": "saurus",
    "affixName": "saurus"
  },
  {
    "unformattedName": "medullo",
    "affixName": "medullo"
  },
  {
    "unformattedName": "metro",
    "affixName": "metro"
  },
  {
    "unformattedName": "musico",
    "affixName": "musico"
  },
  {
    "unformattedName": "pancreatico",
    "affixName": "pancreatico"
  },
  {
    "unformattedName": "phaco",
    "affixName": "phaco"
  },
  {
    "unformattedName": "odynia",
    "affixName": "odynia"
  },
  {
    "unformattedName": "pyloro",
    "affixName": "pyloro"
  },
  {
    "unformattedName": "acantho",
    "affixName": "acantho"
  },
  {
    "unformattedName": "skoto",
    "affixName": "skoto"
  },
  {
    "unformattedName": "cilio",
    "affixName": "cilio"
  },
  {
    "unformattedName": "gamy",
    "affixName": "gamy"
  },
  {
    "unformattedName": "gamous",
    "affixName": "gamous"
  },
  {
    "unformattedName": "genio",
    "affixName": "genio"
  },
  {
    "unformattedName": "historico",
    "affixName": "historico"
  },
  {
    "unformattedName": "quadro",
    "affixName": "quadro"
  },
  {
    "unformattedName": "noso",
    "affixName": "noso"
  },
  {
    "unformattedName": "vegeto",
    "affixName": "vegeto"
  },
  {
    "unformattedName": "apeiro",
    "affixName": "apeiro"
  },
  {
    "unformattedName": "physi",
    "affixName": "physi"
  },
  {
    "unformattedName": "pancreato",
    "affixName": "pancreato"
  },
  {
    "unformattedName": "zono",
    "affixName": "zono"
  },
  {
    "unformattedName": "udi",
    "affixName": "udi"
  },
  {
    "unformattedName": "speleo",
    "affixName": "speleo"
  },
  {
    "unformattedName": "konio",
    "affixName": "konio"
  },
  {
    "unformattedName": "imido",
    "affixName": "imido"
  },
  {
    "unformattedName": "calcaneo",
    "affixName": "calcaneo"
  },
  {
    "unformattedName": "hypothalamo",
    "affixName": "hypothalamo"
  },
  {
    "unformattedName": "ostomy",
    "affixName": "ostomy"
  },
  {
    "unformattedName": "onto",
    "affixName": "onto"
  },
  {
    "unformattedName": "axillo",
    "affixName": "axillo"
  },
  {
    "unformattedName": "cubo",
    "affixName": "cubo"
  },
  {
    "unformattedName": "the",
    "affixName": "the"
  },
  {
    "unformattedName": "pants",
    "affixName": "pants"
  },
  {
    "unformattedName": "porno",
    "affixName": "porno"
  },
  {
    "unformattedName": "ʟ",
    "affixName": "ʟ"
  },
  {
    "unformattedName": "demo",
    "affixName": "demo"
  },
  {
    "unformattedName": "picto",
    "affixName": "picto"
  },
  {
    "unformattedName": "splanchno",
    "affixName": "splanchno"
  },
  {
    "unformattedName": "facio",
    "affixName": "facio"
  },
  {
    "unformattedName": "conico",
    "affixName": "conico"
  },
  {
    "unformattedName": "sinistro",
    "affixName": "sinistro"
  },
  {
    "unformattedName": "cylindro",
    "affixName": "cylindro"
  },
  {
    "unformattedName": "magico",
    "affixName": "magico"
  },
  {
    "unformattedName": "phrenico",
    "affixName": "phrenico"
  },
  {
    "unformattedName": "duodeno",
    "affixName": "duodeno"
  },
  {
    "unformattedName": "bilio",
    "affixName": "bilio"
  },
  {
    "unformattedName": "muci",
    "affixName": "muci"
  },
  {
    "unformattedName": "ovi",
    "affixName": "ovi"
  },
  {
    "unformattedName": "closed",
    "affixName": "closed"
  },
  {
    "unformattedName": "rufo",
    "affixName": "rufo"
  },
  {
    "unformattedName": "transitive",
    "affixName": "transitive"
  },
  {
    "unformattedName": "pocalypse",
    "affixName": "pocalypse"
  },
  {
    "unformattedName": "bronto",
    "affixName": "bronto"
  },
  {
    "unformattedName": "worth",
    "affixName": "worth"
  },
  {
    "unformattedName": "bury",
    "affixName": "bury"
  },
  {
    "unformattedName": "logical",
    "affixName": "logical"
  },
  {
    "unformattedName": "desmo",
    "affixName": "desmo"
  },
  {
    "unformattedName": "apico",
    "affixName": "apico"
  },
  {
    "unformattedName": "moto",
    "affixName": "moto"
  },
  {
    "unformattedName": "olfacto",
    "affixName": "olfacto"
  },
  {
    "unformattedName": "psych",
    "affixName": "psych"
  },
  {
    "unformattedName": "frigo",
    "affixName": "frigo"
  },
  {
    "unformattedName": "odonto",
    "affixName": "odonto"
  },
  {
    "unformattedName": "über",
    "affixName": "über"
  },
  {
    "unformattedName": "epithelio",
    "affixName": "epithelio"
  },
  {
    "unformattedName": "ulno",
    "affixName": "ulno"
  },
  {
    "unformattedName": "coraco",
    "affixName": "coraco"
  },
  {
    "unformattedName": "thallo",
    "affixName": "thallo"
  },
  {
    "unformattedName": "cratic",
    "affixName": "cratic"
  },
  {
    "unformattedName": "rhyncho",
    "affixName": "rhyncho"
  },
  {
    "unformattedName": "hect",
    "affixName": "hect"
  },
  {
    "unformattedName": "oidea",
    "affixName": "oidea"
  },
  {
    "unformattedName": "Zio",
    "affixName": "Zio"
  },
  {
    "unformattedName": "μ",
    "affixName": "μ"
  },
  {
    "unformattedName": "bacter",
    "affixName": "bacter"
  },
  {
    "unformattedName": "tephro",
    "affixName": "tephro"
  },
  {
    "unformattedName": "nevo",
    "affixName": "nevo"
  },
  {
    "unformattedName": "centralo",
    "affixName": "centralo"
  },
  {
    "unformattedName": "choroido",
    "affixName": "choroido"
  },
  {
    "unformattedName": "distalo",
    "affixName": "distalo"
  },
  {
    "unformattedName": "naviculo",
    "affixName": "naviculo"
  },
  {
    "unformattedName": "aortico",
    "affixName": "aortico"
  },
  {
    "unformattedName": "ily",
    "affixName": "ily"
  },
  {
    "unformattedName": "choro",
    "affixName": "choro"
  },
  {
    "unformattedName": "Spaghetti",
    "affixName": "Spaghetti"
  },
  {
    "unformattedName": "lingua",
    "affixName": "lingua"
  },
  {
    "unformattedName": "ampelo",
    "affixName": "ampelo"
  },
  {
    "unformattedName": "oeno",
    "affixName": "oeno"
  },
  {
    "unformattedName": "ovulo",
    "affixName": "ovulo"
  },
  {
    "unformattedName": "bel",
    "affixName": "bel"
  },
  {
    "unformattedName": "ometer",
    "affixName": "ometer"
  },
  {
    "unformattedName": "athlon",
    "affixName": "athlon"
  },
  {
    "unformattedName": "Yugo",
    "affixName": "Yugo"
  },
  {
    "unformattedName": "conservo",
    "affixName": "conservo"
  },
  {
    "unformattedName": "Palaeo",
    "affixName": "Palaeo"
  },
  {
    "unformattedName": "helico",
    "affixName": "helico"
  },
  {
    "unformattedName": "kinesi",
    "affixName": "kinesi"
  },
  {
    "unformattedName": "cobalto",
    "affixName": "cobalto"
  },
  {
    "unformattedName": "coelo",
    "affixName": "coelo"
  },
  {
    "unformattedName": "emic",
    "affixName": "emic"
  },
  {
    "unformattedName": "dideoxy",
    "affixName": "dideoxy"
  },
  {
    "unformattedName": "hydr",
    "affixName": "hydr"
  },
  {
    "unformattedName": "grammatico",
    "affixName": "grammatico"
  },
  {
    "unformattedName": "orama",
    "affixName": "orama"
  },
  {
    "unformattedName": "alco",
    "affixName": "alco"
  },
  {
    "unformattedName": "decentralise",
    "affixName": "decentralise"
  },
  {
    "unformattedName": "Brito",
    "affixName": "Brito"
  },
  {
    "unformattedName": "gyne",
    "affixName": "gyne"
  },
  {
    "unformattedName": "equina",
    "affixName": "equina"
  },
  {
    "unformattedName": "alveolo",
    "affixName": "alveolo"
  },
  {
    "unformattedName": "parvi",
    "affixName": "parvi"
  },
  {
    "unformattedName": "lutamide",
    "affixName": "lutamide"
  },
  {
    "unformattedName": "climato",
    "affixName": "climato"
  },
  {
    "unformattedName": "cochleo",
    "affixName": "cochleo"
  },
  {
    "unformattedName": "giganto",
    "affixName": "giganto"
  },
  {
    "unformattedName": "pulso",
    "affixName": "pulso"
  },
  {
    "unformattedName": "anemo",
    "affixName": "anemo"
  },
  {
    "unformattedName": "thymo",
    "affixName": "thymo"
  },
  {
    "unformattedName": "gonado",
    "affixName": "gonado"
  },
  {
    "unformattedName": "analgo",
    "affixName": "analgo"
  },
  {
    "unformattedName": "sapheno",
    "affixName": "sapheno"
  },
  {
    "unformattedName": "oxaza",
    "affixName": "oxaza"
  },
  {
    "unformattedName": "pelvi",
    "affixName": "pelvi"
  },
  {
    "unformattedName": "amygdalo",
    "affixName": "amygdalo"
  },
  {
    "unformattedName": "hepatico",
    "affixName": "hepatico"
  },
  {
    "unformattedName": "accelero",
    "affixName": "accelero"
  },
  {
    "unformattedName": "sexual",
    "affixName": "sexual"
  },
  {
    "unformattedName": "vago",
    "affixName": "vago"
  },
  {
    "unformattedName": "un#Etymology_2",
    "affixName": "un#Etymology_2"
  },
  {
    "unformattedName": "granulo",
    "affixName": "granulo"
  },
  {
    "unformattedName": "veno",
    "affixName": "veno"
  },
  {
    "unformattedName": "vitello",
    "affixName": "vitello"
  },
  {
    "unformattedName": "heredo",
    "affixName": "heredo"
  },
  {
    "unformattedName": "tapeto",
    "affixName": "tapeto"
  },
  {
    "unformattedName": "tendino",
    "affixName": "tendino"
  },
  {
    "unformattedName": "cline",
    "affixName": "cline"
  },
  {
    "unformattedName": "yne",
    "affixName": "yne"
  },
  {
    "unformattedName": "fibrino",
    "affixName": "fibrino"
  },
  {
    "unformattedName": "histio",
    "affixName": "histio"
  },
  {
    "unformattedName": "vomero",
    "affixName": "vomero"
  },
  {
    "unformattedName": "nulli",
    "affixName": "nulli"
  },
  {
    "unformattedName": "lign",
    "affixName": "lign"
  },
  {
    "unformattedName": "spongio",
    "affixName": "spongio"
  },
  {
    "unformattedName": "diphthero",
    "affixName": "diphthero"
  },
  {
    "unformattedName": "embryo",
    "affixName": "embryo"
  },
  {
    "unformattedName": "steel",
    "affixName": "steel"
  },
  {
    "unformattedName": "longi",
    "affixName": "longi"
  },
  {
    "unformattedName": "stromo",
    "affixName": "stromo"
  },
  {
    "unformattedName": "limno",
    "affixName": "limno"
  },
  {
    "unformattedName": "echo",
    "affixName": "echo"
  },
  {
    "unformattedName": "aristo",
    "affixName": "aristo"
  },
  {
    "unformattedName": "tonsillo",
    "affixName": "tonsillo"
  },
  {
    "unformattedName": "lymphatico",
    "affixName": "lymphatico"
  },
  {
    "unformattedName": "chromato",
    "affixName": "chromato"
  },
  {
    "unformattedName": "malario",
    "affixName": "malario"
  },
  {
    "unformattedName": "rific",
    "affixName": "rific"
  },
  {
    "unformattedName": "synapto",
    "affixName": "synapto"
  },
  {
    "unformattedName": "sympathico",
    "affixName": "sympathico"
  },
  {
    "unformattedName": "sis",
    "affixName": "sis"
  },
  {
    "unformattedName": "scuto",
    "affixName": "scuto"
  },
  {
    "unformattedName": "anthraco",
    "affixName": "anthraco"
  },
  {
    "unformattedName": "geniculo",
    "affixName": "geniculo"
  },
  {
    "unformattedName": "perio",
    "affixName": "perio"
  },
  {
    "unformattedName": "antro",
    "affixName": "antro"
  },
  {
    "unformattedName": "nega",
    "affixName": "nega"
  },
  {
    "unformattedName": "sian",
    "affixName": "sian"
  },
  {
    "unformattedName": "crystallo",
    "affixName": "crystallo"
  },
  {
    "unformattedName": "ennea",
    "affixName": "ennea"
  },
  {
    "unformattedName": "sapro",
    "affixName": "sapro"
  },
  {
    "unformattedName": "menisco",
    "affixName": "menisco"
  },
  {
    "unformattedName": "rama",
    "affixName": "rama"
  },
  {
    "unformattedName": "valvo",
    "affixName": "valvo"
  },
  {
    "unformattedName": "ribine",
    "affixName": "ribine"
  },
  {
    "unformattedName": "echino",
    "affixName": "echino"
  },
  {
    "unformattedName": "Hispano",
    "affixName": "Hispano"
  },
  {
    "unformattedName": "periodonto",
    "affixName": "periodonto"
  },
  {
    "unformattedName": "metabo",
    "affixName": "metabo"
  },
  {
    "unformattedName": "ceptive",
    "affixName": "ceptive"
  },
  {
    "unformattedName": "lenticulo",
    "affixName": "lenticulo"
  },
  {
    "unformattedName": "ulcero",
    "affixName": "ulcero"
  },
  {
    "unformattedName": "phoro",
    "affixName": "phoro"
  },
  {
    "unformattedName": "borough",
    "affixName": "borough"
  },
  {
    "unformattedName": "dictyo",
    "affixName": "dictyo"
  },
  {
    "unformattedName": "oxifene",
    "affixName": "oxifene"
  },
  {
    "unformattedName": "semanto",
    "affixName": "semanto"
  },
  {
    "unformattedName": "kerat",
    "affixName": "kerat"
  },
  {
    "unformattedName": "dynamo",
    "affixName": "dynamo"
  },
  {
    "unformattedName": "colliculo",
    "affixName": "colliculo"
  },
  {
    "unformattedName": "utriculo",
    "affixName": "utriculo"
  },
  {
    "unformattedName": "posterio",
    "affixName": "posterio"
  },
  {
    "unformattedName": "pleo",
    "affixName": "pleo"
  },
  {
    "unformattedName": "monarcho",
    "affixName": "monarcho"
  },
  {
    "unformattedName": "countertextual",
    "affixName": "countertextual"
  },
  {
    "unformattedName": "tress",
    "affixName": "tress"
  },
  {
    "unformattedName": "obliquo",
    "affixName": "obliquo"
  },
  {
    "unformattedName": "ossi",
    "affixName": "ossi"
  },
  {
    "unformattedName": "fissi",
    "affixName": "fissi"
  },
  {
    "unformattedName": "phagy",
    "affixName": "phagy"
  },
  {
    "unformattedName": "plumo",
    "affixName": "plumo"
  },
  {
    "unformattedName": "phorous",
    "affixName": "phorous"
  },
  {
    "unformattedName": "etho",
    "affixName": "etho"
  },
  {
    "unformattedName": "Klux",
    "affixName": "Klux"
  },
  {
    "unformattedName": "colpo",
    "affixName": "colpo"
  },
  {
    "unformattedName": "Dano",
    "affixName": "Dano"
  },
  {
    "unformattedName": "pallido",
    "affixName": "pallido"
  },
  {
    "unformattedName": "mesangio",
    "affixName": "mesangio"
  },
  {
    "unformattedName": "diathermo",
    "affixName": "diathermo"
  },
  {
    "unformattedName": "fascio",
    "affixName": "fascio"
  },
  {
    "unformattedName": "octadeca",
    "affixName": "octadeca"
  },
  {
    "unformattedName": "operculo",
    "affixName": "operculo"
  },
  {
    "unformattedName": "cholo",
    "affixName": "cholo"
  },
  {
    "unformattedName": "miso",
    "affixName": "miso"
  },
  {
    "unformattedName": "pyrrolo",
    "affixName": "pyrrolo"
  },
  {
    "unformattedName": "capsulo",
    "affixName": "capsulo"
  },
  {
    "unformattedName": "diffeo",
    "affixName": "diffeo"
  },
  {
    "unformattedName": "fungi",
    "affixName": "fungi"
  },
  {
    "unformattedName": "cingulo",
    "affixName": "cingulo"
  },
  {
    "unformattedName": "epididymo",
    "affixName": "epididymo"
  },
  {
    "unformattedName": "colono",
    "affixName": "colono"
  },
  {
    "unformattedName": "metalla",
    "affixName": "metalla"
  },
  {
    "unformattedName": "metabolo",
    "affixName": "metabolo"
  },
  {
    "unformattedName": "photoelectro",
    "affixName": "photoelectro"
  },
  {
    "unformattedName": "mycin",
    "affixName": "mycin"
  },
  {
    "unformattedName": "cc",
    "affixName": "cc"
  },
  {
    "unformattedName": "biont",
    "affixName": "biont"
  },
  {
    "unformattedName": "ois",
    "affixName": "ois"
  },
  {
    "unformattedName": "ostreo",
    "affixName": "ostreo"
  },
  {
    "unformattedName": "bora",
    "affixName": "bora"
  },
  {
    "unformattedName": "kata",
    "affixName": "kata"
  },
  {
    "unformattedName": "hectokilo",
    "affixName": "hectokilo"
  },
  {
    "unformattedName": "m",
    "affixName": "m"
  },
  {
    "unformattedName": "fer",
    "affixName": "fer"
  },
  {
    "unformattedName": "adenia",
    "affixName": "adenia"
  },
  {
    "unformattedName": "contacto",
    "affixName": "contacto"
  },
  {
    "unformattedName": "vitro",
    "affixName": "vitro"
  },
  {
    "unformattedName": "ego",
    "affixName": "ego"
  },
  {
    "unformattedName": "graphic",
    "affixName": "graphic"
  },
  {
    "unformattedName": "therio",
    "affixName": "therio"
  },
  {
    "unformattedName": "capitulo",
    "affixName": "capitulo"
  },
  {
    "unformattedName": "areo",
    "affixName": "areo"
  },
  {
    "unformattedName": "lacrimo",
    "affixName": "lacrimo"
  },
  {
    "unformattedName": "Hurro",
    "affixName": "Hurro"
  },
  {
    "unformattedName": "historio",
    "affixName": "historio"
  },
  {
    "unformattedName": "Park",
    "affixName": "Park"
  },
  {
    "unformattedName": "clito",
    "affixName": "clito"
  },
  {
    "unformattedName": "ephebo",
    "affixName": "ephebo"
  },
  {
    "unformattedName": "ern",
    "affixName": "ern"
  },
  {
    "unformattedName": "hyps",
    "affixName": "hyps"
  },
  {
    "unformattedName": "amato",
    "affixName": "amato"
  },
  {
    "unformattedName": "nodo",
    "affixName": "nodo"
  },
  {
    "unformattedName": "fasciculo",
    "affixName": "fasciculo"
  },
  {
    "unformattedName": "furter",
    "affixName": "furter"
  },
  {
    "unformattedName": "Illyro",
    "affixName": "Illyro"
  },
  {
    "unformattedName": "cutaneo",
    "affixName": "cutaneo"
  },
  {
    "unformattedName": "pinko",
    "affixName": "pinko"
  },
  {
    "unformattedName": "ica",
    "affixName": "ica"
  },
  {
    "unformattedName": "ometry",
    "affixName": "ometry"
  },
  {
    "unformattedName": "intestino",
    "affixName": "intestino"
  },
  {
    "unformattedName": "sona",
    "affixName": "sona"
  },
  {
    "unformattedName": "hind",
    "affixName": "hind"
  },
  {
    "unformattedName": "gluteo",
    "affixName": "gluteo"
  },
  {
    "unformattedName": "mont",
    "affixName": "mont"
  },
  {
    "unformattedName": "ophio",
    "affixName": "ophio"
  },
  {
    "unformattedName": "potamo",
    "affixName": "potamo"
  },
  {
    "unformattedName": "Bat",
    "affixName": "Bat"
  },
  {
    "unformattedName": "anxio",
    "affixName": "anxio"
  },
  {
    "unformattedName": "seco",
    "affixName": "seco"
  },
  {
    "unformattedName": "philiac",
    "affixName": "philiac"
  },
  {
    "unformattedName": "seismi",
    "affixName": "seismi"
  },
  {
    "unformattedName": "biontic",
    "affixName": "biontic"
  },
  {
    "unformattedName": "ula",
    "affixName": "ula"
  },
  {
    "unformattedName": "hockey",
    "affixName": "hockey"
  },
  {
    "unformattedName": "acr",
    "affixName": "acr"
  },
  {
    "unformattedName": "chrome",
    "affixName": "chrome"
  },
  {
    "unformattedName": "affecto",
    "affixName": "affecto"
  },
  {
    "unformattedName": "allanto",
    "affixName": "allanto"
  },
  {
    "unformattedName": "alveo",
    "affixName": "alveo"
  },
  {
    "unformattedName": "ankylo",
    "affixName": "ankylo"
  },
  {
    "unformattedName": "annulo",
    "affixName": "annulo"
  },
  {
    "unformattedName": "appendico",
    "affixName": "appendico"
  },
  {
    "unformattedName": "arteriolo",
    "affixName": "arteriolo"
  },
  {
    "unformattedName": "skiing",
    "affixName": "skiing"
  },
  {
    "unformattedName": "Romano",
    "affixName": "Romano"
  },
  {
    "unformattedName": "pexy",
    "affixName": "pexy"
  },
  {
    "unformattedName": "atlo",
    "affixName": "atlo"
  },
  {
    "unformattedName": "axio",
    "affixName": "axio"
  },
  {
    "unformattedName": "maker",
    "affixName": "maker"
  },
  {
    "unformattedName": "calco",
    "affixName": "calco"
  },
  {
    "unformattedName": "calloso",
    "affixName": "calloso"
  },
  {
    "unformattedName": "carotico",
    "affixName": "carotico"
  },
  {
    "unformattedName": "cemento",
    "affixName": "cemento"
  },
  {
    "unformattedName": "chemico",
    "affixName": "chemico"
  },
  {
    "unformattedName": "clavi",
    "affixName": "clavi"
  },
  {
    "unformattedName": "conjunctivo",
    "affixName": "conjunctivo"
  },
  {
    "unformattedName": "coxo",
    "affixName": "coxo"
  },
  {
    "unformattedName": "ocrat",
    "affixName": "ocrat"
  },
  {
    "unformattedName": "dentino",
    "affixName": "dentino"
  },
  {
    "unformattedName": "disco",
    "affixName": "disco"
  },
  {
    "unformattedName": "elastico",
    "affixName": "elastico"
  },
  {
    "unformattedName": "embolo",
    "affixName": "embolo"
  },
  {
    "unformattedName": "pathic",
    "affixName": "pathic"
  },
  {
    "unformattedName": "tactic",
    "affixName": "tactic"
  },
  {
    "unformattedName": "taxis",
    "affixName": "taxis"
  },
  {
    "unformattedName": "erythemato",
    "affixName": "erythemato"
  },
  {
    "unformattedName": "extero",
    "affixName": "extero"
  },
  {
    "unformattedName": "tetrahydro",
    "affixName": "tetrahydro"
  },
  {
    "unformattedName": "primo",
    "affixName": "primo"
  },
  {
    "unformattedName": "anterio",
    "affixName": "anterio"
  },
  {
    "unformattedName": "allato",
    "affixName": "allato"
  },
  {
    "unformattedName": "poietic",
    "affixName": "poietic"
  },
  {
    "unformattedName": "prefronto",
    "affixName": "prefronto"
  },
  {
    "unformattedName": "prepro",
    "affixName": "prepro"
  },
  {
    "unformattedName": "tuberculo",
    "affixName": "tuberculo"
  },
  {
    "unformattedName": "Strait",
    "affixName": "Strait"
  },
  {
    "unformattedName": "folliculo",
    "affixName": "folliculo"
  },
  {
    "unformattedName": "valvulo",
    "affixName": "valvulo"
  },
  {
    "unformattedName": "acido",
    "affixName": "acido"
  },
  {
    "unformattedName": "laeo",
    "affixName": "laeo"
  },
  {
    "unformattedName": "palmaro",
    "affixName": "palmaro"
  },
  {
    "unformattedName": "primi",
    "affixName": "primi"
  },
  {
    "unformattedName": "entorhino",
    "affixName": "entorhino"
  },
  {
    "unformattedName": "balano",
    "affixName": "balano"
  },
  {
    "unformattedName": "anatomo",
    "affixName": "anatomo"
  },
  {
    "unformattedName": "cruro",
    "affixName": "cruro"
  },
  {
    "unformattedName": "ceco",
    "affixName": "ceco"
  },
  {
    "unformattedName": "intermedio",
    "affixName": "intermedio"
  },
  {
    "unformattedName": "pineo",
    "affixName": "pineo"
  },
  {
    "unformattedName": "chezia",
    "affixName": "chezia"
  },
  {
    "unformattedName": "sialia",
    "affixName": "sialia"
  },
  {
    "unformattedName": "sphingo",
    "affixName": "sphingo"
  },
  {
    "unformattedName": "omic",
    "affixName": "omic"
  },
  {
    "unformattedName": "bracteo",
    "affixName": "bracteo"
  },
  {
    "unformattedName": "phytic",
    "affixName": "phytic"
  },
  {
    "unformattedName": "mamillo",
    "affixName": "mamillo"
  },
  {
    "unformattedName": "lyo",
    "affixName": "lyo"
  },
  {
    "unformattedName": "diencephalo",
    "affixName": "diencephalo"
  },
  {
    "unformattedName": "mammilo",
    "affixName": "mammilo"
  },
  {
    "unformattedName": "imino",
    "affixName": "imino"
  },
  {
    "unformattedName": "rubro",
    "affixName": "rubro"
  },
  {
    "unformattedName": "antenno",
    "affixName": "antenno"
  },
  {
    "unformattedName": "germo",
    "affixName": "germo"
  },
  {
    "unformattedName": "mammo",
    "affixName": "mammo"
  },
  {
    "unformattedName": "radiculo",
    "affixName": "radiculo"
  },
  {
    "unformattedName": "sialyl",
    "affixName": "sialyl"
  },
  {
    "unformattedName": "static",
    "affixName": "static"
  },
  {
    "unformattedName": "estro",
    "affixName": "estro"
  },
  {
    "unformattedName": "morphy",
    "affixName": "morphy"
  },
  {
    "unformattedName": "mammillo",
    "affixName": "mammillo"
  },
  {
    "unformattedName": "corn",
    "affixName": "corn"
  },
  {
    "unformattedName": "proprio",
    "affixName": "proprio"
  },
  {
    "unformattedName": "squamoso",
    "affixName": "squamoso"
  },
  {
    "unformattedName": "circa",
    "affixName": "circa"
  },
  {
    "unformattedName": "pentadeca",
    "affixName": "pentadeca"
  },
  {
    "unformattedName": "tetr",
    "affixName": "tetr"
  },
  {
    "unformattedName": "docosa",
    "affixName": "docosa"
  },
  {
    "unformattedName": "tetradeca",
    "affixName": "tetradeca"
  },
  {
    "unformattedName": "umbilico",
    "affixName": "umbilico"
  },
  {
    "unformattedName": "allergo",
    "affixName": "allergo"
  },
  {
    "unformattedName": "ergia",
    "affixName": "ergia"
  },
  {
    "unformattedName": "agno",
    "affixName": "agno"
  },
  {
    "unformattedName": "cello",
    "affixName": "cello"
  },
  {
    "unformattedName": "angulo",
    "affixName": "angulo"
  },
  {
    "unformattedName": "fumi",
    "affixName": "fumi"
  },
  {
    "unformattedName": "attico",
    "affixName": "attico"
  },
  {
    "unformattedName": "branchio",
    "affixName": "branchio"
  },
  {
    "unformattedName": "supre",
    "affixName": "supre"
  },
  {
    "unformattedName": "arcto",
    "affixName": "arcto"
  },
  {
    "unformattedName": "presby",
    "affixName": "presby"
  },
  {
    "unformattedName": "pseud",
    "affixName": "pseud"
  },
  {
    "unformattedName": "juridico",
    "affixName": "juridico"
  },
  {
    "unformattedName": "lepido",
    "affixName": "lepido"
  },
  {
    "unformattedName": "naturo",
    "affixName": "naturo"
  },
  {
    "unformattedName": "dentalo",
    "affixName": "dentalo"
  },
  {
    "unformattedName": "iliaco",
    "affixName": "iliaco"
  },
  {
    "unformattedName": "carboxy",
    "affixName": "carboxy"
  },
  {
    "unformattedName": "gyneco",
    "affixName": "gyneco"
  },
  {
    "unformattedName": "logico",
    "affixName": "logico"
  },
  {
    "unformattedName": "sensori",
    "affixName": "sensori"
  },
  {
    "unformattedName": "arabino",
    "affixName": "arabino"
  },
  {
    "unformattedName": "caseo",
    "affixName": "caseo"
  },
  {
    "unformattedName": "oophoro",
    "affixName": "oophoro"
  },
  {
    "unformattedName": "ifuge",
    "affixName": "ifuge"
  },
  {
    "unformattedName": "ombro",
    "affixName": "ombro"
  },
  {
    "unformattedName": "pericardio",
    "affixName": "pericardio"
  },
  {
    "unformattedName": "planto",
    "affixName": "planto"
  },
  {
    "unformattedName": "low",
    "affixName": "low"
  },
  {
    "unformattedName": "celiaco",
    "affixName": "celiaco"
  },
  {
    "unformattedName": "ona",
    "affixName": "ona"
  },
  {
    "unformattedName": "clono",
    "affixName": "clono"
  },
  {
    "unformattedName": "patro",
    "affixName": "patro"
  },
  {
    "unformattedName": "stoichio",
    "affixName": "stoichio"
  },
  {
    "unformattedName": "syllecto",
    "affixName": "syllecto"
  },
  {
    "unformattedName": "chimero",
    "affixName": "chimero"
  },
  {
    "unformattedName": "cyrto",
    "affixName": "cyrto"
  },
  {
    "unformattedName": "eicosa",
    "affixName": "eicosa"
  },
  {
    "unformattedName": "haptico",
    "affixName": "haptico"
  },
  {
    "unformattedName": "teleio",
    "affixName": "teleio"
  },
  {
    "unformattedName": "nekto",
    "affixName": "nekto"
  },
  {
    "unformattedName": "dendrito",
    "affixName": "dendrito"
  },
  {
    "unformattedName": "ellipto",
    "affixName": "ellipto"
  },
  {
    "unformattedName": "ferto",
    "affixName": "ferto"
  },
  {
    "unformattedName": "reni",
    "affixName": "reni"
  },
  {
    "unformattedName": "articulo",
    "affixName": "articulo"
  },
  {
    "unformattedName": "coeruleo",
    "affixName": "coeruleo"
  },
  {
    "unformattedName": "corono",
    "affixName": "corono"
  },
  {
    "unformattedName": "phobo",
    "affixName": "phobo"
  },
  {
    "unformattedName": "galvo",
    "affixName": "galvo"
  },
  {
    "unformattedName": "iad",
    "affixName": "iad"
  },
  {
    "unformattedName": "dromo",
    "affixName": "dromo"
  },
  {
    "unformattedName": "lamino",
    "affixName": "lamino"
  },
  {
    "unformattedName": "ludo",
    "affixName": "ludo"
  },
  {
    "unformattedName": "occluso",
    "affixName": "occluso"
  },
  {
    "unformattedName": "crio",
    "affixName": "crio"
  },
  {
    "unformattedName": "toxo",
    "affixName": "toxo"
  },
  {
    "unformattedName": "trabeculo",
    "affixName": "trabeculo"
  },
  {
    "unformattedName": "farado",
    "affixName": "farado"
  },
  {
    "unformattedName": "phagous",
    "affixName": "phagous"
  },
  {
    "unformattedName": "foveo",
    "affixName": "foveo"
  },
  {
    "unformattedName": "chory",
    "affixName": "chory"
  },
  {
    "unformattedName": "penic",
    "affixName": "penic"
  },
  {
    "unformattedName": "intesto",
    "affixName": "intesto"
  },
  {
    "unformattedName": "respiro",
    "affixName": "respiro"
  },
  {
    "unformattedName": "ictero",
    "affixName": "ictero"
  },
  {
    "unformattedName": "oxido",
    "affixName": "oxido"
  },
  {
    "unformattedName": "tendo",
    "affixName": "tendo"
  },
  {
    "unformattedName": "inflammo",
    "affixName": "inflammo"
  },
  {
    "unformattedName": "maculo",
    "affixName": "maculo"
  },
  {
    "unformattedName": "peroxy",
    "affixName": "peroxy"
  },
  {
    "unformattedName": "capno",
    "affixName": "capno"
  },
  {
    "unformattedName": "furano",
    "affixName": "furano"
  },
  {
    "unformattedName": "pleni",
    "affixName": "pleni"
  },
  {
    "unformattedName": "indeno",
    "affixName": "indeno"
  },
  {
    "unformattedName": "api",
    "affixName": "api"
  },
  {
    "unformattedName": "laparo",
    "affixName": "laparo"
  },
  {
    "unformattedName": "otico",
    "affixName": "otico"
  },
  {
    "unformattedName": "acu",
    "affixName": "acu"
  },
  {
    "unformattedName": "capito",
    "affixName": "capito"
  },
  {
    "unformattedName": "pudendo",
    "affixName": "pudendo"
  },
  {
    "unformattedName": "duodeca",
    "affixName": "duodeca"
  },
  {
    "unformattedName": "cario",
    "affixName": "cario"
  },
  {
    "unformattedName": "pluvio",
    "affixName": "pluvio"
  },
  {
    "unformattedName": "ostio",
    "affixName": "ostio"
  },
  {
    "unformattedName": "plexo",
    "affixName": "plexo"
  },
  {
    "unformattedName": "asialo",
    "affixName": "asialo"
  },
  {
    "unformattedName": "troph",
    "affixName": "troph"
  },
  {
    "unformattedName": "zygoto",
    "affixName": "zygoto"
  },
  {
    "unformattedName": "spermia",
    "affixName": "spermia"
  },
  {
    "unformattedName": "methano",
    "affixName": "methano"
  },
  {
    "unformattedName": "wich",
    "affixName": "wich"
  },
  {
    "unformattedName": "silvi",
    "affixName": "silvi"
  },
  {
    "unformattedName": "sinu",
    "affixName": "sinu"
  },
  {
    "unformattedName": "bacillo",
    "affixName": "bacillo"
  },
  {
    "unformattedName": "eleuthero",
    "affixName": "eleuthero"
  },
  {
    "unformattedName": "palmo",
    "affixName": "palmo"
  },
  {
    "unformattedName": "hydrido",
    "affixName": "hydrido"
  },
  {
    "unformattedName": "incudo",
    "affixName": "incudo"
  },
  {
    "unformattedName": "goer",
    "affixName": "goer"
  },
  {
    "unformattedName": "stathmo",
    "affixName": "stathmo"
  },
  {
    "unformattedName": "hippocampo",
    "affixName": "hippocampo"
  },
  {
    "unformattedName": "grano",
    "affixName": "grano"
  },
  {
    "unformattedName": "lumino",
    "affixName": "lumino"
  },
  {
    "unformattedName": "stasis",
    "affixName": "stasis"
  },
  {
    "unformattedName": "ramo",
    "affixName": "ramo"
  },
  {
    "unformattedName": "chordo",
    "affixName": "chordo"
  },
  {
    "unformattedName": "popliteo",
    "affixName": "popliteo"
  },
  {
    "unformattedName": "ribonucleo",
    "affixName": "ribonucleo"
  },
  {
    "unformattedName": "tycho",
    "affixName": "tycho"
  },
  {
    "unformattedName": "campylo",
    "affixName": "campylo"
  },
  {
    "unformattedName": "caulo",
    "affixName": "caulo"
  },
  {
    "unformattedName": "loco",
    "affixName": "loco"
  },
  {
    "unformattedName": "evapo",
    "affixName": "evapo"
  },
  {
    "unformattedName": "tyro",
    "affixName": "tyro"
  },
  {
    "unformattedName": "pensioner",
    "affixName": "pensioner"
  },
  {
    "unformattedName": "rifa",
    "affixName": "rifa"
  },
  {
    "unformattedName": "chao",
    "affixName": "chao"
  },
  {
    "unformattedName": "hodo",
    "affixName": "hodo"
  },
  {
    "unformattedName": "ocello",
    "affixName": "ocello"
  },
  {
    "unformattedName": "cancero",
    "affixName": "cancero"
  },
  {
    "unformattedName": "dieto",
    "affixName": "dieto"
  },
  {
    "unformattedName": "areolo",
    "affixName": "areolo"
  },
  {
    "unformattedName": "rugulo",
    "affixName": "rugulo"
  },
  {
    "unformattedName": "meteoro",
    "affixName": "meteoro"
  },
  {
    "unformattedName": "tapho",
    "affixName": "tapho"
  },
  {
    "unformattedName": "tergo",
    "affixName": "tergo"
  },
  {
    "unformattedName": "archae",
    "affixName": "archae"
  },
  {
    "unformattedName": "prostato",
    "affixName": "prostato"
  },
  {
    "unformattedName": "rugo",
    "affixName": "rugo"
  },
  {
    "unformattedName": "solvo",
    "affixName": "solvo"
  },
  {
    "unformattedName": "climo",
    "affixName": "climo"
  },
  {
    "unformattedName": "ducto",
    "affixName": "ducto"
  },
  {
    "unformattedName": "proso",
    "affixName": "proso"
  },
  {
    "unformattedName": "oscillo",
    "affixName": "oscillo"
  },
  {
    "unformattedName": "trapezio",
    "affixName": "trapezio"
  },
  {
    "unformattedName": "itic",
    "affixName": "itic"
  },
  {
    "unformattedName": "histolo",
    "affixName": "histolo"
  },
  {
    "unformattedName": "nitroso",
    "affixName": "nitroso"
  },
  {
    "unformattedName": "neutro",
    "affixName": "neutro"
  },
  {
    "unformattedName": "volcano",
    "affixName": "volcano"
  },
  {
    "unformattedName": "canalo",
    "affixName": "canalo"
  },
  {
    "unformattedName": "externo",
    "affixName": "externo"
  },
  {
    "unformattedName": "ato",
    "affixName": "ato"
  },
  {
    "unformattedName": "triplo",
    "affixName": "triplo"
  },
  {
    "unformattedName": "plantaro",
    "affixName": "plantaro"
  },
  {
    "unformattedName": "uvulo",
    "affixName": "uvulo"
  },
  {
    "unformattedName": "ense",
    "affixName": "ense"
  },
  {
    "unformattedName": "fem",
    "affixName": "fem"
  },
  {
    "unformattedName": "aft",
    "affixName": "aft"
  },
  {
    "unformattedName": "limbo",
    "affixName": "limbo"
  },
  {
    "unformattedName": "stibo",
    "affixName": "stibo"
  },
  {
    "unformattedName": "densito",
    "affixName": "densito"
  },
  {
    "unformattedName": "ography",
    "affixName": "ography"
  },
  {
    "unformattedName": "acetabulo",
    "affixName": "acetabulo"
  },
  {
    "unformattedName": "mixo",
    "affixName": "mixo"
  },
  {
    "unformattedName": "curvi",
    "affixName": "curvi"
  },
  {
    "unformattedName": "pelago",
    "affixName": "pelago"
  },
  {
    "unformattedName": "tubo",
    "affixName": "tubo"
  },
  {
    "unformattedName": "causto",
    "affixName": "causto"
  },
  {
    "unformattedName": "synovio",
    "affixName": "synovio"
  },
  {
    "unformattedName": "tany",
    "affixName": "tany"
  },
  {
    "unformattedName": "altero",
    "affixName": "altero"
  },
  {
    "unformattedName": "cribro",
    "affixName": "cribro"
  },
  {
    "unformattedName": "pesca",
    "affixName": "pesca"
  },
  {
    "unformattedName": "archæo",
    "affixName": "archæo"
  },
  {
    "unformattedName": "pulpo",
    "affixName": "pulpo"
  },
  {
    "unformattedName": "basio",
    "affixName": "basio"
  },
  {
    "unformattedName": "ophidio",
    "affixName": "ophidio"
  },
  {
    "unformattedName": "insulo",
    "affixName": "insulo"
  },
  {
    "unformattedName": "labro",
    "affixName": "labro"
  },
  {
    "unformattedName": "staturo",
    "affixName": "staturo"
  },
  {
    "unformattedName": "epilepto",
    "affixName": "epilepto"
  },
  {
    "unformattedName": "interio",
    "affixName": "interio"
  },
  {
    "unformattedName": "phanero",
    "affixName": "phanero"
  },
  {
    "unformattedName": "taxono",
    "affixName": "taxono"
  },
  {
    "unformattedName": "quadra",
    "affixName": "quadra"
  },
  {
    "unformattedName": "septico",
    "affixName": "septico"
  },
  {
    "unformattedName": "sexo",
    "affixName": "sexo"
  },
  {
    "unformattedName": "parotideo",
    "affixName": "parotideo"
  },
  {
    "unformattedName": "meteo",
    "affixName": "meteo"
  },
  {
    "unformattedName": "tetracosa",
    "affixName": "tetracosa"
  },
  {
    "unformattedName": "midi",
    "affixName": "midi"
  },
  {
    "unformattedName": "rhombi",
    "affixName": "rhombi"
  },
  {
    "unformattedName": "taxo",
    "affixName": "taxo"
  },
  {
    "unformattedName": "&amp;beta;",
    "affixName": "&amp;beta;"
  },
  {
    "unformattedName": "ception",
    "affixName": "ception"
  },
  {
    "unformattedName": "person",
    "affixName": "person"
  },
  {
    "unformattedName": "lachrymo",
    "affixName": "lachrymo"
  },
  {
    "unformattedName": "zoon",
    "affixName": "zoon"
  },
  {
    "unformattedName": "Cypro",
    "affixName": "Cypro"
  },
  {
    "unformattedName": "misia",
    "affixName": "misia"
  },
  {
    "unformattedName": "flux",
    "affixName": "flux"
  },
  {
    "unformattedName": "plasmo",
    "affixName": "plasmo"
  },
  {
    "unformattedName": "pepto",
    "affixName": "pepto"
  },
  {
    "unformattedName": "hella",
    "affixName": "hella"
  },
  {
    "unformattedName": "glucosyl",
    "affixName": "glucosyl"
  },
  {
    "unformattedName": "kino",
    "affixName": "kino"
  },
  {
    "unformattedName": "nigro",
    "affixName": "nigro"
  },
  {
    "unformattedName": "pelagi",
    "affixName": "pelagi"
  },
  {
    "unformattedName": "adelpho",
    "affixName": "adelpho"
  },
  {
    "unformattedName": "ennium",
    "affixName": "ennium"
  },
  {
    "unformattedName": "loki",
    "affixName": "loki"
  },
  {
    "unformattedName": "intradermo",
    "affixName": "intradermo"
  },
  {
    "unformattedName": "phagic",
    "affixName": "phagic"
  },
  {
    "unformattedName": "endocrino",
    "affixName": "endocrino"
  },
  {
    "unformattedName": "erie",
    "affixName": "erie"
  },
  {
    "unformattedName": "tango",
    "affixName": "tango"
  },
  {
    "unformattedName": "fabello",
    "affixName": "fabello"
  },
  {
    "unformattedName": "tant",
    "affixName": "tant"
  },
  {
    "unformattedName": "acoustico",
    "affixName": "acoustico"
  },
  {
    "unformattedName": "carto",
    "affixName": "carto"
  },
  {
    "unformattedName": "R",
    "affixName": "R"
  },
  {
    "unformattedName": "phospha",
    "affixName": "phospha"
  },
  {
    "unformattedName": "nomo",
    "affixName": "nomo"
  },
  {
    "unformattedName": "interno",
    "affixName": "interno"
  },
  {
    "unformattedName": "pulmo",
    "affixName": "pulmo"
  },
  {
    "unformattedName": "sinuso",
    "affixName": "sinuso"
  },
  {
    "unformattedName": "kalo",
    "affixName": "kalo"
  },
  {
    "unformattedName": "genu",
    "affixName": "genu"
  },
  {
    "unformattedName": "gephyro",
    "affixName": "gephyro"
  },
  {
    "unformattedName": "sulco",
    "affixName": "sulco"
  },
  {
    "unformattedName": "viri",
    "affixName": "viri"
  },
  {
    "unformattedName": "coli",
    "affixName": "coli"
  },
  {
    "unformattedName": "omento",
    "affixName": "omento"
  },
  {
    "unformattedName": "mamma",
    "affixName": "mamma"
  },
  {
    "unformattedName": "coronaro",
    "affixName": "coronaro"
  },
  {
    "unformattedName": "seno",
    "affixName": "seno"
  },
  {
    "unformattedName": "bound",
    "affixName": "bound"
  },
  {
    "unformattedName": "flexi",
    "affixName": "flexi"
  },
  {
    "unformattedName": "meibo",
    "affixName": "meibo"
  },
  {
    "unformattedName": "pupillo",
    "affixName": "pupillo"
  },
  {
    "unformattedName": "Turco",
    "affixName": "Turco"
  },
  {
    "unformattedName": "zyme",
    "affixName": "zyme"
  },
  {
    "unformattedName": "παρά",
    "affixName": "παρά"
  },
  {
    "unformattedName": "alis",
    "affixName": "alis"
  },
  {
    "unformattedName": "ior",
    "affixName": "ior"
  },
  {
    "unformattedName": "fare",
    "affixName": "fare"
  },
  {
    "unformattedName": "anglo",
    "affixName": "anglo"
  },
  {
    "unformattedName": "ce",
    "affixName": "ce"
  },
  {
    "unformattedName": "inlaw",
    "affixName": "inlaw"
  },
  {
    "unformattedName": "wh",
    "affixName": "wh"
  },
  {
    "unformattedName": "lyng",
    "affixName": "lyng"
  },
  {
    "unformattedName": "ture",
    "affixName": "ture"
  },
  {
    "unformattedName": "ebo",
    "affixName": "ebo"
  },
  {
    "unformattedName": "cle",
    "affixName": "cle"
  },
  {
    "unformattedName": "tarian",
    "affixName": "tarian"
  },
  {
    "unformattedName": "euro",
    "affixName": "euro"
  },
  {
    "unformattedName": "our",
    "affixName": "our"
  },
  {
    "unformattedName": "somy",
    "affixName": "somy"
  },
  {
    "unformattedName": "ien",
    "affixName": "ien"
  },
  {
    "unformattedName": "u",
    "affixName": "u"
  },
  {
    "unformattedName": "roo",
    "affixName": "roo"
  },
  {
    "unformattedName": "ham",
    "affixName": "ham"
  },
  {
    "unformattedName": "v",
    "affixName": "v"
  },
  {
    "unformattedName": "succinyl",
    "affixName": "succinyl"
  },
  {
    "unformattedName": "estre",
    "affixName": "estre"
  },
  {
    "unformattedName": "coni",
    "affixName": "coni"
  },
  {
    "unformattedName": "nycto",
    "affixName": "nycto"
  },
  {
    "unformattedName": "aroo",
    "affixName": "aroo"
  },
  {
    "unformattedName": "vegas",
    "affixName": "vegas"
  },
  {
    "unformattedName": "euse",
    "affixName": "euse"
  },
  {
    "unformattedName": "is",
    "affixName": "is"
  }];

  const fixedAffixes = [];
 automateAffixes.forEach((affix) => {
    fixedAffixes.push({
        affixName: affix.affixName,
        affixDescription: affix.affixName,
    })
 })

  fs.writeFileSync(
     "fixedAffixes.js",
     JSON.stringify(fixedAffixes, null, 2),
     "utf8"
   );