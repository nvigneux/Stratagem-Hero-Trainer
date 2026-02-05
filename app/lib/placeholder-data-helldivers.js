const CATEGORIES = [
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
    name: 'Hangar',
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
    id: '06a89b98-cc7a-46ac-a8fb-7bbf12d5cb78',
    name: 'Chemical Agents',
  },
  {
    id: 'de1fb4c0-9ae8-4690-af44-90325cf11978',
    name: 'Urban Legends',
  },
  {
    id: 'f701e133-1fff-466c-8c84-3e99154ff778',
    name: 'Servants of Freedom',
  },
  {
    id: 'ee78a618-c92b-48e4-a514-b849a8ad0859',
    name: 'Borderline Justice',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'General Stratagems',
  },
  {
    id: '86a708cf-8def-4244-a86a-7e7680632807',
    name: 'Masters of Ceremony',
  },
  {
    id: 'aa878f90-85b0-4ea6-b7ef-3097bc0effd8',
    name: 'Force of Law',
  },
  {
    id: '347b11f0-ef3e-49ae-af7e-f16d02a0f8eb',
    name: 'Control Group',
  },
  {
    id: '1fbf16b0-2726-4188-9f9d-11cd31224168',
    name: 'Dust Devils',
  },
  {
    id: '77fda1c3-b8c9-4d13-a1ba-4f6e036b65f1',
    name: 'Python Commandos',
  },
  {
    id: '8877a3a0-668a-4495-9606-e35a6d719cb4',
    name: 'Redacted Regiment',
  },
  {
    id: 'd4f10c99-fe1b-4357-a927-343f216dc4c0',
    name: 'Siege Breakers',
  },
];

