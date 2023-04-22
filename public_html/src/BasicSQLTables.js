

var createCountryTable = function (caller) {


    var cmd = 'CREATE TABLE country( name VARCHAR(32), code VARCHAR(2), code_3 VARCHAR(3), number INTEGER PRIMARY KEY);';
    caller.execute(cmd);


    var insert = function (name, code2, code3, number, caller) {
        name = name.trim().toUpperCase();
        code2 = code2.trim().toUpperCase();
        code3 = code3.trim().toUpperCase();

        var ret = 'INSERT INTO country(name,code, code_3,number) VALUES ("' + name + '", \'' + code2 + '\',\'' + code3 + '\', ' + number + ');'

        caller.execute(ret, false);
    };

    insert('Afghanistan', 'AF', 'AFG', 4, caller);
    insert('Albania', 'AL', 'ALB', 8, caller);
    insert('Algeria', 'DZ', 'DZA', 12, caller);
    insert('American Samoa', 'AS', 'ASM', 16, caller);
    insert('Andorra', 'AD', 'AND', 20, caller);
    insert('Angola', 'AO', 'AGO', 24, caller);
    insert('Anguilla', 'AI', 'AIA', 660, caller);
    insert('Antarctica', 'AQ', 'ATA', 10, caller);
    insert('Antigua and Barbuda', 'AG', 'ATG', 28, caller);
    insert('Argentina', 'AR', 'ARG', 32, caller);
    insert('Armenia', 'AM', 'ARM', 51, caller);
    insert('Aruba', 'AW', 'ABW', 533, caller);
    insert('Australia', 'AU', 'AUS', 36, caller);
    insert('Austria', 'AT', 'AUT', 40, caller);
    insert('Azerbaijan', 'AZ', 'AZE', 31, caller);
    insert('Bahamas (the)', 'BS', 'BHS', 44, caller);
    insert('Bahrain', 'BH', 'BHR', 48, caller);
    insert('Bangladesh', 'BD', 'BGD', 50, caller);
    insert('Barbados', 'BB', 'BRB', 52, caller);
    insert('Belarus', 'BY', 'BLR', 112, caller);
    insert('Belgium', 'BE', 'BEL', 56, caller);
    insert('Belize', 'BZ', 'BLZ', 84, caller);
    insert('Benin', 'BJ', 'BEN', 204, caller);
    insert('Bermuda', 'BM', 'BMU', 60, caller);
    insert('Bhutan', 'BT', 'BTN', 64, caller);
    insert('Bolivia (Plurinational State of)', 'BO', 'BOL', 68, caller);
    insert('Bonaire, Sint Eustatius and Saba', 'BQ', 'BES', 535, caller);
    insert('Bosnia and Herzegovina', 'BA', 'BIH', 70, caller);
    insert('Botswana', 'BW', 'BWA', 72, caller);
    insert('Bouvet Island', 'BV', 'BVT', 74, caller);
    insert('Brazil', 'BR', 'BRA', 76, caller);
    insert('British Indian Ocean Territory (the)', 'IO', 'IOT', 86, caller);
    insert('Brunei Darussalam', 'BN', 'BRN', 96, caller);
    insert('Bulgaria', 'BG', 'BGR', 100, caller);
    insert('Burkina Faso', 'BF', 'BFA', 854, caller);
    insert('Burundi', 'BI', 'BDI', 108, caller);
    insert('Cabo Verde', 'CV', 'CPV', 132, caller);
    insert('Cambodia', 'KH', 'KHM', 116, caller);
    insert('Cameroon', 'CM', 'CMR', 120, caller);
    insert('Canada', 'CA', 'CAN', 124, caller);
    insert('Cayman Islands (the)', 'KY', 'CYM', 136, caller);
    insert('Central African Republic (the)', 'CF', 'CAF', 140, caller);
    insert('Chad', 'TD', 'TCD', 148, caller);
    insert('Chile', 'CL', 'CHL', 152, caller);
    insert('China', 'CN', 'CHN', 156, caller);
    insert('Christmas Island', 'CX', 'CXR', 162, caller);
    insert('Cocos (Keeling) Islands (the)', 'CC', 'CCK', 166, caller);
    insert('Colombia', 'CO', 'COL', 170, caller);
    insert('Comoros (the)', 'KM', 'COM', 174, caller);
    insert('Congo (the Democratic Republic of the)', 'CD', 'COD', 180, caller);
    insert('Congo (the)', 'CG', 'COG', 178, caller);
    insert('Cook Islands (the)', 'CK', 'COK', 184, caller);
    insert('Costa Rica', 'CR', 'CRI', 188, caller);
    insert('Croatia', 'HR', 'HRV', 191, caller);
    insert('Cuba', 'CU', 'CUB', 192, caller);
    insert('Curaçao', 'CW', 'CUW', 531, caller);
    insert('Cyprus', 'CY', 'CYP', 196, caller);
    insert('Czechia', 'CZ', 'CZE', 203, caller);
    insert('Cote d\'Ivoire', 'CI', 'CIV', 384, caller);
    insert('Denmark', 'DK', 'DNK', 208, caller);
    insert('Djibouti', 'DJ', 'DJI', 262, caller);
    insert('Dominica', 'DM', 'DMA', 212, caller);
    insert('Dominican Republic (the)', 'DO', 'DOM', 214, caller);
    insert('Ecuador', 'EC', 'ECU', 218, caller);
    insert('Egypt', 'EG', 'EGY', 818, caller);
    insert('El Salvador', 'SV', 'SLV', 222, caller);
    insert('Equatorial Guinea', 'GQ', 'GNQ', 226, caller);
    insert('Eritrea', 'ER', 'ERI', 232, caller);
    insert('Estonia', 'EE', 'EST', 233, caller);
    insert('Eswatini', 'SZ', 'SWZ', 748, caller);
    insert('Ethiopia', 'ET', 'ETH', 231, caller);
    insert('Falkland Islands (the) [Malvinas]', 'FK', 'FLK', 238, caller);
    insert('Faroe Islands (the)', 'FO', 'FRO', 234, caller);
    insert('Fiji', 'FJ', 'FJI', 242, caller);
    insert('Finland', 'FI', 'FIN', 246, caller);
    insert('France', 'FR', 'FRA', 250, caller);
    insert('French Guiana', 'GF', 'GUF', 254, caller);
    insert('French Polynesia', 'PF', 'PYF', 258, caller);
    insert('French Southern Territories (the)', 'TF', 'ATF', 260, caller);
    insert('Gabon', 'GA', 'GAB', 266, caller);
    insert('Gambia (the)', 'GM', 'GMB', 270, caller);
    insert('Georgia', 'GE', 'GEO', 268, caller);
    insert('Germany', 'DE', 'DEU', 276, caller);
    insert('Ghana', 'GH', 'GHA', 288, caller);
    insert('Gibraltar', 'GI', 'GIB', 292, caller);
    insert('Greece', 'GR', 'GRC', 300, caller);
    insert('Greenland', 'GL', 'GRL', 304, caller);
    insert('Grenada', 'GD', 'GRD', 308, caller);
    insert('Guadeloupe', 'GP', 'GLP', 312, caller);
    insert('Guam', 'GU', 'GUM', 316, caller);
    insert('Guatemala', 'GT', 'GTM', 320, caller);
    insert('Guernsey', 'GG', 'GGY', 831, caller);
    insert('Guinea', 'GN', 'GIN', 324, caller);
    insert('Guinea-Bissau', 'GW', 'GNB', 624, caller);
    insert('Guyana', 'GY', 'GUY', 328, caller);
    insert('Haiti', 'HT', 'HTI', 332, caller);
    insert('Heard Island and McDonald Islands', 'HM', 'HMD', 334, caller);
    insert('Holy See (the)', 'VA', 'VAT', 336, caller);
    insert('Honduras', 'HN', 'HND', 340, caller);
    insert('Hong Kong', 'HK', 'HKG', 344, caller);
    insert('Hungary', 'HU', 'HUN', 348, caller);
    insert('Iceland', 'IS', 'ISL', 352, caller);
    insert('India', 'IN', 'IND', 356, caller);
    insert('Indonesia', 'ID', 'IDN', 360, caller);
    insert('Iran (Islamic Republic of)', 'IR', 'IRN', 364, caller);
    insert('Iraq', 'IQ', 'IRQ', 368, caller);
    insert('Ireland', 'IE', 'IRL', 372, caller);
    insert('Isle of Man', 'IM', 'IMN', 833, caller);
    insert('Israel', 'IL', 'ISR', 376, caller);
    insert('Italy', 'IT', 'ITA', 380, caller);
    insert('Jamaica', 'JM', 'JAM', 388, caller);
    insert('Japan', 'JP', 'JPN', 392, caller);
    insert('Jersey', 'JE', 'JEY', 832, caller);
    insert('Jordan', 'JO', 'JOR', 400, caller);
    insert('Kazakhstan', 'KZ', 'KAZ', 398, caller);
    insert('Kenya', 'KE', 'KEN', 404, caller);
    insert('Kiribati', 'KI', 'KIR', 296, caller);
    insert('Korea (the Democratic People\'s Republic of)', 'KP', 'PRK', 408, caller);
    insert('Korea (the Republic of)', 'KR', 'KOR', 410, caller);
    insert('Kuwait', 'KW', 'KWT', 414, caller);
    insert('Kyrgyzstan', 'KG', 'KGZ', 417, caller);
    insert('Lao People\'s Democratic Republic (the)', 'LA', 'LAO', 418, caller);
    insert('Latvia', 'LV', 'LVA', 428, caller);
    insert('Lebanon', 'LB', 'LBN', 422, caller);
    insert('Lesotho', 'LS', 'LSO', 426, caller);
    insert('Liberia', 'LR', 'LBR', 430, caller);
    insert('Libya', 'LY', 'LBY', 434, caller);
    insert('Liechtenstein', 'LI', 'LIE', 438, caller);
    insert('Lithuania', 'LT', 'LTU', 440, caller);
    insert('Luxembourg', 'LU', 'LUX', 442, caller);
    insert('Macao', 'MO', 'MAC', 446, caller);
    insert('Madagascar', 'MG', 'MDG', 450, caller);
    insert('Malawi', 'MW', 'MWI', 454, caller);
    insert('Malaysia', 'MY', 'MYS', 458, caller);
    insert('Maldives', 'MV', 'MDV', 462, caller);
    insert('Mali', 'ML', 'MLI', 466, caller);
    insert('Malta', 'MT', 'MLT', 470, caller);
    insert('Marshall Islands (the)', 'MH', 'MHL', 584, caller);
    insert('Martinique', 'MQ', 'MTQ', 474, caller);
    insert('Mauritania', 'MR', 'MRT', 478, caller);
    insert('Mauritius', 'MU', 'MUS', 480, caller);
    insert('Mayotte', 'YT', 'MYT', 175, caller);
    insert('Mexico', 'MX', 'MEX', 484, caller);
    insert('Micronesia (Federated States of)', 'FM', 'FSM', 583, caller);
    insert('Moldova (the Republic of)', 'MD', 'MDA', 498, caller);
    insert('Monaco', 'MC', 'MCO', 492, caller);
    insert('Mongolia', 'MN', 'MNG', 496, caller);
    insert('Montenegro', 'ME', 'MNE', 499, caller);
    insert('Montserrat', 'MS', 'MSR', 500, caller);
    insert('Morocco', 'MA', 'MAR', 504, caller);
    insert('Mozambique', 'MZ', 'MOZ', 508, caller);
    insert('Myanmar', 'MM', 'MMR', 104, caller);
    insert('Namibia', 'NA', 'NAM', 516, caller);
    insert('Nauru', 'NR', 'NRU', 520, caller);
    insert('Nepal', 'NP', 'NPL', 524, caller);
    insert('Netherlands (the)', 'NL', 'NLD', 528, caller);
    insert('New Caledonia', 'NC', 'NCL', 540, caller);
    insert('New Zealand', 'NZ', 'NZL', 554, caller);
    insert('Nicaragua', 'NI', 'NIC', 558, caller);
    insert('Niger (the)', 'NE', 'NER', 562, caller);
    insert('Nigeria', 'NG', 'NGA', 566, caller);
    insert('Niue', 'NU', 'NIU', 570, caller);
    insert('Norfolk Island', 'NF', 'NFK', 574, caller);
    insert('Northern Mariana Islands (the)', 'MP', 'MNP', 580, caller);
    insert('Norway', 'NO', 'NOR', 578, caller);
    insert('Oman', 'OM', 'OMN', 512, caller);
    insert('Pakistan', 'PK', 'PAK', 586, caller);
    insert('Palau', 'PW', 'PLW', 585, caller);
    insert('Palestine, State of', 'PS', 'PSE', 275, caller);
    insert('Panama', 'PA', 'PAN', 591, caller);
    insert('Papua New Guinea', 'PG', 'PNG', 598, caller);
    insert('Paraguay', 'PY', 'PRY', 600, caller);
    insert('Peru', 'PE', 'PER', 604, caller);
    insert('Philippines (the)', 'PH', 'PHL', 608, caller);
    insert('Pitcairn', 'PN', 'PCN', 612, caller);
    insert('Poland', 'PL', 'POL', 616, caller);
    insert('Portugal', 'PT', 'PRT', 620, caller);
    insert('Puerto Rico', 'PR', 'PRI', 630, caller);
    insert('Qatar', 'QA', 'QAT', 634, caller);
    insert('Republic of North Macedonia', 'MK', 'MKD', 807, caller);
    insert('Romania', 'RO', 'ROU', 642, caller);
    insert('Russian Federation (the)', 'RU', 'RUS', 643, caller);
    insert('Rwanda', 'RW', 'RWA', 646, caller);
    insert('Réunion', 'RE', 'REU', 638, caller);
    insert('Saint Barthélemy', 'BL', 'BLM', 652, caller);
    insert('Saint Helena, Ascension and Tristan da Cunha', 'SH', 'SHN', 654, caller);
    insert('Saint Kitts and Nevis', 'KN', 'KNA', 659, caller);
    insert('Saint Lucia', 'LC', 'LCA', 662, caller);
    insert('Saint Martin (French part)', 'MF', 'MAF', 663, caller);
    insert('Saint Pierre and Miquelon', 'PM', 'SPM', 666, caller);
    insert('Saint Vincent and the Grenadines', 'VC', 'VCT', 670, caller);
    insert('Samoa', 'WS', 'WSM', 882, caller);
    insert('San Marino', 'SM', 'SMR', 674, caller);
    insert('Sao Tome and Principe', 'ST', 'STP', 678, caller);
    insert('Saudi Arabia', 'SA', 'SAU', 682, caller);
    insert('Senegal', 'SN', 'SEN', 686, caller);
    insert('Serbia', 'RS', 'SRB', 688, caller);
    insert('Seychelles', 'SC', 'SYC', 690, caller);
    insert('Sierra Leone', 'SL', 'SLE', 694, caller);
    insert('Singapore', 'SG', 'SGP', 702, caller);
    insert('Sint Maarten (Dutch part)', 'SX', 'SXM', 534, caller);
    insert('Slovakia', 'SK', 'SVK', 703, caller);
    insert('Slovenia', 'SI', 'SVN', 705, caller);
    insert('Solomon Islands', 'SB', 'SLB', 90, caller);
    insert('Somalia', 'SO', 'SOM', 706, caller);
    insert('South Africa', 'ZA', 'ZAF', 710, caller);
    insert('South Georgia and the South Sandwich Islands', 'GS', 'SGS', 239, caller);
    insert('South Sudan', 'SS', 'SSD', 728, caller);
    insert('Spain', 'ES', 'ESP', 724, caller);
    insert('Sri Lanka', 'LK', 'LKA', 144, caller);
    insert('Sudan (the)', 'SD', 'SDN', 729, caller);
    insert('Suriname', 'SR', 'SUR', 740, caller);
    insert('Svalbard and Jan Mayen', 'SJ', 'SJM', 744, caller);
    insert('Sweden', 'SE', 'SWE', 752, caller);
    insert('Switzerland', 'CH', 'CHE', 756, caller);
    insert('Syrian Arab Republic', 'SY', 'SYR', 760, caller);
    insert('Taiwan (Province of China)', 'TW', 'TWN', 158, caller);
    insert('Tajikistan', 'TJ', 'TJK', 762, caller);
    insert('Tanzania, United Republic of', 'TZ', 'TZA', 834, caller);
    insert('Thailand', 'TH', 'THA', 764, caller);
    insert('Timor-Leste', 'TL', 'TLS', 626, caller);
    insert('Togo', 'TG', 'TGO', 768, caller);
    insert('Tokelau', 'TK', 'TKL', 772, caller);
    insert('Tonga', 'TO', 'TON', 776, caller);
    insert('Trinidad and Tobago', 'TT', 'TTO', 780, caller);
    insert('Tunisia', 'TN', 'TUN', 788, caller);
    insert('Turkey', 'TR', 'TUR', 792, caller);
    insert('Turkmenistan', 'TM', 'TKM', 795, caller);
    insert('Turks and Caicos Islands (the)', 'TC', 'TCA', 796, caller);
    insert('Tuvalu', 'TV', 'TUV', 798, caller);
    insert('Uganda', 'UG', 'UGA', 800, caller);
    insert('Ukraine', 'UA', 'UKR', 804, caller);
    insert('United Arab Emirates (the)', 'AE', 'ARE', 784, caller);
    insert('United Kingdom of Great Britain and Northern Ireland (the)', 'GB', 'GBR', 826, caller);
    insert('United States Minor Outlying Islands (the)', 'UM', 'UMI', 581, caller);
    insert('United States of America (the)', 'US', 'USA', 840, caller);
    insert('Uruguay', 'UY', 'URY', 858, caller);
    insert('Uzbekistan', 'UZ', 'UZB', 860, caller);
    insert('Vanuatu', 'VU', 'VUT', 548, caller);
    insert('Venezuela (Bolivarian Republic of)', 'VE', 'VEN', 862, caller);
    insert('Viet Nam', 'VN', 'VNM', 704, caller);
    insert('Virgin Islands (British)', 'VG', 'VGB', 92, caller);
    insert('Virgin Islands (U.S.)', 'VI', 'VIR', 850, caller);
    insert('Wallis and Futuna', 'WF', 'WLF', 876, caller);
    insert('Western Sahara', 'EH', 'ESH', 732, caller);
    insert('Yemen', 'YE', 'YEM', 887, caller);
    insert('Zambia', 'ZM', 'ZMB', 894, caller);
    insert('Zimbabwe', 'ZW', 'ZWE', 716, caller);
    insert('Åland Islands', 'AX', 'ALA', 248, caller);


};

