# [Stratagem Hero Trainer](https://stratagem-hero-trainer.vercel.app/)

Turning Average Joes into Stratagem Superstars, Because Even Bugs Fear a Well-Placed Stratagem!

[Stratagem Hero Trainer](https://stratagem-hero-trainer.vercel.app/) 🎮🤖

## Description

Stratagem Hero Trainer is an advanced web application designed to enhance strategic skills through immersive training modules. It provides personalized training plans, real-time feedback, and performance tracking to transform beginners into strategic experts.

## Features

- **Interactive Training Modules**: Engage in dynamic and interactive sessions designed to boost strategic thinking.
- **Real-time Feedback**: Receive instant feedback on your performance to aid continuous improvement.
- **Customizable Training Plans**: Tailor your training schedule to fit your personal goals and progress.
- **User-friendly Interface**: Navigate the application with ease thanks to an intuitive and streamlined design.


## Screenshots

#### Stratagem hero
![Stratagem hero](public/assets/readme/Stratagem-hero-1_1.webp)

#### Settings
![Stratagem hero 2](public/assets/readme/Stratagem-hero-2.webp)

#### History & Stats
![Stratagem hero 3](public/assets/readme/Stratagem-hero-3_1.webp)

# Support me

### If you find these resources helpful for your projects or simply enjoy the designs, consider supporting my efforts.
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png)](https://www.buymeacoffee.com/nvigneux?path=readme)

## Development Notes

### Adding New Stratagems

When adding new stratagems with their icons to the app:

1. **Add the icon files** to the `public/icons/stratagems/` directory
2. **Add the stratagem data** to the appropriate data files `app/lib/placeholder-data-helldivers`
3. Run `npm run build`: the offline manifest automatically includes public assets and all compiled chunks.

### Offline trainer

After a first online visit and completed service-worker installation, `/` can be reopened
without a connection. Icons, sounds and scripts are precached; settings (including applied
key bindings) and the best score are saved in localStorage. Existing cookies are migrated
when local settings are absent. Loadout offline support is outside this scope.

Test a production build with `npm run build` and `npm start`, then run
`npm run test:offline` (requires Google Chrome; use `CHROME_BIN` to override its path,
`TEST_URL` to override `http://localhost:3000`). The test disables the network and HTTP
cache, reloads, plays a complete round and verifies settings after another reload.
Development mode does not register the worker. Clearing site data removes offline resources
and saved preferences. New builds activate after existing app tabs close.
