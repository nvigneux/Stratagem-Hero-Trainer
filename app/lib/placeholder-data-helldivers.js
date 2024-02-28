const categories = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Patriotic Administration Center',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Orbital Cannons',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hanger',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Bridge',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Engineering Bay',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Robotics Workshop',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'General Stategems',
  },
];

const PATRIOTIC_ADMINISTRATION_CENTER = [
  {
    name: 'Machine Gun',
    code: ['down', 'left', 'down', 'up', 'right'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Anti-Material Rifle',
    code: ['down', 'left', 'right', 'up', 'down'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Stalwart',
    code: ['down', 'left', 'down', 'up', 'up', 'left'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Expendable Anti-Tank',
    code: ['down', 'down', 'left', 'up', 'right'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Recoilless Rifle',
    code: ['down', 'left', 'right', 'right', 'left'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Flamethrower',
    code: ['down', 'left', 'up', 'down', 'up'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Autocannon',
    code: ['down', 'right', 'left', 'down', 'down', 'up', 'up', 'right'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Railgun',
    code: ['down', 'right', 'left', 'down', 'down', 'up', 'left', 'down', 'right'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Spear',
    code: ['down', 'down', 'up', 'down', 'down'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
];

const ORBITAL_CANNONS = [
  {
    name: 'Orbital Gatling Barrage',
    code: ['right', 'down', 'left', 'up', 'up'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Orbital Airburst Strike',
    code: ['right', 'right', 'right'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Orbital 120MM HE Barrage',
    code: ['right', 'down', 'down', 'left', 'down', 'right', 'down', 'down'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Orbital 380MM HE Barrage',
    code: ['right', 'down', 'down', 'up', 'up', 'left', 'down', 'down', 'down'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Orbital Walking Barrage',
    code: ['right', 'down', 'right', 'down', 'right', 'down'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Orbital Laser',
    code: ['right', 'up', 'left', 'up', 'right', 'left'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Orbital Railcannon Strike',
    code: ['right', 'down', 'up', 'down', 'left'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
];

const HANGER = [
  {
    name: 'Eagle Strafing Run',
    code: ['up', 'right', 'right'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Eagle Airstrike',
    code: ['up', 'right', 'down', 'right'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Eagle Cluster Bomb',
    code: ['up', 'right', 'down', 'down', 'right', 'down'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Eagle Napalm Airstrike',
    code: ['up', 'right', 'down', 'up'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Jump Pack',
    code: ['down', 'up', 'up', 'down', 'up'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Eagle Smoke Strike',
    code: ['up', 'right', 'up', 'down'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Eagle 110MM Rocket Pods',
    code: ['up', 'down', 'up', 'left'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Eagle 500KG Bomb',
    code: ['up', 'left', 'down', 'down', 'down'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
];

const BRIDGE = [
  {
    name: 'Orbital Precision Strike',
    code: ['right', 'right', 'up'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    image_url: '',
  },
  {
    name: 'Orbital Gas Strike',
    code: ['right', 'right', 'down', 'right'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    image_url: '',
  },
  {
    name: 'Orbital EMS Strike',
    code: ['right', 'right', 'left', 'down'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    image_url: '',
  },
  {
    name: 'Orbital Smoke Strike',
    code: ['right', 'right', 'down', 'up'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    image_url: '',
  },
  {
    name: 'HMG Emplacement',
    code: ['up', 'down', 'left', 'right', 'right', 'left'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    image_url: '',
  },
  {
    name: 'Shield Generator Relay',
    code: ['down', 'up', 'left', 'right', 'left', 'down'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    image_url: '',
  },
  {
    name: 'Tesla Tower',
    code: ['down', 'up', 'right', 'up', 'left', 'right'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    image_url: '',
  },
];

const ENGINEERING_BAY = [
  {
    name: 'Anti-Personnel Minefield',
    code: ['down', 'left', 'down', 'up', 'right'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Supply Pack',
    code: ['down', 'left', 'down', 'up', 'up', 'down'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Grenade Launcher',
    code: ['down', 'left', 'down', 'up', 'left', 'down', 'down'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Laser Cannon',
    code: ['down', 'left', 'down', 'up', 'left'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Incendiary Mines',
    code: ['down', 'left', 'left', 'down'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: '“Guard Dog” Rover',
    code: ['down', 'left', 'down', 'up', 'left', 'down', 'down'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Ballistic Shield Backpack',
    code: ['down', 'left', 'up', 'up', 'right'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Arc Thrower',
    code: ['down', 'right', 'up', 'left', 'down'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
  {
    name: 'Shield Generator Pack',
    code: ['down', 'up', 'left', 'down', 'right', 'right'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    image_url: '',
  },
];

const ROBOTICS_WORKSHOP = [
  {
    name: 'Machine Gun Sentry',
    code: ['down', 'up', 'right', 'down', 'right', 'down', 'up'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    image_url: '',
  },
  {
    name: 'Gatling Sentry',
    code: ['down', 'up', 'right', 'left', 'down'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    image_url: '',
  },
  {
    name: 'Mortar Sentry',
    code: ['down', 'up', 'right', 'right', 'down'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    image_url: '',
  },
  {
    name: '“Guard Dog”',
    code: ['down', 'up', 'left', 'down', 'up', 'right', 'down'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    image_url: '',
  },
  {
    name: 'Autocannon Sentry',
    code: ['down', 'up', 'right', 'up', 'left', 'up'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    image_url: '',
  },
  {
    name: 'Rocket Sentry',
    code: ['down', 'up', 'right', 'right', 'left'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    image_url: '',
  },
  {
    name: 'EMS Mortar Sentry',
    code: ['down', 'down', 'up', 'up', 'left'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    image_url: '',
  },
];

const GENERAL_STRATEGEMS = [
  {
    name: 'Reinforce',
    code: ['up', 'down', 'right', 'left', 'up'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    image_url: '',
  },
  {
    name: 'SOS Beacon',
    code: ['up', 'down', 'right', 'up'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    image_url: '',
  },
  {
    name: 'Super Earth Flag',
    code: ['up', 'down', 'up', 'down'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    image_url: '',
  },
  {
    name: 'Upload Data',
    code: ['left', 'right', 'up', 'up', 'up'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    image_url: '',
  },
  {
    name: 'Hellbomb',
    code: ['down', 'up', 'left', 'down', 'up', 'right', 'down', 'up'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    image_url: '',
  },
];

const stratagems = [
  ...PATRIOTIC_ADMINISTRATION_CENTER,
  ...ORBITAL_CANNONS,
  ...HANGER,
  ...BRIDGE,
  ...ENGINEERING_BAY,
  ...ROBOTICS_WORKSHOP,
  ...GENERAL_STRATEGEMS,
];

module.exports = {
  categories,
  stratagems,
};
