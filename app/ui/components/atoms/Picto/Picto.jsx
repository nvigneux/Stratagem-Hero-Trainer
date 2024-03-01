/* eslint-disable quote-props */
import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

export const availablePictos = {
  // Arrow
  'arrow': dynamic(() => import('../../../../../public/icons/arrow.svg')),

  // Bridge
  'Orbital Precision Strike': dynamic(() => import('../../../../../public/icons/stratagems/Bridge/Orbital Precision Strike.svg')),
  'Orbital Gas Strike': dynamic(() => import('../../../../../public/icons/stratagems/Bridge/Orbital Gas Strike.svg')),
  'Orbital EMS Strike': dynamic(() => import('../../../../../public/icons/stratagems/Bridge/Orbital EMS Strike.svg')),
  'Orbital Smoke Strike': dynamic(() => import('../../../../../public/icons/stratagems/Bridge/Orbital Smoke Strike.svg')),
  'HMG Emplacement': dynamic(() => import('../../../../../public/icons/stratagems/Bridge/HMG Emplacement.svg')),
  'Shield Generator Relay': dynamic(() => import('../../../../../public/icons/stratagems/Bridge/Shield Generator Relay.svg')),
  'Tesla Tower': dynamic(() => import('../../../../../public/icons/stratagems/Bridge/Tesla Tower.svg')),

  // Engineering Bay
  'Anti-Personnel Minefield': dynamic(() => import('../../../../../public/icons/stratagems/Engineering Bay/Anti-Personnel Minefield.svg')),
  'Supply Pack': dynamic(() => import('../../../../../public/icons/stratagems/Engineering Bay/Supply Pack.svg')),
  'Grenade Launcher': dynamic(() => import('../../../../../public/icons/stratagems/Engineering Bay/Grenade Launcher.svg')),
  'Laser Cannon': dynamic(() => import('../../../../../public/icons/stratagems/Engineering Bay/Laser Cannon.svg')),
  'Incendiary Mines': dynamic(() => import('../../../../../public/icons/stratagems/Engineering Bay/Incendiary Mines.svg')),
  '“Guard Dog” Rover': dynamic(() => import('../../../../../public/icons/stratagems/Engineering Bay/Guard Dog Rover.svg')),
  'Ballistic Shield Backpack': dynamic(() => import('../../../../../public/icons/stratagems/Engineering Bay/Ballistic Shield Backpack.svg')),
  'Arc Thrower': dynamic(() => import('../../../../../public/icons/stratagems/Engineering Bay/Arc Thrower.svg')),
  'Shield Generator Pack': dynamic(() => import('../../../../../public/icons/stratagems/Engineering Bay/Shield Generator Pack.svg')),

  // General Stratagems
  'Super Earth Flag': dynamic(() => import('../../../../../public/icons/stratagems/General Stratagems/Resupply.svg')),
  'Reinforce': dynamic(() => import('../../../../../public/icons/stratagems/General Stratagems/Reinforce.svg')),
  'SOS Beacon': dynamic(() => import('../../../../../public/icons/stratagems/General Stratagems/SOS Beacon.svg')),
  'Upload Data': dynamic(() => import('../../../../../public/icons/stratagems/General Stratagems/Upload Data.svg')),
  'Hellbomb': dynamic(() => import('../../../../../public/icons/stratagems/General Stratagems/Hellbomb.svg')),
  'SEAF Artillery': dynamic(() => import('../../../../../public/icons/stratagems/General Stratagems/SEAF Artillery.svg')),

  // Hanger
  'Eagle Strafing Run': dynamic(() => import('../../../../../public/icons/stratagems/Hanger/Eagle Strafing Run.svg')),
  'Eagle Airstrike': dynamic(() => import('../../../../../public/icons/stratagems/Hanger/Eagle Airstrike.svg')),
  'Eagle Cluster Bomb': dynamic(() => import('../../../../../public/icons/stratagems/Hanger/Eagle Cluster Bomb.svg')),
  'Eagle Napalm Airstrike': dynamic(() => import('../../../../../public/icons/stratagems/Hanger/Eagle Napalm Airstrike.svg')),
  'Jump Pack': dynamic(() => import('../../../../../public/icons/stratagems/Hanger/Jump Pack.svg')),
  'Eagle Smoke Strike': dynamic(() => import('../../../../../public/icons/stratagems/Hanger/Eagle Smoke Strike.svg')),
  'Eagle 110MM Rocket Pods': dynamic(() => import('../../../../../public/icons/stratagems/Hanger/Eagle 110MM Rocket Pods.svg')),
  'Eagle 500KG Bomb': dynamic(() => import('../../../../../public/icons/stratagems/Hanger/Eagle 500KG Bomb.svg')),

  // Orbital Cannons
  'Orbital Gatling Barrage': dynamic(() => import('../../../../../public/icons/stratagems/Orbital Cannons/Orbital Gatling Barrage.svg')),
  'Orbital Airburst Strike': dynamic(() => import('../../../../../public/icons/stratagems/Orbital Cannons/Orbital Airburst Strike.svg')),
  'Orbital 120MM HE Barrage': dynamic(() => import('../../../../../public/icons/stratagems/Orbital Cannons/Orbital 120MM HE Barrage.svg')),
  'Orbital 380MM HE Barrage': dynamic(() => import('../../../../../public/icons/stratagems/Orbital Cannons/Orbital 380MM HE Barrage.svg')),
  'Orbital Walking Barrage': dynamic(() => import('../../../../../public/icons/stratagems/Orbital Cannons/Orbital Walking Barrage.svg')),
  'Orbital Laser': dynamic(() => import('../../../../../public/icons/stratagems/Orbital Cannons/Orbital Laser.svg')),
  'Orbital Railcannon Strike': dynamic(() => import('../../../../../public/icons/stratagems/Orbital Cannons/Orbital Railcannon Strike.svg')),

  // Patriotic Administration Center
  'Machine Gun': dynamic(() => import('../../../../../public/icons/stratagems/Patriotic Administration Center/Machine Gun.svg')),
  'Anti-Material Rifle': dynamic(() => import('../../../../../public/icons/stratagems/Patriotic Administration Center/Anti-Materiel Rifle.svg')),
  'Stalwart': dynamic(() => import('../../../../../public/icons/stratagems/Patriotic Administration Center/Stalwart.svg')),
  'Expendable Anti-Tank': dynamic(() => import('../../../../../public/icons/stratagems/Patriotic Administration Center/Expendable Anti-Tank.svg')),
  'Recoilless Rifle': dynamic(() => import('../../../../../public/icons/stratagems/Patriotic Administration Center/Recoilless Rifle.svg')),
  'Flamethrower': dynamic(() => import('../../../../../public/icons/stratagems/Patriotic Administration Center/Flamethrower.svg')),
  'Autocannon': dynamic(() => import('../../../../../public/icons/stratagems/Patriotic Administration Center/Autocannon.svg')),
  'Railgun': dynamic(() => import('../../../../../public/icons/stratagems/Patriotic Administration Center/Railgun.svg')),
  'Spear': dynamic(() => import('../../../../../public/icons/stratagems/Patriotic Administration Center/Spear.svg')),

  // Robotics Workshop
  'Machine Gun Sentry': dynamic(() => import('../../../../../public/icons/stratagems/Robotics Workshop/Machine Gun Sentry.svg')),
  'Gatling Sentry': dynamic(() => import('../../../../../public/icons/stratagems/Robotics Workshop/Gatling Sentry.svg')),
  'Mortar Sentry': dynamic(() => import('../../../../../public/icons/stratagems/Robotics Workshop/Mortar Sentry.svg')),
  '“Guard Dog”': dynamic(() => import('../../../../../public/icons/stratagems/Robotics Workshop/Guard Dog.svg')),
  'Autocannon Sentry': dynamic(() => import('../../../../../public/icons/stratagems/Robotics Workshop/Autocannon Sentry.svg')),
  'Rocket Sentry': dynamic(() => import('../../../../../public/icons/stratagems/Robotics Workshop/Rocket Sentry.svg')),
  'EMS Mortar Sentry': dynamic(() => import('../../../../../public/icons/stratagems/Robotics Workshop/EMS Mortar Sentry.svg')),
};

export function Picto({ icon, ...props }) {
  if (availablePictos[icon]) {
    try {
      const IconComponent = availablePictos[icon];
      return IconComponent ? React.createElement(IconComponent, props) : null;
    } catch (error) {
      console.log(`"${icon}":`, error);
    }
  }

  return null;
}

Picto.propTypes = {
  icon: PropTypes.oneOf(Object.keys(availablePictos)).isRequired,
};