var createStateTable = function (caller) {

    var insert = function (name, code, caller) {
        name = name.trim().toUpperCase();
        code = code.trim().toUpperCase();

        var ret = 'INSERT INTO state(name,code) VALUES (\'' + name + '\',\'' + code + '\');'

        caller.execute(ret, false);
    };

    var cmd = 'CREATE TABLE state(id INTEGER PRIMARY KEY, name VARCHAR(32), code VARCHAR(2));';
    caller.execute(cmd, false);

    insert('ALABAMA', 'AL', caller);
    insert('alaska', 'ak', caller);
    insert('arizona', 'az', caller);
    insert('arkansas', 'ar', caller);
    insert('california', 'ca', caller);
    insert('colorado', 'co', caller);
    insert('conneticuit', 'ct', caller);
    insert('delaware', 'de', caller);
    insert('florida', 'fl', caller);
    insert('georgia', 'ga', caller);
    insert('hawaii', 'hi', caller);
    insert('idaho', 'id', caller);
    insert('illinois', 'il', caller);
    insert('indiana', 'in', caller);
    insert('iowa', 'ia', caller);
    insert('kansas', 'ks', caller);
    insert('kentucky', 'ky', caller);
    insert('louisiana', 'la', caller);
    insert('maine', 'me', caller);
    insert('maryland', 'md', caller);
    insert('massachusetts', 'ma', caller);
    insert('michigan', 'mi', caller);
    insert('minnisota', 'mn', caller);
    insert('missouri', 'mo', caller);
    insert('mississippi', 'ms', caller);
    insert('montana', 'mt', caller);
    insert('nebraska', 'ne', caller);
    insert('nevada', 'nv', caller);
    insert('new hampshire', 'nh', caller);
    insert('new jersey', 'nj', caller);
    insert('new york', 'ny', caller);
    insert('new mexico', 'nm', caller);
    insert('north carolina', 'nc', caller);
    insert('north dakota', 'nd', caller);
    insert('ohio', 'oh', caller);
    insert('oklahoma', 'ok', caller);
    insert('oregon', 'or', caller);
    insert('pennsylvania', 'pa', caller);
    insert('rhode island', 'ri', caller);
    insert('south carolina', 'sc', caller);
    insert('south dakota', 'sd', caller);
    insert('tennesee', 'tn', caller);
    insert('texas', 'tx', caller);
    insert('utah', 'ut', caller);
    insert('vermont', 'vt', caller);
    insert('virginia', 'va', caller);
    insert('washington', 'wa', caller);
    insert('west virginia', 'wv', caller);
    insert('wisconson', 'wi', caller);
    insert('wyoming', 'wy', caller);
    insert('discrict of columbia', 'dc', caller);
    insert('puerto rico', 'pr', caller);
    insert('guam', 'gu', caller);
    insert('american samoa', 'as', caller);
    insert('virgin islands', 'vi', caller);
    insert('trust territories', 'tt', caller);
    insert('northern mariana islands', 'mp', caller);









};

