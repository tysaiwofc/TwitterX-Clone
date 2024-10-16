const countryCodeToNumber: { [key: string]: number } = {
    "AF": 1, // Afeganistão
    "AL": 2, // Albânia
    "DZ": 3, // Argélia
    "AS": 4, // Samoa Americana
    "AD": 5, // Andorra
    "AO": 6, // Angola
    "AI": 7, // Anguilla
    "AQ": 8, // Antártica
    "AG": 9, // Antígua e Barbuda
    "AR": 10, // Argentina
    "AM": 11, // Armênia
    "AW": 12, // Aruba
    "AU": 13, // Austrália
    "AT": 14, // Áustria
    "AZ": 15, // Azerbaijão
    "BS": 16, // Bahamas
    "BH": 17, // Barein
    "BD": 18, // Bangladesh
    "BB": 19, // Barbados
    "BY": 20, // Bielorrússia
    "BE": 21, // Bélgica
    "BZ": 22, // Belize
    "BJ": 23, // Benin
    "BM": 24, // Bermudas
    "BT": 25, // Butão
    "BO": 26, // Bolívia
    "BQ": 27, // Bonaire
    "BA": 28, // Bósnia e Herzegovina
    "BW": 29, // Botsuana
    "BR": 30, // Brasil
    "BN": 31, // Brunei
    "BG": 32, // Bulgária
    "BF": 33, // Burquina Fasso
    "BI": 34, // Burundi
    "CV": 35, // Cabo Verde
    "KH": 36, // Camboja
    "CM": 37, // Camarões
    "CA": 38, // Canadá
    "KY": 39, // Ilhas Cayman
    "CF": 40, // República Centro-Africana
    "TD": 41, // Chade
    "CL": 42, // Chile
    "CN": 43, // China
    "CO": 44, // Colômbia
    "KM": 45, // Comores
    "CD": 46, // República Democrática do Congo
    "CG": 47, // República do Congo
    "CR": 48, // Costa Rica
    "HR": 49, // Croácia
    "CU": 50, // Cuba
    "CW": 51, // Curaçau
    "CY": 52, // Chipre
    "CZ": 53, // República Tcheca
    "DK": 54, // Dinamarca
    "DJ": 55, // Djibuti
    "DM": 56, // Dominica
    "DO": 57, // República Dominicana
    "EC": 58, // Equador
    "EG": 59, // Egito
    "SV": 60, // El Salvador
    "GQ": 61, // Guiné Equatorial
    "ER": 62, // Eritreia
    "EE": 63, // Estônia
    "SZ": 64, // Suazilândia
    "ET": 65, // Etiópia
    "FJ": 66, // Fiji
    "FI": 67, // Finlândia
    "FR": 68, // França
    "GA": 69, // Gabão
    "GM": 70, // Gâmbia
    "GE": 71, // Geórgia
    "DE": 72, // Alemanha
    "GH": 73, // Gana
    "GI": 74, // Gibraltar
    "GR": 75, // Grécia
    "GL": 76, // Groenlândia
    "GD": 77, // Granada
    "GP": 78, // Guadalupe
    "GU": 79, // Guam
    "GT": 80, // Guatemala
    "GN": 81, // Guiné
    "GW": 82, // Guiné-Bissau
    "GY": 83, // Guiana
    "HT": 84, // Haiti
    "HM": 85, // Ilhas Heard e McDonald
    "VA": 86, // Cidade do Vaticano
    "HN": 87, // Honduras
    "HK": 88, // Hong Kong
    "HU": 89, // Hungria
    "IS": 90, // Islândia
    "IN": 91, // Índia
    "ID": 92, // Indonésia
    "IR": 93, // Irã
    "IQ": 94, // Iraque
    "IE": 95, // Irlanda
    "IL": 96, // Israel
    "IT": 97, // Itália
    "JM": 98, // Jamaica
    "JP": 99, // Japão
    "JE": 100, // Jersey
    "JO": 101, // Jordânia
    "KZ": 102, // Cazaquistão
    "KE": 103, // Quênia
    "KI": 104, // Quiribati
    "KP": 105, // Coreia do Norte
    "KR": 106, // Coreia do Sul
    "KW": 107, // Kuwait
    "KG": 108, // Quirguistão
    "LA": 109, // Laos
    "LV": 110, // Letônia
    "LB": 111, // Líbano
    "LS": 112, // Lesoto
    "LR": 113, // Libéria
    "LY": 114, // Líbia
    "LI": 115, // Liechtenstein
    "LT": 116, // Lituânia
    "LU": 117, // Luxemburgo
    "MO": 118, // Macau
    "MG": 119, // Madagascar
    "MW": 120, // Malauí
    "MY": 121, // Malásia
    "MV": 122, // Maldivas
    "ML": 123, // Mali
    "MT": 124, // Malta
    "MH": 125, // Ilhas Marshall
    "MQ": 126, // Martinica
    "MR": 127, // Mauritânia
    "MU": 128, // Maurício
    "YT": 129, // Mayotte
    "MX": 130, // México
    "FM": 131, // Estados Federados da Micronésia
    "MD": 132, // Moldávia
    "MC": 133, // Mônaco
    "MN": 134, // Mongólia
    "ME": 135, // Montenegro
    "MS": 136, // Montserrat
    "MA": 137, // Marrocos
    "MZ": 138, // Moçambique
    "MM": 139, // Mianmar
    "NA": 140, // Namíbia
    "NR": 141, // Nauru
    "NP": 142, // Nepal
    "NL": 143, // Países Baixos
    "NC": 144, // Nova Caledônia
    "NZ": 145, // Nova Zelândia
    "NI": 146, // Nicarágua
    "NE": 147, // Níger
    "NG": 148, // Nigéria
    "NU": 149, // Niue
    "NF": 150, // Ilha Norfolk
    "MP": 151, // Ilhas Marianas do Norte
    "NO": 152, // Noruega
    "OM": 153, // Omã
    "PK": 154, // Paquistão
    "PW": 155, // Palau
    "PS": 156, // Palestina
    "PA": 157, // Panamá
    "PG": 158, // Papua Nova Guiné
    "PY": 159, // Paraguai
    "PE": 160, // Peru
    "PH": 161, // Filipinas
    "PN": 162, // Ilhas Pitcairn
    "PL": 163, // Polônia
    "PT": 164, // Portugal
    "PR": 165, // Porto Rico
    "QA": 166, // Catar
    "RE": 167, // Reunião
    "RO": 168, // Romênia
    "RU": 169, // Rússia
    "RW": 170, // Ruanda
    "BL": 171, // São Bartolomeu
    "SH": 172, // Santa Helena
    "KN": 173, // São Cristóvão e Névis
    "LC": 174, // Santa Lúcia
    "MF": 175, // São Martinho
    "PM": 176, // Saint Pierre e Miquelon
    "VC": 177, // São Vicente e Granadinas
    "WS": 178, // Samoa
    "SM": 179, // San Marino
    "ST": 180, // São Tomé e Príncipe
    "SA": 181, // Arábia Saudita
    "SN": 182, // Senegal
    "RS": 183, // Sérvia
    "SC": 184, // Seicheles
    "SL": 185, // Serra Leoa
    "SG": 186, // Cingapura
    "SX": 187, // Sint Maarten
    "SK": 188, // Eslováquia
    "SI": 189, // Eslovênia
    "SB": 190, // Ilhas Salomão
    "SO": 191, // Somália
    "ZA": 192, // África do Sul
    "GS": 193, // Geórgia do Sul e Ilhas Sandwich do Sul
    "SS": 194, // Sudão do Sul
    "ES": 195, // Espanha
    "LK": 196, // Sri Lanka
    "SD": 197, // Sudão
    "SR": 198, // Suriname
    "SJ": 199, // Svalbard e Jan Mayen
    "SE": 201, // Suécia
    "CH": 202, // Suíça
    "SY": 203, // Síria
    "TJ": 204, // Tajiquistão
    "TZ": 205, // Tanzânia
    "TH": 206, // Tailândia
    "TL": 207, // Timor-Leste
    "TG": 208, // Togo
    "TK": 209, // Tokelau
    "TO": 210, // Tonga
    "TT": 211, // Trindade e Tobago
    "TN": 212, // Tunísia
    "TR": 213, // Turquia
    "TM": 214, // Turcomenistão
    "TC": 215, // Ilhas Turcas e Caicos
    "TV": 216, // Tuvalu
    "UG": 217, // Uganda
    "UA": 218, // Ucrânia
    "AE": 219, // Emirados Árabes Unidos
    "GB": 220, // Reino Unido
    "US": 221, // Estados Unidos
    "UY": 222, // Uruguai
    "UZ": 223, // Uzbequistão
    "VU": 224, // Vanuatu
    "VE": 225, // Venezuela
    "VN": 226, // Vietnã
    "WF": 227, // Wallis e Futuna
    "EH": 228, // Saara Ocidental
    "YE": 229, // Iémen
    "ZM": 230, // Zâmbia
    "ZW": 231, // Zimbábue
  };
  

export default countryCodeToNumber;