const PATRIOTIC_ADMINISTRATION_CENTER = [
  {
    name: 'Machine Gun',
    code: ['down', 'left', 'down', 'up', 'right'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Anti-Materiel Rifle',
    code: ['down', 'left', 'right', 'up', 'down'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Stalwart',
    code: ['down', 'left', 'down', 'up', 'up', 'left'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Expendable Anti-Tank',
    code: ['down', 'down', 'left', 'up', 'right'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Recoilless Rifle',
    code: ['down', 'left', 'right', 'right', 'left'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Flamethrower',
    code: ['down', 'left', 'up', 'down', 'up'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Autocannon',
    code: ['down', 'left', 'down', 'up', 'up', 'right'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Heavy Machine Gun',
    code: ['down', 'left', 'up', 'down', 'down'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Airburst Rocket Launcher',
    code: ['down', 'up', 'up', 'left', 'right'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Commando',
    code: ['down', 'left', 'up', 'down', 'right'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Railgun',
    code: ['down', 'right', 'down', 'up', 'left', 'right'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Spear',
    code: ['down', 'down', 'up', 'down', 'down'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'StA-X3 W.A.S.P. Launcher',
    code: ['down', 'down', 'up', 'down', 'right'],
    category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
];

const ORBITAL_CANNONS = [
  {
    name: 'Orbital Gatling Barrage',
    code: ['right', 'down', 'left', 'up', 'up'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Orbital Airburst Strike',
    code: ['right', 'right', 'right'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Orbital 120MM HE Barrage',
    code: ['right', 'right', 'down', 'left', 'right', 'down'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Orbital 380MM HE Barrage',
    code: ['right', 'down', 'up', 'up', 'left', 'down', 'down'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Orbital Walking Barrage',
    code: ['right', 'down', 'right', 'down', 'right', 'down'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Orbital Laser',
    code: ['right', 'down', 'up', 'right', 'down'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Orbital Napalm Barrage',
    code: ['right', 'right', 'down', 'left', 'right', 'up'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Orbital Railcannon Strike',
    code: ['right', 'up', 'down', 'down', 'right'],
    category_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
  },
];

const HANGER = [
  {
    name: 'Eagle Strafing Run',
    code: ['up', 'right', 'right'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Eagle Airstrike',
    code: ['up', 'right', 'down', 'right'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Eagle Cluster Bomb',
    code: ['up', 'right', 'down', 'down', 'right'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Eagle Napalm Airstrike',
    code: ['up', 'right', 'down', 'up'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Jump Pack',
    code: ['down', 'up', 'up', 'down', 'up'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Eagle Smoke Strike',
    code: ['up', 'right', 'up', 'down'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Eagle 110MM Rocket Pods',
    code: ['up', 'right', 'up', 'left'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Eagle 500KG Bomb',
    code: ['up', 'right', 'down', 'down', 'down'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Fast Recon Vehicle',
    code: ['left', 'down', 'right', 'down', 'right', 'down', 'up'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Eagle Rearm',
    code: ['up', 'up', 'left', 'up', 'right'],
    category_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
  },
];

const BRIDGE = [
  {
    name: 'Orbital Precision Strike',
    code: ['right', 'right', 'up'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
  },
  {
    name: 'Orbital Gas Strike',
    code: ['right', 'right', 'down', 'right'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
  },
  {
    name: 'Orbital EMS Strike',
    code: ['right', 'right', 'left', 'down'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
  },
  {
    name: 'Orbital Smoke Strike',
    code: ['right', 'right', 'down', 'up'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
  },
  {
    name: 'HMG Emplacement',
    code: ['down', 'up', 'left', 'right', 'right', 'left'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
  },
  {
    name: 'Shield Generator Relay',
    code: ['down', 'down', 'left', 'right', 'left', 'right'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
  },
  {
    name: 'Tesla Tower',
    code: ['down', 'up', 'right', 'up', 'left', 'right'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
  },
  {
    name: 'Grenadier Battlement',
    code: ['down', 'right', 'down', 'left', 'right'],
    category_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
  },
];

const ENGINEERING_BAY = [
  {
    name: 'Anti-Personnel Minefield',
    code: ['down', 'left', 'up', 'right'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Supply Pack',
    code: ['down', 'left', 'down', 'up', 'up', 'down'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Grenade Launcher',
    code: ['down', 'left', 'up', 'left', 'down'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Laser Cannon',
    code: ['down', 'left', 'down', 'up', 'left'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Incendiary Mines',
    code: ['down', 'left', 'left', 'down'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
  },
  {
    name: '“Guard Dog” Rover',
    code: ['down', 'up', 'left', 'up', 'right', 'right'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Ballistic Shield Backpack',
    code: ['down', 'left', 'down', 'down', 'up', 'left'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Arc Thrower',
    code: ['down', 'right', 'down', 'up', 'left', 'left'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Quasar Cannon',
    code: ['down', 'down', 'up', 'left', 'right'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Shield Generator Pack',
    code: ['down', 'up', 'left', 'right', 'left', 'right'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
  },
  {
    name: 'Gas Mines',
    code: ['down', 'left', 'left', 'right'],
    category_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
  },
];

const ROBOTICS_WORKSHOP = [
  {
    name: 'Machine Gun Sentry',
    code: ['down', 'up', 'right', 'right', 'up'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
  },
  {
    name: 'Gatling Sentry',
    code: ['down', 'up', 'right', 'left'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
  },
  {
    name: 'Mortar Sentry',
    code: ['down', 'up', 'right', 'right', 'down'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
  },
  {
    name: '“Guard Dog”',
    code: ['down', 'up', 'left', 'up', 'right', 'down'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
  },
  {
    name: 'Autocannon Sentry',
    code: ['down', 'up', 'right', 'up', 'left', 'up'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
  },
  {
    name: 'Rocket Sentry',
    code: ['down', 'up', 'right', 'right', 'left'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
  },
  {
    name: 'EMS Mortar Sentry',
    code: ['down', 'up', 'right', 'down', 'right'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
  },
  {
    name: 'Patriot Exosuit',
    code: ['left', 'down', 'right', 'up', 'left', 'down', 'down'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
  },
  {
    name: 'Emancipator Exosuit',
    code: ['left', 'down', 'right', 'up', 'left', 'down', 'up'],
    category_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
  },
];

const CHEMICAL_AGENTS = [
  {
    name: 'Sterilizer',
    code: ['down', 'left', 'up', 'down', 'left'],
    category_id: '06a89b98-cc7a-46ac-a8fb-7bbf12d5cb78',
  },
  {
    name: '“Guard Dog” Breath',
    code: ['down', 'up', 'left', 'up', 'right', 'up'],
    category_id: '06a89b98-cc7a-46ac-a8fb-7bbf12d5cb78',
  },
];

const URBAN_LEGENDS = [
  {
    name: 'Directional Shield',
    code: ['down', 'up', 'left', 'right', 'up', 'up'],
    category_id: 'de1fb4c0-9ae8-4690-af44-90325cf11978',
  },
  {
    name: 'Flame Sentry',
    code: ['down', 'up', 'right', 'down', 'up', 'up'],
    category_id: 'de1fb4c0-9ae8-4690-af44-90325cf11978',
  },
  {
    name: 'Anti-Tank Emplacement',
    code: ['down', 'up', 'left', 'right', 'right', 'right'],
    category_id: 'de1fb4c0-9ae8-4690-af44-90325cf11978',
  },
];

const SERVANTS_OF_FREEDOM = [
  {
    name: 'Hellbomb Portable',
    code: ['down', 'right', 'up', 'up', 'up'],
    category_id: 'f701e133-1fff-466c-8c84-3e99154ff778',
  },
];

const BORDERLINE_JUSTICE = [
  {
    name: 'Hover Pack',
    code: ['down', 'up', 'up', 'down', 'left', 'right'],
    category_id: 'ee78a618-c92b-48e4-a514-b849a8ad0859',
  },
];

const MASTERS_OF_CEREMONY = [
  {
    name: 'One True Flag',
    code: ['down', 'left', 'right', 'right', 'up'],
    category_id: '86a708cf-8def-4244-a86a-7e7680632807',
  },
];

const FORCE_OF_LAW = [
  {
    name: 'GL-52 De-Escalator',
    code: ['left', 'right', 'up', 'left', 'right'],
    category_id: 'aa878f90-85b0-4ea6-b7ef-3097bc0effd8',
  },
  {
    name: '“Guard Dog” K-9',
    code: ['down', 'up', 'left', 'up', 'right', 'left'],
    category_id: 'aa878f90-85b0-4ea6-b7ef-3097bc0effd8',
  },
];

const CONTROL_GROUP = [
  {
    name: 'Laser Sentry',
    code: ['down', 'up', 'right', 'down', 'up', 'right'],
    category_id: '347b11f0-ef3e-49ae-af7e-f16d02a0f8eb',
  },
  {
    name: 'Warp Pack',
    code: ['down', 'left', 'right', 'down', 'left', 'right'],
    category_id: '347b11f0-ef3e-49ae-af7e-f16d02a0f8eb',
  },
  {
    name: 'Epoch',
    code: ['down', 'left', 'up', 'left', 'right'],
    category_id: '347b11f0-ef3e-49ae-af7e-f16d02a0f8eb',
  },
];

const DUST_DEVILS = [
  {
    name: 'Speargun',
    code: ['down', 'right', 'down', 'left', 'up', 'right'],
    category_id: '1fbf16b0-2726-4188-9f9d-11cd31224168',
  },
  {
    name: 'Expendable Napalm',
    code: ['down', 'down', 'left', 'up', 'left'],
    category_id: '1fbf16b0-2726-4188-9f9d-11cd31224168',
  },
  {
    name: 'Solo Silo',
    code: ['down', 'up', 'right', 'down', 'down'],
    category_id: '1fbf16b0-2726-4188-9f9d-11cd31224168',
  },
];

const PYTHON_COMMANDOS = [
  {
    name: 'Maxigun',
    code: ['down', 'left', 'right', 'down', 'up', 'up'],
    category_id: '77fda1c3-b8c9-4d13-a1ba-4f6e036b65f1',
  },
  {
    name: 'Defoliation Tool',
    code: ['down', 'left', 'right', 'right', 'down'],
    category_id: '77fda1c3-b8c9-4d13-a1ba-4f6e036b65f1',
  },
  {
    name: 'Guard Dog Hot Dog',
    code: ['down', 'up', 'left', 'up', 'left', 'left'],
    category_id: '77fda1c3-b8c9-4d13-a1ba-4f6e036b65f1',
  },
];

const REDACTED_REGIMENT = [
  {
    name: 'C4 Pack',
    code: ['down', 'right', 'up', 'up', 'right', 'up'],
    category_id: '8877a3a0-668a-4495-9606-e35a6d719cb4',
  },
];

const SIEGE_BREAKERS = [
  {
    name: 'Bastion MK XVI',
    code: ['left', 'down', 'right', 'down', 'right', 'down', 'up', 'down', 'up'],
    category_id: 'd4f10c99-fe1b-4357-a927-343f216dc4c0',
  },
  {
    name: 'CQC-20',
    code: ['down', 'left', 'right', 'left', 'up'],
    category_id: 'd4f10c99-fe1b-4357-a927-343f216dc4c0',
  },
  {
    name: 'EAT-411',
    code: ['down', 'down', 'left', 'up', 'left'],
    category_id: 'd4f10c99-fe1b-4357-a927-343f216dc4c0',
  },
  {
    name: 'GL-28',
    code: ['down', 'left', 'up', 'left', 'up', 'up'],
    category_id: 'd4f10c99-fe1b-4357-a927-343f216dc4c0',
  },
];

const GENERAL_STRATEGEMS = [
  {
    name: 'Resupply',
    code: ['down', 'down', 'up', 'right'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
  {
    name: 'Reinforce',
    code: ['up', 'down', 'right', 'left', 'up'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
  {
    name: 'SOS Beacon',
    code: ['up', 'down', 'right', 'up'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
  {
    name: 'Hellbomb',
    code: ['down', 'up', 'left', 'down', 'up', 'right', 'down', 'up'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
  {
    name: 'SEAF Artillery',
    code: ['right', 'up', 'up', 'down'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
  {
    name: 'Seismic Probe',
    code: ['up', 'up', 'left', 'right', 'down', 'down'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
  {
    name: 'Prospecting Drill',
    code: ['down', 'down', 'left', 'right', 'down', 'down'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
  {
    name: 'Super Earth Flag',
    code: ['down', 'up', 'down', 'up'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
  {
    name: 'Orbital Illumination Flare',
    code: ['right', 'right', 'left', 'left'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
  {
    name: 'Tectonic Drill',
    code: ['up', 'down', 'up', 'down', 'up', 'down'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
  {
    name: 'Dark Fluid Vessel',
    code: ['up', 'left', 'right', 'down', 'up', 'up'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
  {
    name: 'Hive Breaker Drill',
    code: ['left', 'up', 'down', 'right', 'down', 'down'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
  {
    name: 'Cargo Container',
    code: ['up', 'up', 'down', 'down', 'right', 'down'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
  {
    name: 'Call In Super Destroyer',
    code: ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'],
    category_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
];

const STRATAGEMS = [
  ...PATRIOTIC_ADMINISTRATION_CENTER,
  ...ORBITAL_CANNONS,
  ...HANGER,
  ...BRIDGE,
  ...ENGINEERING_BAY,
  ...ROBOTICS_WORKSHOP,
  ...CHEMICAL_AGENTS,
  ...URBAN_LEGENDS,
  ...SERVANTS_OF_FREEDOM,
  ...BORDERLINE_JUSTICE,
  ...MASTERS_OF_CEREMONY,
  ...FORCE_OF_LAW,
  ...CONTROL_GROUP,
  ...DUST_DEVILS,
  ...PYTHON_COMMANDOS,
  ...REDACTED_REGIMENT,
  ...SIEGE_BREAKERS,
  ...GENERAL_STRATEGEMS,
];

module.exports = {
  CATEGORIES,
  STRATAGEMS,
};
