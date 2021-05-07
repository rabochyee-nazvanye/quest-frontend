# Questspace.live

[Platform for creating and managing quests. Project description [Russian].](https://docs.google.com/document/d/1pQrgmGujQnXfRKLVg0kbnB2lWNRRPiHhRPLF0n5rVeY/edit?usp=sharing)

Platform allows users to create and deploy online-quests, tests and other activities alike

## Technology used:

- **React** (CRA v4)
- Redux 
- React-router v4
- Ant Design

# How to use?

## Try questspace

If you need to create or to complete a quest — simply visit [questspace.live](questspace.live) we already set everything up for you

## Delpoy own questspace instance

If you want to deploy your own version of questspace, read further

> You need a running instance of questspace backend in order to use the client properly.
> Check the delploy docs of the [quest-backend](https://github.com/rabochyee-nazvanye/quest-backend) project

1. Clone the repo
2. Install dependencies 

    `yarn`
    
2. Fill up the GOOGLE_CLIENT_ID and CLIENT_URL in `src/settings.js` file
3. Create a config class, like `src/application/AbstractConfig` or fill up the `LocalConfig.js`
4. Generate the themes

    `npx gulp less`

5. Run the project

    `yarn start`
   
# Developing

## Theming

We support custom Antd themes in project.

Custom themes rest in `src/themes` folder as `.less` files and get compiled to `.css` before the runtime.

After that they simply are injected in the public html with a switch that changes the order of the injected styles when toggled

### Compile Ant themes

`npx gulp less`

### Create own Ant theme

1. Create the file in `src/themes/*-theme.less`
2. Tweak the file using [AntD theme customization tutorial](https://ant.design/docs/react/customize-theme)
3. Compile themes

### Tweak existing Ant theme

1. Tweak the existing theme
2. Recompile themes

### Custom styles

> Better to stick to the Ant components when possible, and use Ant less variables where possible. Writing custom visual-related css is not recommended.

We use [react-css-theme-switcher](https://github.com/JoseRFelix/react-css-theme-switcher#readme) to handle the changing of the css theme. Please refer to it when styling own components.
