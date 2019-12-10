var config = {
  shipingCost: 0.50,
  vat: 0.18,
}

var data = {
  contents: [{name:'Bottle'}, {name:'Books'}, {name:'Book ends'}, {name:'Boxing gloves'}],
  adress: [
    {adress:'24 Hudson Pl', name:'Cambridge MA', state:"Massachusetts", postCode: "02138", country: "United States"},
    {adress:'24 Hudson Pl', name:'East Bridgewater MA', state:"Massachusetts", postCode: "02333", country: "United States"},
    {adress:'24 Hudson Pl', name:'Woburn MA', state:"Massachusetts", postCode: "01801", country: "United States"},
    {adress:'24 Hudson Pl', name:'Providence RI', state:"Massachusetts", postCode: "02905", country: "United States"},
  ]
}

var collectionsAdr = [
  {x:51.483401, y:-0.308001, logo: "icon-store.png", distance: "0.1", name:"Collect+ at MARTINS", adress:"205 High Street, Brentford, Middlesex", postcode: "TW8 8AH", worktime: [{days: "Mon - Sat", time: "06:00 - 19:30"}, {days: "Sun", time: "07:00 - 16:00"}]},
  {x:51.482773, y:-0.309181, logo: "icon-store.png", distance: "0.2", name:"Star save", adress:"210 High Street, Brentford, Middlesex", postcode: "TW8 8AH", worktime: [{days: "Mon - Sat", time: "06:00 - 19:00"}, {days: "Sun", time: "07:00 - 16:00"}]},
  {x:51.482725, y:-0.308208, logo: "icon-store.png", distance: "0.5", name:"Cineco", adress:"235 High Street, Brentford, Middlesex", postcode: "TW8 8AH", worktime: [{days: "Mon - Sat", time: "07:00 - 18:30"}, {days: "Sun", time: "07:00 - 16:00"}]},
  {x:51.479373, y:-0.320580, logo: "icon-store.png", distance: "0.5", name:"Tesco Express", adress:"193 London Road, Isleworth Middlesex", postcode: "TW8 8AH", worktime: [{days: "Mon - Sat", time: "07:00 - 18:30"}, {days: "Sun", time: "07:00 - 16:00"}]},
  {x:51.479106, y:-0.323391, logo: "icon-store.png", distance: "0.8", name:"Bayleaves Tandoori", adress:"3 Spur Rd, Isleworth", postcode: "TW7 5BD", worktime: [{days: "Mon - Sat", time: "07:00 - 18:30"}, {days: "Sun", time: "07:00 - 16:00"}]},
  {x:51.479032, y:-0.322586, logo: "icon-store.png", distance: "0.8", name:"Isleworth Kebabs", adress:"144A London Rd, Isleworth", postcode: "TW7 5BG", worktime: [{days: "Mon - Sat", time: "07:00 - 18:30"}, {days: "Sun", time: "07:00 - 16:00"}]},
];